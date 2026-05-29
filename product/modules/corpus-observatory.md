<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Corpus Observatory Module

## EN Summary

This document defines module-level design for corpus learning and large-scale language observation.

## Machine-readable Metadata

```yaml
doc_id: product-modules-corpus-observatory
path: product/modules/corpus-observatory.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块目标

Corpus Observatory 模块的目标是将单文本分析升级为规模化语料观察与比较能力。

## 核心能力

- 语料批量纳入与结构化索引
- 语言向量沉淀与可解释特征绑定
- 跨时期/跨体裁/跨作者比较分析
- 趋势发现与统计基线构建
- 反馈信号输出用于能力进化

## 数据资产定义

每篇文本需形成语言向量资产（300-1000 维典型范围）并绑定特征标签。

特征维度示例：

- 句长
- 抽象度
- 修辞率
- 情绪谱
- 主题谱
- 叙事结构

## 关键输出

- Language Vector DB 记录
- 语料分层统计看板
- 风格与结构比较报告
- 演化趋势曲线
- AI 写作检测信号

## 典型场景

- 文学演化：如 1990-2025 中文城市写作演化比较
- AI 写作检测：基于统计风格而非关键词
- 学科写作比较：跨领域论文风格差异分析

## 模块边界

- 本模块不负责单篇文本即时编辑交互
- 本模块不依赖单一规则命中做结论
- 本模块必须输出可回溯统计证据

## 关联文档

- 语料学习架构： [../../architecture/corpus-learning/README.md](../../architecture/corpus-learning/README.md)
- 平台蓝图： [../../architecture/platform/README.md](../../architecture/platform/README.md)
- 六域模块设计： [platform-domains.md](platform-domains.md)
