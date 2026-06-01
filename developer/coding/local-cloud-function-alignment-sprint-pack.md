# Local-Cloud Function Alignment Sprint Pack

## 摘要（中文）

本页用于对齐 NarrativeOS 本地能力与云端聚合能力的边界，并给出可直接执行的 sprint 工单清单。

## Executive Summary (EN)

This document aligns local NarrativeOS capabilities with cloud aggregation capabilities and provides sprint-ready tickets.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-local-cloud-function-alignment-sprint-pack
path: developer/coding/local-cloud-function-alignment-sprint-pack.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, architect, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 对齐原则

- NarrativeOS 本地：提取、加工、当前工作对象分析。
- 云端项目：跨对象聚合、长期演化分析、规模化查询服务。
- 双端共享：统一 ID、时间语义、证据模型与增量同步契约。

## P0 本地功能点（NarrativeOS）

1. 时序字段落地：entity/edge 增加 event_time、valid_from、valid_to、version、provenance。
2. 当前对象抽取：面向单文或当前批次输出节点与关系。
3. 当前对象溯源查询：支持概念在当前对象内的来源和演化片段查询。
4. 本地时间过滤检索：RAG 或检索层支持时间窗过滤。
5. 审核闭环：候选关系审核、冲突提示、证据回链。
6. 增量导出：按统一契约导出增量包到云端。

## P0 云端功能点（Cloud）

1. 聚合入库：接收多客户端增量包并合并去重。
2. 时序图谱存储：支持增量更新，不做全量重建。
3. 跨对象查询：按概念/时期/来源做全局检索。
4. 全局统计：概念热度、关系增长、来源覆盖率。
5. 质量看板：增量导入成功率、冲突率、人工复核率。
6. 聚合 API：提供查询与统计 API 供上层调用。

## 共享契约（双端必须一致）

1. ID 规则：node_id、edge_id 生成策略一致。
2. 时间语义：event_time 与 valid_time 语义分离。
3. 证据模型：每条关系可回链到来源与文本锚点。
4. 增量动作：create/update/delete/rollback 动作枚举一致。

## Sprint Ticket Pack（可直接建单）

### LC-LOCAL-101

Title: [Local][P0] 时序字段扩展与存储迁移

Owner: narrative-core

Acceptance:

- term_node 与 term_edge 支持 event_time、valid_from、valid_to、version、provenance。
- 迁移脚本可回滚。

### LC-LOCAL-102

Title: [Local][P0] 当前对象实体关系抽取管道

Owner: narrative-core

Acceptance:

- 对单文输入可输出结构化节点边。
- 每条边均附 evidence_ref。

### LC-LOCAL-103

Title: [Local][P0] 当前对象溯源查询接口

Owner: narrative-api

Acceptance:

- 支持概念在当前对象内的来源链查询。
- 查询结果包含时间信息与证据锚点。

### LC-LOCAL-104

Title: [Local][P0] 时间窗过滤检索

Owner: narrative-core

Acceptance:

- 检索支持 start_time/end_time 参数。
- 超出时间窗结果不返回。

### LC-LOCAL-105

Title: [Local][P0] 候选关系审核与冲突提示

Owner: narrative-studio

Acceptance:

- 支持 accept/reject。
- 冲突关系可视化提示可用。

### LC-LOCAL-106

Title: [Local][P0] 增量包导出器

Owner: narrative-api

Acceptance:

- 支持 create/update/delete/rollback 四类动作导出。
- 导出包包含 schema_version。

### LC-CLOUD-201

Title: [Cloud][P0] 增量包接入与去重合并

Owner: cloud-project

Acceptance:

- 可消费本地导出包。
- 重复边去重准确。

### LC-CLOUD-202

Title: [Cloud][P0] 时序图谱增量写入

Owner: cloud-project

Acceptance:

- 新增/更新/删除可增量生效。
- 无需全量重建。

### LC-CLOUD-203

Title: [Cloud][P0] 跨对象时序查询 API

Owner: cloud-project

Acceptance:

- 按 term_id + time_range 查询跨对象关系。
- 返回来源列表与证据引用。

### LC-CLOUD-204

Title: [Cloud][P0] 全局统计 API

Owner: cloud-project

Acceptance:

- 输出概念热度、关系增长、来源覆盖率。
- 支持按时间窗口聚合。

### LC-SHARED-301

Title: [Shared][P0] 双端 ID 与时间语义契约冻结

Owner: narrative-docs

Acceptance:

- 输出 v1 契约表。
- 双端评审通过。

### LC-SHARED-302

Title: [Shared][P0] 增量同步包 JSON Schema

Owner: narrative-docs

Acceptance:

- 发布 schema 文件。
- 提供示例 payload。

### LC-SHARED-303

Title: [Shared][P0] 端到端回放用例（汽车 -> 运输工具）

Owner: narrative-docs

Acceptance:

- 本地抽取 -> 本地审核 -> 云端聚合 -> 跨对象查询链路跑通。

### LC-SHARED-304

Title: [Shared][P0] 验收门禁定义

Owner: narrative-docs

Acceptance:

- 定义 P0 发布门禁：准确性、可追溯性、稳定性三类指标。

## 两周验收标准

- 本地可生成带时间与证据的结构化关系。
- 云端可接收并聚合增量包。
- 可回答一个跨对象时间问题，并能回链原始证据。

## 关联文档

- [terminology-hierarchy-implementation-issue-pack.md](terminology-hierarchy-implementation-issue-pack.md)
- [terminology-hierarchy-core-implementation-breakdown.md](terminology-hierarchy-core-implementation-breakdown.md)
- [../api/terminology-hierarchy-api-storage-contract-v1.md](../api/terminology-hierarchy-api-storage-contract-v1.md)