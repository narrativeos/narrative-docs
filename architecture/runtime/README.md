<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Runtime Architecture

## EN Summary

This document describes Runtime Architecture in the Narrative Knowledge Hub.

## Machine-readable Metadata

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

## AI 协作要求

- 生成代码时必须遵守运行时边界
- 重构需显式检查跨 runtime 影响
