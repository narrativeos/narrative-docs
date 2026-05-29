<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Analysis Engine Architecture

## EN Summary

This document defines the modular analysis engine architecture for NarrativeOS.

## Machine-readable Metadata

```yaml
doc_id: architecture-analysis-engine-README
path: architecture/analysis-engine/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 定位

Analysis Engine 是 NarrativeOS 的核心计算中枢，负责将文本输入转化为可观测、可解释、可行动的诊断结果。

架构采用模块化设计，不使用单一大模型作为唯一分析路径。

## 设计原则

- 模块化：按分析职能拆分为独立引擎，支持分步演进与替换
- 可解释：每个引擎输出可追溯指标与中间结果
- 可组合：支持按场景选择引擎组合，形成差异化分析流水线
- 可扩展：通过标准输入输出协议接入新模型与新算法

## 六引擎架构

### Engine 1: 字符与词汇引擎（Lexical DNA Engine）

职责：构建语言基础画像。

核心输出：

- 字频
- 词频
- 词性分布
- TTR（词汇丰富度）
- Zipf 分布
- 高频词异常

建议工具链：spaCy、jieba/pkuseg、HanLP。

### Engine 2: 句法与节奏引擎（Syntax & Rhythm Engine）

职责：构建句法复杂度与节奏结构画像。

核心输出：

- 句长分布与方差
- 节奏波形
- 从句深度
- 平均依存距离
- 复杂句比例
- Sentence ECG（句长心电图）

建议能力：dependency parsing、constituency parsing。

建议工具链：HanLP、Stanford NLP。

### Engine 3: 语义网络引擎（Semantic Network Engine）

职责：构建语义空间关系与主题聚类结构。

核心输出：

- 词语距离
- 段落相似度
- 主题簇
- 语义重叠
- Semantic Galaxy（语义星系图）

建议嵌入模型：BGE、Sentence-BERT、text-embedding-3。

### Engine 4: 叙事流分析引擎（Narrative Flow Engine）

职责：识别主题迁移路径与篇章脉络。

核心输出：

- 主题分段
- 主题迁移链路
- 主题流图（Topic Flow Map）

建议算法：BERTopic、LDA、TextTiling、Transformer Topic Model。

### Engine 5: 修辞与风格引擎（Rhetoric & Style Engine）

职责：识别修辞结构与风格特征，构建作者声纹。

核心输出：

- 修辞模式识别（排比、对偶、比喻、重复）
- AI 模板句检测与 AI 热区标注
- Style Fingerprint（风格指纹）
- 风格向量（空间感、抽象度、感官密度、叙事速度、解释倾向）
- 作者声纹（Author Voiceprint）

### Engine 6: 情绪与感官引擎（Emotion & Sensory Engine）

职责：构建多维情绪与感官表达画像。

核心输出：

- 多维情绪状态（如怀旧、克制、昂扬、疏离）
- 感官词识别（风、光、气味、触感等）
- Sensory Density（感官密度）

## 标准处理流程

```text
文本输入
  ↓
NLP 解析
  ↓
指标计算
  ↓
关系建模
  ↓
图谱生成
  ↓
诊断报告
```

该流程采用 CT 扫描式分层分析：逐层成像、逐层解释、逐层生成可行动诊断结论。

## 与系统架构的映射关系

- 输入层：文本接入与格式标准化
- 语言计算层：词法/句法/语义基础解析
- 分析引擎层：六引擎并行或串行执行
- 可视化/报告层：星系图、流图、心电图与诊断报告输出

## 输出契约（建议）

每个引擎输出遵循统一结构：

- `metrics`: 量化指标
- `signals`: 结构信号
- `artifacts`: 可视化构件
- `diagnostics`: 诊断结论
- `confidence`: 置信度
