# Proofreading Competitive Benchmark Runbook

## 摘要（中文）

本页提供校对补齐同题对打评测的可执行作业步骤，确保从数据准备、执行、记录到 Go/No-go 判定可复现。

## Executive Summary (EN)

This runbook defines an executable, repeatable procedure for the proofreading competitive benchmark.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-workflows-proofreading-competitive-benchmark-runbook
path: product/workflows/proofreading-competitive-benchmark-runbook.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, qa, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页用于定义校对补齐同题对打的标准执行路径，确保不同评测轮次采用同一套输入、判断和退出规则。

它不是结果页，也不是策略页，而是 workflow 层的执行主文档。

## 适用场景 | Use Cases

- 校对补齐能力的内部对打评测
- 真实试点前的标准化演练
- fail/no-go 后的回归复跑

## 前置条件 | Preconditions

- 已完成 [../scenarios/v1-mock-simulation-dataset.md](../scenarios/v1-mock-simulation-dataset.md) 数据加载。
- 已完成 [../prototype/v1-prototype-spec.md](../prototype/v1-prototype-spec.md) 原型门槛核对。
- 评测策略遵循 [../modules/proofreading-competitive-benchmark.md](../modules/proofreading-competitive-benchmark.md)。

## 输入约束 | Input Constraints

- P0: DS-V1-PRF-P0-001
- P1: DS-V1-PRF-P1-001
- P2: DS-V1-PRF-P2-001

要求：

- 必须按 P0 -> P1 -> P2 顺序执行。
- 不允许跳过较低 tier 直接进入较高 tier。
- threshold mapping 必须与场景数据保持一致。

## 执行主路径 | Main Flow

1. 初始化评测上下文

```yaml
run_context:
  run_id: bm-YYYYMMDD-001
  operator: <name-or-role>
  baseline_id: Baseline-A | Baseline-B | Baseline-C
  threshold_tier: standard | strict
```

2. 按 P0 -> P1 -> P2 顺序执行同题评测。
3. 对每条 issue 记录 suggestion、evidence、confidence、traceability。
4. 汇总核心指标并与 baseline 对比。
5. 输出 Go/No-go 结论并附回滚动作。

## 必填输出 | Required Outputs

```yaml
required_fields:
  - dataset_id
  - issue_id
  - issue_type
  - confidence
  - traceability
  - proofreading_recall
  - proofreading_false_positive_ratio
  - term_consistency_alignment_rate
  - registry_new_term_precision
  - knowledge_density_kd
  - explanation_usable_rate
  - review_cycle_time_sec
```

## 异常处理 | Failure Handling

- 若 traceability=fail：该条不得进入最终导出，必须进入修复队列。
- 若 proofreading_false_positive_ratio 超阈值：立即切换 shadow_only 并触发回滚评审。
- 若 explanation_usable_rate 连续两轮低于 0.90：进入交互与证据链专项整改。

## 结果结构 | Result Shape

```yaml
benchmark_run_record:
  run_id: bm-2026-001
  baseline_id: Baseline-B
  datasets:
    - dataset_id: DS-V1-PRF-P0-001
      gate_result: pass | fail
      metrics:
        proofreading_recall: 0.90
        proofreading_false_positive_ratio: 0.09
        explanation_usable_rate: 0.95
        review_cycle_time_sec: 82
    - dataset_id: DS-V1-PRF-P1-001
      gate_result: pass | fail
      metrics:
        term_consistency_alignment_rate: 0.94
        registry_new_term_precision: 0.93
        knowledge_density_kd: 0.047
        explanation_usable_rate: 0.94
        review_cycle_time_sec: 79
    - dataset_id: DS-V1-PRF-P2-001
      gate_result: pass | fail
      metrics:
        proofreading_recall: 0.94
        proofreading_false_positive_ratio: 0.05
        term_consistency_alignment_rate: 0.98
        registry_new_term_precision: 0.98
        knowledge_density_kd: 0.061
        explanation_usable_rate: 0.96
        review_cycle_time_sec: 76
  final_decision:
    go_no_go: go | no-go
    reason: <short rationale>
    rollback_action: none | switch_shadow_only | rollback_ruleset
```

## 阻断条件 | Stop Conditions

- 未完成前置条件校验
- 数据集顺序被打破
- 关键 traceability 失败未修复
- threshold mapping 与数据集定义不一致

## 完成标准 | Completion Criteria

- 连续两轮 P0/P1/P2 全部 pass，且无 critical traceability 失败，可进入下一阶段。
- 任一轮出现 no-go，必须在修复后重新从 P0 开始执行。

## 关联文档 | Related Docs

- ../modules/proofreading-competitive-benchmark.md
- proofreading-competitive-benchmark-checklist.md
- proofreading-competitive-benchmark-run-record-template.md
- ../modules/proofreading-capability-gap-closure-plan.md
- ../scenarios/v1-mock-simulation-dataset.md
- ../../academic/golden-set-threshold-policy.md
- ../../whitepaper/proofreading-competitive-results-template.md
