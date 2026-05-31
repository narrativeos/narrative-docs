# Example: Golden Set Release Ledger Minimal

本页给出发布窗口级汇总样例，演示如何将多条 change review 聚合成一次 release go/no-go 决策。

## 基本信息

```yaml
template_id: golden-set-release-ledger-v1
release_id: release-2026-06-r1
baseline_version: baseline-2026-05-r1
window_start: 2026-05-25
window_end: 2026-05-31
owner: academic-method-owner
reviewer: architecture-reviewer
```

## 变更条目

```yaml
entries:
  - change_id: gs-change-2026-05-31-01
    profile_scope: [research]
    impact_level: L2
    gate_decision: pass
    blocked_release: false
    required_followups:
      - rerun_golden_set
    review_ref: academic/examples-golden-set-change-review-minimal.md
  - change_id: gs-change-2026-05-31-02
    profile_scope: [detective]
    impact_level: L1
    gate_decision: pass
    blocked_release: false
    required_followups: []
    review_ref: review-log-2026-05-31-02
```

## 聚合结果

```yaml
stats:
  total_changes: 2
  l3_changes: 0
  blocked_changes: 0
  unresolved_followups: 0
release_go_no_go: go
decision_reason: all gate decisions pass and no blocked change remains
approved_by: architecture-reviewer
approved_at: 2026-05-31
```

## 说明

- 该发布窗口无 fail 且无阻塞条目，可进入发布
- 若任一条目后续变为 blocked_release: true，应回滚为 no-go 并重算台账
