# Architecture Memory

本层维护 NarrativeOS 的跨仓库架构记忆。

## 模块

- system: 总体系统边界与子系统关系
- runtime: Rust Host / TS UI / Python Worker 运行时分工与隔离
- storage: DuckDB 与数据流
- atlas: Atlas 相关能力与边界
- spatial: 空间计算与 GIS 集成

## 使用方式

- 发生关键架构变更时，先更新本层，再同步 ADR
- 设计评审和跨仓协作以本层文档作为基准
