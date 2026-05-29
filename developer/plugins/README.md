<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Plugins

## EN Summary

This document describes Plugins in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: developer-plugins-README
path: developer/plugins/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 插件边界

- 插件通过公开 API/SDK 扩展能力
- 不直接依赖内部实现细节
- 插件 contract 变更必须版本化并文档化

## 协作要求

- 提交插件能力时补充示例与兼容说明
- AI 生成插件代码需通过 contract 与 CI 校验
