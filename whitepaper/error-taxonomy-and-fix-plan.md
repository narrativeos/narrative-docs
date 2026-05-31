# ALGO-TASK-001 Error Taxonomy and Fix Plan

## Executive Summary (EN)

This document defines the error taxonomy and prioritized fix plan for NarrativeOS core algorithm validation on mainstream laptops. It focuses on failure localization, mitigation priority, and rerun criteria.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algo-task-001-error-taxonomy-and-fix-plan
path: whitepaper/error-taxonomy-and-fix-plan.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ALGO-TASK-001
status: in_progress
owner: research
reviewer: maintainer
```

## 目标 | Goal

将 ALGO-TASK-001 的“失败模式”从现象描述升级为可执行修复计划，确保每类错误具备：

- 归因路径
- 修复动作
- 复跑口径
- 升级/阻断条件

## 关联文档 | Related Docs

- [algorithm-evaluation-report.md](algorithm-evaluation-report.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [../academic/trust-methodology.md](../academic/trust-methodology.md)
- [../academic/fact-verification-protocol.md](../academic/fact-verification-protocol.md)
- [../academic/golden-set-action-playbook.md](../academic/golden-set-action-playbook.md)

## Error Taxonomy

### E1. Evidence Pointer Errors

定义：证据指针不存在、无法解析或指向错误句段。

映射标签：

- `missing_pointer`
- `invalid_pointer`
- `wrong_resolution`

影响：

- 降低 evidence_traceability_rate
- 触发 `gate_decision = fail` 风险

### E2. Verification State Errors

定义：事实核查状态与证据实际关系不一致。

映射标签：

- `fact_refuted` 误归类
- `hallucination_detected`
- `retrieval_gap` 未标注

影响：

- 提高 hallucination_ratio
- 造成结论强度误分级

### E3. Boundary and Scope Errors

定义：claim 边界缺失或结论越界，导致验证链断裂。

映射标签：

- `missing_boundary`
- `scope_mismatch`
- `overgeneralization`

影响：

- 触发强度降级
- 放大误判与复核成本

### E4. Counterevidence Handling Errors

定义：存在反证但未被解析、聚合或处置。

映射标签：

- `unresolved_counterevidence`
- `weak_support`
- `unsupported_causality`

影响：

- 破坏 Golden Set 门禁可信度
- 增加 no-go 发布概率

### E5. Runtime and Resource Errors

定义：在主流笔记本上因资源约束导致的任务失败或不稳定。

映射标签：

- `oom_or_memory_pressure`
- `timeout_under_full_mri`
- `candidate_explosion`

影响：

- Full MRI 任务不稳定
- 结果不可复跑

## Priority Matrix

| Priority | Error Class | Fix Window | Release Impact |
| --- | --- | --- | --- |
| P0 | E1, E2 | immediate | blocks release claim |
| P1 | E3, E4 | short cycle | high risk if ignored |
| P2 | E5 | short to medium cycle | affects throughput and stability |

## Fix Plan

### Plan F1: Pointer Integrity First (P0)

目标：先修复证据回链链路的结构性错误。

动作：

1. 在输出阶段强制校验指针可解析性
2. 对 `missing_pointer` 与 `invalid_pointer` 分离计数
3. 复核样本中增加“语义支撑强度”抽检字段

验收：

- 指针错误率趋势下降
- 失败表可区分结构错误与语义错误

### Plan F2: Verification State Calibration (P0)

目标：降低核查状态误归类。

动作：

1. 对 `verified/refuted/controversial/unverifiable` 建立冲突样本回放集
2. 对 `retrieval_gap` 设置强制标注路径
3. 在聚合阶段增加状态一致性检查

验收：

- refuted 与 controversial 的边界样本可解释
- retrieval_gap 不再被隐式吞掉

### Plan F3: Boundary Guardrail (P1)

目标：减少边界缺失和越界结论。

动作：

1. Discover 阶段 boundary 缺失即拒绝进入 verify
2. 在报告层显式展示 boundary 依据
3. 将 scope_mismatch 计入失败分类主表

验收：

- `missing_boundary` 明显下降
- scope_mismatch 可被快速定位

### Plan F4: Counterevidence Closure (P1)

目标：确保冲突证据被完整处置。

动作：

1. 对 unresolved_counterevidence 建立必填处置动作
2. 将 `resolve_counterevidence` 与 `rerun_golden_set` 绑定
3. 对 unsupported_causality 保持零容忍策略

验收：

- unresolved_counterevidence_ratio 受控
- 因果误判不进入 pass 路径

### Plan F5: Laptop-Safe Runtime Profile (P2)

目标：在万元以内主流笔记本上提升稳定性。

动作：

1. Fast Scan 作为默认入口，Full MRI 改为按需触发
2. 限制 top-k 与并发，采用分批执行
3. 记录 timeout 与内存峰值触发条件

验收：

- Full MRI 失败率下降
- 重跑结果一致性提升

## Rerun Protocol

```yaml
rerun_protocol:
  run_type: algorithm_regression_rerun
  required_freeze:
    - schema_version
    - parser_version
    - threshold_tier
    - sample_window
  comparison_axes:
    - traceability_accuracy
    - compare_stability
    - segmentation_consistency
  output_required:
    - delta_summary
    - failure_distribution
    - gate_decision
```

约束：

- 未冻结版本信息的结果不得入账
- 未包含失败分布对比的复跑不得标记 done

## Stop/Go Rules

- Stop（阻断）
  - 存在 `hallucination_detected` 且未闭环
  - `unsupported_causality` 非零（research profile）
  - fact gate 明确 fail

- Go（可推进）
  - P0 错误具备可解释下降趋势
  - 复跑口径稳定，可对比
  - 发布门禁条件满足

## Deliverable Mapping

| ALGO-TASK-001 Output | This Document Contribution |
| --- | --- |
| algorithm evaluation report | 提供错误分层与优化优先级依据 |
| error taxonomy and fix plan | 本文即主交付 |
| algorithm validation evidence | 提供复跑口径与 stop/go 规则 |

## Next Actions

1. 结合 [algorithm-evaluation-report.md](algorithm-evaluation-report.md) 生成首轮失败分布表。
2. 在 evidence registry 增加 ALGO-001 条目并记录本修复计划引用。
3. 按 P0 -> P1 -> P2 顺序推进修复与复跑。
