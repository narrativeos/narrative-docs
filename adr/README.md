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
- [ADR-003-execution-oriented-storage.md](ADR-003-execution-oriented-storage.md): 执行导向存取架构与性能路径分离

## 规则

- 重大架构变更必须新增或更新 ADR
- ADR 变更应与实现、测试、文档同步
- 若存在明确范围排除项（如不包含用户系统），应在 ADR 或相关架构文档中显式声明
- 关键 ADR 必须附带：回滚方案、容量评估、故障演练记录（至少一次）
- 发布闸门采用反向验收链：ADR 接受 -> 实现映射 -> 监控与 runbook 就绪 -> 才可发布

## 标准参考 | Standards Reference

- [Core Docs Mapping](../developer/coding/core-docs-mapping.md)
- [Benchmark and Acceptance Metrics](../whitepaper/benchmark-and-acceptance-metrics.md)
- [Readiness Checklist](../developer/coding/readiness-checklist.md)
