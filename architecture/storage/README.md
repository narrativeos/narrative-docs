# Storage Architecture

## 基线决策

- DuckDB 作为规范化本地分析存储基线
- 关键结构通过 schema 与文档同步维护

## 存储原则

- 先定义 schema 再实现数据访问
- 变更需要记录迁移与兼容策略
- API/SDK 中涉及数据结构的变更需同步更新文档与测试
