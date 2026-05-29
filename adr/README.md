# ADR Index

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document indexes architecture decisions and links implementation constraints to decision history.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: adr-README
path: adr/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

ADR（Architecture Decision Record）用于记录关键架构决策、动机与影响。

## 阅读路径（建议） | Recommended Path

- 第一步：先看 [Architecture 总览](../architecture/README.md) 建立上下文
- 第二步：按时间与主题阅读 ADR 条目
- 第三步：回看 Developer 文档确认落地约束

## 当前 ADR

- [ADR-001-runtime.md](ADR-001-runtime.md): 运行时隔离与通信边界
- [ADR-002-storage.md](ADR-002-storage.md): 存储基线与数据治理

## 规则

- 重大架构变更必须新增或更新 ADR
- ADR 变更应与实现、测试、文档同步

## 标准参考 | Standards Reference

- [Core Docs Mapping](../whitepaper/core-docs-mapping.md)
- [Benchmark and Acceptance Metrics](../whitepaper/benchmark-and-acceptance-metrics.md)
- [Readiness Checklist](../whitepaper/readiness-checklist.md)
