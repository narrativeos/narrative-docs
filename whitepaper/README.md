# NarrativeOS Open Source Whitepaper

## Executive Summary (EN)

This whitepaper is the main evaluation narrative for NarrativeOS. It explains the problem the project addresses, the category it belongs to, the architectural boundary of the first release, and the evidence required to support external claims.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-README
path: whitepaper/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, contributor, investor, partner, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 术语入口

首次阅读白皮书主线时，建议先对照 [术语表](../assets/glossary.zh-en.md)。

本页及关联章节高频术语包括：单一事实源（SSOT）、运行时隔离、契约（Contract）、证据回链、发布门禁。

这份白皮书不是仓库索引，也不是开发日志。

它承担的是更单一、也更严格的职责：把 NarrativeOS 为什么值得做、为什么现在可以开工、以及为什么还不能夸大宣称，完整而克制地讲清楚。

它面向三类读者：

- 评审者：需要在有限时间内判断项目是否成立
- 合作方：需要理解 NarrativeOS 的边界、阶段和合作切口
- 贡献者：需要知道哪些论断已经冻结，哪些仍在补证据

本目录的目标是把 narrative-docs 现有内容整理为一套可对外评审、可引用、可复核的白皮书主线：

- 对外：一套可阅读、可引用、可评审的项目主叙事与评审底稿
- 对内：一套可维护、可追踪、可演进的核心文档骨架

## 这份白皮书回答什么

它重点回答五个问题：

1. NarrativeOS 试图解决的核心问题是什么。
2. 它与生成式写作工具、语法纠错工具、通用文本分析工具有何不同。
3. 首期实现边界为何这样定义。
4. 当前哪些判断已经比较稳固，哪些仍需要证据补强。
5. 如果决定继续推进，最合理的实施与协作顺序是什么。

## 阅读建议

- 如果你只想快速判断项目成色：先读 [白皮书一页纸摘要](one-page-summary.md)。
- 如果你要看完整判断链：从 [项目论证与预演框架](project-foundation.md) 进入。
- 如果你最关心“能不能开工”：优先看 [实现冻结清单](implementation-freeze.md)。
- 如果你最关心“凭什么这么判断”：直接对照 [证据附录](evidence-registry.md)。
- 如果你在做发布校核或章节追溯：最后再看 [core-docs-mapping.md](../developer/coding/core-docs-mapping.md) 与 [readiness-checklist.md](../developer/coding/readiness-checklist.md)。

## 白皮书结构

- 01 执行摘要（Executive Summary）
- 02 问题定义与市场空白（Problem & Gap）
- 03 解决方案与产品定位（Solution & Positioning）
- 04 技术架构与系统边界（Architecture）
- 05 核心能力与工作流（Capabilities & Workflows）
- 06 路线图与里程碑（Roadmap）
- 07 开源治理与协作模型（Governance）
- 08 安全、隐私与合规（Security & Privacy）
- 09 生态、扩展与接口（Ecosystem & SDK）
- 10 风险、限制与后续计划（Risks & Next Steps）

下面的目录不是“写作建议”，而是当前白皮书已经成形的正文组织方式。

## 白皮书目录

### Part I：评审总览

- [白皮书一页纸摘要](one-page-summary.md)
- [项目论证与预演框架](project-foundation.md)

### Part II：核心判断

- [证据附录](evidence-registry.md)
- [竞品与替代方案矩阵](competitor-matrix.md)
- [架构可行性与约束清单](architecture-feasibility.md)
- [市场接受度判断框架](market-acceptance.md)
- [实现冻结清单](implementation-freeze.md)

### Part III：发布与治理支撑

- [基准测试与验收指标入口](benchmark-and-acceptance-metrics.md)
- [ALGO-TASK-001 算法评估报告（单机可行性）](algorithm-evaluation-report.md)
- [ALGO-TASK-001 V1 选型冻结与落地清单](algorithm-selection-freeze-v1.md)
- [ALGO-TASK-001 误差分类与修复计划](error-taxonomy-and-fix-plan.md)
- [ALGO-TASK-001 首轮测量表模板](algo-task-001-measurement-sheet.md)
- [ALGO-TASK-001 首轮运行作业单](algo-task-001-runbook.md)
- [ALGO-TASK-001 执行清单模板](algo-task-001-execution-checklist.md)
- [ALGO-TASK-001 最小可填清单](algo-task-001-minimal-checklist.md)
- [校对竞争力验证结果模板（平台域融合证据）](proofreading-competitive-results-template.md)
- [校对竞争力验证结果样例（2026-05，平台域融合口径）](proofreading-competitive-results-sample-2026-05.md)
- [Workflow 到 Whitepaper 映射指南](workflow-to-whitepaper-mapping-guide.md)
- [研究方法与复现基线](research-methodology-and-reproducibility.md)
- [V2 语料比较研究模板](study-template-v2-corpus-comparative-analysis.md)
- [叙事分段标注协议](annotation-protocol-narrative-segmentation.md)
- [Evidence Traceability 复现包示例](reproducibility-package-evidence-traceability.md)
- [BENCH-TASK-001 证据回链率测量作业单](bench-task-001-evidence-traceability-audit.md)
- [RSCH-TASK-001 V2 语料研究任务回放作业单](rsch-task-001-v2-corpus-runbook.md)
- [ANNO-TASK-001 叙事分段一致性作业单](anno-task-001-segmentation-consistency.md)
- [白皮书附录 A：核心文档映射表](../developer/coding/core-docs-mapping.md)
- [白皮书附录 B：就绪度检查清单](../developer/coding/readiness-checklist.md)

Part I 负责让读者迅速形成整体判断。

Part II 负责支撑“为什么这样判断”。

Part III 负责回答“在什么条件下这些判断可以被对外宣称”。其中研究方法基线用于约束研究型论断的任务定义、语料口径、标注协议与复现要求；study template、annotation protocol 和 reproducibility package example 用于把这些约束下沉到可执行样板；task worksheet 用于承接真实运行与证据回填；映射表与就绪度清单属于附录性质的发布支撑材料，而不是正文主线。

补充说明：校对竞争力验证相关页面在白皮书中属于“平台当前基线六域融合证据”，用于支持域协同能力判断，不用于支持独立校对产品线叙事，也不用于支持“替代第三方校对产品”叙事。

## 推荐阅读顺序

对外评审时，建议按以下顺序阅读：

1. [白皮书一页纸摘要](one-page-summary.md)
2. [项目论证与预演框架](project-foundation.md)
3. [市场接受度判断框架](market-acceptance.md)
4. [架构可行性与约束清单](architecture-feasibility.md)
5. [实现冻结清单](implementation-freeze.md)
6. [证据附录](evidence-registry.md)

如果只想快速把握项目判断，可以读完 [白皮书一页纸摘要](one-page-summary.md) 后直接进入 [实现冻结清单](implementation-freeze.md)。

## 写作与发布边界

这份白皮书可以用于对外评审，但不能把“规划目标”表述为“已经完成”。

尤其在以下两类问题上，需要保持克制：

- 市场接受度：仍需真实访谈、试点或合作验证继续补证
- 验收指标：凡是 measured 尚未成立的指标，只能作为目标，不能当作事实宣称

## 使用方式

- 对外发布白皮书或评审稿时：以本目录为主入口，按正文顺序组织阅读
- 内部迭代论证时：先更新原始权威文档，再同步本目录中的引用和状态
- 做外部答辩或合作简报时：优先配合 [白皮书一页纸摘要](one-page-summary.md) 使用
