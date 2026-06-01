# Temporal Knowledge API Task Pack

## 摘要（中文）

本页是 narrative-api 的实现任务单，聚焦查询、审核、导出与错误映射。

## Executive Summary (EN)

This page defines the narrative-api implementation tasks for querying, review, export, and error mapping.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-temporal-knowledge-api-task-pack
path: developer/coding/temporal-knowledge-api-task-pack.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 目标

- 将 core 的时序加工结果稳定暴露为 API。
- 统一导出包格式，作为云端接入入口。
- 统一错误码与请求/响应模型。

## 任务清单

### TKA-101

Title: [API][P0] 当前对象溯源查询接口

Scope:

- 提供 termId + timeRange 查询接口。
- 返回节点、边、证据锚点。

Acceptance:

- up/down/both 查询可用。
- 时间窗外结果不返回。

### TKA-102

Title: [API][P0] 候选关系审核接口

Scope:

- 支持 accept / reject。
- 映射 core violation 为标准错误。

Acceptance:

- 审核通过后状态可推进。
- 冲突与校验失败有统一错误码。

### TKA-103

Title: [API][P0] 增量导出接口

Scope:

- 暴露 create/update/delete/rollback 导出。
- 附带 schema_version。

Acceptance:

- 输出 payload 可被云端项目消费。

### TKA-104

Title: [API][P0] 错误码与响应模型冻结

Scope:

- 统一 Error/Violation/ReviewResponse 结构。
- 冻结 TERM_EDGE_DAG_CYCLE 等错误码。

Acceptance:

- 前端与 SDK 可稳定消费。

## 与其他仓库的边界

- narrative-core 提供领域逻辑与校验。
- narrative-studio 消费查询与审核接口。
- cloud-project 消费导出包。

## 关联文档

- [temporal-knowledge-processing-repo-design.md](../product/modules/temporal-knowledge-processing-repo-design.md)
- [local-cloud-function-alignment-sprint-pack.md](local-cloud-function-alignment-sprint-pack.md)