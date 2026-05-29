<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Platform Domains Module Design

## EN Summary

This document defines module-level product design for the six platform domains of NarrativeOS.

## Machine-readable Metadata

```yaml
doc_id: product-modules-platform-domains
path: product/modules/platform-domains.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块设计目标

将 NarrativeOS 从单点分析产品升级为平台级产品，形成“诊断 -> 认知 -> 科学”递进能力。

## 六域模块定义

### 1. Text Lab

模块目标：提供标准化文本接入与单文本诊断入口。

模块输出：

- 输入标准化结果
- 单文分析任务
- 首轮诊断摘要

### 2. Narrative Atlas

模块目标：提供探索式语言可视化工作台。

模块输出：

- 语义空间视图
- 主题流视图
- 节奏与修辞视图
- 可交互钻取路径

### 3. Corpus Observatory

模块目标：提供跨语料统计、比较与趋势分析能力。

模块输出：

- 语料基线统计
- 分时期/分体裁趋势
- 群体对比结论

### 4. Style Genome

模块目标：形成风格指纹与作者声纹档案。

模块输出：

- 风格向量
- 作者画像
- 跨文本风格迁移曲线

### 5. Insight Engine

模块目标：生成解释型洞察与优化建议。

模块输出：

- 解释结论
- 风险提示
- 优化建议

### 6. Knowledge Graph

模块目标：构建文本知识网络并支持关系检索。

模块输出：

- 实体关系图
- 概念关联图
- 主题网络索引

## 模块间协作关系

```text
Text Lab -> Narrative Atlas -> Corpus Observatory -> Style Genome -> Insight Engine -> Knowledge Graph
```

## 关键平台能力

- 规模分析：支持大规模文本持续纳入与比较
- 认知沉淀：将分析结果结构化为长期资产
- 进化能力：以历史语料反馈推动分析能力迭代

## 非目标

- 不以内容代写为主路径
- 不输出无证据来源的黑箱建议
- 不将六域混为单体功能集合

## 关联文档

- 平台架构： [../../architecture/platform/README.md](../../architecture/platform/README.md)
- 系统架构： [../../architecture/system/README.md](../../architecture/system/README.md)
- 分析引擎模块： [analysis-engine.md](analysis-engine.md)
- Visual OS 模块： [visual-os.md](visual-os.md)
