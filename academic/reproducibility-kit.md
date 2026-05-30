# Reproducibility Kit

本页定义研究复跑所需的最小证据包，目标是让 reviewer 能独立复核结果。

## 与发布口径的关系

复现包齐备仅表示任务可复跑，不等于指标已进入 measured。

从 planned 升级到 measured，至少同时具备：

- 版本号
- 样本量
- 时间窗口
- 计算口径
- 证据链接

参考： [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)

## 最小复现包

每次分析至少包含以下条目：

- 输入数据标识（来源、版本、时间戳）
- 参数配置（阈值、过滤条件、窗口范围）
- 运行环境（工具版本、模型版本、执行时间）
- 输出清单（图、表、摘要、日志）
- 差异说明（与历史结果不同之处及原因）

## 建议目录结构

```text
repro-package/
  study.yaml
  input/
    corpus_manifest.yaml
  config/
    run_config.yaml
  output/
    metrics_summary.yaml
    compare_table.csv
  logs/
    run.log
  notes/
    failure_case_table.yaml
    delta_note.md
```

## study.yaml 最小字段

```yaml
study_id: STUDY-XXX
status: study-ready
research_question: <question>
hypothesis: <falsifiable-hypothesis>
metrics:
  primary:
    - <metric-a>
  secondary:
    - <metric-b>
baseline: <baseline-method>
version: vX.Y.Z
sample_size: N
time_window: YYYY-MM-DD..YYYY-MM-DD
evidence_link: <path-or-pr>
```

## 失败案例表建议字段

```yaml
failure_cases:
  - item_id: <id>
    failure_reason: missing_pointer | invalid_pointer | wrong_resolution | weak_support | version_mismatch
    impact: low | medium | high
    suggested_action: <action>
```

## 复跑检查清单

1. 输入文件与版本号可定位
2. 参数文件完整且可读
3. 输出文件与报告中的结论一一对应
4. 差异说明包含“变化点 + 可能原因 + 影响范围”
5. 失败案例至少包含 3 条并有原因标签
6. 若主指标声称 measured，必须可回查 sample_size 与 time_window

## 关联

- [Trust and Methodology](trust-methodology.md)
- [10-Minute First Success](10-minute-first-success.md)