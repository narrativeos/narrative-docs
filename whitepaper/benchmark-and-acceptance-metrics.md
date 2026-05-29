<!-- doc-nav:start -->
> 返回路径： [白皮书目录](README.md) | [文档首页](../README.md)
<!-- doc-nav:end -->

# 基准测试与验收指标入口

## EN Summary

This document defines benchmark categories, acceptance metrics, and release gates for NarrativeOS documentation claims and capability milestones.

## Machine-readable Metadata

```yaml
doc_id: whitepaper-benchmark-and-acceptance-metrics
path: whitepaper/benchmark-and-acceptance-metrics.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, reviewer, contributor, partner]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标

本文件作为白皮书中的“可信性入口”，用于统一叙事声明与可验证指标之间的映射关系。

核心原则：

- 先定义指标，再对外宣称能力
- 指标可复算、可复核、可追踪
- 发布门槛应有最小通过标准

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

## 验收指标基线（建议）

| 场景 | 指标 | 验收基线 |
| --- | --- | --- |
| V1 单文闭环 | 导入到报告完成时长 | P50 <= 15 分钟 |
| V1 单文闭环 | 关键流程成功率 | >= 95% |
| V1 洞察质量 | 结论证据可追溯率 | >= 90% |
| V2 语料分析 | 千级语料任务完成率 | >= 90% |
| V2 语料分析 | 小时级任务稳定性 | 24h 内失败率 <= 5% |
| V3 机构评估 | 批量评估报告产出率 | >= 95% |

## 发布门禁（Release Gates）

- Gate 1: 架构与流程文档已更新并通过评审
- Gate 2: 关键验收指标达到基线
- Gate 3: 白皮书映射与就绪度清单已同步

任一 Gate 未通过，不建议对外宣称对应能力“已完成发布”。

## 数据来源与追踪

- 指标来源应记录在 PR 或发布说明中
- 指标计算口径需要稳定版本号
- 历史对比应使用同口径数据

## 维护机制

- 每个版本发布前更新一次指标快照
- 当指标定义变更时，必须记录变更原因
- 指标异常应在路线图和已知限制中体现

## 关联文档

- whitepaper/readiness-checklist.md
- product/roadmap/README.md
- product/workflows/README.md
- adr/README.md
