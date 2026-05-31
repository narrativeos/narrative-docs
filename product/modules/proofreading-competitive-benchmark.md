# Proofreading Competitive Benchmark

## 摘要（中文）

本页定义校对补齐能力的同题对打评测规范，用于验证 NarrativeOS 在基础校对不弱于竞品的前提下，实现解释可用率与复核效率优势。

## Executive Summary (EN)

This document defines the head-to-head benchmark protocol for proofreading capability closure.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-proofreading-competitive-benchmark
path: product/modules/proofreading-competitive-benchmark.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标与边界

目标：

- 验证“基础校对能力不弱于竞品”。
- 验证“可解释性与复核效率优于竞品”。

边界：

- 仅使用模拟或授权数据集。
- 不引入用户系统语义；身份上下文仅通过 external_identity_context 传递。

## 对打对象分层

- Baseline-A: 通用校对工具
- Baseline-B: 专业写作校对工具
- Baseline-C: 领域专用公文校对工具

说明：对打报告中可使用匿名代号，避免品牌偏置。

## 评测数据集

- 通用基线：DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001
- 补齐专项：DS-V1-PRF-P0-001、DS-V1-PRF-P1-001、DS-V1-PRF-P2-001
- 稳定性样本：DS-V1-DEGRADE-001、DS-V1-EVIDENCE-FAIL-001、DS-V1-EXPORT-001

## 指标体系

核心指标：

- proofreading_recall
- proofreading_false_positive_ratio
- term_consistency_alignment_rate
- registry_new_term_precision
- explanation_usable_rate
- review_cycle_time_sec

判定原则：

- 基础不弱：前四项指标不低于最佳竞品 - 1%。
- 体验超越：explanation_usable_rate 与 review_cycle_time_sec 同时优于竞品中位数。

## 流程

```text
准备数据集
  -> 执行同题评测
  -> 记录逐条差异
  -> 计算分层得分(P0/P1/P2)
  -> 输出 go/no-go 建议
```

## 结果模板

```yaml
benchmark_record:
  run_id: bm-2026-001
  dataset_id: DS-V1-PRF-P1-001
  baseline_id: Baseline-B
  metrics:
    proofreading_recall:
      narrativeos: 0.91
      baseline: 0.90
      delta: +0.01
    proofreading_false_positive_ratio:
      narrativeos: 0.09
      baseline: 0.08
      delta: -0.01
    term_consistency_alignment_rate:
      narrativeos: 0.94
      baseline: 0.89
      delta: +0.05
    registry_new_term_precision:
      narrativeos: 0.93
      baseline: 0.85
      delta: +0.08
    explanation_usable_rate:
      narrativeos: 0.96
      baseline: 0.71
      delta: +0.25
    review_cycle_time_sec:
      narrativeos: 78
      baseline: 123
      delta: -45
  decision:
    gate_result: pass | fail
    reason: <short rationale>
```

## Go/No-go 规则

- 连续两轮 P0/P1/P2 全部 pass，可进入下一阶段推广。
- 任一轮出现 proofreading_false_positive_ratio 超阈值，立即 no-go 并回滚到 shadow_only。
- 若 explanation_usable_rate 连续两轮低于 0.90，进入交互与证据链专项整改。

## 关联文档

- proofreading-capability-gap-closure-plan.md
- ../workflows/proofreading-competitive-benchmark-runbook.md
- ../scenarios/v1-mock-simulation-dataset.md
- ../prototype/v1-prototype-spec.md
- ../../academic/golden-set-threshold-policy.md
- ../../whitepaper/competitor-matrix.md
- ../../whitepaper/market-acceptance.md
- ../../whitepaper/proofreading-competitive-results-template.md
