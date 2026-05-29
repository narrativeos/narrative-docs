# Platform Architecture Blueprint

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the platform-level architecture blueprint of NarrativeOS as a language observatory and narrative intelligence infrastructure.

## Machine-readable Metadata

```yaml
doc_id: architecture-platform-README
path: architecture/platform/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, product, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 0层定义（产品哲学）

NarrativeOS 定义为：用于观察、测量、比较和进化文本的语言操作系统。

该系统不以文本生成为首要目标，而以“看见语言”作为第一能力。

定位声明：

- Language Observatory（语言观测站）
- Narrative Intelligence Infrastructure（叙事智能基础设施）

## 平台级目标（三层）

```text
文本诊断
  ↓
文本认知
  ↓
语言科学
```

平台在规模化语料场景下具备持续进化能力，目标是形成可累积、可验证、可复用的语言基础设施。

## 平台演进闭环

NarrativeOS 的核心闭环为：

```text
文本输入
  ↓
分析计算
  ↓
数据沉淀
  ↓
知识统计
  ↓
模型进化
  ↓
新分析能力
```

该闭环是平台级能力增长的主机制，决定系统会持续提升对文本结构与叙事模式的理解能力。

## 护城河能力：语料学习系统

NarrativeOS 的长期竞争力来自语料学习系统。

系统沉淀对象不是静态报告，而是可计算语言资产：

- 文本特征向量
- 结构信号
- 统计基线
- 演化趋势

每份文本应映射为高维语言向量（典型范围：300-1000 维），并绑定可解释维度。

示例维度：

- 句长
- 抽象度
- 修辞率
- 情绪谱
- 主题谱
- 叙事结构

该资产层构成 Language Vector DB（语言向量库）。

详细定义见： [../corpus-learning/README.md](../corpus-learning/README.md)

## 六域架构（Platform Six-Domain Architecture）

### Domain 1: Text Lab（文本实验室）

职责：作为单文本分析入口，完成文档接入、预处理与诊断启动。

处理对象：图书、论文、长文、文档与语料集。

### Domain 2: Narrative Atlas（叙事地图）

职责：作为探索式可视化界面，支持多尺度文本漫游与结构观察。

核心视图：词星系、主题河流、节奏波形、修辞热区。

### Domain 3: Corpus Observatory（语料观测站）

职责：面向大规模语料进行宏观统计、趋势分析与比较研究。

能力目标：将单文诊断升级为跨文本、跨时期、跨体裁的观测能力。

关键任务：

- 语料向量化
- 群体统计
- 变化检测
- 比较分析
- 反馈回流

### Domain 4: Style Genome（风格基因库）

职责：构建作者与文本的风格 DNA 档案，支持跨作者和跨时期对比。

核心维度：空间感、抽象度、感官率、修辞模式、句法复杂度。

### Domain 5: Insight Engine（洞察引擎）

职责：对诊断结果进行解释与建议生成，形成可行动洞察。

定位：语言顾问系统，不承担代写职责。

### Domain 6: Knowledge Graph（知识网络）

职责：构建文本实体与概念关系网络，连接作者、作品、主题、时代与修辞。

能力目标：实现文本知识的结构化组织与推理增强。

域扩展：Domain 6 在产品层对应 Library（知识库）作为最终知识汇聚界面。

Library 组织结构：

- 作品
- 作者
- 概念
- 主题
- 风格
- 修辞

详细定义见： [../library/README.md](../library/README.md)

## 六域主链路

```text
Text Lab
  ↓
Narrative Atlas
  ↓
Corpus Observatory
  ↓
Style Genome
  ↓
Insight Engine
  ↓
Knowledge Graph
```

该链路定义平台从“单次分析工具”向“长期认知基础设施”的演化路径。

## 架构约束

- 分域解耦：六域职责边界清晰，禁止能力重叠导致的架构漂移
- 语义一致：跨域共享统一指标定义、诊断术语与数据语义
- 证据优先：洞察输出必须绑定可回溯指标与结构证据
- 可持续进化：新能力必须纳入闭环，不允许一次性、不可复用分析路径

## CTO Blueprint（收敛版）

为避免架构文档分散，CTO 蓝图收敛在 platform + system 两份主文档。

本节定义长期不推倒重来的核心原则：

- Studio 优先：创作体验优先于分析炫技
- Local-first：低延迟与隐私优先，本地实时闭环
- Cloud-enhanced：云端负责重分析、协同与进化
- Model-agnostic：模型可替换，不绑定单一供应商
- Schema-first：数据结构先行，插件与引擎必须对齐
- Plugin-native：分析能力持续扩展而非内置写死

平台四层（宏观）：

```text
Studio Layer
  ↓
Local Engine Layer
  ↓
Cloud Intelligence
  ↓
Language Data Layer
```

双循环（实时环 + 长期环）：

```text
用户写作
  ↓
本地分析
  ↓
即时反馈
  ↓
异步云任务
  ↓
深度 MRI
  ↓
向量沉淀
  ↓
知识云
  ↓
反哺 Studio
```
