<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Corpus Learning Architecture

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines corpus learning architecture as the core moat capability of NarrativeOS.

## Machine-readable Metadata

```yaml
doc_id: architecture-corpus-learning-README
path: architecture/corpus-learning/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, product, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 定位

语料学习系统是 NarrativeOS 的核心护城河能力。

系统目标不是仅保存分析报告，而是持续沉淀文本特征向量与结构信号，形成可演化的语言认知资产。

## 核心机制

每份文本经分析后应沉淀为结构化向量表示与诊断标签：

```text
文本
  ↓
分析引擎
  ↓
特征抽取
  ↓
语言向量化
  ↓
向量库沉淀
  ↓
语料统计与比较
  ↓
模型进化
```

## 语言向量资产

每份文本映射为高维语言向量（典型范围：300-1000 维），并绑定可解释特征维度。

示例维度：

- 句长
- 抽象度
- 修辞率
- 情绪谱
- 主题谱
- 叙事结构

该资产层统称为 Language Vector DB（语言向量库）。

## 功能边界

- 语料学习系统负责长期统计、比较与能力演进
- 语料学习系统不替代单文诊断流程
- 语料学习系统不以关键词规则作为唯一判断依据

## 关键场景

### 文学演化分析

支持跨时期、跨体裁语料比较，识别语言结构与叙事特征演化轨迹。

示例：1990-2025 中文城市写作的风格变化分析。

### AI 写作检测

采用统计风格与结构信号进行识别，不依赖简单关键词命中。

### 学科写作比较

支持跨学科论文语料在句法、风格、主题结构上的差异分析。

## 输出资产

- 向量资产索引
- 群体统计基线
- 演化趋势图
- 比较报告
- 反馈信号集（用于模型进化）

## 与六域架构关系

- Domain 3 Corpus Observatory：语料采样、统计与比较中枢
- Domain 4 Style Genome：风格向量与作者声纹构建
- Domain 5 Insight Engine：基于历史语料的解释增强
- Domain 6 Knowledge Graph：向量资产与知识关系融合

## Corpus 页面架构约束（V2）

Corpus 页面是 V2 阶段核心入口，首页形态定义为“数据宇宙”，用于承载语料级观察与比较任务。

该页面默认不展示单篇文章编辑界面，而以语料资产概览、趋势、聚类和对比作为首屏信息。

### 页面四块结构

- Corpus Explorer：语料浏览与筛选
- Trend View：趋势变化分析
- Cluster View：风格聚类分析
- Compare View：跨对象差异对比

### 页面数据约束

- 语料统计结果必须基于向量资产与结构信号
- 趋势与聚类结果必须可追溯到样本集合
- 对比视图必须提供可解释差异项与证据样本

### 典型任务样式

- 构建语料集：如“中国城市散文 1990-2025，1200 文本”
- 自动统计：输出时间趋势、聚类群与对比结论
- 回流沉淀：分析结果进入语料资产与模型进化链路
