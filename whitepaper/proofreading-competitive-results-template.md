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

## 报告元信息

```yaml
report_meta:
  report_id: WP-PRF-BM-2026-001
  report_date: YYYY-MM-DD
  owner: product
  reviewer: maintainer
  baseline_set: [Baseline-A, Baseline-B]
  data_source_ref:
    - product/scenarios/v1-mock-simulation-dataset.md
    - product/workflows/proofreading-competitive-benchmark-runbook.md
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

## 结论写法约束

- 允许：在给定数据集和基线下，NarrativeOS 在 explanation_usable_rate 与 review_cycle_time_sec 上有优势。
- 禁止：在无充足样本时宣称“全面领先所有竞品”。
- 必填：风险、限制、样本偏差与后续验证计划。

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
- ../product/modules/proofreading-competitive-benchmark.md
- ../product/workflows/proofreading-competitive-benchmark-runbook.md
