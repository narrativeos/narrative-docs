# Golden Set Template: Change Review

本模板用于记录一次 Golden Set 相关变更的影响评估、重跑范围与发布决策。

字段口径参见： [Golden Set Field Dictionary](golden-set-field-dictionary.md)

阈值策略参见： [Golden Set Threshold Policy](golden-set-threshold-policy.md)

影响评估参见： [Golden Set Change Impact Matrix](golden-set-change-impact-matrix.md)

## 使用范围

- 场景：任何会触发 required_actions、阈值调整或 Kernel 规则变更的提交
- 目标：固定记录 change_id、impact_level、rerun_scope、release_constraint 与最终 gate_decision

## 基本信息

```yaml
template_id: golden-set-change-review-v1
change_id: <change-id>
baseline_version: <version>
profile_scope:
  - research | detective
owner: <owner>
reviewer: <reviewer>
review_date: <yyyy-mm-dd>
```

## 变更动作

```yaml
actions:
  - rerun_golden_set | resolve_counterevidence | fix_unsupported_causality | fix_bias_misjudge
impact_level: L1 | L2 | L3
rerun_scope: <scope>
release_constraint: <constraint>
```

## 指标影响摘要

```yaml
metrics_before:
  traceability_pass_rate: <value>
  strength_shift_explained_rate: <value>
  unresolved_counterevidence_ratio: <value>
metrics_after:
  traceability_pass_rate: <value>
  strength_shift_explained_rate: <value>
  unresolved_counterevidence_ratio: <value>
domain_metric_delta:
  unsupported_causality_count: <delta>
  narrative_bias_misjudge_count: <delta>
```

## 决策与门禁

```yaml
gate_decision: pass | fail
blocked_release: true | false
required_followups:
  - rerun_golden_set
approved_by: <owner-or-reviewer>
approved_at: <yyyy-mm-dd>
```

## 说明

1. 若 impact_level = L3，必须附审批人与审批时间
2. 若 blocked_release = true，必须写明 required_followups
3. 若 metrics_before 与 metrics_after 出现强度跳变，必须补充 degrade_reasons
4. 建议将通过评审的记录汇总到 [Template: Golden Set Release Ledger](templates-golden-set-release-ledger.md)
