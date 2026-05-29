<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Visual OS Architecture

## EN Summary

This document defines the Visual OS architecture of NarrativeOS, including cockpit-style interfaces and visual diagnostics.

## Machine-readable Metadata

```yaml
doc_id: architecture-visual-os-README
path: architecture/visual-os/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, developer, product, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 定位

Visual OS 是 NarrativeOS 的可视化操作系统层，目标不是提供静态图表，而是构建可交互的语言驾驶舱（Language Cockpit）。

Visual OS 采用终端化、分层化的信息呈现方式，面向作者、编辑与研究者提供实时结构观察与诊断入口。

## 设计原则

- 可观测优先：所有可视化均对应可解释指标与诊断信号
- 交互优先：支持缩放、过滤、钻取与上下文联动
- 诊断优先：视图用于识别问题与定位风险，而非仅展示数据
- 一致语义：不同视图共享统一指标定义与信号字典

## UI 形态定义

Visual OS 的交互风格定义为“Bloomberg + Figma + Obsidian”式三栏工作台，不采用传统文档编辑器布局。

该形态的目标是构建“语言指挥中心”，而非通用写作界面。

### 三栏结构

- 左栏（资源树）：项目、书籍、论文、语料集、作者、标签
- 中栏（主舞台）：承载核心分析视图与文本探索
- 右栏（诊断台）：实时显示关键指标与风险信号

### 主舞台视图切换

- 文本视图：线性阅读与局部定位
- 图谱视图：语义星系与概念关系
- 时间轴视图：节奏波形与情绪轨道
- 地图视图：主题流与结构地形

### 诊断台核心指标

- AI 模板率
- 结构完整度
- 节奏指数
- 抽象度
- 感官密度

## 核心界面架构

### 1. 总览仪表盘（Overview Dashboard）

功能：提供文章进入后的全局健康扫描。

核心指标：

- 语言健康度
- 结构完整度
- 节奏稳定性
- AI 模板率
- 情绪曲线

定位：作为驾驶舱首页，支持问题快速发现与分析入口分流。

### 2. 语言地图（Language Terrain Map）

功能：将文本映射为可缩放语义地形。

映射规则：

- 高峰：信息密度
- 河流：主题流
- 热区：修辞密度

交互能力：支持缩放、平移与区域钻取。

### 3. 语义星系（Semantic Galaxy）

功能：展示词语与概念的网络结构关系。

图模型：

- 节点：词语/实体
- 边：共现关系/语义关联

交互能力：支持节点点击、邻域展开与主题链路跟踪。

### 4. 节奏时间轴（Rhythm Timeline）

功能：以时间轴方式展示篇章节奏变化。

核心轨道：

- 长短句分布
- 呼吸点
- 情绪变化

定位：用于快速定位阅读疲劳段、节奏突变段和表达拥塞段。

### 5. AI 热区（AI Heat Zones）

功能：对高风险文本片段进行热成像式标注。

检测类型：

- AI 模板句
- 解释过度
- 抽象过密
- 重复定义

定位：作为编辑与复写的优先处理区域视图。

## 分层架构映射

Visual OS 在系统四层架构中位于“可视化/报告层”，并与分析引擎层形成强耦合输出映射：

- Overview Dashboard <- 多引擎汇总指标
- Language Terrain Map <- 叙事流引擎 + 修辞风格引擎
- Semantic Galaxy <- 语义网络引擎
- Rhythm Timeline <- 句法与节奏引擎 + 情绪引擎
- AI Heat Zones <- 修辞风格引擎 + 规则检测

## 输出契约（建议）

每个可视化视图应具备统一输出结构：

- `view_id`: 视图标识
- `metrics`: 指标集合
- `signals`: 诊断信号
- `regions`: 可交互区域
- `explanations`: 解释文本
- `actions`: 建议动作
