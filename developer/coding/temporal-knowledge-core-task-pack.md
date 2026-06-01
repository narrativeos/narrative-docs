# Temporal Knowledge Core Task Pack

## 摘要（中文）

本页是 narrative-core 的实现任务单，聚焦时序抽取、当前对象分析、关系校验与增量导出前置加工。

## Executive Summary (EN)

This page defines the narrative-core implementation tasks for temporal extraction, current-object analysis, relation validation, and export-ready processing.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-temporal-knowledge-core-task-pack
path: developer/coding/temporal-knowledge-core-task-pack.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 目标

- 将当前对象文本加工为时序化节点与关系边。
- 在 core 层完成规则校验与证据绑定。
- 为 API 导出与云端接入提供稳定中间结果。

## 任务清单

### TKC-101

Title: [Core][P0] 时序实体模型与关系模型

Scope:

- 定义 term_node / term_edge 的时序字段。
- 固化 provenance、valid_from、valid_to、event_time、version。

Acceptance:

- 模型字段可序列化、可迁移、可回放。
- 关系方向统一为更具体 -> 更抽象。

### TKC-102

Title: [Core][P0] 当前对象抽取管道

Scope:

- 从单文/单批次生成候选节点边。
- 输出 evidence_ref 与基础置信度。

Acceptance:

- 输入一段文本可得到结构化候选结果。
- 每条候选关系均附证据锚点。

### TKC-103

Title: [Core][P0] 层级关系校验器

Scope:

- 实现 DAG 校验、重复边校验、域边界校验。
- 输出 violation 列表。

Acceptance:

- 反向边形成环路时必须失败。
- 重复边、无证据边必须拦截。

### TKC-104

Title: [Core][P0] 当前对象溯源查询

Scope:

- 返回局部演化链路。
- 支持时间窗过滤。

Acceptance:

- 查询结果可回链到原文锚点。
- 支持 up/down/both 的层级视图。

### TKC-105

Title: [Core][P0] 增量导出前置包装

Scope:

- 组织 create/update/delete/rollback 的导出负载。
- 附带 schema_version 与 provenance bundle。

Acceptance:

- 可被 narrative-api 直接转成增量包。

## 与其他仓库的边界

- narrative-api 负责对外协议与错误映射。
- narrative-studio 负责人工审核与回看交互。
- cloud-project 负责跨对象聚合与全局统计。

## 关联文档

- [temporal-knowledge-processing-repo-design.md](../product/modules/temporal-knowledge-processing-repo-design.md)
- [local-cloud-function-alignment-sprint-pack.md](local-cloud-function-alignment-sprint-pack.md)