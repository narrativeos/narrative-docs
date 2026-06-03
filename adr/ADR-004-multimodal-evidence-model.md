# ADR-004: Multimodal Evidence Model and Derived Representation Pipeline

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This ADR records the decision to process image-, table-, and video-heavy sources through a derived representation pipeline and a unified multimodal evidence model, while preserving the existing local-current-object and cloud-cross-object boundary.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: adr-ADR-004-multimodal-evidence-model
path: adr/ADR-004-multimodal-evidence-model.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, architect, product, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

- 状态: Accepted
- 日期: 2026-06-01
- 决策者: NarrativeOS Maintainers

## 背景 | Background

NarrativeOS 当前分析对象以文本为主，但论文、图书、扫描页、图表、插图与视频材料在真实研究和编辑场景中占比不断上升。

若继续将多模态对象视为文本流程之外的例外，会出现以下问题：

- 图片、表格和视频证据无法进入统一 evidence 链路，导致结论不可回跳
- 图像 OCR、视频转写、版面块和关键帧等派生结果缺少统一治理，难以审核与重放
- 本地与云端会为多模态对象各自发明一套 ID、时间和 provenance 规则，破坏共享契约
- 可视化层只能展示文本定位，无法满足 figure、table、frame、time range 级别的证据定位

同时，NarrativeOS 已在产品与开发文档中明确三条边界：

- 本地负责当前工作对象的提取、加工、审核和增量导出
- 云端负责跨对象聚合、长期演化分析与规模化查询
- 双端共享统一 ID、时间语义、证据模型与同步契约

因此，多模态扩展必须复用现有边界，而不是引入平行架构。

## 决策 | Decision

- NarrativeOS 采用 derived representation pipeline 处理多模态源对象，而不是直接以原始图片或视频做统一黑箱分析
- 所有多模态分析必须保留 raw asset，并生成可定位、可审核、可回链的派生表示
- 双端统一采用 multimodal anchor_ref 作为证据锚点模型，替代仅面向 sentence_ref、paragraph_ref 的文本专用锚点假设
- Analysis Engine 与 Temporal Knowledge Processing 消费派生表示和 anchor_ref，不直接绑定具体 OCR、ASR、layout 或 video 模型实现
- 本地只处理当前对象内的多模态抽取、审核、证据回链和增量导出；云端只消费增量包并做跨对象聚合
- Visual OS 必须支持文本、页图区域、图表区域、关键帧和时间段等证据回跳，但不改变“结论 -> 证据 -> 原对象”的交互原则

## 统一对象分层 | Unified Object Layers

### Layer 1: Raw Asset Layer

保存原始对象与最小描述元数据：

- PDF、扫描页、图片、表格截图
- 视频、音轨、字幕文件
- 来源、页码、版本、采集时间、哈希

该层用于合规留存、再处理和证据回放，不直接作为分析引擎输入真源。

### Layer 2: Derived Representation Layer

将不同模态转换为可分析、可定位、可审核的中间表示：

- 文档类：OCR 文本、layout block、reading order、page region、caption 对齐、table structure、chart element
- 视频类：ASR transcript、speaker segment、shot boundary、key frame、subtitle alignment、timeline OCR
- 通用类：embedding、classifier label、quality score、extractor version

该层是多模态进入分析主链路的标准入口。

### Layer 3: Knowledge and Evidence Layer

Analysis Engine 与 Temporal Knowledge Processing 基于派生表示生成：

- 指标与信号
- 节点与关系边
- 可审核候选项
- evidence_ref / anchor_ref
- 增量同步包

## 证据模型 | Evidence Model

多模态证据锚点统一定义为 anchor_ref，至少包含以下字段：

- anchor_id
- source_object_id
- modality: text | image | figure | table | audio | video
- locator_type: sentence | paragraph | page_region | figure_region | table_cell | time_range | frame_region
- locator_payload: 位置细节，文本使用段句索引，图像使用 page + bbox，视频使用 start_time/end_time + frame index
- derived_from: ocr | asr | layout_parser | table_parser | chart_parser | video_segmenter | manual_annotation
- confidence
- provenance
- extractor_version
- event_time 或 capture_time

其中：

- anchor_ref 是共享契约的一部分，不得只在本地 UI 层临时拼装
- 文本锚点视为 anchor_ref 的特例，不再单独作为长期唯一模型
- 任一关系、诊断结论或统计项都必须能回链到至少一个 anchor_ref

## 模块影响 | Module Impact

### Analysis Engine

- 从“文本诊断引擎”扩展为“派生表示诊断引擎”
- 指标和信号仍可输出文本、图谱、时间轴和地图视图，但输入不再限于纯文本

### Temporal Knowledge Processing

- 当前对象抽取改为支持 multimodal derived units
- evidence-linked response 必须返回 modality-aware anchor_ref
- 增量导出包必须包含多模态 evidence 和 provenance

### Visual OS

- Show Evidence 必须支持文本定位、页图高亮、图表区域聚焦、关键帧显示和视频时间段回跳
- 文本/图谱/时间轴/地图四类视图保持不变，但证据呈现维度扩展

### Cloud Aggregation

- 云端不接管本地多模态抽取实现
- 云端只消费统一增量包，并基于 anchor_ref 做跨对象聚合、统计和来源覆盖率计算

## 约束与边界 | Constraints and Boundaries

- 本决策不要求一次性实现通用视频理解或端到端视觉大模型统一推理
- 本决策不改变本地处理当前对象、云端处理跨对象聚合的职责边界
- 本决策不允许跳过 raw asset 留存而仅保留 OCR 或 ASR 文本
- 本决策不将低置信度派生结果直接升级为 canonical fact，仍需审核和证据回链

## 备选方案 | Alternatives

- 方案 A: 将所有多模态对象强制转成纯文本后再分析（拒绝）
- 方案 B: 为图片、表格、视频分别建设独立分析链路（拒绝）
- 方案 C: 直接以统一多模态 embedding 作为唯一分析真源（拒绝）

## 影响 | Impact

- 保持多模态扩展与现有本地/云端架构兼容，避免出现第二套对象模型
- 提升图像、表格、视频证据的可追溯性、可审核性和可回放性
- 增加 OCR、ASR、版面分析、关键帧抽取等派生管线治理成本
- 对 API、存储 schema、UI evidence 交互和验收门禁提出新的契约要求

## 分阶段落地 | Phased Rollout

### Phase 1

优先支持 PDF、扫描页和论文图表：

- OCR
- layout parsing
- figure/table/caption 对齐
- page_region 级 anchor_ref

### Phase 2

补齐图像与图表结构化：

- chart parsing
- figure relation extraction
- table cell 级 evidence

### Phase 3

支持视频对象：

- ASR
- shot segmentation
- key frame indexing
- time_range / frame_region 级 anchor_ref

## 关联 ADR | Related ADRs

- [ADR-001-runtime.md](ADR-001-runtime.md): 运行时隔离与通信边界
- [ADR-002-storage.md](ADR-002-storage.md): DuckDB 规范化存储基线
- [ADR-003-execution-oriented-storage.md](ADR-003-execution-oriented-storage.md): 执行导向存取架构与性能路径分离

## 关联文档 | Related Docs

- [../product/modules/analysis-engine.md](../product/modules/analysis-engine.md)
- [../developer/coding/visual-os.md](../developer/coding/visual-os.md)
- [../developer/coding/temporal-knowledge-processing.md](../developer/coding/temporal-knowledge-processing.md)
- [../developer/coding/local-cloud-function-alignment-sprint-pack.md](../developer/coding/local-cloud-function-alignment-sprint-pack.md)
- [../developer/api/terminology-hierarchy-api-storage-contract-v1.md](../developer/api/terminology-hierarchy-api-storage-contract-v1.md)

## 后续动作 | Next Actions

- 在共享契约中新增 anchor_ref v1 字段表与 JSON Schema
- 在本地 sprint pack 中补齐 multimodal extractor、evidence viewer 和 export schema 工单
- 在 API 文档中声明 modality-aware evidence 查询返回结构
- 在 Visual OS 文档中补充 figure、table、video evidence 的交互规范
- 在验收门禁中增加多模态可回链率、派生表示质量阈值和审核覆盖率