# Golden Set Template: Fact Check Ledger

本模板用于记录一次或一组事实核查结果，并将其纳入 Golden Set 回归门禁。

协议参见： [Fact Verification Protocol](fact-verification-protocol.md)

字段口径参见： [Golden Set Field Dictionary](golden-set-field-dictionary.md)

## 基本信息

```yaml
template_id: golden-set-fact-check-ledger-v1
baseline_version: <version>
profile: research | detective
threshold_tier: standard
owner: <owner>
reviewer: <reviewer>
run_date: <yyyy-mm-dd>
```

## 候选事实与核查结果

```yaml
fact_checks:
  - fact_candidate_id: <id>
    claim_id: <claim-id>
    verification_status: verified | refuted | controversial | unverifiable
    grounding_source: <source-id-or-type>
    rationale_spans:
      - <span-ref>
    required_actions:
      - rerun_golden_set
```

## 指标摘要

```yaml
verifiability_rate: <value>
hallucination_ratio: <value>
controversial_ratio: <value>
gate_decision: pass | fail
publish_blocked: true | false
```

## 失败分支记录

```yaml
failures:
  - fact_candidate_id: <id>
    reason: fact_refuted | hallucination_detected | retrieval_gap
    action: rebound_to_discovery | update_grounding_baseline | resolve_counterevidence | rerun_golden_set
```

## 签署

- Kernel Owner: <name>
- Profile Owner: <name>
- Reviewer: <name>
