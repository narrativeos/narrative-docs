# Documentation Governance Standard v1.0

## 摘要（中文） | Summary (ZH)

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN) | 英文摘要

This document defines the quality model, process gates, severity levels, and operating cadence for documentation governance in narrative-docs.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-docs-governance-standard
path: developer/coding/docs-governance-standard.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, reviewer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 治理目标与范围

治理目标：让 narrative-docs 达到可发现、可上手、可贡献、可审计、可机读。

治理范围包括：

- 顶层入口与导航
- 架构文档与 ADR
- 开发者与用户文档
- AI 上下文与 Prompt 规范
- 治理、安全与白皮书相关文档

## 质量模型（100 分）

- IA 信息架构与可发现性：15
- UX 任务可完成性：20
- ACC 准确性与一致性：20
- GOV 治理与协作成熟度：15
- OPS 可运维与版本演进：15
- L10N 双语与术语质量：10
- MR 机读与自动化友好：5

## 评级阈值

- A（90-100）：可对标年度热门开源项目
- B（80-89）：可稳定对外发布
- C（70-79）：结构可用但执行深度不足
- D（<70）：不建议作为对外主入口

## 文档质量门禁（Doc Quality Gates）

### Gate-1 结构完整

必须包含：目标、适用对象、前置条件、步骤、故障排查、交叉链接。

### Gate-2 可执行性

至少提供 1 条可复现任务路径，并明确输入、输出、验收标准。

### Gate-3 一致性

术语、规则编号、契约描述与跨文档表述必须一致。

### Gate-4 机读性

元数据可解析、模板无占位残留、索引可追踪。

### Gate-5 生命周期

每个关键文档应标注责任角色、最近更新时间、下次复审时间。

## 严重级别与 SLA

- P0：影响治理可信度、机读稳定性或发布声明准确性
  - 24h 内确认，72h 内提交修复，7 天内关闭
- P1：影响上手效率、执行质量或贡献体验
  - 3 天内确认，14 天内关闭
- P2：影响表达质量、维护效率或长期可演进性
  - 7 天内确认，30 天内关闭

## 角色与职责（RACI）

- Maintainer（A）：标准审批、冲突仲裁、发布准入
- Reviewer（R）：事实核验、链接校验、质量评分
- Contributor（R）：内容修订、示例补全、验证记录
- Automation（C）：PR/Issue/Pages 等自动门禁
- Product/Tech Lead（I）：优先级与里程碑同步

## 运行节奏

- 每周：文档健康检查（新增/关闭/超期项）
- 每月：质量评分回归（A/B/C/D）
- 每次重大发布：白皮书映射与就绪度同步更新

## 自动化门禁（最小集）

- `.github/workflows/docs-quality-check.yml`：检查模板残留与 Markdown 死链
- PR 模板校验与 Issue 模板校验继续作为治理入口门禁

## 完成定义（Definition of Done）

- 对应 PR 已合并且有 reviewer 记录
- 相关 Gate 全通过
- 关键链接可达，示例可复现
- 状态已同步到治理清单与白皮书就绪度文档

## 关联文档 | Related Docs

- [docs-governance-backlog.md](docs-governance-backlog.md)
- [docs-governance-release-report-2026-05.md](docs-governance-release-report-2026-05.md)
- [docs-governance-monthly-check-template.md](docs-governance-monthly-check-template.md)
- [../../CONTRIBUTING.md](../../CONTRIBUTING.md)
- [../../TROUBLESHOOTING.md](../../TROUBLESHOOTING.md)
- [../../GOVERNANCE.md](../../GOVERNANCE.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)
- [../../ai/repo-rules/README.md](../../ai/repo-rules/README.md)
- [../../.github/copilot-instructions.md](../../.github/copilot-instructions.md)
