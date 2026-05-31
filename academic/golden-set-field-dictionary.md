# Golden Set Field Dictionary

本页用于统一 Golden Set 模板与样例的字段口径，避免跨团队填写时出现语义漂移。

## 使用规则

- 字段命名优先使用 snake_case
- 同名字段在 research/detective profile 中必须同义
- 不允许在样例中自造同义字段替代本页定义

## 核心字段释义

### baseline_version

- 含义：本轮回归对比所使用的基线版本标识
- 示例：baseline-2026-05-r1
- 约束：必须与 gate_decision 同批次输出

### profile

- 含义：场景配置类型
- 可选值：research | detective
- 约束：仅代表上层配置，不改变 Kernel 规则

### cases

- 含义：本轮回归执行的样例集合
- 最小字段：case_id, corpus_id, task_type, expected_strength
- 约束：至少包含 1 个样例

### expected_strength

- 含义：执行前预期强度等级
- 可选值：strong | moderate | weak | exploratory
- 约束：用于回归偏移审计，不代表最终强度

### traceability_pass_rate

- 含义：source_spans 回链有效率
- 建议口径：有效回链条目数 / 总回链条目数
- 约束：需与 span_traceability_audit 保持一致

### strength_shift_explained_rate

- 含义：强度变化中已提供 degrade_reasons 的比例
- 建议口径：已解释跳变数 / 总跳变数
- 约束：低于门槛时 gate_decision 不应为 pass

### unresolved_counterevidence_ratio

- 含义：冲突证据未解决占比
- 建议口径：未解决冲突条目数 / 冲突条目总数
- 约束：超过阈值必须触发降级或补证

### gate_decision

- 含义：本轮门禁结论
- 可选值：pass | fail
- 约束：fail 时禁止对外提交

### threshold_tier

- 含义：本轮回归采用的阈值档位
- 可选值：lenient | standard | strict
- 约束：默认 standard；若使用 lenient 需记录理由与审批

### fact_candidate_id

- 含义：发现阶段提取的事实候选唯一标识
- 示例：fc-001
- 约束：必须可回链到 claim_id

### verification_status

- 含义：事实核查状态
- 可选值：verified | refuted | controversial | unverifiable
- 约束：refuted 出现时必须触发处置动作

### grounding_source

- 含义：核查依据来源标识（如 DOI、知识库 ID、可信源）
- 约束：必须可复核，不允许留空

### verifiability_rate

- 含义：可验证事实占比
- 建议口径：(verified + refuted) / total_candidates
- 约束：低于阈值时 gate_decision 不应为 pass

### hallucination_ratio

- 含义：被证伪事实占比
- 建议口径：refuted / total_candidates
- 约束：超过阈值必须阻塞发布或触发降级

### fact_check_ref

- 含义：事实核查台账或记录的引用路径/标识
- 约束：涉及事实核查时必须可追踪到具体台账

### fact_gate_decision

- 含义：事实核查门禁结论
- 可选值：pass | fail
- 约束：fail 时 blocked_release 必须为 true

## 域专用扩展字段

### unsupported_causality_count（research）

- 含义：把相关性误写为因果的条目数
- 约束：大于 0 时应记录修复动作

### narrative_bias_misjudge_count（detective）

- 含义：叙事偏差被误判为高强度证据的条目数
- 约束：大于 0 时应复核 terminology_map 与 evidence_priority

## 失败原因枚举（reason）

- missing_pointer
- weak_support
- unresolved_counterevidence
- unsupported_causality
- scope_mismatch
- fact_refuted
- hallucination_detected
- retrieval_gap

## 处置动作枚举（required_actions / action）

以下动作名为标准枚举，建议在 `required_actions` 与失败样本 `action` 字段中复用：

- rerun_golden_set：修复后重新执行回归门禁
- resolve_counterevidence：补充或解决冲突证据
- fix_unsupported_causality：修复错误因果表述（research 常用）
- fix_bias_misjudge：修复叙事偏差误判（detective 常用）
- rebound_to_discovery：回退到发现阶段重新抽取候选事实
- update_grounding_baseline：更新核查依据源或基线

约束：

- 优先使用标准枚举，不建议自由命名
- 如需新增动作，先在本页补充释义后再落样例

## 关联

- [Template: Golden Set Research Profile](templates-golden-set-research-profile.md)
- [Template: Golden Set Detective Profile](templates-golden-set-detective-profile.md)
- [Golden Set Threshold Policy](golden-set-threshold-policy.md)
- [Golden Set Action Playbook](golden-set-action-playbook.md)
- [Example: Golden Set Research Minimal](examples-golden-set-research-minimal.md)
- [Example: Golden Set Detective Minimal](examples-golden-set-detective-minimal.md)
