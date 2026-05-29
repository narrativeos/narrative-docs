<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Visual OS Module

## EN Summary

This document defines product scope, outputs, and module boundaries for the Visual OS in NarrativeOS.

## Machine-readable Metadata

```yaml
doc_id: product-modules-visual-os
path: product/modules/visual-os.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, designer, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块目标

Visual OS Module 的目标是将语言分析结果转化为可交互、可解释、可决策的视觉操作界面。

## 模块范围

- 全局语言健康仪表盘
- 语言地形图与主题空间导航
- 语义星系关系探索
- 节奏时间轴与疲劳段识别
- AI 热区诊断与优先处理建议

## 关键交付物

- Overview Dashboard（总览仪表盘）
- Language Terrain Map（语言地图）
- Semantic Galaxy（语义星系）
- Rhythm Timeline（节奏时间轴）
- AI Heat Zones（AI 热区）

## 核心指标（示例）

- 语言健康度
- 结构完整度
- 节奏稳定性
- AI 模板率
- 情绪曲线
- 修辞密度
- 信息密度

## 交互能力要求

- 缩放与平移
- 区域钻取
- 视图联动
- 信号回溯
- 问题优先级标注

## 模块边界

- 本模块负责可视化呈现与交互决策支持，不直接替代分析引擎计算
- 本模块依赖分析引擎输出的指标与信号，不直接定义底层语义模型
- 本模块不以静态报表为目标，必须支持动态探索与问题定位

## 依赖关系

- 上游：Analysis Engine Module
- 横向：Editor Module、Studio Module
- 下游：Report Generation、API 输出

## 关联文档

- 架构设计： [../../architecture/visual-os/README.md](../../architecture/visual-os/README.md)
- 系统架构： [../../architecture/system/README.md](../../architecture/system/README.md)
- 分析引擎模块： [analysis-engine.md](analysis-engine.md)
