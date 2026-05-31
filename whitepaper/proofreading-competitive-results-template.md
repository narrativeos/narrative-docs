# Proofreading Competitive Results Template

## 摘要（中文）

本模板用于白皮书侧沉淀校对补齐同题对打结果，支持对外评审中的可复核展示与结论约束。

## Executive Summary (EN)

This template standardizes how proofreading competitive benchmark results are reported in the whitepaper context.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-proofreading-competitive-results-template
path: whitepaper/proofreading-competitive-results-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, product, reviewer, partner, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: template
```

## 使用说明

- 本模板只记录已执行并可回放的评测结果。
- 任何“优于竞品”结论必须附指标 delta 与证据回链。
- 未达到阈值的轮次必须如实记录为 fail 或 no-go。
- 本模板用于记录“域融合后”的校对能力表现，不作为独立产品线证明材料。

## 报告元信息

```yaml
report_meta:
  report_id: WP-PRF-BM-2026-001
  report_date: YYYY-MM-DD
  owner: product
  reviewer: maintainer
  baseline_set: [Baseline-A, Baseline-B]
  data_source_ref:
    - product/modules/platform-domains.md
    - product/modules/proofreading-capability-gap-closure-plan.md
    - product/scenarios/v1-mock-simulation-dataset.md
    - product/workflows/proofreading-competitive-benchmark-runbook.md
    - product/workflows/proofreading-competitive-benchmark-checklist.md
    - product/workflows/proofreading-competitive-benchmark-run-record-template.md
    - whitepaper/evidence-registry.md
```

## 分层结果总表

| Tier | Dataset | Gate | Key Delta Summary | Notes |
| --- | --- | --- | --- | --- |
| P0 | DS-V1-PRF-P0-001 | pass/fail | recall +x.xx, fpr -x.xx | ... |
| P1 | DS-V1-PRF-P1-001 | pass/fail | consistency +x.xx, registry +x.xx | ... |
| P2 | DS-V1-PRF-P2-001 | pass/fail | risk/official_doc coverage +x.xx | ... |

## 指标明细（每轮）

```yaml
metric_record:
  run_id: bm-2026-001
  baseline_id: Baseline-B
  tier: P1
  dataset_id: DS-V1-PRF-P1-001
  metrics:
    proofreading_recall:
      narrativeos: 0.91
      baseline: 0.90
      delta: +0.01
    proofreading_false_positive_ratio:
      narrativeos: 0.09
      baseline: 0.08
      delta: -0.01
    term_consistency_alignment_rate:
      narrativeos: 0.94
      baseline: 0.89
      delta: +0.05
    registry_new_term_precision:
      narrativeos: 0.93
      baseline: 0.85
      delta: +0.08
    knowledge_density_kd:
      narrativeos: 0.047
      baseline: 0.041
      delta: +0.006
    explanation_usable_rate:
      narrativeos: 0.96
      baseline: 0.71
      delta: +0.25
    review_cycle_time_sec:
      narrativeos: 78
      baseline: 123
      delta: -45
  traceability:
    issue_trace_pass_ratio: 0.98
    critical_trace_fail_count: 0
  decision:
    gate_result: pass | fail
    go_no_go: go | no-go
    rationale: <short rationale>
```

## Workflow 到 Whitepaper 字段映射

用于把 workflow 执行记录（含事实冲突识别）稳定映射到白皮书结果结构，避免“同一轮次多套口径”。

| Workflow Source Field | Whitepaper Target Field | Mapping Rule |
| --- | --- | --- |
| run_context.run_id | metric_record.run_id | 直接拷贝 |
| run_context.threshold_tier | metric_record.tier | 使用 tier 映射表：lenient->P0, standard->P1, strict->P2 |
| run_context.corpus_ref | metric_record.dataset_id | 直接拷贝 |
| summary_metrics.verifiability_rate | metric_record.traceability.issue_trace_pass_ratio | 若缺 issue_trace_pass_ratio，可临时回填并在 notes 标注 proxy |
| summary_metrics.hallucination_ratio | metric_record.metrics.proofreading_false_positive_ratio.narrativeos | 在事实核查型轮次中作为风险代理，不替代标准 FPR 实测 |
| summary_metrics.traceability_pass_rate | metric_record.traceability.issue_trace_pass_ratio | 直接拷贝，优先级高于 proxy |
| summary_metrics.knowledge_density_kd | metric_record.metrics.knowledge_density_kd.narrativeos | 直接拷贝 |
| final_decision.gate_decision | metric_record.decision.gate_result | pass/fail 直接映射 |
| final_decision.publish_blocked | metric_record.decision.go_no_go | true->no-go, false->go |
| final_decision.reason | metric_record.decision.rationale | 合并为短句并保留失败关键词 |

映射约束：

- 禁止仅凭 knowledge_density_kd 给出“事实可信”结论，必须同时披露 verifiability/hallucination 口径。
- 若使用 proxy 字段（例如把 hallucination_ratio 暂映射到 FPR 位），必须在 Notes 中显式声明。
- 映射后的结论必须保留域融合说明，不得写成“独立校对工具领先”叙事。

## 结论写法约束

- 允许：在给定数据集和基线下，NarrativeOS 在 explanation_usable_rate 与 review_cycle_time_sec 上有优势。
- 禁止：在无充足样本时宣称“全面领先所有竞品”。
- 必填：风险、限制、样本偏差与后续验证计划。
- 必须：结论需说明关键差异来自哪些平台域能力协同，而非单点校对功能。

## 风险与限制模板

```yaml
risk_and_limits:
  sample_bias: <description>
  baseline_bias: <description>
  unresolved_failures:
    - <failure_id>
  follow_up_plan:
    - <action-item>
```

## 关联文档

- competitor-matrix.md
- market-acceptance.md
- workflow-to-whitepaper-mapping-guide.md
- ../product/modules/proofreading-competitive-benchmark.md
- ../product/modules/platform-domains.md
- ../product/workflows/proofreading-competitive-pilot-intake-template.md
- ../product/workflows/proofreading-competitive-benchmark-runbook.md
