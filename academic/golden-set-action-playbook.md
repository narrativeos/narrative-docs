# Golden Set Action Playbook

本页定义 gate_decision = fail 时的标准处置顺序，确保不同团队按统一动作闭环执行。

## 适用范围

- 适用对象：research / detective profile
- 触发条件：任一门禁指标未达阈值，或存在高风险失败信号

## 处置总流程

1. 分类失败信号（cause classification）
2. 绑定标准动作（required_actions mapping）
3. 按顺序执行修复（ordered execution）
4. 复核证据链与边界（evidence/boundary recheck）
5. 重跑 Golden Set（rerun gate）

## 标准动作映射

- unsupported_causality -> fix_unsupported_causality
- unresolved_counterevidence -> resolve_counterevidence
- narrative_bias_misjudge_count > 0 -> fix_bias_misjudge
- fact_refuted -> rebound_to_discovery
- hallucination_detected -> update_grounding_baseline
- 任意修复后 -> rerun_golden_set

## 执行顺序建议

### Research Fail Path

1. fix_unsupported_causality
2. resolve_counterevidence
3. rerun_golden_set

### Detective Fail Path

1. fix_bias_misjudge
2. resolve_counterevidence
3. rerun_golden_set

### Fact Check Fail Path

1. rebound_to_discovery
2. update_grounding_baseline
3. resolve_counterevidence
4. rerun_golden_set

## 强制重跑条件

出现以下任一情况，必须重跑 Golden Set：

- 修改了证据定位或 source_spans
- 修改了降级触发或强度判断逻辑
- 调整了 threshold_tier
- 新增/删除了失败样本

## 输出工件清单

- updated_failure_log.yaml
- action_execution_note.md
- rerun_result.yaml
- gate_decision.yaml

## 角色建议

- Kernel Owner：审核动作顺序与阈值选择
- Profile Owner：执行修复并提交回归结果
- Reviewer：确认 fail -> fix -> rerun 闭环完整

## 影响评估联动

执行动作前，建议先参考 [Golden Set Change Impact Matrix](golden-set-change-impact-matrix.md) 评估重跑范围与发布限制。

## 关联

- [Golden Set Field Dictionary](golden-set-field-dictionary.md)
- [Golden Set Threshold Policy](golden-set-threshold-policy.md)
- [Golden Set Change Impact Matrix](golden-set-change-impact-matrix.md)
- [Template: Golden Set Research Profile](templates-golden-set-research-profile.md)
- [Template: Golden Set Detective Profile](templates-golden-set-detective-profile.md)
