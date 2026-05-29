<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Insight Engine Module

## EN Summary

This document defines product module design for Insight Engine as a trustworthy AI analyst.

## Machine-readable Metadata

```yaml
doc_id: product-modules-insight-engine
path: product/modules/insight-engine.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块目标

Insight Engine 模块的目标是提供可信、可解释、可执行的 AI 洞察服务。

## 产品定位

- 定位：AI 分析师
- 非定位：聊天机器人 / 代写助手

## 核心能力

- 问题解释：回答“为什么”类问题
- 原因拆解：将问题拆分为可验证因素
- 证据展示：输出指标、信号与原文样本
- 行动建议：提供可执行修订建议

## 关键交付物

- Insight Panel 结论卡
- 证据链视图（结论 -> 证据 -> 原文）
- Show Evidence 跳转能力
- 可追溯建议清单

## 典型问题模板

- 为什么这篇文章读起来疲劳？
- 为什么这个章节显得重复？
- 为什么该段落表达不清？

## 标准回答结构

以“阅读疲劳”问题为例，回答结构为：

- 结论：存在阅读疲劳风险
- 原因：连续长句 + 抽象词密集 + 情绪单频
- 证据：对应指标、信号与句段位置
- 建议：断句、降抽象、增加节奏变化

## 模块边界

- 不基于主观偏好给出无证据评论
- 不输出无法回溯原文的判断
- 不替代用户最终表达决策

## 关联文档

- 架构定义： [../../architecture/insight-engine/README.md](../../architecture/insight-engine/README.md)
- Visual OS 模块： [visual-os.md](visual-os.md)
- 分析引擎模块： [analysis-engine.md](analysis-engine.md)
