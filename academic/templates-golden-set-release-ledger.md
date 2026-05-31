# Golden Set Template: Release Ledger

本模板用于在发布窗口内汇总多次 change review 结果，形成统一发布决策台账。

字段口径参见： [Golden Set Field Dictionary](golden-set-field-dictionary.md)

变更评审模板参见： [Template: Golden Set Change Review](templates-golden-set-change-review.md)

影响评估参见： [Golden Set Change Impact Matrix](golden-set-change-impact-matrix.md)

## 使用范围

- 场景：一次发布窗口内存在多笔 Golden Set 相关变更
- 目标：聚合 blocked_release、impact_level、required_followups，输出 release_go_no_go

## 基本信息

```yaml
template_id: golden-set-release-ledger-v1
release_id: <release-id>
baseline_version: <version>
window_start: <yyyy-mm-dd>
window_end: <yyyy-mm-dd>
owner: <owner>
reviewer: <reviewer>
```

## 变更条目

```yaml
entries:
  - change_id: <change-id>
    profile_scope: [research | detective]
    impact_level: L1 | L2 | L3
    gate_decision: pass | fail
    blocked_release: true | false
    required_followups:
      - rerun_golden_set
    review_ref: <path-or-id>
```

## 聚合结果

```yaml
stats:
  total_changes: <count>
  l3_changes: <count>
  blocked_changes: <count>
  unresolved_followups: <count>
release_go_no_go: go | no-go
decision_reason: <reason>
approved_by: <owner-or-reviewer>
approved_at: <yyyy-mm-dd>
```

## 判定规则

1. 任何条目 gate_decision = fail 且 blocked_release = true，release_go_no_go 必须为 no-go
2. 若存在 impact_level = L3 条目，必须附审批人与审批时间
3. unresolved_followups > 0 时，不得判定为 go
