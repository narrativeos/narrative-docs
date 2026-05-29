# Data Classification and Retention Policy

## EN Summary

This document defines data classes, retention windows, deletion rules, and minimum handling requirements for NarrativeOS documentation and related operational records.

## Machine-readable Metadata

```yaml
doc_id: DATA_CLASSIFICATION_AND_RETENTION
path: DATA_CLASSIFICATION_AND_RETENTION.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, contributor, security-researcher, compliance]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标

本策略用于统一 NarrativeOS 文档体系中的数据分级、保存时长和删除规则，降低泄露风险与合规不确定性。

## 适用范围

本策略适用于 narrative-docs 仓库及其协作过程中产生的相关数据记录，包括：

- 文档正文与元数据
- Issue/PR 评论与评审记录
- 安全事件处理记录
- 自动化流程生成的日志与报告（文档相关）

## 数据分级

### L1 Public（公开）

定义：可公开发布且不会产生安全或隐私风险的信息。

示例：

- 对外文档正文
- 架构与产品公开说明
- 已发布白皮书内容

处理要求：可长期保留，允许公开复制与分发。

### L2 Internal（内部）

定义：面向项目协作内部使用，不直接对外公开的信息。

示例：

- 评审讨论草稿
- 里程碑准备材料
- 尚未发布的规划说明

处理要求：仅限协作成员访问，不应外部公开。

### L3 Sensitive（敏感）

定义：泄露后可能造成安全、隐私或运营风险的信息。

示例：

- 安全漏洞细节与复现路径
- 含有潜在敏感上下文的事件记录
- 未脱敏的系统日志片段

处理要求：最小权限访问、限定留存、按流程销毁。

### L4 Restricted（受限）

定义：高风险内容，仅可由维护者与指定处理人访问。

示例：

- 未修复漏洞的可利用细节
- 举报人身份信息
- 法务或合规调查材料

处理要求：严格访问控制、加密存储、最短保留周期。

## 保留周期

| 数据类型 | 分级 | 建议保留周期 | 到期处理 |
| --- | --- | --- | --- |
| 已发布文档与白皮书 | L1 | 长期保留 | 按版本归档 |
| PR 评审与讨论记录 | L2 | 24 个月 | 到期归档或脱敏 |
| 安全事件工单与修复记录 | L3 | 36 个月 | 到期脱敏归档 |
| 未披露漏洞细节 | L4 | 修复后 12 个月 | 到期删除或仅保留脱敏摘要 |
| 自动化日志（文档流程） | L2/L3 | 90-180 天 | 到期清理 |

## 删除与例外规则

- 到期数据默认进入清理流程，优先删除高敏内容
- 法规、审计或争议处理要求保留时，可触发例外保留
- 例外保留必须记录：原因、负责人、截止日期

## 访问控制原则

- 最小权限：仅对履责所需人员开放访问
- 按需授权：临时授权应有过期时间
- 可审计：关键访问操作应可追踪

## 脱敏规则

在共享事件记录或对外沟通时，应脱敏以下信息：

- 个人身份信息
- 联系方式
- 令牌、密钥、内部地址
- 可直接复现高危漏洞的细节

## 角色职责

- Maintainers：制定与更新分级标准，审批例外保留
- Contributors：提交前识别数据分级并避免泄露敏感内容
- Security Response Owner：处理 L3/L4 数据与事件追踪

## 执行与审查

- 每半年审查一次保留策略是否仍适配
- 发生安全事件后应复盘并更新本策略
- 与 [SECURITY.md](SECURITY.md) 联动维护

## 关联文档

- SECURITY.md
- GOVERNANCE.md
- CODE_OF_CONDUCT.md
- whitepaper/readiness-checklist.md
