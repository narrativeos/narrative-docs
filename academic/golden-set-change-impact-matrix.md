# Golden Set Change Impact Matrix

本页定义常见修复动作对指标波动、回归范围和发布约束的影响，用于统一变更评估口径。

## 使用方式

1. 识别本轮变更动作（required_actions）
2. 查找对应影响级别（impact_level）
3. 按要求执行重跑范围（rerun_scope）
4. 依据发布限制（release_constraint）决策是否可发布

## 影响级别定义

- L1（局部）：仅影响单样例或单字段展示
- L2（中等）：影响单 profile 的强度或证据解释
- L3（全局）：影响 Kernel 规则、阈值或跨 profile 一致性

## 变更影响矩阵

| action | impact_level | affected_metrics | rerun_scope | release_constraint |
| --- | --- | --- | --- | --- |
| rerun_golden_set | L1 | 无新增指标影响 | 当前变更样例集 | 必须附 rerun_result |
| resolve_counterevidence | L2 | unresolved_counterevidence_ratio, strength_shift_explained_rate | 当前 profile 全量 Golden Set | 未完成前禁止发布 |
| fix_unsupported_causality | L2 | unsupported_causality_count, strength_shift_explained_rate | research profile 全量 Golden Set | strict 档位建议 |
| fix_bias_misjudge | L2 | narrative_bias_misjudge_count, strength_shift_explained_rate | detective profile 全量 Golden Set | strict 档位建议 |
| rebound_to_discovery | L2 | verifiability_rate, hallucination_ratio | 当前 profile 全量 Fact Check Ledger + Golden Set | 未完成前禁止发布 |
| update_grounding_baseline | L3 | verifiability_rate, hallucination_ratio, traceability_pass_rate | research + detective 双 profile 全量 Golden Set | 必须经 Kernel Owner 审批 |
| threshold_tier change | L3 | 所有门禁指标阈值解释 | research + detective 双 profile 全量 Golden Set | 必须经 Kernel Owner 审批 |
| degrade trigger change | L3 | strength_shift_explained_rate, traceability_pass_rate | 全量 Golden Set + 历史对照抽样 | 未通过前禁止发布 |

## 强制升级条件（自动提升到 L3）

出现以下任一条件时，按 L3 执行：

- 同时修改两个及以上标准动作
- 修改了 Failure Taxonomy 或降级触发规则
- 连续两轮出现 gate_decision = fail

## 最小记录模板

```yaml
change_id: <id>
actions:
  - <action>
impact_level: L1 | L2 | L3
rerun_scope: <scope>
release_constraint: <constraint>
approved_by: <owner>
```

## 关联

- [Golden Set Action Playbook](golden-set-action-playbook.md)
- [Golden Set Threshold Policy](golden-set-threshold-policy.md)
- [Golden Set Field Dictionary](golden-set-field-dictionary.md)
- [Template: Golden Set Change Review](templates-golden-set-change-review.md)
- [Example: Golden Set Change Review Minimal](examples-golden-set-change-review-minimal.md)
