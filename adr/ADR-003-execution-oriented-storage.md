# ADR-003: Execution-Oriented Storage for Performance Path Separation

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This ADR records the decision to adopt an execution-oriented storage architecture with tiered storage, incremental recompute persistence, artifact handle registry, and backpressure-ready telemetry.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: adr-ADR-003-execution-oriented-storage
path: adr/ADR-003-execution-oriented-storage.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

- 状态: Accepted
- 日期: 2026-05-31
- 决策者: NarrativeOS Maintainers

## 背景 | Background

NarrativeOS 已确立 Fast Scan 与 Full MRI 的分层执行模型，并将增量重算、句柄复用与任务背压作为效率优化主路径。

若存储层仍停留在“被动持久化”，则会出现以下问题：

- 轻量路径与深度路径共享同一读写策略，交互时延不稳定
- dirty-region 重算缺少可持久追踪状态，导致重复计算
- artifact 复用缺少注册与版本约束，跨运行时传输成本高
- 存储负载无法反馈调度层，队列背压失真

## 决策 | Decision

- 采用执行导向存储架构（execution-oriented storage）作为存储演进方向
- 采用 Hot/Warm/Cold 三层存储，支撑性能路径分离
- 存储层必须持久化增量重算状态（snapshot/region/dependency）
- 统一采用 artifact URI 作为跨运行时工件引用规范
- 深度任务必须生成 snapshot manifest，保证诊断与工件版本一致
- 存储层必须输出遥测信号，供 Task System 执行背压联动

## 影响 | Impact

- 显著提升差异加工路径的稳定性与可预测性
- 降低深度链路重复计算与大对象跨运行时传输开销
- 增强可复现性、可审计性与回放能力
- 引入更多 schema 与一致性治理工作量

## 备选方案 | Alternatives

- 方案 A: 维持单层存储与临时缓存（拒绝）
- 方案 B: 仅在运行时做优化，不改存储结构（拒绝）
- 方案 C: 把所有优化交给模型选路，不做状态持久化（拒绝）

## 约束与边界 | Constraints and Boundaries

- 本决策不绑定具体云厂商与对象存储产品
- 本决策不改变运行时隔离红线
- 本决策不将 Planned 口径升级为 Measured 声明

## 关联 ADR | Related ADRs

- [ADR-001-runtime.md](ADR-001-runtime.md): 运行时隔离与通信边界
- [ADR-002-storage.md](ADR-002-storage.md): DuckDB 规范化存储基线

## 后续动作 | Next Actions

- 在 storage 文档中维护 tiering、manifest、artifact registry 的 schema 约束
- 在 system 文档中维护背压联动与选路策略约束
- 在 runtime 文档中维护句柄语义与对象所有权边界
- 在后续实现中补充存储遥测指标与验收基线
- 以 [../developer/coding/storage-optimization-rollout-checklist.md](../developer/coding/storage-optimization-rollout-checklist.md) 作为实施任务与验收门禁清单
