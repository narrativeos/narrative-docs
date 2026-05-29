# 基准测试与验收指标入口

## 摘要（中文） | Summary (ZH)

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN) | 英文摘要

This document defines benchmark categories, acceptance metrics, and release gates for NarrativeOS documentation claims and capability milestones.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-benchmark-and-acceptance-metrics
path: whitepaper/benchmark-and-acceptance-metrics.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, reviewer, contributor, partner]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标 | Goals

本文件作为白皮书中的“可信性入口”，用于统一叙事声明与可验证指标之间的映射关系。

核心原则：

- 先定义指标，再对外宣称能力
- 指标可复算、可复核、可追踪
- 发布门槛应有最小通过标准

## 指标状态分层（强制）

- 建议值（Planned）：设计目标，尚未形成稳定实测证据
- 实测值（Measured）：有明确样本、口径、版本和证据链接

对外发布时，建议值不得表述为“已达成”。

## 证据记录模板（每个核心指标必须具备）

```yaml
metric_id: METRIC-XXX
metric_name: 指标名
status: planned | measured
version: vX.Y.Z
sample_size: N
time_window: YYYY-MM-DD..YYYY-MM-DD
calculation_method: 计算口径说明
evidence_link: docs/path/or/pr
owner: role-or-team
```

## 基准测试分类

### A. 功能正确性基准

用于验证关键流程是否按预期完成。

示例指标：

- 单文分析主链路成功率
- 导入到报告生成的流程完成率
- 关键可视化视图可用率

### B. 稳定性与可靠性基准

用于验证在常见工作负载下的稳定运行能力。

示例指标：

- 任务失败率
- 重试后成功率
- 长文本任务中断率

### C. 性能与时延基准

用于验证用户感知速度与批量任务吞吐。

示例指标：

- Fast Scan 端到端耗时
- MRI 深度分析耗时
- 千级语料批处理吞吐

### D. 解释性与证据链基准

用于验证洞察输出的可解释质量。

示例指标：

- 洞察结论可追溯率（结论 -> 证据 -> 原文）
- 无证据结论比例
- 可定位到句段的证据覆盖率

## 验收指标基线（建议值与实测值双轨）

| 场景 | 指标 | 建议值（Planned） | 实测值（Measured） | 版本 | 证据 |
| --- | --- | --- | --- | --- | --- |
| V1 单文闭环 | 导入到报告完成时长 | P50 <= 15 分钟 | TBD | TBD | 待补证据 |
| V1 单文闭环 | 关键流程成功率 | >= 95% | TBD | TBD | 待补证据 |
| V1 洞察质量 | 结论证据可追溯率 | >= 90% | TBD | TBD | 待补证据 |
| V2 语料分析 | 千级语料任务完成率 | >= 90% | TBD | TBD | 待补证据 |
| V2 语料分析 | 小时级任务稳定性 | 24h 内失败率 <= 5% | TBD | TBD | 待补证据 |
| V3 机构评估 | 批量评估报告产出率 | >= 95% | TBD | TBD | 待补证据 |

> 注：当 `实测值` 为 `TBD` 时，该指标仅可用于路线目标，不可作为“已完成发布”的对外声明依据。

## 发布门禁（Release Gates）

- Gate 1: 架构与流程文档已更新并通过评审
- Gate 2: 关键验收指标达到基线
- Gate 3: 白皮书映射与就绪度清单已同步

补充规则：

- Gate 2 必须至少包含 1 个 measured 指标及证据链接
- 无证据链接的 measured 指标按未通过处理

任一 Gate 未通过，不建议对外宣称对应能力“已完成发布”。

## 数据来源与追踪

- 指标来源应记录在 PR 或发布说明中
- 指标计算口径需要稳定版本号
- 历史对比应使用同口径数据
- 指标记录应包含 `sample_size` 与 `time_window`

## 维护机制

- 每个版本发布前更新一次指标快照
- 当指标定义变更时，必须记录变更原因
- 指标异常应在路线图和已知限制中体现

## 关联文档 | Related Docs

- whitepaper/readiness-checklist.md
- product/roadmap/README.md
- product/workflows/README.md
- adr/README.md
