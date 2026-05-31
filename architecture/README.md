# Architecture Memory

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document is the architecture memory index for cross-repository design boundaries and subsystem relationships.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: architecture-README
path: architecture/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页维护 NarrativeOS 的跨仓库架构记忆，用于统一系统边界、模块关系和实现约束。

如果你对关键术语还不熟悉，建议先打开 [术语表](../assets/glossary.zh-en.md)。

## 阅读路径（建议） | Recommended Path

- 第一步：先读 [system](system/README.md) 了解全局边界（含系统全景图与平台域主链路图）
- 第二步：再读 [storage](storage/README.md) 与 [runtime](runtime/README.md) 掌握实现骨架
- 第三步：按业务域阅读 analysis-engine / insight-engine / style-genome / visual-os（analysis-engine 含单文 Full MRI Walkthrough）

如果你时间有限，建议先完成两步：

- 看 [system](system/README.md) 的全景图，建立系统边界心智模型
- 看 [analysis-engine](analysis-engine/README.md) 的 Full MRI Walkthrough，理解一次诊断请求如何落成可回链输出

## 子文档索引 | Subdocument Index

- [system](system/README.md): 总体系统边界与子系统关系（含系统全景图、平台域主链路图）
- [platform](platform/README.md): 平台级蓝图、平台域模型（当前基线六域）与能力进化闭环
- [storage](storage/README.md): 分层存储、增量重算持久化与 artifact 句柄注册
- [runtime](runtime/README.md): Rust Host / TS UI / Python Worker 运行时分工与隔离
- [spatial](spatial/README.md): 空间计算与 GIS 集成
- [library](library/README.md): 知识库架构与语言百科沉淀机制
- [corpus-learning](corpus-learning/README.md): 语料学习系统与语言向量资产架构
- [style-genome](style-genome/README.md): 风格基因架构与语言基因卡设计
- [analysis-engine](analysis-engine/README.md): 引擎集合架构（当前基线六引擎）与 CT 扫描式诊断流程（含单文 Full MRI Walkthrough）
- [insight-engine](insight-engine/README.md): 证据驱动 AI 分析师架构
- [atlas](atlas/README.md): Atlas 相关能力与边界
- [visual-os](visual-os/README.md): 语言驾驶舱与可视化操作系统架构

## 使用规则 | Usage Rules

- 发生关键架构变更时，先更新本层，再同步 [ADR 索引](../adr/README.md)
- 设计评审和跨仓协作以本层文档作为基准，不以临时讨论结论替代

## 标准参考 | Standards Reference

- [Benchmark and Acceptance Metrics](../whitepaper/benchmark-and-acceptance-metrics.md)
- [Research Methodology and Reproducibility](../whitepaper/research-methodology-and-reproducibility.md)
- [Algorithm Evaluation Report](../whitepaper/algorithm-evaluation-report.md)
- [Core Docs Mapping](../developer/coding/core-docs-mapping.md)
- [Readiness Checklist](../developer/coding/readiness-checklist.md)
