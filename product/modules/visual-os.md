# Visual OS Module

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines product scope, outputs, and module boundaries for the Visual OS in NarrativeOS.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-visual-os
path: product/modules/visual-os.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, designer, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块目标 | Module Goals

Visual OS Module 的目标是将语言分析结果转化为可交互、可解释、可决策的视觉操作界面。

## 模块范围 | Module Scope

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

## Home（Mission Control）模块规范

Home 是 Visual OS 的默认入口页面，定位为任务指挥台，而非空白编辑器页面。

页面结构：

- 顶栏导航：Workspace / Atlas / Corpus / Genome / Insight / Library
- 左栏资源区：我的项目、最近分析、语料库、收藏、标签
- 中栏主工作区：动态卡片（近期结果、任务状态、新增语料提醒）

动态卡片示例：

- 最近分析：《廊坊》MRI 完成
- 城市写作语料：+23 篇
- AI 热区报告：待查看

交互目标：

- 用户打开即获得任务上下文，不进入空白状态
- 用户可一跳进入单文分析、语料比较或待办诊断
- 首页优先呈现进行中与待处理任务，强化连续工作流

## V1 Workspace 页面规范

Workspace 为 Visual OS 的 V1 核心页面，采用左文中图右诊断三栏结构。

- 左栏 Text Pane：学术阅读器式文本工作区
- 中栏 Atlas：多层语言地图主舞台
- 右栏 Insight Panel：实时诊断与证据链面板

### 左栏 Text Pane

定位：在普通阅读基础上提供结构联动与研究型操作。

功能清单：

- 章节导航
- 注释
- 引用
- 搜索
- 版本对照

联动规则：

- 点击左栏句子，触发中栏地图节点高亮
- 点击中栏节点，触发左栏原文定位

### 中栏 Atlas 四层模型

- Layer 1 Structure Terrain：结构地形（信息密度、叙述区、转折区）
- Layer 2 Semantic Galaxy：语义星系（词语节点与关系展开）
- Layer 3 Rhythm Timeline：节奏时间轴（长短句、呼吸点、节奏）
- Layer 4 Heat Layer：热区层（AI 模板、修辞密度、抽象词、情绪）

## Atlas 主舞台规范（V1）

V1 以 [../prototype/v1-prototype-spec.md](../prototype/v1-prototype-spec.md) 为准：Atlas 作为中栏主舞台能力存在，与域导航同栏，不默认进入全屏。

V1 交互约束：左栏 Source Foundation 跨域稳定，域切换时不改变左栏结构与可见性；Atlas 专属控制（Layer/Mode/Drill）仅在 Atlas 域显示。

Atlas 在 V1 仍以“进入文本内部结构”为主交互路径，但保留与正文和洞察面板的并排协作，不采用强制全屏。

注：全屏 Atlas 作为后续阶段可选增强形态，不作为 V1 必要约束。

### 五种地图模式

- Mode 1 City Mode：文章-城市映射（段落=街区，连接=道路）
- Mode 2 Galaxy Mode：语义宇宙映射（词=恒星，主题=星云）
- Mode 3 Music Mode：节奏乐谱映射（句长、节奏、停顿）
- Mode 4 Emotion Mode：情绪河流映射（情绪连续变化）
- Mode 5 X-Ray Mode：问题扫描映射（冗余、断桥、AI 模板、过密区）

### 模式适用场景

- City Mode：长文结构诊断
- Galaxy Mode：概念关系探索
- Music Mode：演讲稿与节奏型文本
- Emotion Mode：小说与散文
- X-Ray Mode：编辑校对与快速修订

### 交互要求

- 模式切换保持当前文本上下文
- 任意模式都可回跳原文与诊断证据
- 点击问题信号后优先展示证据与定位结果

### 右栏 Insight Panel

实时指标：

- 结构完整度
- AI 模板率
- 抽象度
- 感官密度
- 节奏指数

证据约束：

- 所有洞察必须遵循“结论 -> 证据 -> 原文”
- 必须提供 Show Evidence 交互入口
- 点击证据后必须跳转到原文位置

## 关键交付物 | Key Deliverables

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

## 模块边界 | Module Boundaries

- 本模块负责可视化呈现与交互决策支持，不直接替代分析引擎计算
- 本模块依赖分析引擎输出的指标与信号，不直接定义底层语义模型
- 本模块不以静态报表为目标，必须支持动态探索与问题定位
- 本模块不作为 Word 式文本编辑器替代品，而是语言指挥中心的交互中枢

## 依赖关系 | Dependencies

- 上游：Analysis Engine Module
- 横向：Editor Module、Studio Module
- 下游：Report Generation、API 输出

## 关联文档 | Related Docs

- 架构设计： [../../architecture/visual-os/README.md](../../architecture/visual-os/README.md)
- 系统架构： [../../architecture/system/README.md](../../architecture/system/README.md)
- 分析引擎模块： [analysis-engine.md](analysis-engine.md)
