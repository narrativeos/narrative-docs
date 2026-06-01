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

## 多模态增量对齐（ADR-004）

- 多模态对象先进入派生表示层（OCR、ASR、layout、shot 等），再进入节点边加工链路。
- `anchor_ref` 是双端共享证据锚点模型，`evidence_ref` 作为兼容别名保留。
- 本地继续只负责当前对象，多模态不改变本地/云端职责边界。
- 云端继续只消费增量包并做跨对象聚合，不反向接管本地抽取实现。

## P0 本地功能点（NarrativeOS）

1. 时序字段落地：entity/edge 增加 event_time、valid_from、valid_to、version、provenance。
2. 当前对象抽取：面向单文或当前批次输出节点与关系，并支持多模态派生单元输入。
3. 当前对象溯源查询：支持概念在当前对象内的来源和演化片段查询，返回 modality-aware 证据锚点。
4. 本地时间过滤检索：RAG 或检索层支持时间窗过滤。
5. 审核闭环：候选关系审核、冲突提示、证据回链，支持 text/image/figure/table/audio/video。
6. 增量导出：按统一契约导出增量包到云端，支持 `anchor_ref`。
7. 证据查看：本地 UI 支持文本锚点、页图区域、表格单元和视频时间段回跳。

## P0 云端功能点（Cloud）

1. 聚合入库：接收多客户端增量包并合并去重。
2. 时序图谱存储：支持增量更新，不做全量重建。
3. 跨对象查询：按概念/时期/来源做全局检索，支持多模态证据返回。
4. 全局统计：概念热度、关系增长、来源覆盖率，补充模态覆盖率。
5. 质量看板：增量导入成功率、冲突率、人工复核率。
6. 聚合 API：提供查询与统计 API 供上层调用。

## 共享契约（双端必须一致）

1. ID 规则：node_id、edge_id 生成策略一致。
2. 时间语义：event_time 与 valid_time 语义分离。
3. 证据模型：每条关系可回链到来源与 `anchor_ref`（文本锚点为特例）。
4. 增量动作：create/update/delete/rollback 动作枚举一致。
5. 模态兼容：`modality` 与 `locator_type` 组合受统一兼容矩阵约束。

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
- 导出包支持 `anchor_ref`，并保持 `evidence_ref` 兼容输出。

### LC-LOCAL-107

Title: [Local][P0] 多模态派生表示抽取管道

Owner: narrative-core

Acceptance:

- 支持文档类输入的 OCR 与 layout 抽取，输出可入库候选节点边。
- 支持视频类输入的 ASR 与时间段切分，输出 time_range 锚点。
- 每条候选边至少绑定一个 `anchor_ref`。

### LC-LOCAL-108

Title: [Local][P0] Modality-aware Evidence 查询返回

Owner: narrative-api

Acceptance:

- 查询接口返回 `anchor_ref`，并兼容返回 `evidence_ref`。
- 支持 `modality`、`locator_type` 过滤参数。
- 对不兼容的 `modality`/`locator_type` 组合返回显式错误码。

### LC-LOCAL-109

Title: [Local][P0] 多模态证据回跳查看器

Owner: narrative-studio

Acceptance:

- 支持文本句段定位、页图 bbox 高亮、表格单元定位、视频时间段回放。
- 证据查看遵循结论 -> 证据 -> 原对象链路，不允许只显示结论。
- 对无效锚点给出可操作错误提示与回退动作。

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

### LC-CLOUD-205

Title: [Cloud][P0] 多模态证据聚合与去重

Owner: cloud-project

Acceptance:

- 对 `anchor_ref.anchor_id` 做幂等去重与版本覆盖策略。
- 支持同一关系跨模态证据并存，不互相覆盖。

### LC-CLOUD-206

Title: [Cloud][P0] 模态覆盖率统计 API

Owner: cloud-project

Acceptance:

- 统计 text/image/figure/table/audio/video 覆盖率。
- 输出按时间窗和来源分组的覆盖率结果。

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

### LC-SHARED-305

Title: [Shared][P0] anchor_ref v1 契约冻结

Owner: narrative-docs

Acceptance:

- 发布 `anchor_ref` 字段表、枚举表与兼容策略。
- 明确 `evidence_ref == anchor_ref.anchor_id` 的一致性规则。

### LC-SHARED-306

Title: [Shared][P0] modality-locator 兼容矩阵与验收用例

Owner: narrative-docs

Acceptance:

- 发布 `modality` 与 `locator_type` 兼容矩阵。
- 提供至少 6 条跨模态验收样例（text/figure/table/video）。

## 算力估算基线（新增多模态功能）

本节用于补齐本次新增功能点的容量与算力基线，作为 P0 计划估算口径，不替代压测实测值。

### 估算输入假设

- 本地基线机器：8 CPU cores / 32GB RAM / 无独立 GPU（可选 8GB 显存加速）
- 云端基线规格：8 vCPU / 32GB RAM / 单实例 1x T4 级别 GPU（16GB 显存）
- 文档对象口径：100 页 PDF（含图表 25 张，表格 20 个）
- 视频对象口径：60 分钟视频（16k 单声道音频）
- 目标并发口径：本地 2 并发任务；云端 10 并发增量摄取

### 新增工单算力估算

| Ticket | 主要负载 | 本地估算（单对象） | 云端估算（单对象） | 资源瓶颈 | 降级策略 |
| --- | --- | --- | --- | --- | --- |
| LC-LOCAL-107 | OCR + layout + ASR + time segmentation | PDF: CPU 35-70 min, RAM 6-10GB；Video: CPU 45-90 min 或 GPU 15-30 min | 不作为主路径 | CPU/GPU 推理与 I/O | 仅做 OCR+ASR，关闭 chart parsing |
| LC-LOCAL-108 | anchor_ref 过滤查询与序列化 | p95 查询 120-260ms，RAM +0.5GB | p95 查询 80-180ms | 索引命中率与 JSON 序列化 | 限制 locator_payload 返回字段 |
| LC-LOCAL-109 | 多模态证据回跳渲染 | 文本/图片 16-80ms；视频 seek 150-450ms | 不作为主路径 | 前端解码与随机读 | 优先关键帧预览，延迟加载原视频 |
| LC-CLOUD-205 | anchor_ref 聚合去重 | 不作为主路径 | 10 并发下 ingest 120-260 edges/s，RAM 12-20GB，GPU 非必需 | 去重键索引与批写入 | 批大小从 1000 降到 300 |
| LC-CLOUD-206 | 模态覆盖率统计 | 不作为主路径 | 每 1M edges 聚合 CPU 8-16 min，RAM 8-14GB | 聚合扫描与 group by | 改为小时级预聚合表 |

### 日预算估算（P0 试运行）

| 场景 | 规模假设 | 估算资源消耗 | 备注 |
| --- | --- | --- | --- |
| 本地研究工作站 | 20 份 PDF/天 + 5 小时视频/天 | CPU 28-52 core-hours；可选 GPU 6-12 GPU-hours | 峰值集中在 LC-LOCAL-107 |
| 云端聚合服务 | 200 增量包/天（每包 2k edges） | CPU 42-78 vCPU-hours；GPU 0-4 GPU-hours | 主耗时在去重与统计 |

### 发布门禁补充（算力相关）

- 交互路径：证据查询接口 `p95 <= 300ms`，连续 10 分钟超标视为阻断项。
- 本地批处理：100 页 PDF 全链路处理 `<= 90 min`（CPU-only）或 `<= 35 min`（GPU-on）。
- 云端摄取：10 并发下增量摄取成功率 `>= 99.0%`，且去重冲突回退率 `< 1%`。
- 统计任务：1M edges 覆盖率聚合作业 `<= 20 min`。

### 实测回填字段（上线前必填）

```yaml
compute_estimation:
	local_pdf_100p_cpu_min: TBD
	local_video_60m_cpu_min: TBD
	local_video_60m_gpu_min: TBD
	local_query_p95_ms: TBD
	cloud_ingest_edges_per_sec_at_10_concurrency: TBD
	cloud_coverage_agg_1m_edges_min: TBD
	peak_ram_local_gb: TBD
	peak_ram_cloud_gb: TBD
	fallback_trigger_count_per_day: TBD
```

## 两周验收标准

- 本地可生成带时间与证据的结构化关系。
- 云端可接收并聚合增量包。
- 可回答一个跨对象时间问题，并能回链原始证据。
- 至少 1 条 figure_region 与 1 条 time_range 证据链路完成端到端回放。

## 关联文档

- [../../adr/ADR-004-multimodal-evidence-model.md](../../adr/ADR-004-multimodal-evidence-model.md)
- [terminology-hierarchy-implementation-issue-pack.md](terminology-hierarchy-implementation-issue-pack.md)
- [terminology-hierarchy-core-implementation-breakdown.md](terminology-hierarchy-core-implementation-breakdown.md)
- [../api/terminology-hierarchy-api-storage-contract-v1.md](../api/terminology-hierarchy-api-storage-contract-v1.md)