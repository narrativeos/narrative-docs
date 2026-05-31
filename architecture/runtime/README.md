# Runtime Architecture

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines runtime separation, communication constraints, and AI-safe implementation boundaries.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: architecture-runtime-README
path: architecture/runtime/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## Runtime 分层

- Host Runtime: Rust/Tauri，负责生命周期、进程与边界控制
- UI Runtime: TypeScript/React，负责可视化与交互
- Worker Runtime: Python，负责任务计算与数据处理

## 运行时规则

- 禁止跨运行时直接依赖导入
- 跨运行时通信通过 IPC 或明确定义的 contract
- Runtime Isolation 属于架构红线，任何例外需 ADR 记录
- 跨运行时通信必须支持背压反馈，Host 根据 Worker 负载信号节流任务提交
- 跨运行时仅传递 artifact handle 与契约引用，不传递大对象所有权给 UI runtime
- 本运行时架构不覆盖用户系统（账号、登录、注册、租户）实现

## AI 协作要求

- 生成代码时必须遵守运行时边界
- 重构需显式检查跨 runtime 影响

## 实施边界映射（Host / Worker / UI）

为避免优化策略在实现期被误解为“跨层耦合”，三方职责按下表固定。

| Runtime | Must Own | Must Not Own | Interface Contract |
| --- | --- | --- | --- |
| Host Runtime | 队列背压、任务准入、节流决策 | 不执行深度分析算法主体 | 通过 IPC 下发任务控制信号 |
| Worker Runtime | 增量重算、解析复用、深度分析执行 | 不直接控制 UI 状态与渲染 | 返回结构化结果与 artifact handle |
| UI Runtime | 路径可视化、进度反馈、结果分层展示 | 不持有大对象所有权、不调度队列策略 | 只消费契约字段与 artifact 引用 |

实现约束：

- 背压信号从 Worker -> Host 反馈，由 Host 统一执行节流。
- 大对象跨运行时传递必须转为 artifact handle。
- UI 仅可读取句柄引用，不可直接接管 Worker 产物生命周期。

## 运行时故障处置 Runbook（最小基线）

| Trigger (5min window) | Alert Level | Action Owner | Immediate Action | Recovery Criteria |
| --- | --- | --- | --- | --- |
| worker_queue_depth > 高水位 2 倍 | P1 | Host Oncall | 暂停 Deep Queue 准入，仅保留 Fast Queue | 连续 15 分钟回落到高水位以下 |
| ipc_contract_error_rate > 0.5% | P1 | Runtime Owner | 回滚到上一个 contract 版本，开启兼容模式 | 错误率 < 0.1% 且回归通过 |
| artifact_fetch_latency_p95 > 3s | P2 | Storage Oncall | 启动 warm 预热并限制 cold 读取并发 | p95 < 1.5s 持续 30 分钟 |
| manifest_publish_failures 连续 3 次 | P1 | Worker Owner | 停止新发布，执行一致性修复脚本 | 两次连续发布成功 |

人机联动要求：

- 每次 P1/P2 事件必须生成 incident 记录，绑定快照 ID、队列状态、处置时间线。
- Runbook 处置与恢复判据必须在发布前演练，缺失演练记录不得进入 GA 发布。
