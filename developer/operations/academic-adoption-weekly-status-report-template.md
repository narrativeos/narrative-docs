# Academic Adoption Weekly Status Report Template

## 报告信息

```yaml
report_id: ACAD-WEEKLY-YYYYWW
week_window: YYYY-MM-DD..YYYY-MM-DD
owner: <name-or-role>
reviewer: <name-or-role>
status: green | yellow | red
```

## 本周目标与完成度

| 目标 | task_id | 计划状态 | 实际状态 | 说明 |
| --- | --- | --- | --- | --- |
| 示例：首轮证据回链快照采集 | ACAD-BENCH-001 | planned | in_progress | 已完成指针解析，待人工复核 |

## 指标更新

| metric_id | status_before | status_after | value | version | sample_size | time_window | evidence_link |
| --- | --- | --- | --- | --- | --- | --- | --- |
| METRIC-EVIDENCE-TRACEABILITY | planned | planned | TBD | vX.Y.Z | N | YYYY-MM-DD..YYYY-MM-DD | <path> |

说明：任一字段缺失时，不得将 status_after 升级为 measured。

## 证据台账更新

| evidence_id | action | old_state | new_state | source |
| --- | --- | --- | --- | --- |
| ACAD-001 | append note | documented | documented | <path-or-pr> |

## 风险与阻塞

| 风险/阻塞 | 等级 | 影响任务 | 缓解动作 | owner |
| --- | --- | --- | --- | --- |
| 示例：样本可用性不足 | high | ACAD-RSCH-003 | 扩样并冻结纳排规则 | research |

## 下周计划

1. <next-week-item-1>
2. <next-week-item-2>
3. <next-week-item-3>

## 审核结论

- 口径审查：pass | fail
- 台账同步：pass | fail
- 对外表达是否可用：yes | no

## 关联

- [academic-adoption-weekly-execution-checklist.md](academic-adoption-weekly-execution-checklist.md)
- [../../academic/examples-acad-bench-001-first-fill-sample.md](../../academic/examples-acad-bench-001-first-fill-sample.md)
- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [../../whitepaper/evidence-registry.md](../../whitepaper/evidence-registry.md)