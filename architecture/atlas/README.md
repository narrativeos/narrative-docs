# Atlas Architecture

## 摘要（中文） | Summary (ZH)

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN) | 英文摘要

This document defines Atlas responsibilities, boundaries, and integration patterns for structured narrative semantics.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: architecture-atlas-README
path: architecture/atlas/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 模块职责 | Module Responsibilities

Atlas 负责知识图谱/结构化叙事语义相关能力，并与编辑、空间与分析模块协同。

## 边界要求 | Boundary Requirements

- Atlas 对外能力通过稳定接口暴露
- 避免把 Atlas 内部实现细节泄漏到其他仓库
- 跨模块集成优先通过约定模型与协议字段
