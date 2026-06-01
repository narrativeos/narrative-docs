# Proofreading Competitive Pilot Intake Template

## 摘要（中文）

本模板用于在真实试点启动前记录试点背景、数据来源、授权范围、竞争力验证基线与证据回填目标。

## Executive Summary (EN)

This template captures pilot intake information before a real proofreading competitive validation run starts.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-workflows-proofreading-competitive-pilot-intake-template
path: product/workflows/proofreading-competitive-pilot-intake-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, qa, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: template
```

## 本页用途 | Purpose

本页用于在真实试点启动前锁定试点边界、授权状态、数据来源与证据回填目标，避免执行开始后再补合规与口径。

它是竞争力验证 workflow 的入口页，不记录评测结果。

术语规范来源： [../../developer/coding/docs-terminology-note-template.md](../../developer/coding/docs-terminology-note-template.md)

## 使用说明 | How To Use

- 每轮真实试点启动前必须先填写本页。
- 未明确授权范围、数据来源与 evidence_id 目标，不得开始正式 run。
- 本页只记录试点 intake，不记录评测结果。

## 适用场景 | Use Cases

- 真实试点启动前的 intake 审查
- 授权材料变更后的重新确认
- 不同 baseline 或不同 domain 的试点切换

## 标准 Intake 结构 | Standard Intake Shape

```yaml
pilot_intake:
  pilot_id: prf-pilot-YYYYMMDD-001
  intake_date: YYYY-MM-DD
  owner: <name-or-role>
  reviewer: <name-or-role>
  pilot_scope:
    domain: editorial | research | governance | mixed
    baseline_id: Baseline-A | Baseline-B | Baseline-C
    expected_tiers: [P0, P1, P2]
  source_material:
    source_type: authorized_sample | internal_demo | pilot_partner_material
    source_description: <text>
    external_identity_context: <optional>
    contains_user_system_data: false
  authorization:
    usage_permission: granted | pending | denied
    retention_limit: <text>
    export_limit: <text>
  evidence_linkage:
    target_evidence_id: PRF-002
    evidence_registry_ref: whitepaper/evidence-registry.md
    runbook_ref: product/workflows/proofreading-competitive-benchmark-runbook.md
    checklist_ref: product/workflows/proofreading-competitive-benchmark-checklist.md
    run_record_ref: product/workflows/proofreading-competitive-benchmark-run-record-template.md
  readiness_gate:
    threshold_mapping_confirmed: true | false
    traceability_strategy_confirmed: true | false
    fallback_plan_confirmed: true | false
  notes: <text>
```

## 阻断条件 | Stop Conditions

- usage_permission != granted
- contains_user_system_data = true
- threshold_mapping_confirmed = false
- traceability_strategy_confirmed = false

## 完成标准 | Completion Criteria

- 授权已明确
- 数据来源已说明
- evidence_id 已绑定
- runbook、checklist、run record 回链已固定

## 关联文档 | Related Docs

- proofreading-competitive-benchmark-runbook.md
- proofreading-competitive-benchmark-checklist.md
- proofreading-competitive-benchmark-run-record-template.md
- ../../whitepaper/evidence-registry.md
- ../../whitepaper/proofreading-competitive-results-template.md
