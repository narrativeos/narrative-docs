# Academic Adoption Weekly Execution Checklist

## 摘要（中文）

本清单用于每周推进 Academic Track 执行，避免任务缺漏、口径漂移与发布失真。

## Executive Summary (EN)

This checklist defines weekly execution gates for Academic Track implementation, evidence collection, and release-safe wording.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-academic-adoption-weekly-execution-checklist
path: developer/operations/academic-adoption-weekly-execution-checklist.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, researcher, operator]
agent_ready: true
source_of_truth: narrative-docs
```

## 每周固定节奏

1. 周一：冻结本周任务范围与 owner
2. 周三：中期检查证据字段是否齐备
3. 周五：执行发布口径审查与台账同步

## 周一范围冻结清单

- [ ] 本周任务已映射到四大目标之一（可信/透明/复现/社区）
- [ ] 每个任务有 task_id 与 owner
- [ ] 每个任务有明确输出物路径
- [ ] 不在范围内的需求已延后登记

## 周三证据字段清单

- [ ] version 已记录
- [ ] sample_size 已记录
- [ ] time_window 已记录
- [ ] calculation_method 已记录
- [ ] evidence_link 已记录

字段缺失任一项时，禁止升级 measured。

## 周五发布口径清单

- [ ] planned/study-ready/evidence-ready 分级正确
- [ ] 对外文本未把 planned 写成已达成
- [ ] benchmark 与 evidence registry 已同步
- [ ] README/index/doc-index/_config 的入口一致

## Sample 与正式记录隔离检查

- [ ] 示例样本页面明确包含 Sample Only 或 sample_flag 标识
- [ ] benchmark 中示例值未写入正式 measured 列
- [ ] evidence registry 示例条目未覆盖正式证据条目
- [ ] 对外文案未引用 sample-only 数值作为发布依据

## 本周最小交付定义

至少完成以下任一组合：

- 1 个可复现作业运行结果 + 1 条 evidence registry 更新
- 1 个指标从 planned 更新为 measured（字段齐备）
- 1 个研究工作流样例完成首轮失败归因

## 周报与分工模板

- 周报模板： [academic-adoption-weekly-status-report-template.md](academic-adoption-weekly-status-report-template.md)
- 分工矩阵： [academic-adoption-role-assignment-raci.md](academic-adoption-role-assignment-raci.md)

## 关联入口

- [academic/README.md](../../academic/README.md)
- [whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [whitepaper/evidence-registry.md](../../whitepaper/evidence-registry.md)
- [academic-adoption-weekly-status-report-template.md](academic-adoption-weekly-status-report-template.md)
- [academic-adoption-role-assignment-raci.md](academic-adoption-role-assignment-raci.md)