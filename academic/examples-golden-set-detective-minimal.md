# Example: Golden Set Detective Minimal

本页给出 detective profile 的最小可执行填报样例，用于验证同核异配下的回归门禁。

## 基本信息

```yaml
template_id: golden-set-detective-profile-v1
baseline_version: baseline-2026-05-r1
profile: detective
threshold_tier: standard
tier_rationale: regular-release-baseline
owner: narrative-method-owner
reviewer: architecture-reviewer
run_date: 2026-05-31
```

## 样例清单

```yaml
cases:
  - case_id: dt-001
    corpus_id: corpus-detective-001
    task_type: clue_chain_consistency
    expected_strength: moderate
```

## 回归检查结果

1. claim-evidence-warrant 链完整率：通过
2. unresolved_counterevidence 比例：通过
3. strength_shift 解释完整度：通过
4. source_spans 回链有效率：通过
5. narrative_bias_misjudge 检查：通过

## 结果摘要

```yaml
traceability_pass_rate: 0.94
strength_shift_explained_rate: 1.00
unresolved_counterevidence_ratio: 0.04
narrative_bias_misjudge_count: 0
gate_decision: pass
approved_by: narrative-method-owner
approved_at: 2026-05-31
```

## 失败样本记录

```yaml
failures: []
```

## 签署

- Kernel Owner: narrative-method-owner
- Profile Owner: detective-profile-owner
- Reviewer: architecture-reviewer

## Fail 分支演示（示例）

以下为失败路径示例，用于说明 gate_decision = fail 时的标准处置：

```yaml
traceability_pass_rate: 0.90
strength_shift_explained_rate: 0.93
unresolved_counterevidence_ratio: 0.10
narrative_bias_misjudge_count: 2
gate_decision: fail
required_actions:
  - fix_bias_misjudge
  - resolve_counterevidence
  - rerun_golden_set
publish_blocked: true
```

处置说明：

- 本轮禁止对外提交
- 完成 required_actions 后必须重新触发回归门禁
