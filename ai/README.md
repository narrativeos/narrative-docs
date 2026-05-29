<!-- doc-nav:start -->
> 返回路径： [文档首页](../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# AI Context Layer

## EN Summary

This document describes AI Context Layer in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: ai-README
path: ai/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

本层是 NarrativeOS 的 AI 记忆层，目标是让 Copilot/Agent 获得稳定上下文。

## 导航

- 返回首页: [README.md](../README.md)
- 规则来源: [Architecture](../architecture/README.md) | [ADR](../adr/README.md)
- 执行落地: [Developer](../developer/README.md)

## 模块

- [copilot](copilot/README.md): Copilot 使用策略与边界
- [prompts](prompts/README.md): 任务模板与提示词规范
- [repo-rules](repo-rules/README.md): 跨仓统一工程规则
- [architecture-context](architecture-context/README.md): 面向 AI 的架构摘要

## 推荐阅读顺序

- architecture-context -> repo-rules -> copilot -> prompts
