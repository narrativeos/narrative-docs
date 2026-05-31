# Golden Set Template: Detective Profile

本模板用于 detective/narrative 场景的 Golden Set 回归门禁记录。

字段口径参见： [Golden Set Field Dictionary](golden-set-field-dictionary.md)

阈值策略参见： [Golden Set Threshold Policy](golden-set-threshold-policy.md)

动作顺序参见： [Golden Set Action Playbook](golden-set-action-playbook.md)

## 使用范围

- profile: detective
- 目标：验证线索链与叙事偏差适配不破坏 Method Kernel 稳定性

## 基本信息

```yaml
template_id: golden-set-detective-profile-v1
baseline_version: <version>
profile: detective
threshold_tier: standard
owner: <owner>
reviewer: <reviewer>
run_date: <yyyy-mm-dd>
```

## 样例清单

```yaml
cases:
  - case_id: dt-001
    corpus_id: <corpus-id>
    task_type: clue_chain_consistency
    expected_strength: moderate
  - case_id: dt-002
    corpus_id: <corpus-id>
    task_type: narrator_reliability
    expected_strength: weak
```

## 回归检查项

1. claim-evidence-warrant 链完整率是否下降
2. unresolved_counterevidence 比例是否超过阈值
3. strength_shift 是否均有 degrade_reasons
4. source_spans 回链有效率是否达标
5. 是否出现叙事偏差误判（如信息延迟披露被当作高强度证据）

## 结果摘要

```yaml
traceability_pass_rate: <value>
strength_shift_explained_rate: <value>
unresolved_counterevidence_ratio: <value>
narrative_bias_misjudge_count: <value>
gate_decision: pass | fail
```

## 失败样本记录（必填）

`action` 字段建议使用 [Golden Set Field Dictionary](golden-set-field-dictionary.md) 中的标准动作枚举。

```yaml
failures:
  - case_id: <case-id>
    reason: missing_pointer | weak_support | unresolved_counterevidence | scope_mismatch
    action: <fix-action>
```

## 签署

- Kernel Owner: <name>
- Profile Owner: <name>
- Reviewer: <name>
