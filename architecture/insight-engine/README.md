# Insight Engine Architecture

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the architecture of Insight Engine as an evidence-driven AI analyst system.

## Machine-readable Metadata

```yaml
doc_id: architecture-insight-engine-README
path: architecture/insight-engine/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, product, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 定位

Insight Engine 的定位是 AI 分析师系统，不是聊天助手系统。

该系统不以自由问答为目标，而以“问题解释 + 证据链展示 + 原文回跳”作为核心能力。

## 核心原则

- 不猜测：回答必须基于已有分析结果与结构信号
- 不空谈：结论必须绑定指标和样本证据
- 不黑箱：用户可追踪到原文位置与触发原因

## 输入与依赖

Insight Engine 输入来自：

- MRI 与分析引擎输出指标
- 风格信号与语义关系
- 节奏与情绪轨道
- 语料统计结果（可选）

## 输出结构

Insight 输出必须遵循固定链路：

```text
结论
  ↓
证据
  ↓
原文
```

每条结论都需包含：

- `claim`: 结论陈述
- `evidence`: 指标与结构证据
- `source_spans`: 原文定位
- `confidence`: 置信度
- `action`: 建议动作

## 典型问答场景

用户问题：为什么这篇文章读起来疲劳？

系统回答必须基于分析数据，例如：

- 连续长句
- 抽象词密集
- 情绪单频

并展示对应证据与原文定位。

## 交互约束

- 任何自然语言解释都必须可触发 Show Evidence
- 证据点击后必须跳转到原文句段
- 不允许只给判断不展示证据

## 与其他域关系

- 上游：Analysis Engine、Style Genome、Corpus Observatory
- 同层：Visual OS（Insight Panel）
- 下游：报告生成、编辑建议与任务队列
