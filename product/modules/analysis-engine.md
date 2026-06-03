---
layout: default
title: 分析引擎 Analysis Engine
parent: NarrativeOS 底层大脑
grand_parent: Product 产品
nav_order: 221
---

# 分析引擎 Analysis Engine

> 本文档为 NarrativeOS 底层大脑的子能力，面向需要了解知识诊断与分析机制的读者。

## 摘要

分析引擎提供文本诊断能力：词汇、语法、语义、叙事流的自动化检测与分析。

## 能力说明

- **词汇诊断**：术语一致性、用词规范检查
- **语法诊断**：句法结构分析、语法错误检测
- **语义诊断**：语义一致性、逻辑冲突检测
- **叙事流分析**：篇章连贯性、叙事节奏评估

## 与产品矩阵的关系

分析引擎是 NarrativeOS 底层大脑的核心组件，为插件端提供的参数建议与合规检查提供分析基础。

详细技术实现见 [Architecture 架构](../../architecture/README.md)。