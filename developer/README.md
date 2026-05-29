# Developer Guide

## 摘要（中文） | Summary (ZH)

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN) | 英文摘要

This document is the developer entry for environment setup, workspace operations, coding rules, and extension tracks.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-README
path: developer/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页用于统一开发与协作基线，目标是降低多仓库维护摩擦。

## 阅读路径（建议） | Recommended Path

- 第一步：按 [setup](setup/README.md) 与 [workspace](workspace/README.md) 建立环境
- 第二步：按 [api](api/README.md) 和 [coding](coding/README.md) 对齐交付规范
- 第三步：按需进入 plugins 与 sdk 专题

## 子文档索引 | Subdocument Index

- [setup](setup/README.md): 开发工具与依赖
- [workspace](workspace/README.md): 多仓库工作区组织
- [api](api/README.md): API 规格入口与 OpenAPI 维护约定
- [operations](operations/README.md): 安装验证、回滚与故障处置 Runbook
- [workspace/ai-native-bootstrap-checklist.md](workspace/ai-native-bootstrap-checklist.md): AI-Native 仓库初始化检查清单
- [coding](coding/README.md): 编码规范与质量门禁
- [plugins](plugins/README.md): 插件开发约束
- [sdk](sdk/README.md): SDK 设计与发布注意事项

## 协作规则 | Collaboration Rules

- 开发规范以本层文档为主，冲突处以 [docs-governance-standard.md](coding/docs-governance-standard.md) 为准
- 关键流程变更要同步到 [TROUBLESHOOTING.md](../TROUBLESHOOTING.md) 与相关 Runbook

## 标准参考 | Standards Reference

- [Documentation Governance Standard](coding/docs-governance-standard.md)
- [Benchmark and Acceptance Metrics](../whitepaper/benchmark-and-acceptance-metrics.md)
- [Readiness Checklist](../whitepaper/readiness-checklist.md)
