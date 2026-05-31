# ALGO-TASK-001 Execution Checklist (Fill-in Ready)

## Executive Summary (EN)

This checklist turns ALGO-TASK-001 estimates into an execution-ready fill-in workflow. It is designed for consistent data entry, rerun tracking, and evidence registration on mainstream laptop baselines.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algo-task-001-execution-checklist
path: whitepaper/algo-task-001-execution-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ALGO-TASK-001
status: in_progress
owner: research
reviewer: maintainer
template_type: execution-checklist
```

## 使用范围 | Usage Scope

- 本清单用于 ALGO-TASK-001 的首轮和复跑执行。
- 本清单不自动代表 measured 结果。
- 所有结果必须与 `sample_size`、`time_window`、`version_freeze`、`evidence_link` 一起出现，才可进入更高证据等级评审。

## 0. Run Header (Required)

```yaml
run_id: ALGO-RUN-XXX
task_id: ALGO-TASK-001
status: pending | in_progress | done
time_window: YYYY-MM-DD..YYYY-MM-DD
sample_size: TBD
hardware_profile:
  class: mainstream-laptop-under-10000-rmb
  cpu_threads: TBD
  memory_gb: TBD
  storage: nvme-ssd
version_freeze:
  parser_version: TBD
  schema_version: TBD
  model_or_rule_version: TBD
threshold_tier: lenient | standard | strict
tier_rationale: TBD
owner: research
reviewer: maintainer
```

## 1. Global Preflight Checklist

- [ ] 样本集合已冻结，且每个样本可回查。
- [ ] `version_freeze` 三项已填写。
- [ ] 运行参数已冻结（top-k、batch、并发）。
- [ ] 输出目录和命名规则已固定。
- [ ] 首轮目标定义为“估算验证/流程一致性”，不对外写 measured 宣称。

## 2. Algorithm-by-Algorithm Fill Checklist

### 2.1 Fact Verification Pipeline

```yaml
algorithm: Fact Verification Pipeline
instance_description: TBD
scale_assumption:
  claims: TBD
  retrieve_candidates: TBD
  rerank_candidates: TBD
  verify_candidates: TBD
key_parameters:
  retrieve_mode: TBD
  rerank_model: TBD
  verify_mode: TBD
estimated_or_observed:
  time: TBD
  memory: TBD
confidence: high | medium | low
boundary:
  top_k_controlled: true | false
  batch_split_enabled: true | false
evidence_link: TBD
notes: TBD
```

- [ ] Claim 数量与候选规模已记录。
- [ ] 检索、重排、核查参数已记录。
- [ ] 时间与内存值已填写并标注数据类型（估算/观察）。

### 2.2 Golden Set Regression Gate

```yaml
algorithm: Golden Set Regression Gate
instance_description: TBD
scale_assumption:
  rows: TBD
  profiles: [standard]
key_parameters:
  threshold_tier: TBD
  metrics: [traceability_pass_rate, hallucination_ratio, unresolved_counterevidence_ratio]
estimated_or_observed:
  time: TBD
  memory: TBD
confidence: high | medium | low
evidence_link: TBD
notes: TBD
```

- [ ] 样本条目数已记录。
- [ ] 阈值档位与核心指标字段一致。
- [ ] 结果可回填到 gate 决策上下文。

### 2.3 Strength Degradation Logic

```yaml
algorithm: Strength Degradation Logic
instance_description: TBD
scale_assumption:
  chains: TBD
key_parameters:
  triggers: [missing_evidence, unresolved_conflict, broken_warrant, missing_boundary, overgeneralization]
estimated_or_observed:
  time: TBD
  memory: TBD
confidence: high | medium | low
evidence_link: TBD
notes: TBD
```

- [ ] 触发规则集合与文档定义一致。
- [ ] `degrade_reasons` 的记录样式已固定。

### 2.4 Analysis Engine (Fast Scan)

```yaml
algorithm: Analysis Engine Fast Scan
instance_description: TBD
scale_assumption:
  text_length: TBD
  engines: [lexical, syntax_rhythm, semantic, rhetoric_style]
key_parameters:
  profile: fast_scan
  evidence_level: basic | strict
estimated_or_observed:
  time: TBD
  memory: TBD
confidence: high | medium | low
evidence_link: TBD
notes: TBD
```

- [ ] 文本规模与语言已记录。
- [ ] 引擎组合与 profile 已固定。
- [ ] 输出与下游门禁联动路径已记录。

### 2.5 Analysis Engine (Full MRI)

```yaml
algorithm: Analysis Engine Full MRI
instance_description: TBD
scale_assumption:
  text_length: TBD
  engines: [lexical, syntax_rhythm, semantic, narrative_flow, rhetoric_style, emotion_sensory]
key_parameters:
  profile: full_mri
  concurrency: 1
  segmentation_first: true
  chunk_then_aggregate: true
estimated_or_observed:
  time: TBD
  memory: TBD
confidence: high | medium | low
evidence_link: TBD
notes: TBD
```

- [ ] 已注明为“当前基线六引擎”场景。
- [ ] 并发、切分与聚合策略已固定。
- [ ] 若出现峰值压力，已记录降级动作。

### 2.6 Narrative Segmentation Protocol

```yaml
algorithm: Narrative Segmentation Protocol
instance_description: TBD
scale_assumption:
  documents: TBD
  boundaries: TBD
key_parameters:
  labels: [topic_shift, scene_shift, voice_shift, bridge_transition, no_boundary]
estimated_or_observed:
  time: TBD
  memory: TBD
confidence: high | medium | low
evidence_link: TBD
notes: TBD
```

- [ ] 边界标签集合与协议一致。
- [ ] 冲突样本与仲裁记录路径已保留。

## 3. Unified Result Matrix (Fill-in)

| Algorithm | Instance | Input Scale | Time | Memory | Concurrency Limit | Tier | Confidence | Main Bottleneck | Degrade Action | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Fact Verification Pipeline | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Golden Set Regression Gate | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Strength Degradation Logic | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Analysis Fast Scan | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Analysis Full MRI | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |
| Narrative Segmentation | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD | TBD |

## 3.1 Starter Fill Example (Estimated, Not Measured)

以下示例仅用于演示填报方式，来源于当前评测报告中的估算区间，不代表 measured 结果。

```yaml
example_run:
  run_id: ALGO-RUN-001-EXAMPLE
  data_type: estimated
  claim_boundary: planned_only
  sample_size: 2
  time_window: 2026-05-31..2026-05-31
  note: demo_fill_only
```

### Example A: Fact Verification Pipeline

```yaml
algorithm: Fact Verification Pipeline
instance_description: 单个 claim，50 候选检索 + 20 候选重排 + 20 候选 verify
scale_assumption:
  claims: 1
  retrieve_candidates: 50
  rerank_candidates: 20
  verify_candidates: 20
key_parameters:
  retrieve_mode: hybrid_bm25_dense
  rerank_model: MiniLM_class_cross_encoder
  verify_mode: NLI_support_refute_neutral
estimated_or_observed:
  data_type: estimated
  time: 0.4-1.8 s / claim
  memory: 1.5-4.0 GB
confidence: medium
main_bottleneck: rerank_plus_nli
degrade_action: reduce_top_k_and_small_batch
evidence_link: algorithm-evaluation-report.md
```

### Example B: Analysis Engine Fast Scan

```yaml
algorithm: Analysis Engine Fast Scan
instance_description: 3k-5k 中文字单文的轻量扫描
scale_assumption:
  text_length: 3k-5k Chinese chars
  engines: [lexical, syntax_rhythm, semantic, rhetoric_style]
key_parameters:
  profile: fast_scan
  evidence_level: strict
estimated_or_observed:
  data_type: estimated
  time: 6-25 s / doc
  memory: 1.2-3.5 GB
confidence: medium
main_bottleneck: syntax_parsing
degrade_action: segmentation_first_then_risk_based_full_mri
evidence_link: algorithm-evaluation-report.md
```

### Example Matrix Rows

| Algorithm | Instance | Input Scale | Time | Memory | Concurrency Limit | Tier | Confidence | Main Bottleneck | Degrade Action | Evidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Fact Verification Pipeline | 1 claim / 50 retrieve / 20 rerank | claim=1, k=50/20 | 0.4-1.8 s | 1.5-4.0 GB | low | B | medium | rerank + NLI | reduce top-k | algorithm-evaluation-report.md |
| Analysis Fast Scan | 3k-5k chars | single doc | 6-25 s | 1.2-3.5 GB | low | B | medium | syntax parsing | risk-based full MRI | algorithm-evaluation-report.md |

示例使用规则：

- 示例行仅用于演示填报格式，后续应由真实运行记录覆盖。
- 若进入正式入账，需补齐 `version_freeze`、`sample_size`、`time_window` 和 `evidence_link`。
- 未补齐前，必须保持 `planned_only` 口径。

## 4. Stop/Go Decision

- [ ] 单机轻量闭环可行（Fast Scan + constrained verification + gate）。
- [ ] Full MRI 已明确为离线或低并发路径。
- [ ] 高频批量场景已给出降级策略。
- [ ] 不存在把估算值误写为 measured 的表述。

```yaml
decision: go | conditional_go | no_go
release_claim_boundary: planned_only | measured_ready_subset
blockers:
  - TBD
required_actions:
  - TBD
```

## Related Docs

- [algorithm-evaluation-report.md](algorithm-evaluation-report.md)
- [algo-task-001-measurement-sheet.md](algo-task-001-measurement-sheet.md)
- [algo-task-001-runbook.md](algo-task-001-runbook.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [evidence-registry.md](evidence-registry.md)
