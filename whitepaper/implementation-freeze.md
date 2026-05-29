# NarrativeOS 实现冻结清单

## 摘要（中文） | Summary (ZH)

本页明确 NarrativeOS 首期开工前已经成立的结论、仍需补证据的问题，以及不应纳入首期的内容。

## Executive Summary (EN) | 英文摘要

This document defines the implementation freeze list for NarrativeOS so that teams can distinguish what is ready to build, what needs evidence, and what must stay out of the first release scope.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-implementation-freeze
path: whitepaper/implementation-freeze.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, architect, developer, product, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft-foundation
owner: maintainer
reviewer: maintainer
last_reviewed: 2026-05-29
next_review: 2026-06-12
```

## 使用方式

本页是开工门槛，不是路线图。

只有被列入“可开工”的内容，才允许进入后续代码仓实现讨论。

## 1. 可开工

- 文档 SSOT 与治理体系
- 核心定位、边界与术语
- 章节映射、就绪度与验收框架
- 最小可复核的产品与架构论证

## 2. 冻结决策表

| 项目 | 当前状态 | 决策 | 原因 | 进入条件 | 批准人 | 变更条件 |
| --- | --- | --- | --- | --- | --- | --- |
| 文档 SSOT 与治理体系 | 已就位 | 可开工 | 已形成统一入口与治理门禁 | 继续维护一致性 | Maintainer | 重大治理变更需复审 |
| 定位、边界与术语 | 已冻结为主 | 可开工 | 方向已明确 | 后续仅做细化，不重定义 | Maintainer + Product | 仅在总纲升级时调整 |
| 竞品量化对比 | 结构已具备 | 需补证据 | 缺少实测和案例 | 完成对照表与假设验证 | Product | 证据来源更新可触发重评 |
| 架构可行性 | 首轮完成 | 可开工 | 关键约束已识别 | 补充验证记录 | Architect | ADR 更新或冲突时重评 |
| 市场接受度 | 初步完成 | 需补证据 | 仍缺用户反馈与试点 | 补访谈/试用数据 | Product | 用户反馈达到阈值后可升级 |
| 复杂云协同 | 未冻结 | 不纳入首期 | 容易引入不必要复杂度 | 后续版本再评估 | Architect | 仅在 V2/V3 规划时重审 |

## 2.1 已批准的开工门槛

- 文档 SSOT 与治理体系：批准
- 定位、边界与术语：批准
- 架构可行性：批准
- 市场接受度：暂准，需继续补证据
- 复杂云协同：不批准进入首期

## 3. 需补证据后再开工

- 竞品量化对比
- 端到端最小闭环的时间与成功率
- 关键工作流的证据链可解释性
- 多运行时协作与数据语义统一的验证
- 市场接受度的用户访谈或试用反馈

## 4. 不纳入首期

- 复杂云协同作为默认前置能力
- 未验证的模型能力作为核心承诺
- 过早拆分过多产品面
- 无证据链的对外能力宣称

## 5. 冻结原则

- 先证据，后承诺
- 先边界，后扩张
- 先 Schema，后插件
- 先治理，后实现

## 6. 首期开工判定

若以下条件均满足，则可进入首期实现准备：

- 定位与边界已冻结
- 竞品与替代方案已有结构化框架
- 架构可行性完成首轮审慎检查
- 市场接受度有明确目标用户和采用假设
- 冻结清单已明确可开工范围

## 7. 相关治理

- [Documentation Governance Standard](../developer/coding/docs-governance-standard.md)
- [Readiness Checklist](readiness-checklist.md)

## 8. 评审要求

- 冻结决策表中的每一项状态变化都需要留下记录
- 首期开工前必须确认批准人与变更条件已明确

## 9. 变更记录模板

```yaml
change_id: FRZ-XXX
change_type: approval | evidence_update | scope_change | adr_update
date: YYYY-MM-DD
summary: 变更摘要
changed_by: maintainer-or-owner
approved_by: maintainer-or-owner
linked_decision: one-line decision
```

## 10. 已验证样本

| 证据 ID | 来源 | 结论摘要 | 关联判断 |
| --- | --- | --- | --- |
| FRZ-001 | implementation-freeze.md | NarrativeOS 首期仅允许进入诊断、证据链、schema 对齐与治理可追责范围，复杂云协同和未验证能力不纳入首期承诺 | 首期开工范围已冻结 |

## 11. 评审结论

NarrativeOS 的首期开工条件已经明确，当前冻结结论是可推进，但只能在已批准范围内推进。

换句话说，项目可以开始做 V1 的单文诊断闭环与证据链能力，但不应把复杂云协同、过早平台扩域或未经验证的能力纳入首期承诺。
