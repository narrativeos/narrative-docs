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
