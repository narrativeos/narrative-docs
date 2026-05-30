# Contributing to Narrative Knowledge Hub

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the standard contribution workflow, review expectations, and quality gates for narrative-docs contributors.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: CONTRIBUTING
path: contributing.md
lang_primary: zh-CN
lang_secondary: en
audience: [contributor, reviewer, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 贡献目标

- 保持 narrative-docs 作为单一事实源（SSOT）
- 让每次修改可复现、可审阅、可追溯
- 防止术语、规则与架构边界漂移

## 开始前必读

- [README.md](README.md)
- [academic/README.md](academic/README.md)
- [developer/coding/docs-governance-standard.md](developer/coding/docs-governance-standard.md)
- [developer/coding/docs-governance-backlog.md](developer/coding/docs-governance-backlog.md)
- [ai/repo-rules/README.md](ai/repo-rules/README.md)
- [.github/copilot-instructions.md](.github/copilot-instructions.md)

## 标准贡献流程

1. 在治理清单中选择一个条目或创建新条目。
2. 明确变更范围，只做单主题修改。
3. 按文档门禁补齐目标、步骤、验收、排障。
4. 自检链接可达、术语一致、规则引用正确。
5. 使用 PR 模板提交并填写 Rule Impact、AI Review、CI Gate。

## 学术贡献入口

- 方法与边界补充：见 [academic/trust-methodology.md](academic/trust-methodology.md)
- 复现包规范：见 [academic/reproducibility-kit.md](academic/reproducibility-kit.md)
- 工作流案例贡献：见 [academic/research-workflows.md](academic/research-workflows.md)
- 研究者反馈路径：见 [academic/community-and-open-science.md](academic/community-and-open-science.md)

## 变更要求 | Change Requirements

- 关键变更必须同步更新相关索引与交叉链接
- 规则相关变更以 [.github/copilot-instructions.md](.github/copilot-instructions.md) 为真源
- 涉及架构边界或长期策略时，需补充或更新 ADR

## PR 评审重点

- 事实正确性与证据完整性
- 术语一致性与跨文档冲突
- 示例是否可复现
- 变更是否符合门禁与治理标准

## Definition of Done

- 至少 1 名 reviewer 审阅通过
- 对应质量门禁通过
- 相关链接与索引更新完成
- 若关联治理条目，状态同步更新

## 行为与安全

- 社区行为规范见 [code-of-conduct.md](code-of-conduct.md)
- 安全披露流程见 [security.md](security.md)
