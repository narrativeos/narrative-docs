<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Atlas Architecture

## EN Summary

This document describes Atlas Architecture in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: architecture-atlas-README
path: architecture/atlas/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块职责

Atlas 负责知识图谱/结构化叙事语义相关能力，并与编辑、空间与分析模块协同。

## 边界要求

- Atlas 对外能力通过稳定接口暴露
- 避免把 Atlas 内部实现细节泄漏到其他仓库
- 跨模块集成优先通过约定模型与协议字段
