# Product V1 Design Baseline

## 摘要（中文）

本页定义 NarrativeOS Product V1 的可执行设计基线，用于统一产品目标、范围边界、MVP 流程、验收口径与阶段性 Go/No-go 条件。

## Executive Summary (EN)

This document defines an execution-ready Product V1 baseline for NarrativeOS, including scope, MVP flow, acceptance metrics, and release gates.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-v1-design-baseline
path: product/v1-design-baseline.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, operator, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

回答五个必须统一的问题：

- V1 到底做什么，不做什么
- MVP 如何形成单次闭环
- 什么算达标，什么算失败
- 何时可以继续扩展，何时必须回退
- 产品验收如何与工程可靠性闸门绑定

## V1 目标用户与价值

目标用户：作者/编辑（单文高频诊断场景）。

核心价值：

- 在 5-15 分钟内完成从导入到修订决策的闭环
- 以证据链方式输出可解释结论，而不是单一评分
- 保证高负载时仍可用，避免“看起来有功能但不可运营”

## 范围边界（In / Out）

### In Scope（V1 必做）

- 单文导入与基础清洗
- Fast Scan（秒级）与 Full MRI（分钟级）双路径
- Atlas 主视图（结构/语义/节奏/热区）
- Insight Panel 证据链（结论 -> 证据 -> 原文）
- 报告导出与最小可复现快照

### Out of Scope（V1 不做）

- 语料级批处理与跨语料比较（V2）
- 机构级批量评估与治理工作台（V3）
- 内建用户系统（账号、登录、注册、租户管理）

## MVP 流程（最小可发布闭环）

```text
导入文本
  -> Fast Scan 首次反馈
  -> Full MRI 异步完成
  -> Atlas/Insight 联动诊断
  -> 导出报告与快照
```

体验要求：

- Fast 路径先返回可用结果，Deep 路径后补全深度洞察
- 全流程任何结论都必须可回链到证据和原文定位
- 过载时允许降级，但必须显式显示降级原因

## 验收口径（产品 KPI + 工程 SLO 双门槛）

| Gate | Metric | Target | No-go Trigger |
| --- | --- | --- | --- |
| Product-KPI-01 | 单稿闭环完成率 | >= 85%（目标用户样本） | < 70% 连续两周 |
| Product-KPI-02 | 首次可用反馈时延体感 | 大多数样本在 2s 内感知到反馈 | > 4s 比例超过 20% |
| Product-KPI-03 | 证据链可解释率 | >= 95% 结论可回链 | < 90% |
| Eng-SLO-01 | Fast Queue p95 | <= 2s | 连续 10 分钟超标 |
| Eng-SLO-02 | Deep Queue 完成率 | >= 99.0% | < 98.0% |
| Eng-SLO-03 | Manifest 一致性成功率 | >= 99.9% | 任一发布窗口出现版本错配 |

发布规则：

- Product KPI 和 Engineering SLO 任一不达标，均不得进入 GA。
- 若 error budget 月度耗尽，仅允许稳定性修复，不允许新增功能上线。

## 分阶段推进与退出条件

### Stage A：Design Freeze（1-2 周）

交付物：

- 场景脚本、页面流、关键交互状态图
- 指标口径卡（KPI/SLO 定义、采集方式、阈值）

退出条件：

- 设计评审通过且无 P0 分歧
- Out of Scope 明确且被产品、架构、开发三方确认

### Stage B：MVP Build（2-4 周）

交付物：

- 可跑通单文闭环的工作版本
- 最小 runbook 与降级开关

退出条件：

- 双门槛指标在试运行周达标
- 故障演练至少完成 1 次并留痕

### Stage C：Pilot Launch（2 周）

交付物：

- 小范围真实用户试点报告
- 失败样本复盘与修复清单

退出条件：

- 关键 No-go 触发器全部关闭
- 回滚路径验证通过

## No-go 清单（触发即停止扩展）

- Fast 路径不可用导致核心编辑流中断
- 证据链无法回链（结论无法定位原文）
- 关键 SLO 超预算且无缓解趋势
- 发生跨边界数据暴露或权限失控

## 跨文档对齐

- 架构与可靠性基线：../architecture/system/README.md
- 运行时处置与 runbook：../architecture/runtime/README.md
- 存储生命周期与回收策略：../architecture/storage/README.md
- 产品工作流：workflows/README.md
- 产品路线图：roadmap/README.md
