# 基准测试与验收指标入口

## Executive Summary (EN)

This document defines which benchmark claims NarrativeOS may make, which ones remain planned only, and what minimum evidence is required before a capability can be described as released.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-benchmark-and-acceptance-metrics
path: whitepaper/benchmark-and-acceptance-metrics.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, reviewer, contributor, partner]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标 | Goals

本文件作为白皮书中的“可信性入口”，用于统一叙事声明与可验证指标之间的映射关系。

它不负责证明能力本身，而是负责约束叙事边界：

- 哪些说法目前只能视为目标
- 哪些说法已经具备实测依据
- 哪些能力在没有指标前不得写成“已完成”

核心原则：

- 先定义指标，再对外宣称能力
- 指标可复算、可复核、可追踪
- 发布门槛应有最小通过标准

## 当前状态快照

截至当前版本，本页中的大多数指标仍处于 Planned，而不是 Measured。

这意味着：

- NarrativeOS 已经具备较清楚的指标框架
- 但它还没有足够多的实测结果来支撑大范围对外能力宣称
- 白皮书、首页和对外简报应优先使用“目标”“边界”“冻结条件”这类表述，而不是“已经达到”

## 指标状态分层（强制）

- 建议值（Planned）：设计目标，尚未形成稳定实测证据
- 实测值（Measured）：有明确样本、口径、版本和证据链接

对外发布时，建议值不得表述为“已达成”。

## 证据记录模板（每个核心指标必须具备）

```yaml
metric_id: METRIC-XXX
metric_name: 指标名
status: planned | measured
version: vX.Y.Z
sample_size: N
time_window: YYYY-MM-DD..YYYY-MM-DD
calculation_method: 计算口径说明
evidence_link: docs/path/or/pr
owner: role-or-team
```

## 对外宣称规则

- 只有同时具备版本、样本量、时间窗口和证据链接的指标，才能写作 Measured
- 任何 Planned 指标都只能表示路线目标，不能写成现状描述
- 若一个能力依赖多个关键指标，则至少应有 1 个主指标达到 Measured，且不存在明显冲突证据
- 白皮书之外的首页、摘要、路演材料，也必须遵守本页口径

## 基准测试分类

### A. 功能正确性基准

用于验证关键流程是否按预期完成。

示例指标：

- 单文分析主链路成功率
- 导入到报告生成的流程完成率
- 关键可视化视图可用率

### B. 稳定性与可靠性基准

用于验证在常见工作负载下的稳定运行能力。

示例指标：

- 任务失败率
- 重试后成功率
- 长文本任务中断率

### C. 性能与时延基准

用于验证用户感知速度与批量任务吞吐。

示例指标：

- Fast Scan 端到端耗时
- MRI 深度分析耗时
- 千级语料批处理吞吐

### D. 解释性与证据链基准

用于验证洞察输出的可解释质量。

示例指标：

- 洞察结论可追溯率（结论 -> 证据 -> 原文）
- 无证据结论比例
- 可定位到句段的证据覆盖率

## 验收指标基线（建议值与实测值双轨）

| 场景 | 指标 | 建议值（Planned） | 实测值（Measured） | 版本 | 证据 |
| --- | --- | --- | --- | --- | --- |
| V1 单文闭环 | 导入到报告完成时长 | P50 <= 15 分钟 | TBD | TBD | 待补证据 |
| V1 单文闭环 | 关键流程成功率 | >= 95% | TBD | TBD | 待补证据 |
| V1 洞察质量 | 结论证据可追溯率 | >= 90% | TBD | TBD | 见 [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md) |
| V2 语料分析 | 千级语料任务完成率 | >= 90% | TBD | TBD | 见 [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md) |
| V2 语料分析 | 小时级任务稳定性 | 24h 内失败率 <= 5% | TBD | TBD | 待补证据 |
| V3 机构评估 | 批量评估报告产出率 | >= 95% | TBD | TBD | 待补证据 |
| Academic 首轮补证 | evidence_traceability_rate | >= 90% | TBD | ACAD-BENCH-001 | 见 [../academic/examples-evidence-traceability-first-snapshot.md](../academic/examples-evidence-traceability-first-snapshot.md) |
| Academic 首轮补证 | systematic_review_minimal_loop_completion | >= 90% | TBD | ACAD-RSCH-002 | 见 [../academic/examples-systematic-review-minimal.md](../academic/examples-systematic-review-minimal.md) |
| Academic 首轮补证 | topic_evolution_three_slice_stability | 方向反转率 <= 10% | TBD | ACAD-RSCH-003 | 见 [../academic/examples-topic-evolution-three-slice.md](../academic/examples-topic-evolution-three-slice.md) |

> 注：当 `实测值` 为 `TBD` 时，该指标仅可用于路线目标，不可作为“已完成发布”的对外声明依据。

## ACAD-BENCH-001 首轮填报记录样例（Sample Only）

本节仅用于演示回填格式，不构成正式 measured 声明。

| 场景 | 指标 | 状态前 | 状态后 | 样例值 | 版本 | 样本量 | 时间窗口 | 证据 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Academic 首轮补证 | evidence_traceability_rate | planned | planned | 0.83 | v0.1.0 | 12 | 2026-05-26..2026-05-30 | [../academic/examples-acad-bench-001-first-fill-sample.md](../academic/examples-acad-bench-001-first-fill-sample.md) |

说明：

- 样例值用于展示“字段齐备后的回填方式”。
- 即使字段齐备，若样本规模不足或稳定性未验证，状态仍可保持 planned/study-ready。

## 指标准备状态（方法学层）

本节不声明 measured 结果，只说明每个关键指标目前是否已有 study-ready 的方法学支撑。

| 指标 | 当前状态 | 方法学支撑 | 说明 |
| --- | --- | --- | --- |
| 导入到报告完成时长 | design-ready | [product/workflows/README.md](../product/workflows/README.md) | 工作流路径已定义，但尚无稳定计时样本与统计口径 |
| 关键流程成功率 | design-ready | [product/workflows/README.md](../product/workflows/README.md), [architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md) | 主链路已定义，失败分类与批量样本统计仍待补 |
| 结论证据可追溯率 | study-ready | [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md) | 已有指标定义、复现步骤与失败样本要求，但尚未形成 measured 快照 |
| 千级语料任务完成率 | study-ready | [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md) | 已有 V2 研究模板与样本策略，但尚缺真实任务回放 |
| 叙事分段相关评测 | study-ready | [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md) | 已建立人工标注协议，可支撑 segmentation 任务评估集建设 |
| Academic 首轮证据回链快照 | study-ready | [../academic/examples-evidence-traceability-first-snapshot.md](../academic/examples-evidence-traceability-first-snapshot.md) | 已形成可执行作业单，等待 measured 采集 |
| Academic 系统综述最小闭环 | study-ready | [../academic/examples-systematic-review-minimal.md](../academic/examples-systematic-review-minimal.md) | 已定义输入/输出和验收，等待样本回放 |
| Academic 三时间片主题演化 | study-ready | [../academic/examples-topic-evolution-three-slice.md](../academic/examples-topic-evolution-three-slice.md) | 已定义稳定性检查口径，等待首轮采集 |

约束：

- `design-ready` 仅表示能力与口径已初步定义
- `study-ready` 仅表示已有任务模板、协议或复现包，仍不等于 measured
- 只有当结果进入样本、版本、时间窗口和 evidence_link 俱全的状态，才可升级为 measured

## 当前最小发布口径

在现阶段，NarrativeOS 对外更稳妥的表述应限制在以下范围：

- 已明确首期产品边界与架构约束
- 已建立指标与证据框架
- 已形成从导入、分析、证据回链到报告输出的目标链路定义
- 仍需继续补充真实 measured 指标，才能把关键能力写成“已验证”

## 发布门禁（Release Gates）

- Gate 1: 架构与流程文档已更新并通过评审
- Gate 2: 关键验收指标达到基线
- Gate 3: 白皮书映射与就绪度清单已同步

补充规则：

- Gate 2 必须至少包含 1 个 measured 指标及证据链接
- 无证据链接的 measured 指标按未通过处理

任一 Gate 未通过，不建议对外宣称对应能力“已完成发布”。

## 指标成熟度升级条件

一个指标从 Planned 升级为 Measured，至少需要满足以下条件：

1. 有明确版本号
2. 有明确样本量与时间窗口
3. 有稳定计算口径
4. 有可回查证据链接
5. 该指标所在场景没有被已知限制直接否定

## 数据来源与追踪

- 指标来源应记录在 PR 或发布说明中
- 指标计算口径需要稳定版本号
- 历史对比应使用同口径数据
- 指标记录应包含 `sample_size` 与 `time_window`

## 维护机制

- 每个版本发布前更新一次指标快照
- 当指标定义变更时，必须记录变更原因
- 指标异常应在路线图和已知限制中体现

## 当前优先补证指标

若只补最关键的首批 measured 指标，建议优先补以下三项：

- V1 单文闭环的导入到报告完成时长
- V1 单文闭环的关键流程成功率
- V1 洞察质量的结论证据可追溯率

建议对应实施入口：

- 语料研究任务模板： [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md)
- 叙事分段标注协议： [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md)
- 证据回链复现包： [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md)

建议对应执行作业单：

- [rsch-task-001-v2-corpus-runbook.md](rsch-task-001-v2-corpus-runbook.md)
- [anno-task-001-segmentation-consistency.md](anno-task-001-segmentation-consistency.md)
- [bench-task-001-evidence-traceability-audit.md](bench-task-001-evidence-traceability-audit.md)
- [../academic/examples-evidence-traceability-first-snapshot.md](../academic/examples-evidence-traceability-first-snapshot.md)
- [../academic/examples-systematic-review-minimal.md](../academic/examples-systematic-review-minimal.md)
- [../academic/examples-topic-evolution-three-slice.md](../academic/examples-topic-evolution-three-slice.md)

这三项一旦建立 measured 基线，就足以显著提升 NarrativeOS 白皮书的可信度。

## ALGO-TASK-001 执行计划

本节用于把“流程可执行”升级到“算法指标可比较、可复跑、可优化”。

```yaml
task_id: ALGO-TASK-001
task_type: algorithm_validation
status: in_progress
owner: research
reviewer: maintainer
scope:
	- segmentation_quality
	- compare_stability
	- evidence_traceability_accuracy
deliverables:
	- algorithm_evaluation_report.md
	- error_taxonomy_and_fix_plan.md
	- ALGO-001 evidence entry
```

### A1. 核心评测轴

| axis | target_metric | baseline_source | acceptance_target | note |
| --- | --- | --- | --- | --- |
| segmentation_quality | segment_boundary_consistency | anno-task-001-segmentation-consistency.md | 一致性指标相对基线提升或波动可解释 | 需保留冲突样本复核记录 |
| compare_stability | difference_direction_stability | rsch-task-001-v2-corpus-runbook.md | 多样本扩展后关键差异方向不反转或可解释 | 至少覆盖 3 样本 |
| traceability_accuracy | evidence_traceability_rate | bench-task-001-evidence-traceability-audit.md | 结论回链准确率达到发布门槛 | 需给出错误分类与修复动作 |

### A2. 里程碑

| milestone | objective | output | done_criteria |
| --- | --- | --- | --- |
| M1-Baseline | 固化版本、样本与口径 | evaluation protocol note | 指标口径、样本窗与版本号齐备 |
| M2-Measure | 跑首轮测量并收集误差 | algorithm evaluation report | 至少 2 组核心指标有 measured 值 |
| M3-Diagnose | 归纳失败模式与成因 | error taxonomy and fix plan | 至少 1 个高频失败模式有修复方案 |
| M4-Re-run | 应用修复后复跑 | delta comparison note | 指标变化可复现且有证据链接 |

### A3. 发布约束补充

- 若 `ALGO-001` 未入账，不将算法能力写成“已优化完成”。
- 若指标提升只在单样本成立，不升级为跨场景能力结论。

## 关联文档 | Related Docs

- whitepaper/readiness-checklist.md
- whitepaper/research-methodology-and-reproducibility.md
- whitepaper/study-template-v2-corpus-comparative-analysis.md
- whitepaper/annotation-protocol-narrative-segmentation.md
- whitepaper/reproducibility-package-evidence-traceability.md
- product/roadmap/README.md
- product/workflows/README.md
- adr/README.md
