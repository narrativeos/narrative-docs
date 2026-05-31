# Fact Conflict Detection Sample 2026-05

## 摘要（中文）

本页给出一份一页式示例，演示如何按最小作业单完成一轮事实冲突识别，并形成可审计的 fail 结论。

## Executive Summary (EN)

This page provides a one-page worked example for the minimal fact-conflict detection workflow.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-workflows-fact-conflict-detection-sample-2026-05
path: product/workflows/fact-conflict-detection-sample-2026-05.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, qa, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 样例上下文 | Sample Context

```yaml
run_context:
  run_id: fv-20260531-001
  operator: product-qa-rotation
  threshold_tier: standard
  corpus_ref: DS-V1-PRF-P1-001
  contains_user_system_data: false
```

## Claim 样例记录 | Claim-Level Records

```yaml
claim_results:
  - claim_id: C-001
    claim_text: 术语 A 在当前版本中仅出现于章节 2。
    verification_status: refuted
    traceability: pass
    evidence:
      - evidence_id: E-101
        evidence_level: L1
        source_ref: doc://v1/chapter-4#para-2
    failure:
      reason: fact_refuted
      action: rebound_to_discovery
  - claim_id: C-002
    claim_text: 建议 B 已有官方依据并被完整引用。
    verification_status: controversial
    traceability: pass
    evidence:
      - evidence_id: E-205
        evidence_level: L2
        source_ref: review://baseline-b/2026-05-31
    failure:
      reason: unresolved_conflict
      action: resolve_counterevidence
  - claim_id: C-003
    claim_text: 指标 C 的定义在当前证据集中可直接验证。
    verification_status: unverifiable
    traceability: fail
    evidence:
      - evidence_id: E-309
        evidence_level: L3
        source_ref: note://draft-index
    failure:
      reason: retrieval_gap
      action: rerun_golden_set
```

## 指标汇总 | Summary Metrics

```yaml
summary_metrics:
  verifiability_rate: 0.67
  hallucination_ratio: 0.33
  controversial_ratio: 0.33
  traceability_pass_rate: 0.67
  knowledge_density_kd: 0.044
```

## 门禁结论 | Gate Decision

```yaml
final_decision:
  gate_decision: fail
  publish_blocked: true
  reason:
    - fact_refuted exists
    - unresolved_conflict not closed
    - retrieval_gap with traceability fail
  rollback_action: switch_shadow_only
  rerun_plan:
    - fix evidence routing for C-003
    - close counterevidence for C-002
    - rerun from P0-equivalent verification set
```

## 域责任留痕 | Domain Trace

- Text Lab：完成 claim 规范化与原文切分。
- Narrative Atlas：定位 C-001 与 C-002 的冲突证据锚点。
- Insight Engine：输出 verification_status 与失败原因解释。
- Knowledge Graph/Library：记录术语 A 与指标 C 的实体映射状态。
- Corpus Observatory：记录本轮 fail 分布并标记为回归观察样本。

## 对齐文档 | Alignment

- 最小作业单： [fact-conflict-detection-minimal-runbook.md](fact-conflict-detection-minimal-runbook.md)
- 事实核查协议： [../../academic/fact-verification-protocol.md](../../academic/fact-verification-protocol.md)
- 事实核查台账模板： [../../academic/templates-golden-set-fact-check-ledger.md](../../academic/templates-golden-set-fact-check-ledger.md)
- 阈值策略： [../../academic/golden-set-threshold-policy.md](../../academic/golden-set-threshold-policy.md)