<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Architecture Context for AI

## EN Summary

This document describes Architecture Context for AI in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: ai-architecture-context-README
path: ai/architecture-context/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

向 AI 提供跨仓架构摘要，避免上下文漂移。

EN: Cross-repo architecture context for agents and Copilot.

## 必含信息

- 系统分层与运行时边界
- 关键 contract 与 schema 位置
- 模块职责与依赖关系
- 当前 ADR 列表与状态

## 更新机制

- 架构变更时与 ADR 同步更新
- 发布前检查 AI 上下文是否过期

## 机读入口 | Machine-readable Entry

- 全局文档索引: [assets/doc-index.yaml](../../assets/doc-index.yaml)
- 双语术语表: [assets/glossary.zh-en.md](../../assets/glossary.zh-en.md)
- 架构上下文映射: [ai/architecture-context/context-map.yaml](context-map.yaml)
