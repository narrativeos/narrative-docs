# Workflow to Whitepaper Mapping Guide

## 摘要（中文）

本指南定义 workflow 执行记录到 whitepaper 结果结构的统一映射规则，用于减少跨页面口径漂移。

## Executive Summary (EN)

This guide standardizes how workflow execution records are projected into whitepaper result structures.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-workflow-to-whitepaper-mapping-guide
path: whitepaper/workflow-to-whitepaper-mapping-guide.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, product, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: guide
```

## 适用范围

- 适用于将 product/workflows 下的执行记录映射到 whitepaper 结果模板。
- 适用于校对补齐、事实冲突识别、回归门禁等含 gate 决策的场景。
- 不替代原始执行记录，不替代协议与阈值策略。

## 核心原则

1. 单轮单口径：同一 run_id 只能使用一套映射口径。
2. 先实测后代理：有标准实测字段时，禁止继续使用 proxy。
3. 结论可回链：whitepaper 中每个结论必须回链到 workflow 与证据源。
4. 域融合叙事：结果必须按当前基线六域协同解释，不得改写成独立产品线叙事。

## 标准映射表

| Workflow Source | Whitepaper Target | Rule |
| --- | --- | --- |
| run_context.run_id | metric_record.run_id | 直接映射 |
| run_context.threshold_tier | metric_record.tier | lenient->P0, standard->P1, strict->P2 |
| run_context.corpus_ref | metric_record.dataset_id | 直接映射 |
| summary_metrics.traceability_pass_rate | metric_record.traceability.issue_trace_pass_ratio | 直接映射 |
| summary_metrics.knowledge_density_kd | metric_record.metrics.knowledge_density_kd.narrativeos | 直接映射 |
| final_decision.gate_decision | metric_record.decision.gate_result | pass/fail 直接映射 |
| final_decision.publish_blocked | metric_record.decision.go_no_go | true->no-go, false->go |
| final_decision.reason[] | metric_record.decision.rationale | 合并为短句，保留失败关键词 |

## Proxy 映射规则

当标准字段缺失且必须先生成评审底稿时，可使用 proxy，前提是满足以下约束：

- 必须在字段旁显式标注 note: mapped from <source> as <proxy-type>。
- 必须在风险与限制中声明 proxy 使用范围与失效条件。
- 下一轮必须替换为标准实测值并更新 delta。

推荐示例：

```yaml
proofreading_false_positive_ratio:
  narrativeos: 0.33
  baseline: 0.28
  delta: +0.05
  note: mapped from hallucination_ratio as risk proxy
```

## 质量门禁

- 映射后 go/no-go 必须与 workflow 原始 gate 决策一致。
- 若 workflow 为 fail/no-go，whitepaper 不得写为通过结论。
- 若存在 unresolved_conflict 或 retrieval_gap 未闭环，必须在风险区保留。
- knowledge_density_kd 不得单独作为事实可信结论依据。

## 最小执行清单

1. 锁定 run_id 与 threshold_tier。
2. 复制标准映射字段并填写 delta。
3. 检查是否使用 proxy，并补充 note 与风险声明。
4. 校验 go/no-go 与原始决策一致。
5. 补齐 data_source_ref 的 workflow 与 evidence 回链。

## 推荐引用

- proofreading-competitive-results-template.md
- proofreading-competitive-results-sample-2026-05.md
- ../product/workflows/proofreading-competitive-benchmark-runbook.md
- ../product/workflows/proofreading-competitive-benchmark-run-record-template.md
- ../product/workflows/fact-conflict-detection-minimal-runbook.md
- ../product/workflows/fact-conflict-detection-sample-2026-05.md
- ../academic/fact-verification-protocol.md
- ../academic/golden-set-threshold-policy.md