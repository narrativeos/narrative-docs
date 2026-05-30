# Example: ACAD-BENCH-001 First Fill Sample

本页给出 ACAD-BENCH-001 的首轮填报样例，目标是统一 metrics summary、台账回填和周报记录格式。

## 样例说明

- 本样例用于演示填报格式，不代表正式 measured 结果。
- 若字段不完整，状态保持 planned 或 study-ready。

## study.yaml 示例

```yaml
study_id: STUDY-EVIDENCE-001
task_id: ACAD-BENCH-001
status: study-ready
version: v0.1.0
sample_size: 12
time_window: 2026-05-26..2026-05-30
calculation_method: evidence pointer resolve + human semantic verification
evidence_link: academic/examples-acad-bench-001-first-fill-sample.md
owner: research
reviewer: maintainer
```

## metrics_summary.yaml 示例

```yaml
metrics_summary:
  evidence_traceability_rate: 0.83
  unsupported_conclusion_ratio: 0.10
  invalid_evidence_pointer_ratio: 0.07
quality_flags:
  schema_consistent: true
  parser_version_frozen: true
  human_review_completed: true
claim_level_assessment: study-ready
```

## failure_case_table.yaml 示例

```yaml
failure_cases:
  - item_id: diag-04
    failure_reason: weak_support
    impact: medium
    suggested_action: tighten conclusion generation threshold
  - item_id: diag-09
    failure_reason: invalid_pointer
    impact: high
    suggested_action: rerun pointer resolver with frozen parser
  - item_id: diag-11
    failure_reason: version_mismatch
    impact: high
    suggested_action: align diagnostics schema and parser version
```

## 周报回填示例

可直接回填到：

- [../developer/operations/academic-adoption-weekly-status-report-template.md](../developer/operations/academic-adoption-weekly-status-report-template.md)

示例行：

| metric_id | status_before | status_after | value | version | sample_size | time_window | evidence_link |
| --- | --- | --- | --- | --- | --- | --- | --- |
| METRIC-EVIDENCE-TRACEABILITY | planned | planned | 0.83 | v0.1.0 | 12 | 2026-05-26..2026-05-30 | academic/examples-acad-bench-001-first-fill-sample.md |

## Evidence Registry 回填示例

可直接回填到：

- [../whitepaper/evidence-registry.md](../whitepaper/evidence-registry.md)

示例条目：

```yaml
evidence_id: ACAD-001
evidence_type: workflow_observation
source: academic/examples-acad-bench-001-first-fill-sample.md
date: 2026-05-30
summary: ACAD-BENCH-001 first fill completed with study-ready metrics snapshot.
linked_document: whitepaper/benchmark-and-acceptance-metrics.md
linked_decision: Keep claim level as study-ready until measured upgrade conditions are fully met.
owner: research
```

## 升级检查结论

- version: pass
- sample_size: pass
- time_window: pass
- calculation_method: pass
- evidence_link: pass

当前建议：

- 字段齐备，但样本量仍小，先维持 study-ready。
- 完成下一轮扩样后再申请 measured 升级。

## 关联

- [examples-evidence-traceability-first-snapshot.md](examples-evidence-traceability-first-snapshot.md)
- [reproducibility-kit.md](reproducibility-kit.md)
- [../whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)