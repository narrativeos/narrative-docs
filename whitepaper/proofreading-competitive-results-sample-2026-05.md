# Proofreading Competitive Results Sample (2026-05)

## 摘要（中文）

本页提供首版已填充样例结果，演示如何按照白皮书模板记录校对补齐同题对打评测。

## Executive Summary (EN)

This page is a filled example report showing how to record proofreading competitive benchmark outcomes.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-proofreading-competitive-results-sample-2026-05
path: whitepaper/proofreading-competitive-results-sample-2026-05.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, product, reviewer, partner, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: sample-filled
```

## 报告元信息

```yaml
report_meta:
  report_id: WP-PRF-BM-2026-05-SAMPLE
  report_date: 2026-05-31
  owner: product
  reviewer: maintainer
  baseline_set: [Baseline-B]
  data_source_ref:
    - product/scenarios/v1-mock-simulation-dataset.md
    - product/workflows/proofreading-competitive-benchmark-runbook.md
    - product/workflows/proofreading-competitive-benchmark-checklist.md
```

## 分层结果总表

| Tier | Dataset | Gate | Key Delta Summary | Notes |
| --- | --- | --- | --- | --- |
| P0 | DS-V1-PRF-P0-001 | pass | recall +0.01, fpr -0.01 | 基础纠错稳定 |
| P1 | DS-V1-PRF-P1-001 | pass | consistency +0.05, registry +0.08 | 术语与知识校验优势明显 |
| P2 | DS-V1-PRF-P2-001 | pass | strict tier pass, risk/official_doc coverage +0.12 | 高风险与公文专项通过 |

## 指标明细

```yaml
metric_records:
  - run_id: bm-20260531-001
    baseline_id: Baseline-B
    tier: P0
    dataset_id: DS-V1-PRF-P0-001
    metrics:
      proofreading_recall:
        narrativeos: 0.90
        baseline: 0.89
        delta: +0.01
      proofreading_false_positive_ratio:
        narrativeos: 0.09
        baseline: 0.10
        delta: -0.01
      explanation_usable_rate:
        narrativeos: 0.95
        baseline: 0.74
        delta: +0.21
      review_cycle_time_sec:
        narrativeos: 82
        baseline: 126
        delta: -44
    traceability:
      issue_trace_pass_ratio: 0.98
      critical_trace_fail_count: 0
    decision:
      gate_result: pass

  - run_id: bm-20260531-001
    baseline_id: Baseline-B
    tier: P1
    dataset_id: DS-V1-PRF-P1-001
    metrics:
      term_consistency_alignment_rate:
        narrativeos: 0.94
        baseline: 0.89
        delta: +0.05
      registry_new_term_precision:
        narrativeos: 0.93
        baseline: 0.85
        delta: +0.08
      explanation_usable_rate:
        narrativeos: 0.94
        baseline: 0.72
        delta: +0.22
      review_cycle_time_sec:
        narrativeos: 79
        baseline: 124
        delta: -45
    traceability:
      issue_trace_pass_ratio: 0.97
      critical_trace_fail_count: 0
    decision:
      gate_result: pass

  - run_id: bm-20260531-001
    baseline_id: Baseline-B
    tier: P2
    dataset_id: DS-V1-PRF-P2-001
    metrics:
      proofreading_recall:
        narrativeos: 0.94
        baseline: 0.92
        delta: +0.02
      proofreading_false_positive_ratio:
        narrativeos: 0.05
        baseline: 0.07
        delta: -0.02
      term_consistency_alignment_rate:
        narrativeos: 0.98
        baseline: 0.90
        delta: +0.08
      registry_new_term_precision:
        narrativeos: 0.98
        baseline: 0.86
        delta: +0.12
      explanation_usable_rate:
        narrativeos: 0.96
        baseline: 0.73
        delta: +0.23
      review_cycle_time_sec:
        narrativeos: 76
        baseline: 121
        delta: -45
    traceability:
      issue_trace_pass_ratio: 0.99
      critical_trace_fail_count: 0
    decision:
      gate_result: pass
```

## 综合结论

```yaml
final_decision:
  go_no_go: go
  reason: P0/P1/P2 全部通过，且无 critical traceability 失败。
  constraints:
    - 样本仍为模拟数据，需继续扩展真实试点验证
    - baseline 仍需增加 Baseline-A 与 Baseline-C 的同题结果
```

## 风险与限制

```yaml
risk_and_limits:
  sample_bias: 当前样本为模拟数据集，未覆盖全部真实写作域
  baseline_bias: 当前仅使用 Baseline-B，对比代表性有限
  unresolved_failures: []
  follow_up_plan:
    - 补齐 Baseline-A/C 对打结果
    - 引入至少 1 轮真实试点样本并复跑
```

## 从样例升级到真实试点数据

迁移规则：

- 用真实试点 run_id 替换样例 run_id，并保留原始执行日期与操作者。
- data_source_ref 必须补入真实运行记录页与对应 checklist。
- 若真实试点只覆盖部分 tier，不得沿用本页的全量 pass 结论。
- 若真实试点出现 fail/no-go，必须保留失败轮次，不得用样例结果覆盖。
- 任何对外结论只允许引用真实试点 delta，不得继续使用本页样例数值。

最小迁移步骤：

1. 复制 [../product/workflows/proofreading-competitive-benchmark-run-record-template.md](../product/workflows/proofreading-competitive-benchmark-run-record-template.md) 生成真实运行记录。
2. 按 [../product/workflows/proofreading-competitive-benchmark-checklist.md](../product/workflows/proofreading-competitive-benchmark-checklist.md) 完成逐项勾检。
3. 按 [../product/workflows/proofreading-competitive-benchmark-runbook.md](../product/workflows/proofreading-competitive-benchmark-runbook.md) 复核阈值与回滚动作。
4. 将本页中的样例指标替换为真实试点结果，并显式记录 sample_bias 与 baseline_bias。

## 关联文档

- proofreading-competitive-results-template.md
- competitor-matrix.md
- market-acceptance.md
- ../product/workflows/proofreading-competitive-benchmark-runbook.md
- ../product/workflows/proofreading-competitive-benchmark-checklist.md
- ../product/workflows/proofreading-competitive-benchmark-run-record-template.md
