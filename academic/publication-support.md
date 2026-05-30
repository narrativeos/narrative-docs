# Publication Support

本页提供可直接进入论文与审稿流程的模板。

## 对外措辞规则

- 若指标状态是 planned，只能写“目标”或“预期”
- 若指标状态是 measured，必须给出版本、样本量、时间窗口与证据链接
- 若任务只到 study-ready，不写“已验证稳定”

参考： [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)

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