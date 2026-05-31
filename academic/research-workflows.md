# Research Workflows

本页提供研究者可直接复用的任务型工作流模板。

## Kernel 与 Composer 分层

本页只承载 Scenario Composer（配置装配层）工作流，不定义 Method Kernel 内部规则。

- Kernel 规则统一维护在 [Trust and Methodology](trust-methodology.md)
- 本页负责将同一内核组合为不同 profile

## Scenario Composer 配置模型（建议基线）

```yaml
study_id: study-001
profile: research | detective
methods_pipeline:
  - evidence_linking
  - counterevidence_check
  - strength_scoring
aggregation_policy: conservative | balanced | aggressive
evidence_priority:
  - primary_source
  - secondary_source
terminology_map: default | academic | detective
report_profile: concise | review_ready | publication_ready
```

约束：

- profile 只影响组合策略，不得覆盖 Kernel 不可变规则
- aggregation_policy 必须在报告中明示
- terminology_map 只能改写术语展示，不改变结论强度逻辑

## Reference Profiles

### Research Profile（科学文献）

- 适配框架：PRISMA/ROB/GRADE/FAIR
- 目标：证据链可复核、偏倚风险可解释、结论强度可降级
- 注意：这些框架属于上层适配，不进入 Kernel 本体

### Detective Profile（推理叙事）

- 适配对象：线索链、叙事偏差、解释闭环
- 目标：同核异配验证，确保领域切换不改底层规则
- 注意：叙事技巧不得被误判为高强度证据

## 工作流使用规则

- 每个工作流必须绑定一个 study_id
- 每个工作流必须有 baseline
- 每个工作流必须输出失败样本摘要

## Workflow A: 系统综述支持

- 输入：文献摘要或全文样本集
- 任务：识别叙事结构模式、论证断点与主题聚集
- 输出：结构化观察表 + 证据链清单

推荐 profile：research

推荐绑定：

- 模板来源： [whitepaper/study-template-v2-corpus-comparative-analysis.md](../whitepaper/study-template-v2-corpus-comparative-analysis.md)
- 证据回链： [whitepaper/reproducibility-package-evidence-traceability.md](../whitepaper/reproducibility-package-evidence-traceability.md)

## Workflow B: 主题演化观察

- 输入：按时间分段的文本集合
- 任务：比较不同时间窗中的叙事变化与稳定段
- 输出：变化点摘要 + 差异解释说明

推荐 profile：research

建议主指标：

- topic_transition_rate
- segment_density_by_1k_chars

## Workflow C: 对比研究论证

- 输入：两个或多个对照语料
- 任务：对齐分析维度并输出差异证据
- 输出：对比表 + 可复核引用位置

可选 profile：research 或 detective（按语料类型选择）

建议最小输出：

- compare_table.csv
- stability_check_note.md
- failure_case_table.yaml

## Workflow D: 同核异配稳定性检查

- 输入：同一 Kernel 下的 research 与 detective 双 profile 结果
- 任务：检查结论强度跳变是否由证据变化触发，而非术语映射触发
- 输出：profile_diff_report.md + regression_gate_result.yaml

建议最小输出：

- profile_diff_report.md
- regression_gate_result.yaml
- counterevidence_resolution_log.md

## Workflow E: Golden Set 回归门禁

- 输入：Golden Set 样例集（research + detective）
- 任务：验证 profile 变更后内核行为是否保持稳定
- 输出：golden_set_regression_report.md + gate_decision.yaml

建议最小输出：

- golden_set_regression_report.md
- gate_decision.yaml
- strength_shift_audit.csv
- span_traceability_audit.csv

## Workflow F: 事实发现与核查闭环

- 输入：claim 候选集 + 检索证据池
- 任务：按 Discover -> Retrieve -> Verify -> Aggregate 顺序完成事实闭环
- 输出：fact_check_ledger.yaml + verification_summary.md

建议最小输出：

- fact_check_ledger.yaml
- verification_summary.md
- evidence_retrieval_audit.csv
- gate_decision.yaml

## 每个工作流必须满足

- 输入范围可描述
- 参数选择有理由
- 输出可被独立复核

## 验收门槛

1. 至少 1 个主指标有明确口径
2. 至少 1 个辅助指标用于解释主结论
3. 至少 3 个失败样本被记录并分类
4. 有可追踪 evidence_link
5. profile 切换后，结论强度变化需有 degrade_reasons 解释
6. Golden Set 回归结果必须可追溯到 baseline_version

## 作业单入口

- [whitepaper/rsch-task-001-v2-corpus-runbook.md](../whitepaper/rsch-task-001-v2-corpus-runbook.md)
- [whitepaper/bench-task-001-evidence-traceability-audit.md](../whitepaper/bench-task-001-evidence-traceability-audit.md)
- [whitepaper/anno-task-001-segmentation-consistency.md](../whitepaper/anno-task-001-segmentation-consistency.md)
- [Example: Evidence Traceability First Snapshot](examples-evidence-traceability-first-snapshot.md)
- [Example: Systematic Review Minimal Loop](examples-systematic-review-minimal.md)
- [Example: Topic Evolution Three-Slice](examples-topic-evolution-three-slice.md)
- [Template: Golden Set Research Profile](templates-golden-set-research-profile.md)
- [Template: Golden Set Detective Profile](templates-golden-set-detective-profile.md)
- [Guide: Golden Set Field Dictionary](golden-set-field-dictionary.md)
- [Policy: Golden Set Threshold Policy](golden-set-threshold-policy.md)
- [Playbook: Golden Set Action Playbook](golden-set-action-playbook.md)
- [Guide: Golden Set Change Impact Matrix](golden-set-change-impact-matrix.md)
- [Template: Golden Set Change Review](templates-golden-set-change-review.md)
- [Example: Golden Set Change Review Minimal](examples-golden-set-change-review-minimal.md)
- [Template: Golden Set Release Ledger](templates-golden-set-release-ledger.md)
- [Example: Golden Set Release Ledger Minimal](examples-golden-set-release-ledger-minimal.md)
- [Protocol: Fact Verification](fact-verification-protocol.md)
- [Guide: Fact Verification Method Stack](fact-verification-method-stack.md)
- [Template: Golden Set Fact Check Ledger](templates-golden-set-fact-check-ledger.md)
- [Example: Golden Set Fact Check Ledger Minimal](examples-golden-set-fact-check-ledger-minimal.md)
- [Example: Golden Set Research Minimal](examples-golden-set-research-minimal.md)
- [Example: Golden Set Detective Minimal](examples-golden-set-detective-minimal.md)

## 关联

- [10-Minute First Success](10-minute-first-success.md)
- [Publication Support](publication-support.md)