<!-- doc-nav:start -->
> 返回路径： [文档首页](../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Architecture Memory

## EN Summary

This document describes Architecture Memory in the Narrative Knowledge Hub.

## Machine-readable Metadata

```yaml
doc_id: architecture-README
path: architecture/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

本层维护 NarrativeOS 的跨仓库架构记忆。

## 导航

- 返回首页: [README.md](../README.md)
- 并行阅读: [ADR](../adr/README.md) | [Developer](../developer/README.md) | [AI Context](../ai/README.md)

## 模块

- [system](system/README.md): 总体系统边界与子系统关系
- [platform](platform/README.md): 平台级蓝图、六域架构与能力进化闭环
- [corpus-learning](corpus-learning/README.md): 语料学习系统与语言向量资产架构
- [style-genome](style-genome/README.md): 风格基因架构与语言基因卡设计
- [insight-engine](insight-engine/README.md): 证据驱动 AI 分析师架构
- [analysis-engine](analysis-engine/README.md): 六引擎分析架构与 CT 扫描式诊断流程
- [visual-os](visual-os/README.md): 语言驾驶舱与可视化操作系统架构
- [runtime](runtime/README.md): Rust Host / TS UI / Python Worker 运行时分工与隔离
- [storage](storage/README.md): DuckDB 与数据流
- [atlas](atlas/README.md): Atlas 相关能力与边界
- [spatial](spatial/README.md): 空间计算与 GIS 集成

## 使用方式

- 发生关键架构变更时，先更新本层，再同步 ADR
- 设计评审和跨仓协作以本层文档作为基准

## 推荐阅读顺序

- system -> runtime -> storage
- 再结合 [ADR 索引](../adr/README.md) 理解决策历史
