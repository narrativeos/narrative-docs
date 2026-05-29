# API Specification Guide

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the API specification entry point, OpenAPI governance rules, and versioning expectations for NarrativeOS interfaces.

## Machine-readable Metadata

```yaml
doc_id: developer-api-README
path: developer/api/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, integrator, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标

- 为 NarrativeOS 对外接口提供统一规格入口
- 将“版本策略”与“接口定义”分离维护
- 为 SDK、插件、集成商提供一致的接口真源

## 推荐目录约定

```text
developer/api/
  README.md
  openapi/
    narrative-api-v1.yaml
    narrative-api-v2.yaml
```

## OpenAPI 最小要求

- 使用 OpenAPI 3.0+
- 每个路径必须声明请求体、响应体、错误模型
- 每个 breaking change 必须映射到 MAJOR 版本变化
- 示例请求与示例响应必须可用于 SDK 文档回链

## 规格维护流程

1. 先更新 OpenAPI schema。
2. 再更新 [../../API_COMPATIBILITY_AND_VERSIONING.md](../../API_COMPATIBILITY_AND_VERSIONING.md)。
3. 再同步更新 [../sdk/README.md](../sdk/README.md) 与 [../plugins/README.md](../plugins/README.md) 的示例。
4. 最后在 [../../CHANGELOG.md](../../CHANGELOG.md) 记录对外影响。

## 最小验收标准

- 每个公共接口都有 schema 定义
- 每个 schema 变化有版本影响说明
- SDK 文档与 API 示例字段一致
- 错误模型可被 TS/Python SDK 直接消费

## 常见问题排查

### 现象 1：版本策略写了，但找不到具体接口定义

- 检查 `developer/api/openapi/` 是否已有对应 schema
- 检查 README 是否仅保留了策略链接而未补规格文件

### 现象 2：SDK 示例字段与接口字段不一致

- 检查 OpenAPI 是否为最新版本
- 检查 SDK 文档是否遗漏同步更新

### 现象 3：breaking change 未在发布中声明

- 检查 CHANGELOG 和 API Compatibility 文档
- 检查 MAJOR 版本是否已提升

## 关联文档

- [../../API_COMPATIBILITY_AND_VERSIONING.md](../../API_COMPATIBILITY_AND_VERSIONING.md)
- [../sdk/README.md](../sdk/README.md)
- [../plugins/README.md](../plugins/README.md)
- [../../CHANGELOG.md](../../CHANGELOG.md)
