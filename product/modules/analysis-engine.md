# Analysis Engine Module

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines product-level scope and deliverables of the Analysis Engine module.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-analysis-engine
path: product/modules/analysis-engine.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块目标 | Module Goals

Analysis Engine Module 的目标是将文本诊断能力产品化，形成可组合、可解释、可视化的分析服务。

## 模块范围 | Module Scope

- 词汇画像与异常识别
- 句法节奏与复杂度评估
- 语义网络与主题聚类
- 叙事流与主题迁移分析
- 修辞风格识别与风格向量构建
- 情绪与感官密度分析

## 关键输出 | Key Outputs

- 指标集（Metrics）
- 结构信号（Signals）
- 图谱构件（Graph Artifacts）
- 诊断报告（Diagnostics Report）

## 产品交付物

- Sentence ECG（句长心电图）
- Semantic Galaxy（语义星系图）
- Topic Flow Map（主题流图）
- Style Fingerprint（风格指纹）
- Sensory Density（感官密度）

## 非目标 | Non-goals

- 不提供自动代写作为主路径
- 不以单一黑箱模型作为诊断依据
- 不输出不可追溯的结论

## 依赖关系 | Dependencies

- 上游：输入层、语言计算层
- 并行：Atlas、Editor、Studio
- 下游：可视化层、报告层、API 层

## 关联文档 | Related Docs

- 架构定义： [../../architecture/analysis-engine/README.md](../../architecture/analysis-engine/README.md)
- 系统架构： [../../architecture/system/README.md](../../architecture/system/README.md)
