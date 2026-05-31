# Example: Golden Set Fact Check Ledger Minimal

本页给出事实核查台账的最小样例，用于演示核查状态如何影响门禁与发布。

## 基本信息

```yaml
template_id: golden-set-fact-check-ledger-v1
baseline_version: baseline-2026-05-r1
profile: research
threshold_tier: standard
owner: academic-method-owner
reviewer: architecture-reviewer
run_date: 2026-05-31
```

## 候选事实与核查结果

```yaml
fact_checks:
  - fact_candidate_id: fc-001
    claim_id: c-001
    verification_status: verified
    grounding_source: doi:10.1000/example-a
    rationale_spans:
      - sentence:12
    required_actions: []
  - fact_candidate_id: fc-002
    claim_id: c-002
    verification_status: refuted
    grounding_source: doi:10.1000/example-b
    rationale_spans:
      - sentence:48
    required_actions:
      - rebound_to_discovery
      - rerun_golden_set
```

## 指标摘要

```yaml
verifiability_rate: 1.00
hallucination_ratio: 0.50
controversial_ratio: 0.00
gate_decision: fail
publish_blocked: true
```

## 失败分支记录

```yaml
failures:
  - fact_candidate_id: fc-002
    reason: fact_refuted
    action: rebound_to_discovery
```

## 说明

- 因存在 refuted 条目，当前轮 gate_decision 为 fail
- 完成 rebound_to_discovery 后必须 rerun_golden_set
