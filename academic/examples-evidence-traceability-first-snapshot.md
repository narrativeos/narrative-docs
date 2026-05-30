# Example: Evidence Traceability First Snapshot

本页提供一个可直接执行的首轮采集作业单，用于把 evidence_traceability_rate 从模板推进到第一份 measured 候选记录。

## 作业单元信息

```yaml
task_id: ACAD-BENCH-001
linked_whitepaper_task: BENCH-TASK-001
metric_id: METRIC-EVIDENCE-TRACEABILITY
metric_name: evidence_traceability_rate
claim_level_target: evidence-ready
status: in_progress
owner: research
reviewer: maintainer
```

## 输入准备

1. 选择 1 组单文 diagnostics 输出
2. 固定 parser_version 与 schema_version
3. 导出原文切片索引

建议参考：

首轮回填样例：

- [examples-acad-bench-001-first-fill-sample.md](examples-acad-bench-001-first-fill-sample.md)
- [whitepaper/reproducibility-package-evidence-traceability.md](../whitepaper/reproducibility-package-evidence-traceability.md)
- [whitepaper/bench-task-001-evidence-traceability-audit.md](../whitepaper/bench-task-001-evidence-traceability-audit.md)

## 执行步骤

1. 运行指针解析，记录可解析/不可解析条目。
2. 人工复核语义支撑强度，标注失败类型。
3. 计算三项指标：
   - evidence_traceability_rate
   - unsupported_conclusion_ratio
   - invalid_evidence_pointer_ratio
4. 输出失败案例表与 delta 说明。

## 输出清单

```text
repro-package/
  study.yaml
  output/metrics_summary.yaml
  notes/failure_case_table.yaml
  notes/delta_note.md
```

## 升级检查（planned -> measured）

仅当以下字段全部齐备，才可申请在 benchmark 页登记 measured：

- version
- sample_size
- time_window
- calculation_method
- evidence_link

登记位置：

- [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)
- [whitepaper/evidence-registry.md](../whitepaper/evidence-registry.md)

## 风险与止损

- 若 failure_reason 以 weak_support 为主，应先修订结论生成规则，不直接宣称指标提升。
- 若 failure_reason 以 version_mismatch 为主，应先冻结工具版本再复跑。
- 若样本量不足，结论保留在 study-ready，不升级口径。