# NarrativeOS 证据附录（Evidence Registry）

## Executive Summary (EN)

This document is the central evidence index for NarrativeOS. It records what evidence already exists, what evidence is still missing, and which conclusions remain provisional until stronger sources are added.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-evidence-registry
path: whitepaper/evidence-registry.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, product, architect, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft-foundation
owner: maintainer
reviewer: maintainer
last_reviewed: 2026-05-29
next_review: 2026-06-12
```

## 当前判断

本页可以支撑 NarrativeOS 已经具备“论证框架、架构边界与冻结约束”的说法。

本页还不能单独支撑以下更强的说法：

- 市场已经被验证
- 关键能力已经完成实测证明
- 首期产品已经具备广泛发布条件

原因很直接：当前正式证据中，仍有相当一部分来自文档、结构判断或公开观察，而不是访谈、试点、可重复实验或稳定实测。

## 使用方式

本页不是证据结论页，而是评审附录中的证据索引页。

每条证据都应能回链到：

- 对应的论证页
- 对应的原始文档、试用记录、访谈纪要或 PR
- 对应的决策或状态变更

它的职责是告诉读者：证据在哪里、强度如何、还缺什么。

## 0. 附录使用说明

> 说明：以下内容主要用于内部更新与回填；对外阅读时可优先查看证据目录与交叉链接。

1. 先打开 [项目论证与预演框架](project-foundation.md)，确认当前要验证的主题。
2. 再看 [待采集证据计划](#7-待采集证据计划)，选择优先级最高的 task。
3. 按对应作业单模板填写采集信息。
4. 采集完成后，回填到本页的证据目录与台账条目。
5. 若产出真实证据，则同步更新关联文档的结论状态。

## 0.1 证据成熟度说明

- documented：已有可回链条目，但证据强度未必足以支持强外部宣称
- provisional：已有初步证据，但仍需补访谈、试点或实测
- verified：已有足够强度的证据，可支持对应结论进入更稳健的对外表达

当前大多数条目更接近 documented，而不是 verified。

## 1. 证据目录

| 证据 ID | 证据类型 | 支撑文档 | 关联决策 | 状态 | 备注 |
| --- | --- | --- | --- | --- | --- |
| COMP-001 | product_review | [competitor-matrix.md](competitor-matrix.md) | 竞品边界判断 | documented | Source: https://languagetool.org/; AI-based grammar checker, style suggestions, paraphrasing, and broad writing-app integrations |
| ARCH-001 | design_review | [architecture-feasibility.md](architecture-feasibility.md) | 架构首期可行性 | documented | Source: architecture/system/README.md + ADR-001 + ADR-002; runtime isolation and DuckDB baseline are treated as the first-phase architectural constraints |
| ARCH-002 | design_review | [architecture-feasibility.md](architecture-feasibility.md) | 平台闭环与分层可行性 | documented | Source: architecture/platform/README.md + architecture/analysis-engine/README.md; platform closed loop and modular six-engine analysis support a staged rollout rather than a single monolithic analyzer |
| ARCH-003 | design_review | [architecture-feasibility.md](architecture-feasibility.md) | 可视化工作台可行性 | documented | Source: architecture/visual-os/README.md; Visual OS is diagnostic-first and evidence-linked, so the first release should prioritize explainable cockpit views rather than static charts |
| MKT-001 | observation | [market-acceptance.md](market-acceptance.md) | 用户接受度判断 | documented | Public market signals from LanguageTool and ProWritingAid homepages show the direct market focuses on grammar/style correction, paraphrasing, integrations, and writing-app fit |
| FRZ-001 | approval | [implementation-freeze.md](implementation-freeze.md) | 开工冻结状态 | documented | Source: implementation-freeze.md; the first release is limited to diagnostic, evidence-linked, schema-aligned work and excludes complex cloud collaboration |
| ROAD-002 | governance_basis | [product/roadmap/README.md](../product/roadmap/README.md), [product/workflows/README.md](../product/workflows/README.md) | 路线图与验收联动 | documented | Source: product roadmap and workflows; V1 author/editor closed loop, V2 corpus analysis, and V3 institutional evaluation align the roadmap with staged evidence-driven delivery |

## 1.1 证据覆盖摘要

从当前覆盖情况看：

- 架构边界类证据相对最完整
- 竞品与市场类证据已有基础，但仍偏轻量
- 用户访谈、试点记录与 measured benchmark 仍是主要缺口

因此，当前最稳妥的结论是“架构与边界较清楚，市场与成效仍待继续验证”。

## 2. 初始证据种子（仅文档来源，不计入正式台账）

| 证据 ID | 证据类型 | 支撑文档 | 关联决策 | 状态 | 备注 |
| --- | --- | --- | --- | --- | --- |
| DOC-COMP-001 | doc_basis | [README.md](../README.md), [product/vision/README.md](../product/vision/README.md) | NarrativeOS 以诊断与可视化为核心，而非生成优先 | documented | 当前仅为文档基线 |
| DOC-ARCH-001 | doc_basis | [architecture/system/README.md](../architecture/system/README.md), [adr/ADR-001-runtime.md](../adr/ADR-001-runtime.md), [adr/ADR-002-storage.md](../adr/ADR-002-storage.md) | 运行时隔离与 DuckDB 基线作为首期架构约束 | documented | 当前仅为文档基线 |
| DOC-MKT-001 | doc_basis | [README.md](../README.md), [product/workflows/README.md](../product/workflows/README.md) | 目标用户已拆分为作者/编辑、研究者、机构用户 | documented | 当前仅为文档基线 |
| DOC-FRZ-001 | doc_basis | [implementation-freeze.md](implementation-freeze.md), [readiness-checklist.md](readiness-checklist.md) | 开工门槛与补证据范围已冻结 | documented | 当前仅为文档基线 |
| DOC-GOV-001 | doc_basis | [governance-overview.md](../governance-overview.md), [developer/coding/docs-governance-standard.md](../developer/coding/docs-governance-standard.md) | 文档治理与发布门禁机制已建立 | documented | 当前仅为文档基线 |
| DOC-ROAD-001 | doc_basis | [product/roadmap/README.md](../product/roadmap/README.md), [product/workflows/README.md](../product/workflows/README.md) | V1-V3 路线图已定义，且与工作流节奏对齐 | documented | 当前仅为文档基线 |
| DOC-WHT-001 | doc_basis | [README.md](../README.md), [whitepaper/README.md](README.md) | 白皮书入口与论证框架已形成统一主入口 | documented | 当前仅为文档基线 |

## 3. 证据层级说明

- `doc_basis`：来源于现有权威文档，只能说明项目已经具备明确叙事或约束基线
- `product_review`：来源于竞品评审、功能对照或用户试用
- `design_review`：来源于架构评审、原型审查或 ADR 触发
- `interview`：来源于用户访谈或试点反馈
- `approval`：来源于冻结、批准或变更确认
- `governance_basis`：来源于治理标准、质量门禁或发布流程定义

正式台账只包含 `## 1. 证据目录` 中的正式证据条目。

## 3.1 当前缺口

如果要让白皮书从“论证成立”进一步升级为“可信度显著增强”，最缺的不是更多文档互引，而是以下三类证据：

- 真实用户访谈或试点反馈
- 可复核的任务回放或工作流记录
- 具备样本量、版本和口径的 measured benchmark

## 4. 证据记录模板

```yaml
evidence_id: COMP-001
evidence_type: doc_basis | product_review | user_test | workflow_observation | architecture_analysis | benchmark | design_review | interview | trial | approval
source: docs/path/or/pr
date: YYYY-MM-DD
summary: 证据摘要
linked_document: whitepaper/path
linked_decision: one-line decision
owner: maintainer-or-owner
```

## 5. 录入规则

- 证据条目必须可追溯
- 证据条目不能替代结论，只能支撑结论
- 若结论变化，台账与对应文档必须同步更新
- 若没有原始来源，条目必须保持 `TBD`
- 若来源仅为内部文档，必须明确标记其为基线证据，而不是验证性证据

## 6. 交叉链接

- [项目论证与预演框架](project-foundation.md)
- [竞品与替代方案矩阵](competitor-matrix.md)
- [架构可行性与约束清单](architecture-feasibility.md)
- [市场接受度判断框架](market-acceptance.md)
- [实现冻结清单](implementation-freeze.md)

## 7. 待采集证据计划

| 优先级 | 证据 ID | 目标证据类型 | 采集目标 | 推荐来源 |
| --- | --- | --- | --- | --- |
| P0 | COMP-002 | product_review | 补 1 条直接竞品对照证据 | 产品试用、评测记录、对照表 |
| P0 | MKT-002 | interview | 补 1 轮严肃文字工作者访谈 | 访谈纪要、样稿反馈 |
| P1 | ARCH-003 | design_review | 补 1 条可视化工作台或证据链验证 | 架构评审、原型审查 |
| P1 | FRZ-002 | approval | 补 1 条开工门槛批准或状态更新 | PR、审批记录、发布说明 |
| P2 | ROAD-002 | governance_basis | 补 1 条路线图与验收联动证据 | 路线图评审、里程碑记录 |

## 8. 采集顺序

1. 先补竞品对照，验证 NarrativeOS 的差异化是否成立。
2. 再补用户访谈，验证市场接受度与采用阻力。
3. 接着补架构验证，确认首期实现边界。
4. 最后补冻结批准，确保开工门槛可追责。

这个顺序的目的不是让台账更满，而是优先补最能改变项目可信度的证据。

## 9. 证据采集作业单模板

### 9.1 竞品评审作业单

```yaml
task_id: COMP-TASK-001
task_type: competitor_review
goal: 验证 NarrativeOS 与直接竞品的差异化是否成立
inputs:
	- 产品试用链接
	- 评测笔记
	- 功能对照表
outputs:
	- 1 条可追溯证据
	- 1 个差异化结论
	- 1 个风险判断
owner: product
reviewer: maintainer
```

### 9.2 用户访谈作业单

```yaml
task_id: MKT-TASK-001
task_type: user_interview
goal: 验证严肃文字工作者是否真的愿意为“看清问题”付费
inputs:
	- 访谈对象画像
	- 访谈问题清单
	- 样稿或任务样本
outputs:
	- 1 份访谈纪要
	- 1 份采用阻力判断
	- 1 份价值触发点判断
owner: product
reviewer: maintainer
```

### 9.3 架构评审作业单

```yaml
task_id: ARCH-TASK-003
task_type: architecture_review
goal: 验证可视化工作台是否必须以证据链和诊断优先为前提
inputs:
	- Visual OS 设计说明
	- 架构约束页
	- 原型或页面草图
outputs:
	- 1 条可追溯证据
	- 1 个首期界面判断
	- 1 个证据链要求
owner: architecture
reviewer: maintainer
```

### 9.4 路线图联动作业单

```yaml
task_id: ROAD-TASK-001
task_type: roadmap_governance
goal: 验证 V1-V3 路线图是否与首期诊断闭环和后续分阶段推进一致
inputs:
	- 路线图文档
	- 工作流文档
	- 首期冻结范围
outputs:
	- 1 条可追溯证据
	- 1 个路线图对齐判断
	- 1 个验收联动要求
owner: product
reviewer: maintainer
```

## 10. 记录要求

- 每个作业单必须绑定一个唯一 task_id
- 作业单完成后必须回填到台账对应条目
- 若输出不足 1 条可追溯证据，不得标记为完成
- 若结论发生变化，必须保留前后差异记录

## 11. 采集执行清单

| task_id | 优先级 | 状态 | 负责人 | 目标完成时间 | 结果链接 |
| --- | --- | --- | --- | --- | --- |
| COMP-TASK-001 | P0 | done | product | 2026-06-05 | [COMP-001](#1-证据目录) |
| MKT-TASK-001 | P0 | in_progress | product | 2026-06-05 | [MKT-001](#1-证据目录) |
| ARCH-TASK-001 | P1 | done | architecture | 2026-06-12 | [ARCH-001](#1-证据目录) |
| ARCH-TASK-002 | P1 | done | architecture | 2026-06-12 | [ARCH-002](#1-证据目录) |
| ARCH-TASK-003 | P1 | done | architecture | 2026-06-12 | [ARCH-003](#1-证据目录) |
| FRZ-TASK-001 | P1 | done | maintainer | 2026-06-12 | [FRZ-001](#1-证据目录) |
| ROAD-TASK-001 | P2 | done | product | 2026-06-12 | [ROAD-002](#1-证据目录) |

## 12. 状态流转

`pending` -> `in_progress` -> `done`

若作业单产出不足一条可追溯证据，则不得从 `in_progress` 进入 `done`。

## 13. 最小证据包

每一条可入账证据至少应包含以下内容：

| 字段 | 要求 |
| --- | --- |
| evidence_id | 唯一且可回链 |
| evidence_type | 与证据层级一致 |
| source | 可访问的文档、PR 或记录路径 |
| date | 明确日期 |
| summary | 一句话说明证据内容 |
| linked_document | 回到白皮书或治理文档 |
| linked_decision | 对应的判断或变更 |
| owner | 责任人 |

## 14. 入账判定标准

- 信息完整：字段不能为空或含糊
- 关系明确：必须能找到关联文档与关联决策
- 来源可验证：必须能打开或复查
- 结论可复核：摘要不能只是结论口号
- 状态匹配：证据层级与作业单状态必须一致

## 15. 来源与决策写法

### 15.1 来源写法

- 文档来源：写成可点击路径，如 `whitepaper/competitor-matrix.md`
- PR 来源：写成 PR 标识或路径，如 `PR-123` 或 `docs/path/or/pr`
- 访谈来源：写成纪要路径或录音摘要路径
- 试用来源：写成试用记录路径或测试说明路径

### 15.2 决策写法

- 只写一个可执行判断，不写长段总结。
- 尽量使用“因此/所以/改为/保留/不纳入”这类动词。
- 决策必须能直接对应到一个文档更新或状态变化。

## 16. 入账示例（非正式，不计入台账）

```yaml
evidence_id: COMP-002
evidence_type: product_review
source: whitepaper/evidence-registry.md
date: 2026-06-01
summary: 对照某直接竞品后，确认 NarrativeOS 的差异化核心应聚焦文本诊断与证据链，而不是生成能力。
linked_document: whitepaper/competitor-matrix.md
linked_decision: 首期聚焦诊断与可视化，不把生成作为第一目标
owner: product
example_only: true
```

## 17. 正式入账模板（复制后填写）

```yaml
evidence_id: COMP-002
evidence_type: product_review | design_review | interview | trial | approval | governance_basis
source: docs/path/or/pr
date: YYYY-MM-DD
summary: 一句话说明证据内容
linked_document: whitepaper/path
linked_decision: 对应的判断或变更
owner: maintainer-or-owner
status: documented | verified | accepted
notes: 备注
```

填写要求：

- `evidence_id` 必须与台账中的编号一致
- `source` 必须可访问、可复查
- `summary` 只写事实和结论，不写宣传语
- `status` 需要与证据成熟度匹配
- 只有真实证据才可以移入正式台账目录

## 18. 入账审核流程

1. 先确认证据是否满足最小证据包。
2. 再确认证据类型是否与作业单目标一致。
3. 检查来源是否可访问、可复查。
4. 检查关联文档与关联决策是否写清楚。
5. 审核通过后，更新台账目录与相关子文档。

## 19. 证据质量分级

| 等级 | 含义 | 处理方式 |
| --- | --- | --- |
| A | 来源明确、结论可复核、可直接引用 | 可直接入账 |
| B | 来源明确，但仍需补充旁证或复核 | 先入候选，再补强 |
| C | 仅有草稿、示例或概念性描述 | 不能入账，只能保留为草稿 |

## 20. 维护节奏

- 每周检查一次待采集清单状态。
- 每次新增真实证据后，同步更新对应子文档。
- 每次路线图或架构变更后，复核台账中受影响的证据。
- 每次发布评审前，确认台账状态与白皮书就绪度一致。

## 21. 示例转正式的升级规则

- 只有当示例内容有真实来源时，才能转为正式证据。
- 转正前必须补齐最小证据包。
- 转正后必须从 `example_only: true` 改为正式条目并登记到证据目录。
- 若不能补齐来源，则示例只能保留在“示例”区，不得进入正式台账。

## 22. 候选条目退回规则

- 若来源不可访问，退回到 `pending`。
- 若关联合同或纪要缺失，退回到 `in_progress` 补强。
- 若结论无法复核，退回到草稿层，不得标记为 `done`。
- 若与现有权威文档冲突，必须先更新权威文档，再更新台账。

## 23. 首批任务执行清单

### 22.1 COMP-TASK-001

- 选择 1 个直接竞品。
- 记录试用或对照来源。
- 对照 NarrativeOS 的诊断、证据链与可视化价值。
- 输出 1 条差异化结论。
- 回填到 [竞品与替代方案矩阵](competitor-matrix.md) 与本台账。

当前执行记录：

- 状态：`done`
- 结果链接：[#1-证据目录](#1-证据目录)
- 备注：已补入正式竞品证据 COMP-001，来源为 LanguageTool 公开主页

正式入账摘要：

- 证据 ID：`COMP-001`
- 证据类型：`product_review`
- 来源：`https://languagetool.org/`
- 结论：LanguageTool 的核心仍是 grammar checker + style + paraphrasing + integrations，NarrativeOS 的首期差异化应继续保持“诊断、证据链、结构可视化”优先

### 22.3 ARCH-TASK-001

- 确认运行时边界、存储基线与平台分层。
- 检查 ADR 是否已经约束首期架构决策。
- 输出 1 条可追溯架构结论。
- 回填到 [架构可行性与约束清单](architecture-feasibility.md) 与本台账。

当前执行记录：

- 状态：`done`
- 结果链接：[#1-证据目录](#1-证据目录)
- 备注：已补入正式架构证据 ARCH-001，来源为 architecture/system/README.md、ADR-001 与 ADR-002
- 完成标记：`formal_sample_completed`

正式入账摘要：

- 证据 ID：`ARCH-001`
- 证据类型：`design_review`
- 来源：`architecture/system/README.md`、`adr/ADR-001-runtime.md`、`adr/ADR-002-storage.md`
- 结论：运行时隔离、显式 IPC/API Contract 和 DuckDB 作为规范化存储基线，已经构成 NarrativeOS 首期架构的硬约束

正式样本说明：

- 该样本是正式证据，不是示例。
- 该样本已经同步回 [架构可行性与约束清单](architecture-feasibility.md)。
- 该样本可作为后续实现前的架构门槛依据。

### 22.4 ARCH-TASK-002

- 确认平台闭环与分析引擎是否支持分阶段实现。
- 检查六域架构是否应先收敛为单文闭环，再扩展为平台化能力。
- 输出 1 条可追溯架构结论。
- 回填到 [架构可行性与约束清单](architecture-feasibility.md) 与本台账。

当前执行记录：

- 状态：`done`
- 结果链接：[#1-证据目录](#1-证据目录)
- 备注：已补入正式架构证据 ARCH-002，来源为 architecture/platform/README.md 与 architecture/analysis-engine/README.md
- 完成标记：`formal_sample_completed`

正式入账摘要：

- 证据 ID：`ARCH-002`
- 证据类型：`design_review`
- 来源：`architecture/platform/README.md`、`architecture/analysis-engine/README.md`
- 结论：平台闭环、六域架构与模块化分析引擎共同说明，NarrativeOS 更适合先以单文诊断闭环落地，再逐步扩展到语料观测与知识网络

正式样本说明：

- 该样本是正式证据，不是示例。
- 该样本已经同步回 [架构可行性与约束清单](architecture-feasibility.md)。
- 该样本支持首期实现先收敛单文闭环，再扩展平台分域。

### 22.5 ARCH-TASK-003

- 确认 Visual OS 是否应以诊断优先和证据链跳转为核心。
- 检查首页、Atlas 与 Insight Panel 是否都必须绑定可追溯原文位置。
- 输出 1 条可追溯架构结论。
- 回填到 [架构可行性与约束清单](architecture-feasibility.md) 与本台账。

当前执行记录：

- 状态：`done`
- 结果链接：[#1-证据目录](#1-证据目录)
- 备注：已补入正式架构证据 ARCH-003，来源为 architecture/visual-os/README.md
- 完成标记：`formal_sample_completed`

正式入账摘要：

- 证据 ID：`ARCH-003`
- 证据类型：`design_review`
- 来源：`architecture/visual-os/README.md`
- 结论：Visual OS 以诊断优先、证据链可跳转和原文可追溯为核心要求，因此首期可视化工作台必须优先实现解释性与定位能力，而非静态展示

正式样本说明：

- 该样本是正式证据，不是示例。
- 该样本已经同步回 [架构可行性与约束清单](architecture-feasibility.md)。
- 该样本支持首期可视化工作台以证据链为前提。

### 22.6 FRZ-TASK-001

- 确认首期开工范围是否已明确冻结。
- 检查哪些内容被排除在首期之外。
- 输出 1 条可追溯批准结论。
- 回填到 [实现冻结清单](implementation-freeze.md) 与本台账。

当前执行记录：

- 状态：`done`
- 结果链接：[#1-证据目录](#1-证据目录)
- 备注：已补入正式冻结证据 FRZ-001，来源为 implementation-freeze.md
- 完成标记：`formal_sample_completed`

正式入账摘要：

- 证据 ID：`FRZ-001`
- 证据类型：`approval`
- 来源：`implementation-freeze.md`
- 结论：NarrativeOS 首期仅允许进入诊断、证据链、schema 对齐与治理可追责范围，复杂云协同和未验证能力不纳入首期承诺

正式样本说明：

- 该样本是正式证据，不是示例。
- 该样本已经同步回 [实现冻结清单](implementation-freeze.md)。
- 该样本可作为首期开工批准与范围冻结依据。

### 22.7 ROAD-TASK-001

- 检查 V1-V3 路线图是否与产品工作流一致。
- 确认 V1 是否优先单文诊断闭环，V2 是否转向语料分析，V3 是否转向机构级评估。
- 输出 1 条可追溯路线图结论。
- 回填到 [Product Roadmap](../product/roadmap/README.md) 与本台账。

当前执行记录：

- 状态：`done`
- 结果链接：[#1-证据目录](#1-证据目录)
- 备注：已补入正式路线图证据 ROAD-002，来源为 product/roadmap/README.md 与 product/workflows/README.md
- 完成标记：`formal_sample_completed`

正式入账摘要：

- 证据 ID：`ROAD-002`
- 证据类型：`governance_basis`
- 来源：`product/roadmap/README.md`、`product/workflows/README.md`
- 结论：V1 作者/编辑闭环、V2 语料分析闭环与 V3 机构评估闭环彼此递进，说明路线图已经与证据驱动的分阶段交付模式对齐

正式样本说明：

- 该样本是正式证据，不是示例。
- 该样本已经同步回 [Product Roadmap](../product/roadmap/README.md)。
- 该样本可作为验收节奏与里程碑联动依据。

### 22.2 MKT-TASK-001

- 首轮目标受访者：编辑。
- 确认受访者属于目标用户群。
- 记录当前工作流与使用工具。
- 询问结构、节奏、风格或批量评审中的真实痛点。
- 记录对“看清问题”这一价值点的反应。
- 回填到 [市场接受度判断框架](market-acceptance.md) 与本台账。
- 招募动作：通过现有网络联系 1 位编辑。
- 访谈时长：15-30 分钟。
- 纪要要求：至少记录 1 条痛点与 1 条价值信号。

当前执行记录：

- 状态：`in_progress`
- 结果链接：[#1-证据目录](#1-证据目录)
- 备注：先用公开市场信号补充市场接受度基础证据，真实访谈待后续补齐
- 招募备注：首轮按编辑画像执行访谈
- 下一步：补齐 `MKT-INT-001` 纪要模板并完成首位编辑招募

正式入账摘要：

- 证据 ID：`MKT-001`
- 证据类型：`observation`
- 来源：`https://languagetool.org/business`、`https://prowritingaid.com/`
- 结论：直接竞品的市场叙事集中于 grammar/style/paraphrasing、跨应用集成、写作流程适配和“让写作更好”，NarrativeOS 的市场接受度判断应优先验证解释性价值与迁移阻力

```yaml
evidence_id: MKT-002
evidence_type: interview
source: whitepaper/evidence-registry.md
date: 2026-06-01
summary: 访谈某严肃文字工作者后，确认其最关心的是结构问题解释能力与工作流切换成本。
linked_document: whitepaper/market-acceptance.md
linked_decision: 市场接受度需要优先验证解释性价值与迁移阻力
owner: product
example_only: true
```
