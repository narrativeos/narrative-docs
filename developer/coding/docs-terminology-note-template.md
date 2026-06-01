# Docs Terminology Note Template

## 摘要（中文）

本模板用于在文档中统一术语解释，避免“文件命名沿用旧词、正文语义已升级”时出现对外误读。

## Executive Summary (EN)

This template standardizes terminology-note blocks to prevent wording drift between legacy file names and current product positioning.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-docs-terminology-note-template
path: developer/coding/docs-terminology-note-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, maintainer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: template
```

## 适用场景 | When To Use

- 文件名、字段名或历史协议仍保留 legacy term。
- 产品叙事已切换到新术语，需要显式说明语义映射。
- 对外页面存在“可能被理解为替代、全面领先、黑箱能力”的风险。

## 标准模板块 | Standard Block

将以下块插入到 Executive Summary 之后、Metadata 之前：

```md
## 术语说明 | Terminology Note

本页沿用 <legacy_term> 命名以保持兼容，但语义统一解释为 <current_term>。

- 用途：<what_it_is_for>
- 非用途：<what_it_is_not_for>
- 边界语句：<boundary_statement>
```

## 推荐语句库 | Recommended Phrases

- 兼容语句：本页沿用历史命名以保持流程兼容。
- 语义语句：语义上统一解释为 competitive validation（竞争力验证）。
- 边界语句：complement, not replace。
- 风险语句：不用于支持“全面替代第三方产品”叙事。

## 禁用语句 | Avoid

- 全面替代所有同类工具
- 在所有场景均显著领先
- 不需要复核即可直接采纳

## 示例 1：Benchmark -> Competitive Validation

```md
## 术语说明 | Terminology Note

本页沿用 Benchmark 命名以保持流程兼容，但语义统一解释为 competitive validation（竞争力验证）。

- 用途：验证补充增强价值
- 非用途：支持替代第三方校对产品叙事
- 边界语句：complement, not replace
```

## 示例 2：Pilot -> Controlled Trial Intake

```md
## 术语说明 | Terminology Note

本页沿用 Pilot 命名以保持历史链接稳定，但语义统一解释为 controlled trial intake（受控试点准入）。

- 用途：锁定授权边界与输入范围
- 非用途：直接承载结果结论
- 边界语句：intake first, claim later
```

## 变更检查清单 | Change Checklist

- [ ] 术语说明块已插入到规定位置
- [ ] 用途与非用途同时给出
- [ ] 边界语句明确且可外部引用
- [ ] 未修改历史文件路径与关键 schema 字段
- [ ] 关联入口（README / doc-index / _config）已同步

## 关联文档 | Related Docs

- docs-governance-standard.md
- docs-governance-backlog.md
- ../README.md
- ../../whitepaper/workflow-to-whitepaper-mapping-guide.md
