# ALGO-TASK-001 M2 Measured Execution Plan

## 摘要（中文）

本页用于把 ALGO-TASK-001 从文档级可行性推进到 M2（measured）里程碑，明确样本、参数、角色、节奏与交付物。

## Executive Summary (EN)

This plan drives ALGO-TASK-001 into milestone M2 by defining measured execution scope, run cadence, ownership, and acceptance criteria.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algo-task-001-m2-measured-plan
path: whitepaper/algo-task-001-m2-measured-plan.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ALGO-TASK-001
milestone: M2-Measure
status: active
owner: research
reviewer: maintainer
```

## 目标

在统一运行口径下完成首轮 measured 数据入账，覆盖至少两组核心指标并可复跑。

## M2 完成标准

1. 至少两组核心指标有 measured 值。
2. 每个 measured 结果都带 run freeze header。
3. failure case 至少 1 组并有分类标签。
4. evidence registry 可回链到 runbook 和 measurement sheet。

## 运行范围

```yaml
run_window: 2026-06-03..2026-06-14
sample_size_target: 12..20
axes:
  - segmentation_quality
  - compare_stability
  - traceability_accuracy
hardware_profile: mainstream-laptop-under-10000-rmb
runtime_profile:
  mode: fast_scan_first
  retrieval_top_k: 50
  rerank_top_k: 20
  verify_batch_size: 8
  full_mri_concurrency: 1
```

## 角色与职责

| 角色 | 职责 |
| --- | --- |
| Research Owner | 执行 run、填报 measurement sheet、输出 failure cases |
| Maintainer | 验证口径一致性、审批入账 |
| Architect | 评估性能瓶颈与降级策略合理性 |
| Docs Owner | 回链 evidence registry 与索引更新 |

## 两周节奏

| 周次 | 目标 | 输出 |
| --- | --- | --- |
| Week 1 | 完成样本冻结与 ALGO-RUN-001 | runbook 记录、首轮测量草表 |
| Week 2 | 完成 failure 分类与 M2 入账评审 | measured 表、delta note、evidence 更新 |

## 交付物清单

- `algo-task-001-runbook.md`：运行记录
- `algo-task-001-measurement-sheet.md`：measured 数据
- `error-taxonomy-and-fix-plan.md`：失败分类与修复路径
- `evidence-registry.md`：证据入账

## 风险与预案

| 风险 | 信号 | 预案 |
| --- | --- | --- |
| 样本不可得 | 样本缺失或无法复现 | 启用备用样本并记录替换理由 |
| 指标波动大 | 同口径结果不稳定 | 固定版本并缩小并发，先保稳定后扩量 |
| 无法入账 | 缺 run freeze header | 直接退回，不允许写入 measured 区 |

## 关联文档

- [algorithm-evaluation-report.md](algorithm-evaluation-report.md)
- [algo-task-001-runbook.md](algo-task-001-runbook.md)
- [algo-task-001-measurement-sheet.md](algo-task-001-measurement-sheet.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [evidence-registry.md](evidence-registry.md)
