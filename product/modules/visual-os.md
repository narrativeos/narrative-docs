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

## 界面信息架构

Visual OS 采用三栏信息架构：

- 左栏资源树：项目、书籍、论文、语料集、作者、标签
- 中栏主舞台：文本/图谱/时间轴/地图四种主视图切换
- 右栏诊断台：实时指标、风险标签、优先处理队列

该信息架构用于支持“先观察、再决策、后编辑”的产品流程。

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
- 抽象度
- 感官密度

## 主舞台视图规范

- 文本视图：用于语句级阅读、定位和上下文回看
- 图谱视图：用于概念网络探索和语义关系检索
- 时间轴视图：用于节奏异常段和情绪波动段定位
- 地图视图：用于主题迁移路径和结构断点识别

## 体验记忆点设计

- 首次诊断不直接显示评分结果，先呈现“语言地图生成动画”（CT 扫描式显影）
- 生成动画完成后进入 Atlas 主舞台，用户从“观察结构”开始，而非从“结论评分”开始
- 该交互用于强化产品记忆点与“先看见语言，再做编辑决策”的使用心智

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
- 本模块不作为 Word 式文本编辑器替代品，而是语言指挥中心的交互中枢

## 依赖关系

- 上游：Analysis Engine Module
- 横向：Editor Module、Studio Module
- 下游：Report Generation、API 输出

## 关联文档

- 架构设计： [../../architecture/visual-os/README.md](../../architecture/visual-os/README.md)
- 系统架构： [../../architecture/system/README.md](../../architecture/system/README.md)
- 分析引擎模块： [analysis-engine.md](analysis-engine.md)
