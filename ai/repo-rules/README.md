# Repo Rules for AI

## EN Summary

This document describes Repo Rules for AI in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: ai-repo-rules-README
path: ai/repo-rules/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [ai-agent, developer]
agent_ready: true
source_of_truth: narrative-docs
```

建议维护统一 copilot-instructions 规则，核心包括：

EN: Keep one shared rule set for Copilot across repositories.

- RULE-01: Runtime isolation mandatory
- RULE-02: No cross-runtime import
- RULE-03: DuckDB is canonical storage
- RULE-04: IPC over shared dependency
- RULE-05: Plugin API contract only
- RULE-06: Prefer typed interfaces
- RULE-07: Documentation required

这些规则用于稳定 AI 输出质量与一致性。

EN: These rules improve consistency and reduce architecture drift.

## 执行建议 | Enforcement

- 在各仓库 `.github/copilot-instructions.md` 复用 RULE-01..RULE-07
- 在 PR 模板中增加“规则影响评估”字段
- 在 CI 中增加 lint/test/contract 失败即阻断合并
