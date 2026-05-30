# Corpus Observatory Module

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines module-level design for corpus learning and large-scale language observation.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-corpus-observatory
path: product/modules/corpus-observatory.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块目标 | Module Goals

Corpus Observatory 模块的目标是将单文本分析升级为规模化语料观察与比较能力。

## 核心能力 | Core Capabilities

- 语料批量纳入与结构化索引
- 语言向量沉淀与可解释特征绑定
- 跨时期/跨体裁/跨作者比较分析
- 趋势发现与统计基线构建
- 反馈信号输出用于能力进化

## V2 页面模型（Corpus）

Corpus 页面为 V2 核心页面，定位为语料观测主界面，不使用单文阅读作为默认形态。

页面由四个核心区块组成：

### 1. Corpus Explorer

功能：语料浏览、检索与筛选。

筛选维度示例：

- 作者
- 时间
- 领域

### 2. Trend View

功能：展示关键指标的时间变化与阶段拐点。

示例：关键词“空间”词频在 30 年尺度上的变化趋势。

### 3. Cluster View

功能：自动聚类并显示语料风格群与结构群。

输出：聚类分组、群体特征摘要、典型样本。

### 4. Compare View

功能：对不同对象进行直接风格与结构差异比较。

对比场景示例：

- 鲁迅 vs 余华
- 人类论文 vs AI 论文

输出：差异维度、显著性指标、证据样本。

## 数据资产定义

每篇文本需形成语言向量资产（300-1000 维典型范围）并绑定特征标签。

特征维度示例：

- 句长
- 抽象度
- 修辞率
- 情绪谱
- 主题谱
- 叙事结构

## 关键输出 | Key Outputs

- Language Vector DB 记录
- 语料分层统计看板
- 风格与结构比较报告
- 演化趋势曲线
- AI 写作检测信号

## 典型场景 | Typical Scenarios

- 文学演化：如 1990-2025 中文城市写作演化比较
- AI 写作检测：基于统计风格而非关键词
- 学科写作比较：跨领域论文风格差异分析

## 典型流程（V2）

```text
创建 Corpus
	↓
批量纳入
	↓
自动统计
	↓
趋势分析
	↓
聚类分析
	↓
对比分析
```

该流程强调“浏览 -> 发现 -> 比较 -> 沉淀”而非“上传 -> 评分 -> 结束”。

## 模块边界 | Module Boundaries

- 本模块不负责单篇文本即时编辑交互
- 本模块不依赖单一规则命中做结论
- 本模块必须输出可回溯统计证据

## 关联文档 | Related Docs

- 语料学习架构： [../../architecture/corpus-learning/README.md](../../architecture/corpus-learning/README.md)
- 平台蓝图： [../../architecture/platform/README.md](../../architecture/platform/README.md)
- 平台域模块设计（当前基线六域）： [platform-domains.md](platform-domains.md)
