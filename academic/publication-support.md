# Publication Support

本页提供可直接进入论文与审稿流程的模板。

## Kernel First 投稿约束

投稿材料应先满足 Method Kernel 的统一质量门禁，再进入领域化叙述。

- 不允许仅基于术语映射提升结论强度
- 不允许绕过反证处理直接输出最终结论
- 不允许隐藏 degrade_reasons

## 对外措辞规则

- 若指标状态是 planned，只能写“目标”或“预期”
- 若指标状态是 measured，必须给出版本、样本量、时间窗口与证据链接
- 若任务只到 study-ready，不写“已验证稳定”

参考： [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)

## 审稿式压力测试清单（发布前）

1. 可证伪性：是否提供了潜在反例或替代解释路径
2. 外推边界：结论是否明确限定在样本与方法边界内
3. 冲突证据处理：是否记录并解释了冲突证据
4. 因果谨慎性：是否把相关性误写为因果
5. 回链完整性：每条核心结论是否可跳转到 source_spans

建议将清单结果以附件形式随稿提交，便于审稿复核。

## 发布门禁（最低通过条件）

以下条件全部满足才可进入对外提交：

1. 核心结论均具备 claim-evidence-warrant 完整链
2. 每条核心结论至少一条 counterevidence 或 alternative 记录
3. strength 与 confidence、degrade_reasons 自洽
4. profile 与 aggregation_policy 已在方法段明示

## 回归门禁附件模板（建议随稿提供）

建议在补充材料中附上一页回归门禁摘要：

```text
baseline_version: <version>
profile_set: [research, detective]
golden_set_cases: <count>
traceability_pass_rate: <value>
strength_shift_explained_rate: <value>
unresolved_counterevidence_ratio: <value>
gate_decision: pass | fail
reviewer: <name_or_role>
```

说明：

- gate_decision = fail 时，不应进行对外提交
- 若存在强度跳变，必须在附件中列出对应 degrade_reasons
- 若本轮涉及 required_actions 或阈值调整，建议附上 [Template: Golden Set Change Review](templates-golden-set-change-review.md) 的填报结果
- 若一个发布窗口包含多笔变更，建议附上 [Template: Golden Set Release Ledger](templates-golden-set-release-ledger.md) 的聚合结论
- 若涉及事实核查，建议附上 [Template: Golden Set Fact Check Ledger](templates-golden-set-fact-check-ledger.md) 并注明 verification_status 分布
- 若 fact_gate_decision = fail，则本轮不得对外发布

## 方法段模板（骨架）

1. 研究对象与数据范围
2. 分析步骤与参数设置
3. 指标定义与边界
4. 结果验证与局限性

可直接填充模板：

```text
本研究基于 <corpus_id> 语料，在 <time_window> 时间窗内进行对比分析。
任务定义为 <task_definition>，主指标为 <metric_primary>，辅助指标为 <metric_secondary>。
为确保可复核性，我们记录了输入版本、参数配置与运行环境，并通过 <baseline> 进行对照。
本研究当前处于 <claim_level>，因此结论仅在该边界内成立。
```

## 图注模板（骨架）

- 图展示对象
- 生成条件（数据版本、参数）
- 关键观察
- 解释边界

可直接填充模板：

```text
图 X 展示 <object> 在 <time_window> 条件下的变化。
图由 <version> 配置生成，参数为 <params>。
可观察到 <finding>，但该结果仅适用于 <scope>。
```

## 局限性声明模板（骨架）

- 数据覆盖限制
- 方法适用范围
- 结果泛化风险
- 后续验证计划

可直接填充模板：

```text
本研究样本主要来自 <source_scope>，因此不覆盖 <excluded_scope>。
方法在 <applicable_context> 下表现稳定，但在 <non_applicable_context> 下尚未验证。
我们已记录失败案例并计划在下一轮扩样中复核 <next_validation_target>。
```

## 审稿回应模板（骨架）

1. 审稿问题复述
2. 证据链回应
3. 已修改内容
4. 未修改部分及理由

可直接填充模板：

```text
感谢审稿意见。针对“<question>”，我们补充了 <evidence_or_analysis>。
对应修改位于 <section_or_file>，并新增 <artifact> 以支持复核。
未修改部分为 <not_changed_scope>，理由是 <reason_with_boundary>。
```

## 关联

- [Trust and Methodology](trust-methodology.md)
- [Reproducibility Kit](reproducibility-kit.md)
- [Research Workflows](research-workflows.md)
- [Guide: Golden Set Change Impact Matrix](golden-set-change-impact-matrix.md)
- [Template: Golden Set Change Review](templates-golden-set-change-review.md)
- [Template: Golden Set Release Ledger](templates-golden-set-release-ledger.md)
- [Protocol: Fact Verification](fact-verification-protocol.md)
- [Guide: Fact Verification Method Stack](fact-verification-method-stack.md)
- [Template: Golden Set Fact Check Ledger](templates-golden-set-fact-check-ledger.md)