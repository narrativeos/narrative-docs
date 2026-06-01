# Technical Director 30/60/90 Execution Battlecard

## 摘要（中文）

本作战图把技术总监下一阶段工作收敛为三条主线：跨仓契约冻结、算法里程碑实测、发布与门禁纪律。

## Executive Summary (EN)

This battlecard translates CTO-level priorities into a 30/60/90-day execution path with explicit gates, ownership, and measurable outcomes.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-roadmap-technical-director-30-60-90-battlecard
path: product/roadmap/technical-director-30-60-90-battlecard.md
lang_primary: zh-CN
lang_secondary: en
audience: [tech-lead, architect, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: active
owner: technical-director
reviewer: maintainer
```

## 目标

- 30 天：完成契约口径收敛与变更阻断。
- 60 天：完成关键算法 M2 实测与回归节奏。
- 90 天：完成跨仓发布纪律与可审计发布链。

## 30/60/90 节奏

### Day 0-30：契约冻结与阻断上线

1. 冻结 V1 API 不可变项。
2. 上线 OpenAPI 与兼容策略联动门禁。
3. 统一变更模板（影响等级 + 迁移说明 + 风险等级）。

完成定义（DoD）：

- `make docs-check-all` 默认包含 API 契约联动检查。
- 任意 OpenAPI 改动都能被门禁判定是否漏更兼容策略。
- 契约冻结清单对外可引用。

### Day 31-60：算法 M2 实测

1. 按 ALGO-TASK-001 runbook 执行首轮 measured。
2. 固化 run freeze header 口径，禁入无口径数据。
3. 建立双周回归节奏（failure taxonomy + delta note）。

完成定义（DoD）：

- 至少两项核心指标进入 measured。
- 每次 run 有 evidence 回链。
- 失败样本有分类与处置闭环。

### Day 61-90：发布纪律与跨仓同步

1. 建立跨仓 release checklist（core/api/studio/docs）。
2. 将兼容策略评审纳入 release go/no-go 会议。
3. 建立变更回放基线，确保可追溯。

完成定义（DoD）：

- 发布前检查项可自动化执行。
- 版本升级路径与迁移窗口可审计。
- 关键变更可通过文档追溯到 run 与评审记录。

## 关键指标（技术向）

| 指标 | 30 天 | 60 天 | 90 天 |
| --- | --- | --- | --- |
| API 契约联动覆盖率 | 100% | 100% | 100% |
| docs-check-all 通过率 | >= 98% | >= 99% | >= 99% |
| M2 measured 指标数 | - | >= 2 | >= 3 |
| 跨仓发布阻断误放行 | 0 | 0 | 0 |

## RACI

| 工作项 | R | A | C | I |
| --- | --- | --- | --- | --- |
| V1 契约冻结 | API Owner | Technical Director | Core/Studio/Docs Owner | All contributors |
| M2 实测推进 | Research Owner | Technical Director | Architect/Maintainer | Product Owner |
| 发布纪律治理 | Maintainer | Technical Director | Core/API/Studio Owner | Community |

## 关联文档

- [README.md](README.md)
- [../../developer/api/v1-contract-freeze-checklist.md](../../developer/api/v1-contract-freeze-checklist.md)
- [../../whitepaper/algo-task-001-m2-measured-plan.md](../../whitepaper/algo-task-001-m2-measured-plan.md)
- [../../developer/operations/cross-repo-release-checklist.md](../../developer/operations/cross-repo-release-checklist.md)
- [../../developer/operations/go-no-go-meeting-template.md](../../developer/operations/go-no-go-meeting-template.md)
- [../../developer/operations/cross-repo-ci-status-matrix-template.md](../../developer/operations/cross-repo-ci-status-matrix-template.md)
- [../../api-compatibility-and-versioning.md](../../api-compatibility-and-versioning.md)
