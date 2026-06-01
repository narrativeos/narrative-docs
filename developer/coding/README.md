# Coding Rules

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines coding and delivery guardrails for AI-first, multi-repo NarrativeOS development.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-README
path: developer/coding/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

定义 AI-first 多仓协作中的编码、评审、CI 三层守门规则。

## 阅读路径（建议） | Recommended Path

- 第一步：阅读“三层交付模型”理解责任边界
- 第二步：按“质量守门”执行语言栈检查
- 第三步：结合文档治理标准完成交付自检

## 标准参考 | Standards Reference

- [docs-governance-standard.md](docs-governance-standard.md)
- [docs-terminology-note-template.md](docs-terminology-note-template.md)
- [terminology-hierarchy-core-implementation-breakdown.md](terminology-hierarchy-core-implementation-breakdown.md)
- [terminology-hierarchy-implementation-issue-pack.md](terminology-hierarchy-implementation-issue-pack.md)
- [local-cloud-function-alignment-sprint-pack.md](local-cloud-function-alignment-sprint-pack.md)
- [developer-docs-execution-sprint-plan.md](developer-docs-execution-sprint-plan.md)
- [temporal-knowledge-sprint-execution.md](temporal-knowledge-sprint-execution.md)
- [temporal-knowledge-core-task-pack.md](temporal-knowledge-core-task-pack.md)
- [temporal-knowledge-api-task-pack.md](temporal-knowledge-api-task-pack.md)
- [temporal-knowledge-studio-task-pack.md](temporal-knowledge-studio-task-pack.md)
- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [../../developer/coding/readiness-checklist.md](../../developer/coding/readiness-checklist.md)
- [storage-optimization-rollout-checklist.md](storage-optimization-rollout-checklist.md)

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

## 变更要求 | Change Requirements

EN: Change requirements.

- 变更必须更新相关文档
- 架构与存储关键变更需更新 ADR
- 若文档出现 user/auth/tenant 术语，需明确是否为外部环境能力；本项目不内建用户系统
- 关键架构变更必须绑定 SLO/SLI 影响说明、error budget 评估与回滚方案
- 发布前必须有 runbook、容量评估与故障演练记录，否则视为阻断项

## 机读检查清单 | Machine-readable Checklist

- CHECK-01: Runtime boundary respected
- CHECK-02: Contract/schema change documented
- CHECK-03: Tests added or updated
- CHECK-04: CI pipeline passes
- CHECK-05: Related docs/ADR updated
- CHECK-06: AI review completed (duplication/boundary/complexity/protocol)
- CHECK-07: CI contract validation passed
- CHECK-08: SLO/SLI and error-budget impact assessed
- CHECK-09: Runbook and failure drill evidence attached

## 文档治理 | Documentation Governance

- 标准: [docs-governance-standard.md](docs-governance-standard.md)
- 待治理清单: [docs-governance-backlog.md](docs-governance-backlog.md)
