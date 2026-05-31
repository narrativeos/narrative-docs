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
    gate_decision: fail
    blocked_release: true
    fact_gate_decision: fail
    fact_check_ref: academic/examples-golden-set-fact-check-ledger-minimal.md
    hallucination_ratio: 0.50
    verifiability_rate: 1.00
    required_followups:
      - rebound_to_discovery
      - rerun_golden_set
    review_ref: academic/examples-golden-set-change-review-minimal.md
  - change_id: gs-change-2026-05-31-02
    profile_scope: [detective]
    impact_level: L1
    gate_decision: pass
    blocked_release: false
    fact_gate_decision: pass
    fact_check_ref: review-log-fact-check-2026-05-31-02
    hallucination_ratio: 0.00
    verifiability_rate: 0.98
    required_followups: []
    review_ref: review-log-2026-05-31-02
```

## 聚合结果

```yaml
stats:
  total_changes: 2
  l3_changes: 0
  blocked_changes: 1
  blocked_by_fact_check: 1
  unresolved_followups: 1
  max_hallucination_ratio: 0.50
  min_verifiability_rate: 0.98
release_go_no_go: no-go
decision_reason: fact-check failure exists and followups are unresolved
approved_by: architecture-reviewer
approved_at: 2026-05-31
```

## 说明

- 本窗口存在 fact_gate_decision = fail 条目，因此必须 no-go
- 完成 rebound_to_discovery 并 rerun_golden_set 后方可重算发布结论
