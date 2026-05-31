# ALGO-TASK-001 Measurement Sheet (Starter Template)

## Executive Summary (EN)

This sheet defines the minimum measurable template for ALGO-TASK-001 across segmentation quality, compare stability, and evidence traceability. It is a fill-in worksheet and does not claim measured results by itself.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algo-task-001-measurement-sheet
path: whitepaper/algo-task-001-measurement-sheet.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ALGO-TASK-001
status: in_progress
owner: research
reviewer: maintainer
template_type: measurement-sheet
```

## 使用边界 | Usage Boundary

- 本页用于记录 ALGO-TASK-001 的首轮与复跑测量
- 本页不自动代表 measured，需与 evidence_link 和版本冻结信息同时满足
- 未冻结版本信息的结果不得进入正式台账

## Freeze Header (Required)

```yaml
run_id: ALGO-RUN-001
task_id: ALGO-TASK-001
status: pending | in_progress | done
time_window: YYYY-MM-DD..YYYY-MM-DD
sample_size: TBD
sample_scope: TBD
hardware_profile:
  class: mainstream-laptop-under-10000-rmb
  cpu_threads: 12..16
  memory_gb: 16..32
  storage: nvme-ssd
runtime_profile:
  default_mode: fast_scan_first
  full_mri_policy: on_demand
  retrieval_top_k: TBD
  rerank_top_k: TBD
  verify_batch_size: TBD
version_freeze:
  parser_version: TBD
  schema_version: TBD
  model_or_rule_version: TBD
threshold_tier: lenient | standard | strict
tier_rationale: TBD
owner: research
reviewer: maintainer
```

## Axis A: Segmentation Quality

| field | value |
| --- | --- |
| metric_id | segment_boundary_consistency |
| baseline_source | anno-task-001-segmentation-consistency.md |
| baseline_value | TBD |
| current_value | TBD |
| delta | TBD |
| acceptance_target | 相对基线提升或波动可解释 |
| result | pass \| fail \| investigate |
| evidence_link | TBD |

## Axis B: Compare Stability

| field | value |
| --- | --- |
| metric_id | difference_direction_stability |
| baseline_source | rsch-task-001-v2-corpus-runbook.md |
| baseline_value | TBD |
| current_value | TBD |
| direction_reversal_count | TBD |
| acceptance_target | 关键差异方向不反转或可解释 |
| result | pass \| fail \| investigate |
| evidence_link | TBD |

## Axis C: Traceability Accuracy

| field | value |
| --- | --- |
| metric_id | evidence_traceability_rate |
| baseline_source | bench-task-001-evidence-traceability-audit.md |
| baseline_value | TBD |
| current_value | TBD |
| unsupported_conclusion_ratio | TBD |
| invalid_pointer_ratio | TBD |
| acceptance_target | 达到发布门槛并具备错误分布说明 |
| result | pass \| fail \| investigate |
| evidence_link | TBD |

## Error Distribution Snapshot

| error_code | count | ratio | priority | action |
| --- | --- | --- | --- | --- |
| missing_pointer | TBD | TBD | P0 | pointer integrity fix |
| invalid_pointer | TBD | TBD | P0 | pointer parser fix |
| wrong_resolution | TBD | TBD | P0 | resolver calibration |
| unresolved_counterevidence | TBD | TBD | P1 | counterevidence closure |
| unsupported_causality | TBD | TBD | P1 | causality guardrail |
| resource_timeout | TBD | TBD | P2 | runtime profile tuning |

## Gate Decision

```yaml
gate_decision: pass | fail | conditional
blocked_release: true | false
required_actions:
  - rerun_golden_set
  - resolve_counterevidence
  - update_grounding_baseline
notes: TBD
```

## Delta Log (Rerun)

| rerun_id | changed_param | old | new | expected_effect | observed_effect |
| --- | --- | --- | --- | --- | --- |
| ALGO-RERUN-001 | TBD | TBD | TBD | TBD | TBD |

## Related Docs

- [algorithm-evaluation-report.md](algorithm-evaluation-report.md)
- [error-taxonomy-and-fix-plan.md](error-taxonomy-and-fix-plan.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [evidence-registry.md](evidence-registry.md)
