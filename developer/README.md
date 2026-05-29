<!-- doc-nav:start -->
> 返回路径： [文档首页](../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Developer Guide

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document is the developer entry for environment setup, workspace operations, coding rules, and extension tracks.

## Machine-readable Metadata

```yaml
doc_id: developer-README
path: developer/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

本层用于统一开发与协作基线，目标是降低多仓库维护摩擦。

## 导航

- 返回首页: [README.md](../README.md)
- 规范来源: [Architecture](../architecture/README.md) | [ADR](../adr/README.md) | [Product](../product/README.md)
- AI 协作: [AI Context](../ai/README.md)

## 模块

- [setup](setup/README.md): 开发工具与依赖
- [workspace](workspace/README.md): 多仓库工作区组织
- [api](api/README.md): API 规格入口与 OpenAPI 维护约定
- [operations](operations/README.md): 安装验证、回滚与故障处置 Runbook
- [workspace/ai-native-bootstrap-checklist.md](workspace/ai-native-bootstrap-checklist.md): AI-Native 仓库初始化检查清单
- [coding](coding/README.md): 编码规范与质量门禁
- [plugins](plugins/README.md): 插件开发约束
- [sdk](sdk/README.md): SDK 设计与发布注意事项

## 推荐阅读顺序

- setup -> workspace -> api -> coding
- 按需延伸阅读 plugins 与 sdk
