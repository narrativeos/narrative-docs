# ADR-002: DuckDB as Canonical Storage Baseline

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This ADR records the decision to use DuckDB as the canonical storage baseline and defines migration implications.

## Machine-readable Metadata

```yaml
doc_id: adr-ADR-002-storage
path: adr/ADR-002-storage.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

- 状态: Accepted
- 日期: 2026-05-29
- 决策者: NarrativeOS Maintainers

## 背景

NarrativeOS 涉及分析、GIS、插件与跨仓数据协作，若缺少统一存储基线，将导致 schema 分裂、兼容成本升高与 AI 上下文不一致。

## 决策

- 以 DuckDB 作为规范化存储基线
- schema、API 与迁移策略必须文档化
- 存储相关变更需同步测试与兼容说明

## 影响

- 数据访问路径更一致，便于自动化与 AI 维护
- 迁移过程需要严格治理与版本化
- 对跨仓协作提出统一契约要求

## 备选方案

- 方案 A: 每仓库自由选择存储（拒绝）
- 方案 B: 仅依赖实现代码，不维护 schema 文档（拒绝）

## 后续动作

- 在 architecture/storage 中维护 schema 约束总览
- 在 developer/coding 中增加存储变更检查清单
