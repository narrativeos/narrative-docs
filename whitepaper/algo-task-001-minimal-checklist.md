# ALGO-TASK-001 Minimal Checklist (Compact Fill-in)

## Executive Summary (EN)

This compact checklist is the minimal fill-in version of ALGO-TASK-001 execution tracking. It keeps only the fields needed to record an estimated run, a rerun, and the evidence linkage without carrying the full example payload.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algo-task-001-minimal-checklist
path: whitepaper/algo-task-001-minimal-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ALGO-TASK-001
status: in_progress
owner: research
reviewer: maintainer
template_type: minimal-checklist
```

## 适用场景 | Use Cases

- 首轮快速填报
- 复跑差异记录
- 证据链接回填
- 仅做估算值登记，不做 measured 声明

## 1. Run Header

```yaml
run_id: ALGO-RUN-XXX
status: pending | in_progress | done
time_window: YYYY-MM-DD..YYYY-MM-DD
sample_size: TBD
hardware_profile: mainstream-laptop-under-10000-rmb
version_freeze:
  parser_version: TBD
  schema_version: TBD
  model_or_rule_version: TBD
threshold_tier: lenient | standard | strict
owner: research
reviewer: maintainer
```

## 2. Required Fields Per Algorithm

### Fact Verification Pipeline

```yaml
algorithm: Fact Verification Pipeline
instance_description: TBD
scale_assumption: TBD
key_parameters: TBD
estimated_time: TBD
estimated_memory: TBD
confidence: high | medium | low
main_bottleneck: TBD
degrade_action: TBD
evidence_link: TBD
```

### Golden Set Regression Gate

```yaml
algorithm: Golden Set Regression Gate
instance_description: TBD
scale_assumption: TBD
key_parameters: TBD
estimated_time: TBD
estimated_memory: TBD
confidence: high | medium | low
main_bottleneck: none_meaningful
degrade_action: run_every_change
evidence_link: TBD
```

### Strength Degradation Logic

```yaml
algorithm: Strength Degradation Logic
instance_description: TBD
scale_assumption: TBD
key_parameters: TBD
estimated_time: TBD
estimated_memory: TBD
confidence: high | medium | low
main_bottleneck: none_meaningful
degrade_action: keep_default_on
evidence_link: TBD
```

### Analysis Engine Fast Scan

```yaml
algorithm: Analysis Engine Fast Scan
instance_description: TBD
scale_assumption: TBD
key_parameters: TBD
estimated_time: TBD
estimated_memory: TBD
confidence: high | medium | low
main_bottleneck: TBD
degrade_action: risk_based_full_mri
evidence_link: TBD
```

### Analysis Engine Full MRI

```yaml
algorithm: Analysis Engine Full MRI
instance_description: TBD
scale_assumption: TBD
key_parameters: TBD
estimated_time: TBD
estimated_memory: TBD
confidence: high | medium | low
main_bottleneck: TBD
degrade_action: offline_only_and_single_task
evidence_link: TBD
```

### Narrative Segmentation Protocol

```yaml
algorithm: Narrative Segmentation Protocol
instance_description: TBD
scale_assumption: TBD
key_parameters: TBD
estimated_time: TBD
estimated_memory: TBD
confidence: high | medium | low
main_bottleneck: TBD
degrade_action: keep_as_pre_cut
evidence_link: TBD
```

## 3. Compact Result Matrix

| Algorithm | Time | Memory | Tier | Confidence | Bottleneck | Degrade Action | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fact Verification Pipeline | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Golden Set Regression Gate | TBD | TBD | TBD | TBD | none_meaningful | run every change | TBD |
| Strength Degradation Logic | TBD | TBD | TBD | TBD | none_meaningful | keep default on | TBD |
| Analysis Fast Scan | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Analysis Full MRI | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Narrative Segmentation | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## 3.1 Starter Sample (estimated_only)

```yaml
run_id: ALGO-RUN-2026-05-31-A
status: in_progress
time_window: 2026-05-31..2026-06-02
sample_size: 6
hardware_profile: mainstream-laptop-under-10000-rmb
threshold_tier: standard
claim_boundary: planned_only
```

```yaml
algorithm: Fact Verification Pipeline
instance_description: 200-claim hybrid verification pass
scale_assumption: 200 claims, 3 retrieval candidates per claim
key_parameters: BM25 + reranker + NLI
estimated_time: estimated 18-35 min
estimated_memory: estimated 6-10 GB
confidence: medium
main_bottleneck: reranker_and_nli
degrade_action: reduce_candidate_count
evidence_link: whitepaper/algorithm-evaluation-report.md
```

```yaml
algorithm: Analysis Engine Fast Scan
instance_description: short-form interactive scan for a single narrative slice
scale_assumption: 1 slice, limited context window
key_parameters: retrieval + shallow ranking + summary rules
estimated_time: estimated 2-6 min
estimated_memory: estimated 2-4 GB
confidence: medium
main_bottleneck: retrieval_latency
degrade_action: route_to_full_mri_only_when_needed
evidence_link: whitepaper/algorithm-evaluation-report.md
```

```yaml
algorithm: Analysis Engine Full MRI
instance_description: offline deep pass for a full narrative bundle
scale_assumption: batch mode, no interactive latency target
key_parameters: full retrieval + rerank + deep comparison
estimated_time: estimated 45-120 min
estimated_memory: estimated 10-16 GB
confidence: low
main_bottleneck: candidate_explosion
degrade_action: offline_only_and_single_task
evidence_link: whitepaper/algorithm-evaluation-report.md
```

## 4. Stop/Go

```yaml
decision: go | conditional_go | no_go
claim_boundary: planned_only | measured_ready_subset
blocker_notes: TBD
required_actions:
  - TBD
```

## Fill Rules

- 估算值必须显式标注为 estimated。
- 任何 observed/measured 值必须单独补 evidence 链。
- 若字段为空，不要把清单标记为 done。

## Related Docs

- [algo-task-001-execution-checklist.md](algo-task-001-execution-checklist.md)
- [algo-task-001-runbook.md](algo-task-001-runbook.md)
- [algo-task-001-measurement-sheet.md](algo-task-001-measurement-sheet.md)
- [algorithm-evaluation-report.md](algorithm-evaluation-report.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
