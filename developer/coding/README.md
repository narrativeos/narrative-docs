<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Coding Rules

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines coding and delivery guardrails for AI-first, multi-repo NarrativeOS development.

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

## 三层交付模型 | Three-layer Delivery Model

- Layer A (Copilot): 负责代码生成与重构。
- Layer B (AI Review): 负责重复代码、边界违规、复杂度、协议风险检查。
- Layer C (CI): 负责 compile、lint、test、contract 自动化验证。
- Human Approval: 最终人工批准合并与发布。

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
- CHECK-06: AI review completed (duplication/boundary/complexity/protocol)
- CHECK-07: CI contract validation passed

## 文档治理 | Documentation Governance

- 标准: [docs-governance-standard.md](docs-governance-standard.md)
- 待治理清单: [docs-governance-backlog.md](docs-governance-backlog.md)
