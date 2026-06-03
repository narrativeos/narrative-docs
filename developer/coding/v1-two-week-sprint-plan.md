# Product V1 Two-week Sprint Plan

## 摘要（中文）

本页把 V1 设计基线转换为两周可执行 Sprint 任务清单，包含负责人、依赖、验收字段、风险与回退动作。

## Executive Summary (EN)

This document translates the Product V1 baseline into a two-week sprint execution plan with owners, dependencies, acceptance fields, risks, and rollback actions.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-v1-two-week-sprint-plan
path: product/v1-two-week-sprint-plan.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, operator, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## Sprint 目标

- 在两周内交付可运行的 V1 MVP 闭环：导入 -> Fast -> Deep -> Insight -> 导出。
- 在试运行窗口内验证双门槛（Product KPI + Engineering SLO）。
- 形成最小可运营资产：runbook、演练记录、回退路径。

## 节奏与里程碑

- Week 1：范围冻结、设计确认、骨干能力打通。
- Week 2：指标接线、稳定性收敛、试运行验收。

里程碑：

- M1（W1D3）：范围冻结 + 交互流审查通过。
- M2（W1D5）：Fast/Deep 双路径打通。
- M3（W2D3）：证据链回链与导出闭环达标。
- M4（W2D5）：双门槛验收与 Go/No-go 结论。

## 任务清单（执行版）

| task_id | Priority | Workstream | Task | Owner | Depends On | Deliverable | Acceptance Fields |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PV1-S01 | P0 | Product | 冻结 In/Out Scope 与 No-go 条目 | Product Lead | product/v1-design-baseline.md | Scope Freeze Note | scope_version, no_go_list, reviewer_signoff |
| PV1-S02 | P0 | UX | 完成 Workspace 主流程交互图（导入/Fast/Deep/导出） | Design Lead | PV1-S01 | Interaction Flow Pack | flow_version, state_coverage, handoff_done |
| PV1-S03 | P0 | Runtime | 接通 Fast Queue 优先与 Deep Queue 异步调度 | Runtime Lead | PV1-S01 | Queue Routing Implementation | fast_p95, deep_queue_depth, degrade_switch |
| PV1-S04 | P0 | Analysis | 打通 Fast Scan + Full MRI 结果汇聚契约 | Analysis Lead | PV1-S03 | Unified Result Contract | contract_version, schema_check, backward_compat |
| PV1-S05 | P0 | Insight | 落地结论 -> 证据 -> 原文的回链路径 | Insight Lead | PV1-S04 | Evidence Link Path | explainability_rate, traceability_pass |
| PV1-S06 | P1 | Export | 报告导出与 snapshot manifest 绑定 | Platform Lead | PV1-S05 | Export + Snapshot Package | manifest_consistency, export_success_rate |
| PV1-S07 | P0 | SRE | 定义并接线 KPI/SLO 采集口径 | SRE Lead | PV1-S03 | Metrics Collection Sheet | metric_id, window, calc_method, data_source |
| PV1-S08 | P0 | Ops | 产出最小 runbook 与降级处置脚本 | Ops Lead | PV1-S03 | V1 Runbook | trigger_map, action_map, recovery_criteria |
| PV1-S09 | P1 | QA | 试运行样本集与失败样本复盘 | QA Lead | PV1-S05 | Pilot Test Log | sample_size, failure_taxonomy, fix_plan |
| PV1-S10 | P0 | Release | 执行双门槛验收并输出 Go/No-go | Product + Tech Leads | PV1-S06, PV1-S07, PV1-S08, PV1-S09 | Release Decision Record | kpi_status, slo_status, error_budget_status |

## 每日执行看板（推荐）

| Day | Focus | Must Finish |
| --- | --- | --- |
| D1 | 范围冻结 | PV1-S01 |
| D2 | 交互与队列方案 | PV1-S02, PV1-S03 设计确认 |
| D3 | Milestone M1 | 交互审查通过，开始实现 |
| D4 | 契约与回链骨架 | PV1-S04, PV1-S05 初版 |
| D5 | Milestone M2 | Fast/Deep 路径联通 |
| D6 | 导出与指标接线 | PV1-S06, PV1-S07 |
| D7 | runbook 与降级联调 | PV1-S08 |
| D8 | 样本试运行 | PV1-S09 |
| D9 | Milestone M3 | 证据链 + 导出闭环达标 |
| D10 | Milestone M4 | PV1-S10，形成 Go/No-go |

## 风险与回退

| Risk | Level | Signal | Immediate Action | Rollback |
| --- | --- | --- | --- | --- |
| Fast 路径时延持续超阈值 | High | fast_p95 > 2s 持续 10 分钟 | 限流 Deep Queue，启用降级策略 | 回退到上个稳定队列参数 |
| 证据链不可回链 | High | explainability_rate < 90% | 暂停对外试点，仅修复证据映射 | 回退到最近可回链契约版本 |
| manifest 一致性失败 | High | manifest_consistency < 99.9% | 停止发布，执行一致性修复 | 回退导出链路到只读模式 |
| 演练未完成导致运维不可用 | Medium | 无 drill 记录 | 阻断发布，补 runbook drill | 延后发布窗口 |

## Sprint 验收模板

```yaml
sprint_id: V1-SPRINT-001
window: YYYY-MM-DD..YYYY-MM-DD
kpi_status: pass | fail
slo_status: pass | fail
error_budget_status: pass | fail
go_no_go: go | no-go
blocked_by:
  - <task_id or metric_id>
next_action:
  - <action-1>
  - <action-2>
```

## 对齐来源

- V1 设计基线：v1-design-baseline.md
- 产品工作流：workflows/README.md
- 产品路线图：roadmap/README.md
- 系统可靠性基线：../architecture/system/README.md
- 运行时 runbook：../architecture/runtime/README.md
