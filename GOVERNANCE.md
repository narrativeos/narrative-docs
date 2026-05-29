# Governance

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the governance model, decision process, and role responsibilities for narrative-docs as the source-of-truth documentation hub of NarrativeOS.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: GOVERNANCE
path: GOVERNANCE.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, contributor, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 治理目标

narrative-docs 是 NarrativeOS 的文档权威源（SSOT）。治理目标是确保：

- 文档事实可追溯
- 决策过程可审计
- 变更节奏可预测
- 社区协作可持续

## 治理范围

本治理文档覆盖 narrative-docs 仓库中的：

- 架构文档与 ADR
- 产品文档与路线图
- 开发者与用户文档
- AI 上下文规则
- 白皮书映射与就绪度文档

## 角色与职责

### 1. Maintainers

- 维护文档结构、目录边界与发布节奏
- 对关键变更进行最终审阅与合并决策
- 处理冲突升级、安全事件与行为准则举报

### 2. Reviewers

- 评审事实准确性、术语一致性与链接完整性
- 对跨章节冲突提出修正意见
- 对重要变更要求补充 ADR 或证据引用

### 3. Contributors

- 提交文档修订、补充示例与纠错内容
- 遵循仓库规范、提交模板与行为准则
- 对新增规范提供可验证来源

## 决策机制

### 决策分级

- 普通变更：文案修正、链接修复、格式统一
- 重要变更：模块职责调整、术语定义调整、流程规则调整
- 关键变更：架构边界变化、治理规则变化、发布策略变化

### 决策流程

- 普通变更：1 名 Reviewer 审阅即可
- 重要变更：至少 2 名 Reviewer 审阅
- 关键变更：Maintainer 批准 + 必要时新增/更新 ADR

## ADR 与治理联动

若变更涉及架构约束、跨运行时边界或长期演进策略，必须同步更新：

- adr/README.md
- 对应 ADR 条目

治理规则：无 ADR 依据的关键架构调整，不应合并。

## 变更管理与发布

- 使用 Pull Request 作为唯一变更入口
- 保持单一主题 PR，避免混合多个无关改动
- 合并前应确认链接、结构与术语一致性

## 透明度要求

- 所有治理规则变更必须记录在本文件
- 关键决策需在 PR 描述中给出动机与影响
- 对外白皮书映射变更应同步更新 whitepaper 目录

## 升级与仲裁

当出现长期争议或阻塞：

- 第一步：在 PR 讨论中收敛争议点
- 第二步：Maintainers 组织结论性评审
- 第三步：必要时通过 ADR 固化裁决

## 关联文档 | Related Docs

- README.md
- adr/README.md
- developer/README.md
- whitepaper/README.md
- CODE_OF_CONDUCT.md
- SECURITY.md
