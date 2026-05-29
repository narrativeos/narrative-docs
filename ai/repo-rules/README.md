# Repo Rules for AI

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines repository-level AI rules to keep implementations consistent with runtime boundaries and contracts.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: ai-repo-rules-README
path: ai/repo-rules/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

定义跨仓 AI 执行规则真源，降低实现偏移与架构漂移。

## 阅读路径（建议） | Recommended Path

- 第一步：先理解 RULE-01..RULE-09 的约束边界
- 第二步：确认规则真源位置与引用方式
- 第三步：在 PR 与 CI 中落实规则影响评估

## 标准参考 | Standards Reference

- [../../.github/copilot-instructions.md](../../.github/copilot-instructions.md)
- [../../developer/coding/docs-governance-standard.md](../../developer/coding/docs-governance-standard.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)

建议维护统一 copilot-instructions 规则，核心包括：

EN: Keep one shared rule set for Copilot across repositories.

- RULE-01: Runtime isolation mandatory
- RULE-02: No cross-runtime import
- RULE-03: DuckDB is canonical storage
- RULE-04: IPC over shared dependency
- RULE-05: Plugin API contract only
- RULE-06: Cloud optional
- RULE-07: Prefer Rust workspace crates
- RULE-08: Prefer typed interfaces
- RULE-09: Documentation required

这些规则用于稳定 AI 输出质量与一致性。

EN: These rules improve consistency and reduce architecture drift.

## 执行建议 | Enforcement

- 以 `.github/copilot-instructions.md` 作为 RULE-01..RULE-09 的唯一真源
- 在其他文档中引用该真源，不复制分叉版本
- 在 PR 模板中增加“规则影响评估”字段
- 在 CI 中增加 lint/test/contract 失败即阻断合并
