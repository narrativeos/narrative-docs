# Terminology Hierarchy Implementation Issue Pack (API + Core)

## 摘要（中文）

本页提供可直接粘贴到 Jira 或 Linear 的术语层级实现工单，覆盖 narrative-api 与 narrative-core 两个仓库。

## Executive Summary (EN)

This page provides copy-paste ready implementation tickets for terminology hierarchy delivery across narrative-api and narrative-core.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-terminology-hierarchy-implementation-issue-pack
path: developer/coding/terminology-hierarchy-implementation-issue-pack.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 使用方式

- 每条 Ticket 作为独立 issue 创建。
- API 与 Core 按仓库分别分配 owner。
- 验收时必须以“汽车 -> 运输工具”端到端链路做回放。

## Ticket TH-API-101

Title: [Terminology][API] Candidate 创建接口

Repo: narrative-api

Labels: api, terminology, p0, backend, contract

Description:
- 实现 `POST /v1/terminology/edges/candidates`。
- 请求与响应字段严格对齐 OpenAPI。
- 支持幂等请求（按 source/target/relation/evidenceRef 去重）。

Inputs:
- sourceTermId
- targetTermId
- relationType
- confidence
- evidence.evidenceRef

Outputs:
- edgeId
- status
- validation.dagCheck
- validation.duplicateCheck

Acceptance:
- 合法请求返回 202。
- 字段缺失返回 400，并带统一错误码。
- 幂等重复请求不创建重复资源。

Depends On:
- TH-CORE-101

## Ticket TH-API-102

Title: [Terminology][API] Candidate 审核接口

Repo: narrative-api

Labels: api, terminology, p0, backend, workflow

Description:
- 实现 `POST /v1/terminology/edges/{edgeId}/review`。
- 支持 action: accept/reject。
- 映射 core violation 为标准错误响应。

Inputs:
- edgeId
- action
- reviewer
- comment

Outputs:
- edgeId
- status
- updatedAt

Acceptance:
- 审核通过返回 200。
- 未找到 edge 返回 404。
- 校验失败返回可解析错误码（如 TERM_EDGE_DAG_CYCLE）。

Depends On:
- TH-CORE-102
- TH-CORE-103

## Ticket TH-API-103

Title: [Terminology][API] 层级查询接口

Repo: narrative-api

Labels: api, terminology, p1, backend, query

Description:
- 实现 `GET /v1/terminology/hierarchy/{termId}`。
- 支持 query 参数 depth 与 direction。
- 仅返回 accepted 边。

Inputs:
- termId
- depth
- direction

Outputs:
- nodes[]
- edges[]

Acceptance:
- direction=up/down/both 均可返回稳定结构。
- depth 超限返回 400。
- rejected 边不出现在结果中。

Depends On:
- TH-CORE-104

## Ticket TH-API-104

Title: [Terminology][API] 批量校验接口

Repo: narrative-api

Labels: api, terminology, p1, backend, validation

Description:
- 实现 `POST /v1/terminology/validate/hierarchy`。
- 支持 checks: dag/duplicate/domain_boundary。
- 返回 violations 列表。

Inputs:
- edgeIds[]
- checks[]

Outputs:
- result
- violations[]

Acceptance:
- 校验通过时 result=passed。
- 出现环路时 result=failed 且返回 cycle path。

Depends On:
- TH-CORE-103

## Ticket TH-CORE-101

Title: [Terminology][Core] 领域模型与存储实现

Repo: narrative-core

Labels: core, terminology, p0, backend, storage

Description:
- 实现 term_node / term_edge 模型。
- 实现 Repository 接口与持久化。
- 加入唯一约束、非自环约束。

Inputs:
- term node payload
- term edge payload

Outputs:
- persisted term nodes/edges

Acceptance:
- relation_type 枚举受限。
- source == target 被拒绝。
- source+target+relation 有效状态唯一。

Depends On:
- none

## Ticket TH-CORE-102

Title: [Terminology][Core] Candidate 与 Review 服务

Repo: narrative-core

Labels: core, terminology, p0, backend, service

Description:
- 实现 CandidateService 与 ReviewService。
- 管理 candidate -> accepted/rejected 状态流转。
- 审核通过前调用 Validator。

Inputs:
- edge candidate DTO
- review action DTO

Outputs:
- edge state transition
- domain errors

Acceptance:
- candidate 状态可创建。
- accept 触发完整校验。
- reject 不触发层级闭包更新。

Depends On:
- TH-CORE-101

## Ticket TH-CORE-103

Title: [Terminology][Core] DAG/重复边/域边界校验器

Repo: narrative-core

Labels: core, terminology, p0, backend, validator

Description:
- 实现 DagValidator、DuplicateValidator、DomainBoundaryValidator。
- 输出统一 violation 模型。

Inputs:
- edgeIds[]
- checks[]

Outputs:
- validation result
- violations[]

Acceptance:
- “汽车 -> 运输工具”通过。
- 反向边形成环路时返回 dag_cycle。
- 重复边命中 duplicate_edge。

Depends On:
- TH-CORE-101

## Ticket TH-CORE-104

Title: [Terminology][Core] 层级查询服务

Repo: narrative-core

Labels: core, terminology, p1, backend, query

Description:
- 实现 HierarchyQueryService。
- 支持 depth 限制与 direction 模式。
- 结果结构对齐 API 响应模型。

Inputs:
- termId
- depth
- direction

Outputs:
- hierarchy nodes/edges

Acceptance:
- depth=1..8 可用。
- direction=both 返回上下游并集去重。
- 查询性能在 10k accepted 边下满足 SLA（P95 < 200ms）。

Depends On:
- TH-CORE-101

## Ticket TH-CORE-105

Title: [Terminology][Core] 错误码与异常映射

Repo: narrative-core

Labels: core, terminology, p1, backend, quality

Description:
- 定义统一错误码。
- 保证 API 可稳定映射为 Error 模型。

Inputs:
- domain exceptions

Outputs:
- error code catalog
- details payload

Acceptance:
- 至少覆盖 TERM_EDGE_DAG_CYCLE、TERM_EDGE_DUPLICATE、TERM_EDGE_DOMAIN_VIOLATION。
- 错误对象包含 code/message/details。

Depends On:
- TH-CORE-102
- TH-CORE-103

## Ticket TH-QA-106

Title: [Terminology][QA] 端到端回放与回归包

Repo: narrative-core

Labels: qa, terminology, p1, regression

Description:
- 建立最小 E2E 回放。
- 覆盖候选创建、审核、查询、环路失败路径。

Inputs:
- fixture terms: 运输工具, 汽车
- fixture edges

Outputs:
- CI regression report

Acceptance:
- 正向链路通过。
- 环路与重复边失败路径稳定。
- 回归任务可在 CI 自动执行。

Depends On:
- TH-API-101
- TH-API-102
- TH-API-103
- TH-CORE-103
- TH-CORE-104

## 关联文档 | Related Docs

- [../api/terminology-hierarchy-api-storage-contract-v1.md](../api/terminology-hierarchy-api-storage-contract-v1.md)
- [terminology-hierarchy-core-implementation-breakdown.md](terminology-hierarchy-core-implementation-breakdown.md)
- [../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md](../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md)