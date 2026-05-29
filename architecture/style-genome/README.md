# Style Genome Architecture

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the architecture of Style Genome, including language genome cards and longitudinal writing evolution analysis.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: architecture-style-genome-README
path: architecture/style-genome/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, product, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 定位 | Positioning

Style Genome 是 NarrativeOS 中用于构建作者与文本风格 DNA 的核心架构域。

系统输出不是单次评分，而是可追踪、可比较、可演化的语言基因画像。

## 核心产物：Language Genome Card

每位作者或文本集合都可生成 Language Genome Card（语言基因卡），以结构化指标呈现风格特征。

示例维度：

- 空间感
- 抽象度
- 感官率
- 节奏波动
- 解释倾向

该卡片应支持雷达图等高可读可视化形态。

## 架构能力

- 风格向量抽取
- 风格画像构建
- 跨对象差异比较
- 跨时间演化追踪
- 风格证据回溯

## 演化分析能力

Style Genome 支持同一作者跨时期写作对比。

示例场景：

- 2023 我 vs 2026 我

输出：

- 维度变化幅度
- 演化方向
- 稳定风格特征
- 新增风格倾向

## 交互约束 | Interaction Constraints

- 每个维度分值必须可追溯到原始文本证据
- 对比结论必须展示差异来源与样本区间
- 演化结论必须绑定时间维度与版本信息

## 平台价值 | Platform Value

Style Genome 提供高粘性个人反馈回路与长期风格成长记录，形成持续使用动力。
