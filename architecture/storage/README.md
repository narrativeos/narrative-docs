# Storage Architecture

## EN Summary

This document describes Storage Architecture in the Narrative Knowledge Hub.

## Machine-readable Metadata

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

## 存储原则

- 先定义 schema 再实现数据访问
- 变更需要记录迁移与兼容策略
- API/SDK 中涉及数据结构的变更需同步更新文档与测试
