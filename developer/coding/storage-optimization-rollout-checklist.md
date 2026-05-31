# 执行导向存取优化落地清单

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This checklist translates ADR-003 into implementable tasks across Host, Worker, and UI tracks, with dependencies, acceptance signals, and release gates.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-storage-optimization-rollout-checklist
path: developer/coding/storage-optimization-rollout-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, maintainer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
related_adr:
  - adr/ADR-003-execution-oriented-storage.md
```

## 范围 | Scope

本清单仅覆盖“执行导向存取架构”的实现落地，不替代产品需求文档。

- 覆盖：分层存储、增量重算、artifact 注册、manifest、一致性发布、背压遥测
- 不覆盖：业务策略 UI 文案、外部云厂商选型、性能营销口径

## 实施分轨 | Implementation Tracks

| Track | Owner Runtime | P0 | P1 | P2 |
| --- | --- | --- | --- | --- |
| Host Track | Rust/Tauri | 背压准入 + 队列阈值 | 过载降级策略 | 遥测回路优化 |
| Worker Track | Python | dirty-region 重算 + parse 复用 | artifact 注册 + manifest 发布 | 冷层归档优化 |
| UI Track | TS/React | 任务态展示基础 | 路径分层与降级原因透出 | 体验与可观察性增强 |

## 任务对照表 | Task Mapping

### A. Host Track

| Task ID | Task | Depends On | Output | Acceptance |
| --- | --- | --- | --- | --- |
| HOST-STO-001 | 高低水位背压准入 | Task Queue 基础能力 | Fast/Deep/Corpus 队列准入阈值配置 | 高负载下 Fast Queue 响应稳定 |
| HOST-STO-002 | 存储 I/O 信号联动节流 | HOST-STO-001, WORK-STO-004 | 按 io_saturation_level 调整 Deep 准入速率 | 限流行为可追踪，抖动可控 |
| HOST-STO-003 | 受限路径回退协议 | HOST-STO-001 | degrade_reason 返回规范 | 过载时返回受限结果而非超时 |

### B. Worker Track

| Task ID | Task | Depends On | Output | Acceptance |
| --- | --- | --- | --- | --- |
| WORK-STO-001 | dirty-region 状态持久化 | Document diff 能力 | region_state 与 dependency_edge 表 | 小改动不触发全文重算 |
| WORK-STO-002 | parse-once/fan-out-many 复用 | WORK-STO-001 | 多引擎共享解析产物 | 重复解析次数下降 |
| WORK-STO-003 | artifact 注册表与句柄协议 | WORK-STO-002 | artifact:// URI 与 registry | 大对象不跨 runtime 直接传输 |
| WORK-STO-004 | snapshot manifest 发布 | WORK-STO-003 | snapshot_manifest 版本绑定 | diagnostics 与 artifacts 版本一致 |
| WORK-STO-005 | 原子发布与失败回滚 | WORK-STO-004 | 写状态->写payload->注册句柄->发布manifest | 失败时无脏 manifest 可见 |

### C. UI Track

| Task ID | Task | Depends On | Output | Acceptance |
| --- | --- | --- | --- | --- |
| UI-STO-001 | 队列态可视化 | HOST-STO-001 | 排队/运行/降级/完成状态 | 用户可见任务状态变化 |
| UI-STO-002 | 路径分层展示 | HOST-STO-003, WORK-STO-004 | Fast Path/Deep Path 标识 | 首屏优先展示轻量结果 |
| UI-STO-003 | 降级原因与句柄引用透出 | WORK-STO-003 | degrade_reason + artifact_ref 展示 | 问题可定位、可追踪 |

## 迭代建议 | Suggested Sprinting

### Sprint 1 (P0)

- HOST-STO-001
- WORK-STO-001
- WORK-STO-002
- UI-STO-001

目标：先保证负载下不崩，轻量路径稳定可用。

### Sprint 2 (P1)

- WORK-STO-003
- WORK-STO-004
- HOST-STO-002
- UI-STO-002

目标：句柄复用与快照清单上线，形成可追踪闭环。

### Sprint 3 (P2)

- WORK-STO-005
- HOST-STO-003
- UI-STO-003

目标：完善一致性发布、降级回退与解释性体验。

## 发布门禁 | Release Gates

- Gate 1: dirty-region 路径有效，全文重算比例下降
- Gate 2: artifact 句柄替代跨 runtime 大对象传输
- Gate 3: manifest 版本一致性通过抽检
- Gate 4: 背压联动有效，Fast 路径在高负载下可响应

## 验证记录模板 | Validation Template

```yaml
run_id: STO-ROLL-XXX
sprint: 1|2|3
gate_results:
  gate_1: pass|fail
  gate_2: pass|fail
  gate_3: pass|fail
  gate_4: pass|fail
metrics:
  full_recompute_ratio: TBD
  cache_hit_ratio_hot_warm: TBD
  storage_write_latency_p95_ms: TBD
  throttle_count: TBD
evidence_link: TBD
```

## 关联文档 | Related Docs

- [../../adr/ADR-003-execution-oriented-storage.md](../../adr/ADR-003-execution-oriented-storage.md)
- [../../architecture/storage/README.md](../../architecture/storage/README.md)
- [../../architecture/system/README.md](../../architecture/system/README.md)
- [../../architecture/runtime/README.md](../../architecture/runtime/README.md)
- [../../whitepaper/algorithm-evaluation-report.md](../../whitepaper/algorithm-evaluation-report.md)
