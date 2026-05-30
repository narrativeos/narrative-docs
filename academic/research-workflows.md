# Research Workflows

本页提供研究者可直接复用的任务型工作流模板。

## 工作流使用规则

- 每个工作流必须绑定一个 study_id
- 每个工作流必须有 baseline
- 每个工作流必须输出失败样本摘要

## Workflow A: 系统综述支持

- 输入：文献摘要或全文样本集
- 任务：识别叙事结构模式、论证断点与主题聚集
- 输出：结构化观察表 + 证据链清单

推荐绑定：

- 模板来源： [whitepaper/study-template-v2-corpus-comparative-analysis.md](../whitepaper/study-template-v2-corpus-comparative-analysis.md)
- 证据回链： [whitepaper/reproducibility-package-evidence-traceability.md](../whitepaper/reproducibility-package-evidence-traceability.md)

## Workflow B: 主题演化观察

- 输入：按时间分段的文本集合
- 任务：比较不同时间窗中的叙事变化与稳定段
- 输出：变化点摘要 + 差异解释说明

建议主指标：

- topic_transition_rate
- segment_density_by_1k_chars

## Workflow C: 对比研究论证

- 输入：两个或多个对照语料
- 任务：对齐分析维度并输出差异证据
- 输出：对比表 + 可复核引用位置

建议最小输出：

- compare_table.csv
- stability_check_note.md
- failure_case_table.yaml

## 每个工作流必须满足

- 输入范围可描述
- 参数选择有理由
- 输出可被独立复核

## 验收门槛

1. 至少 1 个主指标有明确口径
2. 至少 1 个辅助指标用于解释主结论
3. 至少 3 个失败样本被记录并分类
4. 有可追踪 evidence_link

## 作业单入口

- [whitepaper/rsch-task-001-v2-corpus-runbook.md](../whitepaper/rsch-task-001-v2-corpus-runbook.md)
- [whitepaper/bench-task-001-evidence-traceability-audit.md](../whitepaper/bench-task-001-evidence-traceability-audit.md)
- [whitepaper/anno-task-001-segmentation-consistency.md](../whitepaper/anno-task-001-segmentation-consistency.md)
- [Example: Evidence Traceability First Snapshot](examples-evidence-traceability-first-snapshot.md)
- [Example: Systematic Review Minimal Loop](examples-systematic-review-minimal.md)
- [Example: Topic Evolution Three-Slice](examples-topic-evolution-three-slice.md)

## 关联

- [10-Minute First Success](10-minute-first-success.md)
- [Publication Support](publication-support.md)