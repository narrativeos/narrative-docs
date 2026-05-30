# Architecture Context for AI

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document provides architecture context optimized for AI agents to reduce cross-repository reasoning drift.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: ai-architecture-context-README
path: ai/architecture-context/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

提供面向 AI Agent 的跨仓架构摘要，保证任务理解和执行上下文一致。

## 阅读路径（建议） | Recommended Path

- 第一步：先读“必含信息”确认上下文覆盖范围
- 第二步：按“更新机制”维护与 ADR 同步
- 第三步：通过机读入口校验上下文资产可访问性

## 标准参考 | Standards Reference

- [../../developer/coding/core-docs-mapping.md](../../developer/coding/core-docs-mapping.md)
- [../../developer/coding/readiness-checklist.md](../../developer/coding/readiness-checklist.md)
- [../../developer/coding/docs-governance-standard.md](../../developer/coding/docs-governance-standard.md)

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
