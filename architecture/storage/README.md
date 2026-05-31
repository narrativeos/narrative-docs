# Storage Architecture

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines an execution-oriented storage architecture for NarrativeOS, including tiered storage, incremental recompute persistence, artifact handle registry, and backpressure-ready I/O telemetry.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: architecture-storage-README
path: architecture/storage/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 基线决策

- DuckDB 作为规范化本地分析存储基线
- 关键结构通过 schema 与文档同步维护
- 存储必须服务运行效率，不仅服务持久化

## 存储原则

- 先定义 schema 再实现数据访问
- 变更需要记录迁移与兼容策略
- API/SDK 中涉及数据结构的变更需同步更新文档与测试

## 目标与非目标 | Goals and Non-goals

目标：

- 支撑 Fast Scan 与 Full MRI 的性能路径分离
- 支撑 dirty-region 增量重算与 parse 产物复用
- 支撑 artifact handle 跨运行时引用
- 支撑存储层背压信号进入调度系统

非目标：

- 不在存储层直接承载 UI 业务逻辑
- 不在本页定义具体数据库厂商绑定实现细节

## 分层存储架构 | Tiered Storage Architecture

NarrativeOS 存储采用热/温/冷三层，分别面向不同时延与成本目标。

| Tier | Role | Latency Target | Typical Payload | Primary Consumer |
| --- | --- | --- | --- | --- |
| Hot Tier | 交互热数据层 | ms | 当前段落特征、短周期增量状态 | Fast Scan / Sidebar |
| Warm Tier | 本地分析层 | 100ms-秒级 | AST、特征快照、中间指标 | Local Engine / Worker |
| Cold Tier | 归档与复现层 | 秒-分钟级 | 历史工件、深度报告、研究快照 | Full MRI / Corpus / Repro |

实施基线：

- Hot Tier：内存缓存与短生命周期状态。
- Warm Tier：DuckDB 规范化表 + 索引。
- Cold Tier：对象存储/归档仓，结合 manifest 管理。

## 性能路径分离 | Performance Path Separation

为支撑执行效率优化，存储读写必须区分轻量与深度路径。

- Fast Path（默认）：优先读取 Hot/Warm，禁止阻塞等待 Cold 读取。
- Deep Path（异步）：允许写入 Cold，并生成完整快照与工件归档。
- Degrade Path（过载）：在 I/O 或队列过载时降级为受限读取，保留原因字段。

## 增量重算存储模型 | Incremental Recompute Model

存储层需维护“内容变化 -> 影响区域 -> 依赖重算”的可追踪链路。

关键实体建议：

```yaml
document_snapshot:
	key: [doc_id, content_hash, schema_version]
	fields: [created_at, profile, region_count]

region_state:
	key: [doc_id, region_id, content_hash]
	fields: [ast_hash, feature_hash, dirty_flag, updated_at]

dependency_edge:
	key: [upstream_id, downstream_id, engine_version]
	fields: [edge_type, recompute_scope]
```

执行规则：

- 仅 dirty region 对应的 region_state 进入重算。
- 未变化区域直接复用上次 snapshot 的 warm 产物。
- engine_version 变化时，受影响 dependency_edge 全部失效。

## Artifact Handle Registry | 工件句柄注册层

高成本中间产物和可视化工件统一通过句柄访问。

句柄规范：

```text
artifact://{engine}/{resource}/{doc_id}/{version}
```

注册表建议字段：

```yaml
artifact_registry:
	key: [artifact_uri]
	fields:
		- doc_id
		- content_hash
		- engine_version
		- profile
		- storage_tier
		- payload_ref
		- created_at
		- ttl_policy
```

约束：

- UI Runtime 只消费 artifact URI，不接管 payload 生命周期。
- Worker 负责写入与更新注册表，Host 负责访问节流。

## Snapshot Manifest | 快照清单

每次深度任务应生成可复算 manifest，作为复现与缓存命中依据。

```yaml
snapshot_manifest:
	snapshot_id: snap-xxx
	doc_id: doc-xxx
	content_hash: sha256-xxx
	profile: fast_scan | full_mri
	schema_version: v2
	engine_bundle_version: vX.Y.Z
	artifacts:
		- artifact://semantic/vector/doc-xxx/v7
		- artifact://narrative/flow/doc-xxx/v7
	diagnostics_version: diag-v7
	created_at: 2026-05-31T00:00:00Z
```

一致性要求：

- diagnostics 与 artifacts 必须绑定同一 version。
- manifest 缺失时禁止声称结果可复现。

## 存储背压与遥测 | Storage Backpressure and Telemetry

存储层必须输出可供 Task System 消费的运行信号。

建议指标：

- storage_write_latency_p95
- storage_read_latency_p95
- cache_hit_ratio_hot_warm
- artifact_fetch_latency_p95
- io_saturation_level

联动规则：

- 当 io_saturation_level 超阈值时，Host 降低 Deep Queue 准入速率。
- 当 cache_hit_ratio_hot_warm 下降时，Worker 优先执行 warm 预热任务。

## 生命周期与容量策略 | Lifecycle and Capacity Policy

为避免冷层归档长期失控，统一 retention 与回收策略。

| Tier | Retention | Capacity Cap | Cleanup Cadence | Eviction Priority |
| --- | --- | --- | --- | --- |
| Hot | 24h-72h | 节点可用内存的 20% | 每 15 分钟 | 临时缓存 > 可再生中间态 > 最近活跃数据 |
| Warm | 30-90 天 | 单工作区默认 200GB | 每日 | 旧版本 snapshot > 低命中特征 > 冗余索引 |
| Cold | 180-365 天（可配置） | 项目级预算上限（默认 2TB） | 每周 | 过期深度报告 > 低价值历史工件 > 可再算归档 |

执行规则：

- 超过 Capacity Cap 80% 时触发预警；超过 90% 自动进入受限写入模式。
- cleanup 任务必须先校验 manifest 引用关系，禁止回收仍被活动 manifest 引用的 payload。
- 每次回收生成 reclaim ledger（回收对象、大小、原因、可回放标识）。

## 事务与一致性协议 | Transaction and Consistency

存储更新采用“先写状态、后发布句柄”的原子发布原则。

```text
Write snapshot/region state
	-> Write artifact payload
	-> Register artifact URI
	-> Publish manifest
```

失败处理：

- 任一步骤失败，manifest 不可见。
- 孤立 payload 通过回收任务清理。

## 兼容与迁移策略 | Compatibility and Migration

- schema 升级必须附迁移脚本与回滚路径。
- content_hash 算法变更需双写过渡窗口。
- artifact URI 规范升级需提供兼容映射层。

## 与上层架构映射 | Mapping to System/Runtime

- 与 [../system/README.md](../system/README.md) 对齐：统一缓存体系、Task System 背压、Model Router 选路。
- 与 [../runtime/README.md](../runtime/README.md) 对齐：跨运行时只传句柄，不传对象所有权。
- 与 [../analysis-engine/README.md](../analysis-engine/README.md) 对齐：Adaptive Routing 与 Incremental Reuse。
- 与 [../../whitepaper/algorithm-evaluation-report.md](../../whitepaper/algorithm-evaluation-report.md) 对齐：性能优化空间的执行基础。

## 决策链追踪 | Decision Trace

- [../../adr/ADR-002-storage.md](../../adr/ADR-002-storage.md): 确立 DuckDB 规范化存储基线。
- [../../adr/ADR-003-execution-oriented-storage.md](../../adr/ADR-003-execution-oriented-storage.md): 确立执行导向存取架构与性能路径分离。

## 实施优先级 | Implementation Priorities

| Phase | Priority | Scope | Deliverable |
| --- | --- | --- | --- |
| P0 | 必做 | 增量状态表 + artifact 注册表 + 版本键 | 可用的增量重算与句柄复用链路 |
| P1 | 应做 | 快照 manifest + 一致性发布 | 可复现、可回放、可审计 |
| P2 | 优化 | 背压遥测联动 + 冷层归档优化 | 高负载下稳定性与吞吐提升 |
