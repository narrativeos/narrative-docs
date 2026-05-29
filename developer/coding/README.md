# Coding Rules

## EN Summary

This document describes Coding Rules in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: developer-coding-README
path: developer/coding/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

EN: This document defines coding and delivery guardrails for AI-first, multi-repo development.

## AI-First Engineering 分工

EN: Responsibility split.

- 人: 架构、产品边界、规范
- AI: 实现、重构、测试、文档维护
- CI: 编译、lint、测试、契约验证

## 质量守门

EN: Quality gates.

- Rust: cargo fmt / clippy / test
- TS: eslint / typecheck / vitest
- Python: ruff / pytest

## 变更要求

EN: Change requirements.

- 变更必须更新相关文档
- 架构与存储关键变更需更新 ADR

## 机读检查清单 | Machine-readable Checklist

- CHECK-01: Runtime boundary respected
- CHECK-02: Contract/schema change documented
- CHECK-03: Tests added or updated
- CHECK-04: CI pipeline passes
- CHECK-05: Related docs/ADR updated
