# Terminology Hierarchy API and Storage Contract V1 (Draft)

## 摘要（中文）

本页提供术语上下位关系的 API 与存储契约草案，可直接用于 narrative-api 与 narrative-core 的分工实现。

## Executive Summary (EN)

This document proposes a V1 contract for terminology hierarchy APIs and storage, including candidate ingestion, review workflow, DAG validation, and read APIs.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-api-terminology-hierarchy-api-storage-contract-v1
path: developer/api/terminology-hierarchy-api-storage-contract-v1.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, integrator, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 目标 | Goals

- 为术语上下位关系提供最小可上线接口契约。
- 固定关系方向与枚举，减少跨模块语义漂移。
- 提供可执行存储结构与校验规则，便于 narrative-core 直接实现。

## 关系语义约束 | Relation Semantics

统一关系枚举：

- subclass_of: 子类 -> 父类
- instance_of: 实例 -> 类
- part_of: 部分 -> 整体
- related_to: 兜底关系（不可参与层级推理）

约束：

- 层级推理仅基于 subclass_of。
- 入库方向固定为 source -> target，且 source 是更具体术语。

## HTTP API Contract (Proposed)

### 1) 提交关系候选

`POST /v1/terminology/edges/candidates`

Request body:

```json
{
  "sourceTermId": "t_car",
  "targetTermId": "t_transport",
  "relationType": "subclass_of",
  "confidence": 0.93,
  "evidence": {
    "evidenceRef": "doc:sample-001#sent-12",
    "sentenceRef": "sent-12",
    "excerpt": "汽车是一种常见的运输工具。"
  },
  "proposedBy": "insight-engine",
  "ruleId": "rule-hypernym-001"
}
```

Response `202 Accepted`:

```json
{
  "edgeId": "edge_01J7M2Y4T4",
  "status": "candidate",
  "validation": {
    "dagCheck": "pending",
    "duplicateCheck": "pending"
  }
}
```

### 2) 审核候选

`POST /v1/terminology/edges/{edgeId}/review`

Request body:

```json
{
  "action": "accept",
  "reviewer": "reviewer_a",
  "comment": "证据充分，关系方向正确。"
}
```

Response `200 OK`:

```json
{
  "edgeId": "edge_01J7M2Y4T4",
  "status": "accepted",
  "updatedAt": "2026-06-01T09:00:00Z"
}
```

### 3) 获取术语层级

`GET /v1/terminology/hierarchy/{termId}?depth=2&direction=up`

Response `200 OK`:

```json
{
  "termId": "t_car",
  "direction": "up",
  "nodes": [
    {"termId": "t_car", "label": "汽车"},
    {"termId": "t_transport", "label": "运输工具"}
  ],
  "edges": [
    {
      "edgeId": "edge_01J7M2Y4T4",
      "sourceTermId": "t_car",
      "targetTermId": "t_transport",
      "relationType": "subclass_of"
    }
  ]
}
```

### 4) 批量校验 DAG 与冲突

`POST /v1/terminology/validate/hierarchy`

Request body:

```json
{
  "edgeIds": ["edge_01J7M2Y4T4", "edge_01J7M2Y4T5"],
  "checks": ["dag", "duplicate", "domain_boundary"]
}
```

Response `200 OK`:

```json
{
  "result": "failed",
  "violations": [
    {
      "type": "dag_cycle",
      "path": ["t_transport", "t_car", "t_transport"],
      "message": "subclass_of relation must be acyclic"
    }
  ]
}
```

## JSON Schema Contract (Core Fields)

```yaml
TermNode:
  type: object
  required: [termId, canonicalLabel, domain, language]
  properties:
    termId: {type: string}
    canonicalLabel: {type: string}
    aliases:
      type: array
      items: {type: string}
    domain: {type: string}
    language: {type: string}

TermEdge:
  type: object
  required:
    [edgeId, sourceTermId, targetTermId, relationType, evidenceRef, reviewStatus]
  properties:
    edgeId: {type: string}
    sourceTermId: {type: string}
    targetTermId: {type: string}
    relationType:
      type: string
      enum: [subclass_of, instance_of, part_of, related_to]
    confidence: {type: number, minimum: 0, maximum: 1}
    evidenceRef: {type: string}
    reviewStatus:
      type: string
      enum: [candidate, accepted, rejected]
    proposedBy: {type: string}
    reviewer: {type: string}
```

## Storage Contract (Proposed SQL)

```sql
create table term_node (
  term_id text primary key,
  canonical_label text not null,
  aliases jsonb not null default '[]'::jsonb,
  domain text not null,
  language text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table term_edge (
  edge_id text primary key,
  source_term_id text not null references term_node(term_id),
  target_term_id text not null references term_node(term_id),
  relation_type text not null check (relation_type in ('subclass_of','instance_of','part_of','related_to')),
  confidence numeric(4,3) check (confidence >= 0 and confidence <= 1),
  evidence_ref text not null,
  review_status text not null check (review_status in ('candidate','accepted','rejected')),
  proposed_by text,
  reviewer text,
  rule_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint term_edge_no_self_loop check (source_term_id <> target_term_id)
);

create index idx_term_edge_source on term_edge(source_term_id);
create index idx_term_edge_target on term_edge(target_term_id);
create index idx_term_edge_type_status on term_edge(relation_type, review_status);

create unique index uq_term_edge_unique_relation
  on term_edge(source_term_id, target_term_id, relation_type)
  where review_status <> 'rejected';
```

## Validation Rules

- DAG rule: 对 accepted 的 subclass_of 边执行无环校验。
- Duplicate rule: source + target + relationType 不允许重复有效边。
- Domain boundary rule: 可配置跨域禁连策略（例如方法论术语不可直接归入实体类型）。
- Evidence rule: candidate 或 accepted 状态均必须有 evidence_ref。

## Error Model (Recommended)

```json
{
  "code": "TERM_EDGE_DAG_CYCLE",
  "message": "subclass_of relation must be acyclic",
  "details": {
    "edgeId": "edge_01J7M2Y4T4",
    "cyclePath": ["t_transport", "t_car", "t_transport"]
  }
}
```

## narrative-api 与 narrative-core 分工建议

- narrative-api:
  - 提供 REST 接口、鉴权、请求幂等与错误模型。
  - 对外暴露候选提交、审核、查询、校验 API。
- narrative-core:
  - 执行 DAG 检测、冲突检测、规则判定与边状态流转。
  - 提供领域服务与持久化适配层。

## 最小联调用例 | Minimal Integration Test

1. 创建 term_node：运输工具、汽车。
2. 提交 subclass_of 候选边（汽车 -> 运输工具）。
3. 执行校验，应通过且无环。
4. 审核 accept 后查询 hierarchy，必须返回该边。
5. 再提交反向边（运输工具 -> 汽车），校验应报 DAG cycle。

## 关联文档 | Related Docs

- [../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md](../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md)
- [../../architecture/system/README.md](../../architecture/system/README.md)
- [../../architecture/storage/README.md](../../architecture/storage/README.md)
- [../../product/modules/platform-domains.md](../../product/modules/platform-domains.md)
- [../../product/modules/library.md](../../product/modules/library.md)