# AI Context Layer

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document explains how the AI context layer provides stable rules, prompts, and architecture memory for coding agents.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: ai-README
path: ai/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本层是 NarrativeOS 的 AI 记忆层，目标是让 Copilot/Agent 获得稳定上下文。

## 阅读路径（建议） | Recommended Path

- 第一步：先读 architecture-context 理解系统边界
- 第二步：读 repo-rules 对齐执行规则
- 第三步：按 copilot 与 prompts 落实到任务模板

## 子文档索引 | Subdocument Index

- [copilot](copilot/README.md): Copilot 使用策略与边界
- [prompts](prompts/README.md): 任务模板与提示词规范
- [repo-rules](repo-rules/README.md): 跨仓统一工程规则
- [architecture-context](architecture-context/README.md): 面向 AI 的架构摘要

## 使用规则 | Usage Rules

- AI 规则冲突以仓库根规则与治理标准为准
- Prompt 模板变更需同步验证可执行性和审计可追溯性

## 标准参考 | Standards Reference

- [Documentation Governance Standard](../developer/coding/docs-governance-standard.md)
- [Core Docs Mapping](../developer/coding/core-docs-mapping.md)
- [Readiness Checklist](../developer/coding/readiness-checklist.md)
