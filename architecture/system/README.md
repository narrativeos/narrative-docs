# System Architecture

## 系统定位

NarrativeOS 是多仓库、多语言系统，核心由以下能力组成：

- Rust + Tauri: Host 与桌面能力编排
- TypeScript + React: 交互层与应用界面
- Python Worker: 分析与计算任务执行
- DuckDB + GIS: 数据与空间分析基础设施

## 架构原则

- 运行时隔离是强约束
- 跨运行时交互优先走显式协议（IPC / API Contract）
- 存储层以 DuckDB 为标准基线
- 插件通过稳定 API/SDK 边界扩展，不绕过核心约束
