# ALGO-TASK-001 First Run Book

## Executive Summary (EN)

This runbook provides the first execution skeleton for ALGO-TASK-001. It is intended for a laptop-baseline feasibility run with frozen versions and a small bounded sample set.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algo-task-001-runbook
path: whitepaper/algo-task-001-runbook.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ALGO-TASK-001
status: in_progress
owner: research
reviewer: maintainer
template_type: runbook
```

## 目标 | Goal

将 ALGO-TASK-001 的文档级可行性判断转成可直接执行的首轮运行骨架，覆盖：

- 样本冻结
- 参数冻结
- 输出冻结
- 失败模式冻结

## 运行前置条件 | Preflight

```yaml
run_id: ALGO-RUN-001
task_id: ALGO-TASK-001
status: pending
time_window: 2026-06-01..2026-06-07
sample_size_target: 12..20
sample_scope:
  - segmentation_quality
  - compare_stability
  - evidence_traceability_accuracy
hardware_profile:
  class: mainstream-laptop-under-10000-rmb
  cpu_threads: 12..16
  memory_gb: 16..32
runtime_profile:
  default_mode: fast_scan_first
  full_mri_policy: on_demand
  retrieval_top_k: 50
  rerank_top_k: 20
  verify_batch_size: 8
version_freeze:
  parser_version: parser-v1
  schema_version: diagnostics-v1
  model_or_rule_version: freeze-at-run-start
threshold_tier: standard
tier_rationale: regular-release-baseline
owner: research
reviewer: maintainer
```

## 样本冻结 | Sample Freeze

推荐样本槽位：

| sample_id | source_doi | provisional_role | include | note |
| --- | --- | --- | --- | --- |
| ALGO-SAMPLE-001 | 10.1080/21514399.2011.11833931 | calibration text | yes | 用于协议与口径校准 |
| ALGO-SAMPLE-002 | 10.1016/j.ssaho.2025.102295 | backup calibration | yes | 用于流程备份校准 |
| ALGO-SAMPLE-003 | TBD | stability control | yes | 需要后续补入第三样本 |

说明：

- 样本只用于首轮口径校准与分级策略验证。
- 若任何候选无法稳定获取全文，应立即移出样本池。

## 运行步骤 | Execution Steps

1. 冻结样本集合与时间窗口。
2. 冻结 parser / schema / rule versions。
3. 以 `fast_scan_first` 跑首遍。
4. 仅对高风险或不确定条目触发 `full_mri`。
5. 记录失败原因与资源峰值。
6. 填写 measurement sheet。
7. 生成 rerun delta note。

## 输出模板 | Output Templates

### metrics_summary.yaml

```yaml
run_id: ALGO-RUN-001
sample_size: TBD
time_window: TBD
segment_boundary_consistency: TBD
difference_direction_stability: TBD
evidence_traceability_rate: TBD
unsupported_conclusion_ratio: TBD
invalid_evidence_pointer_ratio: TBD
notes: 首轮只用于可行性与口径校准，不用于对外宣称 measured
```

### failure_case_table.md

```md
| case_id | sample_id | metric_axis | failure_reason | reviewer_note |
| --- | --- | --- | --- | --- |
| TBD | ALGO-SAMPLE-001 | segmentation_quality | missing_boundary | TBD |
| TBD | ALGO-SAMPLE-002 | compare_stability | unresolved_counterevidence | TBD |
| TBD | ALGO-SAMPLE-003 | traceability_accuracy | invalid_pointer | TBD |
```

### rerun_delta_note.md

```md
# Rerun Delta Note

| rerun_id | parameter_changed | old_value | new_value | expected_effect | observed_effect |
| --- | --- | --- | --- | --- | --- |
| ALGO-RERUN-001 | retrieval_top_k | 50 | TBD | reduce latency and memory pressure | TBD |
| ALGO-RERUN-002 | rerank_top_k | 20 | TBD | reduce rerank cost | TBD |
| ALGO-RERUN-003 | verify_batch_size | 8 | TBD | smooth peak memory | TBD |
```

## Gate Checklist

- [ ] 样本集合已冻结
- [ ] 版本信息已冻结
- [ ] 最少 1 组 failure case 已记录
- [ ] measurement sheet 已回填
- [ ] 复跑差异说明已写入

## Related Docs

- [algorithm-evaluation-report.md](algorithm-evaluation-report.md)
- [error-taxonomy-and-fix-plan.md](error-taxonomy-and-fix-plan.md)
- [algo-task-001-measurement-sheet.md](algo-task-001-measurement-sheet.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [evidence-registry.md](evidence-registry.md)
