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
    "evidenceRef": "anchor:doc-sample-001:p12:sent-12",
    "anchorRef": {
      "anchorId": "anchor:doc-sample-001:p12:sent-12",
      "sourceObjectId": "doc-sample-001",
      "modality": "text",
      "locatorType": "sentence",
      "locatorPayload": {
        "page": 12,
        "paragraphIndex": 3,
        "sentenceIndex": 12
      },
      "derivedFrom": "manual_annotation",
      "confidence": 0.99,
      "provenance": {
        "ingestionId": "ing-2026-06-01-001",
        "sourcePath": "library/sample-001.pdf"
      },
      "extractorVersion": "manual-v1",
      "captureTime": "2026-06-01T08:30:00Z"
    },
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
      "relationType": "subclass_of",
      "evidence": {
        "evidenceRef": "anchor:doc-sample-001:p12:sent-12",
        "anchorRef": {
          "anchorId": "anchor:doc-sample-001:p12:sent-12",
          "sourceObjectId": "doc-sample-001",
          "modality": "text",
          "locatorType": "sentence",
          "locatorPayload": {
            "page": 12,
            "paragraphIndex": 3,
            "sentenceIndex": 12
          },
          "derivedFrom": "manual_annotation",
          "confidence": 0.99,
          "provenance": {
            "ingestionId": "ing-2026-06-01-001",
            "sourcePath": "library/sample-001.pdf"
          },
          "extractorVersion": "manual-v1",
          "captureTime": "2026-06-01T08:30:00Z"
        }
      }
    }
  ]
}
```

## Shared Evidence Contract: anchor_ref v1

本节定义 NarrativeOS 本地、云端与 UI 共用的证据锚点契约，用于替代仅适用于纯文本的 sentence_ref / paragraph_ref 假设。

兼容规则：

- `evidenceRef` 在 V1 中保留，作为 `anchorRef.anchorId` 的兼容别名。
- 新写入接口必须接受 `anchorRef` 对象。
- 新查询接口应优先返回 `anchorRef`，并可同时返回 `evidenceRef` 以兼容旧调用方。

### anchor_ref v1 字段表

| 字段 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| anchorId | string | 是 | 全局唯一锚点 ID，也是 `evidenceRef` 的规范值 |
| sourceObjectId | string | 是 | 原始对象 ID，例如文档、图片、视频对象 |
| modality | enum | 是 | `text` `image` `figure` `table` `audio` `video` |
| locatorType | enum | 是 | `sentence` `paragraph` `page_region` `figure_region` `table_cell` `time_range` `frame_region` |
| locatorPayload | object | 是 | 位置细节；文本可用页码和段句索引，图像可用 `page` + `bbox`，视频可用 `startTimeMs` + `endTimeMs` + `frameIndex` |
| derivedFrom | enum | 是 | `manual_annotation` `ocr` `asr` `layout_parser` `table_parser` `chart_parser` `video_segmenter` |
| confidence | number | 否 | 派生结果置信度，范围 `0..1` |
| provenance | object | 是 | 来源、采集、处理任务等追溯信息 |
| extractorVersion | string | 是 | 生成该锚点的提取器或流程版本 |
| captureTime | string | 否 | 采集时间或证据时间，ISO 8601 |

### locator_payload 约束

- 文本锚点：建议包含 `page`、`paragraphIndex`、`sentenceIndex`。
- 图像或图表锚点：建议包含 `page`、`bbox.x`、`bbox.y`、`bbox.width`、`bbox.height`。
- 表格单元格锚点：建议包含 `page`、`tableId`、`rowIndex`、`columnIndex`。
- 视频锚点：建议包含 `startTimeMs`、`endTimeMs`，需要帧定位时补充 `frameIndex` 与 `bbox`。

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
AnchorRefV1:
  type: object
  required:
    [anchorId, sourceObjectId, modality, locatorType, locatorPayload, derivedFrom, provenance, extractorVersion]
  properties:
    anchorId: {type: string}
    sourceObjectId: {type: string}
    modality:
      type: string
      enum: [text, image, figure, table, audio, video]
    locatorType:
      type: string
      enum: [sentence, paragraph, page_region, figure_region, table_cell, time_range, frame_region]
    locatorPayload:
      type: object
      additionalProperties: true
    derivedFrom:
      type: string
      enum: [manual_annotation, ocr, asr, layout_parser, table_parser, chart_parser, video_segmenter]
    confidence: {type: number, minimum: 0, maximum: 1}
    provenance:
      type: object
      additionalProperties: true
    extractorVersion: {type: string}
    captureTime: {type: string, format: date-time}

EvidenceBinding:
  type: object
  required: [evidenceRef, anchorRef]
  properties:
    evidenceRef: {type: string}
    anchorRef:
      $ref: '#/AnchorRefV1'

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
    anchorRef:
      $ref: '#/AnchorRefV1'
    reviewStatus:
      type: string
      enum: [candidate, accepted, rejected]
    proposedBy: {type: string}
    reviewer: {type: string}
```

## Shared Payload Example (Incremental Export)

```json
{
  "schemaVersion": "anchor-ref-v1",
  "action": "create",
  "node": {
    "termId": "t_car",
    "canonicalLabel": "汽车",
    "aliases": ["小汽车"],
    "domain": "transport",
    "language": "zh-CN"
  },
  "edge": {
    "edgeId": "edge_01J7M2Y4T4",
    "sourceTermId": "t_car",
    "targetTermId": "t_transport",
    "relationType": "subclass_of",
    "confidence": 0.93,
    "reviewStatus": "candidate",
    "proposedBy": "insight-engine",
    "evidenceRef": "anchor:figure-paper-001:p05:fig-2-caption",
    "anchorRef": {
      "anchorId": "anchor:figure-paper-001:p05:fig-2-caption",
      "sourceObjectId": "paper-001",
      "modality": "figure",
      "locatorType": "figure_region",
      "locatorPayload": {
        "page": 5,
        "figureId": "fig-2",
        "bbox": {
          "x": 112,
          "y": 248,
          "width": 640,
          "height": 380
        },
        "captionRange": {
          "startParagraphIndex": 18,
          "endParagraphIndex": 19
        }
      },
      "derivedFrom": "layout_parser",
      "confidence": 0.96,
      "provenance": {
        "ingestionId": "ing-2026-06-01-021",
        "sourcePath": "library/paper-001.pdf",
        "pipelineRunId": "pipe-layout-2026-06-01-02"
      },
      "extractorVersion": "layout-parser-v1.2.0",
      "captureTime": "2026-05-28T10:15:00Z"
    }
  }
}
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
  anchor_ref jsonb,
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
create index idx_term_edge_anchor_ref_gin on term_edge using gin (anchor_ref);

create unique index uq_term_edge_unique_relation
  on term_edge(source_term_id, target_term_id, relation_type)
  where review_status <> 'rejected';
```

## Validation Rules

- DAG rule: 对 accepted 的 subclass_of 边执行无环校验。
- Duplicate rule: source + target + relationType 不允许重复有效边。
- Domain boundary rule: 可配置跨域禁连策略（例如方法论术语不可直接归入实体类型）。
- Evidence rule: candidate 或 accepted 状态均必须有 evidence_ref。
- Anchor rule: 若请求包含 `anchorRef`，则 `evidenceRef` 必须等于 `anchorRef.anchorId`。
- Modality rule: `locatorType` 必须与 `modality` 兼容，例如 `time_range` 不可用于 `text`，`sentence` 不可用于 `video`。
- Provenance rule: 所有非人工锚点均必须包含可追溯的 `pipelineRunId`、`extractorVersion` 或同等级处理标识。

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
6. 提交 `figure_region` 或 `time_range` 类型的 `anchorRef`，查询结果必须保留 modality-aware evidence。

## 关联文档 | Related Docs

- [../../adr/ADR-004-multimodal-evidence-model.md](../../adr/ADR-004-multimodal-evidence-model.md)
- [../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md](../../product/workflows/terminology-hierarchy-discovery-minimal-spec.md)
- [../../architecture/system/README.md](../../architecture/system/README.md)
- [../../architecture/storage/README.md](../../architecture/storage/README.md)
- [../../product/modules/platform-domains.md](../../product/modules/platform-domains.md)
- [../../product/modules/library.md](../../product/modules/library.md)