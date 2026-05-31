# Example: Golden Set Change Review Minimal

本页给出一次最小变更评审记录样例，用于演示如何把影响矩阵、回归重跑和发布门禁串起来。

## 基本信息

```yaml
template_id: golden-set-change-review-v1
change_id: gs-change-2026-05-31-01
baseline_version: baseline-2026-05-r1
profile_scope:
  - research
owner: academic-method-owner
reviewer: architecture-reviewer
review_date: 2026-05-31
```

## 变更动作

```yaml
actions:
  - fix_unsupported_causality
  - rerun_golden_set
impact_level: L2
rerun_scope: research profile 全量 Golden Set
release_constraint: strict 档位建议
```

## 指标影响摘要

```yaml
metrics_before:
  traceability_pass_rate: 0.95
  strength_shift_explained_rate: 0.92
  unresolved_counterevidence_ratio: 0.06
metrics_after:
  traceability_pass_rate: 0.96
  strength_shift_explained_rate: 0.98
  unresolved_counterevidence_ratio: 0.04
domain_metric_delta:
  unsupported_causality_count: -2
  narrative_bias_misjudge_count: 0
```

## 事实核查联动（若适用）

```yaml
fact_check_ref: academic/examples-golden-set-fact-check-ledger-minimal.md
fact_gate_decision: fail
verifiability_rate: 1.00
hallucination_ratio: 0.50
```

## 决策与门禁

```yaml
gate_decision: fail
blocked_release: true
required_followups:
  - rebound_to_discovery
  - rerun_golden_set
approved_by: architecture-reviewer
approved_at: 2026-05-31
```

## 说明

- 本次变更属于 L2，要求 research profile 全量重跑
- 因 fact_gate_decision = fail，本轮 blocked_release 必须为 true
