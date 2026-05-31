# Proofreading Competitive Benchmark Checklist

## 摘要（中文）

本清单用于周会或评审现场逐项打勾，确保校对补齐同题对打评测执行一致、记录完整、结论可追溯。

## Executive Summary (EN)

This checklist provides a meeting-ready execution sheet for proofreading competitive benchmark runs.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-workflows-proofreading-competitive-benchmark-checklist
path: product/workflows/proofreading-competitive-benchmark-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, qa, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用说明

- 每次 run 使用一份独立清单。
- 所有勾选项必须可回链到运行记录与证据。
- 任一阻断项未通过，不得标记为 go。

## 基础信息

```yaml
run_meta:
  run_id: bm-YYYYMMDD-001
  baseline_id: Baseline-A | Baseline-B | Baseline-C
  operator: <name-or-role>
  reviewer: <name-or-role>
  run_date: YYYY-MM-DD
```

## 预检（Pre-flight）

- [ ] 已确认数据集顺序为 P0 -> P1 -> P2
- [ ] 已确认 DS-V1-PRF-P0-001 可读取
- [ ] 已确认 DS-V1-PRF-P1-001 可读取
- [ ] 已确认 DS-V1-PRF-P2-001 可读取
- [ ] 已确认阈值映射：P0=standard, P1=standard, P2=strict
- [ ] 已确认 traceability 字段写入策略

## 执行检查（Execution）

### P0 / DS-V1-PRF-P0-001

- [ ] 运行完成
- [ ] proofreading_recall 达标
- [ ] proofreading_false_positive_ratio 达标
- [ ] issue 记录含 evidence 与 confidence
- [ ] 关键建议 traceability=pass

### P1 / DS-V1-PRF-P1-001

- [ ] 运行完成
- [ ] term_consistency_alignment_rate 达标
- [ ] registry_new_term_precision 达标
- [ ] consistency/knowledge 类 issue 覆盖
- [ ] 关键建议 traceability=pass

### P2 / DS-V1-PRF-P2-001

- [ ] 运行完成
- [ ] strict 档阈值达标
- [ ] risk/official_doc 类 issue 覆盖
- [ ] 导出前复核完成
- [ ] 关键建议 traceability=pass

## 异常与回滚

- [ ] 无 critical traceability 失败
- [ ] 若发生阈值越界，已执行 shadow_only 降级
- [ ] 若发生 no-go，已记录 rollback_action

## 结论

- [ ] 本轮结论为 go
- [ ] 或本轮结论为 no-go（需附整改计划）

```yaml
final_decision:
  go_no_go: go | no-go
  reason: <short rationale>
  rollback_action: none | switch_shadow_only | rollback_ruleset
  follow_up_due: YYYY-MM-DD
```

## 关联文档

- proofreading-competitive-benchmark-runbook.md
- ../scenarios/v1-mock-simulation-dataset.md
- ../modules/proofreading-competitive-benchmark.md
- ../../whitepaper/proofreading-competitive-results-sample-2026-05.md
