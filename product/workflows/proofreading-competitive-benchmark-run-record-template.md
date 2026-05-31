# Proofreading Competitive Benchmark Run Record Template

## 摘要（中文）

本页提供可直接复制填写的空白运行记录，用于保存一次完整的校对补齐同题对打评测结果。

## Executive Summary (EN)

This template is a blank run record for one complete proofreading competitive benchmark execution.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-workflows-proofreading-competitive-benchmark-run-record-template
path: product/workflows/proofreading-competitive-benchmark-run-record-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, qa, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: template
```

## 本页用途 | Purpose

本页用于保存一次完整 benchmark run 的正式记录，是 checklist 与白皮书结果页之间的中间权威载体。

它负责沉淀“本轮到底跑了什么、结果如何、依据是什么”，而不是承担策略说明。

## 使用说明 | How To Use

- 每次真实或模拟 run 单独复制一份填写。
- 必须与执行清单、runbook 和白皮书结果页互相回链。
- 未完成全部必填字段，不得进入白皮书结论页。

## 输入来源 | Inputs

- pilot intake
- runbook
- checklist
- 本轮数据集输出与证据记录

## 标准记录结构 | Standard Record Shape

```yaml
benchmark_run_record:
  run_id: bm-YYYYMMDD-001
  run_date: YYYY-MM-DD
  operator: <name-or-role>
  reviewer: <name-or-role>
  baseline_id: Baseline-A | Baseline-B | Baseline-C
  threshold_mapping:
    P0: standard
    P1: standard
    P2: strict
  dataset_sequence:
    - DS-V1-PRF-P0-001
    - DS-V1-PRF-P1-001
    - DS-V1-PRF-P2-001
  dataset_results:
    - tier: P0
      dataset_id: DS-V1-PRF-P0-001
      gate_result: pass | fail
      metrics:
        proofreading_recall: <float>
        proofreading_false_positive_ratio: <float>
        explanation_usable_rate: <float>
        review_cycle_time_sec: <int>
      traceability:
        issue_trace_pass_ratio: <float>
        critical_trace_fail_count: <int>
      notes: <text>
    - tier: P1
      dataset_id: DS-V1-PRF-P1-001
      gate_result: pass | fail
      metrics:
        term_consistency_alignment_rate: <float>
        registry_new_term_precision: <float>
        explanation_usable_rate: <float>
        review_cycle_time_sec: <int>
      traceability:
        issue_trace_pass_ratio: <float>
        critical_trace_fail_count: <int>
      notes: <text>
    - tier: P2
      dataset_id: DS-V1-PRF-P2-001
      gate_result: pass | fail
      metrics:
        proofreading_recall: <float>
        proofreading_false_positive_ratio: <float>
        term_consistency_alignment_rate: <float>
        registry_new_term_precision: <float>
        explanation_usable_rate: <float>
        review_cycle_time_sec: <int>
      traceability:
        issue_trace_pass_ratio: <float>
        critical_trace_fail_count: <int>
      notes: <text>
  final_decision:
    go_no_go: go | no-go
    reason: <short rationale>
    rollback_action: none | switch_shadow_only | rollback_ruleset
    follow_up_due: YYYY-MM-DD
  linked_docs:
    intake_ref: product/workflows/proofreading-competitive-pilot-intake-template.md
    checklist_ref: product/workflows/proofreading-competitive-benchmark-checklist.md
    runbook_ref: product/workflows/proofreading-competitive-benchmark-runbook.md
    whitepaper_ref: whitepaper/proofreading-competitive-results-template.md
    evidence_registry_ref: whitepaper/evidence-registry.md
```

## 阻断条件 | Stop Conditions

- 缺少 intake、checklist 或 runbook 回链
- 缺少 final_decision
- 缺少任一 tier 的关键 metrics 或 traceability 记录

## 关联文档 | Related Docs

- proofreading-competitive-pilot-intake-template.md
- proofreading-competitive-benchmark-checklist.md
- proofreading-competitive-benchmark-runbook.md
- ../../whitepaper/proofreading-competitive-results-template.md
- ../../whitepaper/proofreading-competitive-results-sample-2026-05.md
