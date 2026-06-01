# Temporal Knowledge Processing Module

## 摘要（中文）

本页把当前功能点落到具体模块设计中：NarrativeOS 本地负责提取、加工与当前工作对象分析；云端项目负责跨对象聚合与长期演化分析；共享契约负责双端一致的数据边界。

## Executive Summary (EN)

This document turns the current function points into a concrete module design: local extraction and current-object analysis in NarrativeOS, cross-object aggregation in the cloud project, and shared contracts for data consistency.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-temporal-knowledge-processing
path: product/modules/temporal-knowledge-processing.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 模块定位

Temporal Knowledge Processing 是 NarrativeOS 的本地知识加工模块，面向“当前工作对象”提供时序化抽取、证据回链、关系加工与可导出结构化结果。

模块不承担云端聚合分析主责；当分析范围扩大到跨对象、跨项目、长周期演化时，结果通过共享契约交给云端项目处理。

## 模块目标

- 将当前对象中的概念、实体与关系转化为带时间语义的结构化资产。
- 让“当前对象内的历史脉络”可查询、可定位、可回链。
- 为云端聚合分析提供标准化增量包，而不是重复建设聚合逻辑。

## 模块范围

### 本地主责范围

- 单文 / 单批次实体抽取
- 关系抽取与候选边生成
- 时序字段补全
- 当前对象溯源查询
- 本地时间窗过滤检索
- 候选审核与冲突提示
- 增量导出

### 非主责范围

- 跨对象聚合分析
- 全局演化网络计算
- 多项目统计看板
- 长期趋势服务化 API

## 输入输出

### 输入

- 原始文稿 / 当前批次文本
- 现有术语库 / 关系库
- 证据锚点（sentence_ref、paragraph_ref）
- 时间上下文（published_at、event_time、valid_from）

### 输出

- 时序化节点
- 时序化关系边
- 候选关系列表
- 证据链结果
- 增量同步包

## 核心子模块

### 1. Temporal Extractor

职责：从当前对象中抽取实体、概念与关系，并补全基础时序字段。

输出：

- term_node candidates
- term_edge candidates
- evidence_ref

### 2. Current-Object Query Service

职责：只围绕当前工作对象提供溯源查询和局部演化链路查询。

输出：

- current-object lineage view
- time-window filtered result
- evidence-linked response

### 3. Review & Conflict Service

职责：处理候选关系的 accept/reject，以及冲突提示与回退建议。

输出：

- review status
- conflict warnings
- rollback hints

### 4. Incremental Exporter

职责：将本地加工后的结构化结果导出为云端可消费的增量包。

输出：

- create/update/delete/rollback payload
- schema_version
- provenance bundle

## 关系到现有模块的映射

| 功能点 | 主责模块 | 协作模块 | 产出 |
| --- | --- | --- | --- |
| 时序字段落地 | Temporal Knowledge Processing | Knowledge Graph | 时序节点 / 边 |
| 当前对象抽取 | Temporal Knowledge Processing | Analysis Engine | 结构化节点边 |
| 当前对象溯源查询 | Temporal Knowledge Processing | Insight Engine | 局部演化链路 |
| 时间窗检索 | Temporal Knowledge Processing | Text Lab | 带时间过滤结果 |
| 审核与冲突提示 | Temporal Knowledge Processing | Narrative Atlas | 候选边审阅结果 |
| 增量导出 | Temporal Knowledge Processing | API 层 | 云端增量包 |

## 关键边界

- 该模块只处理“当前对象”的加工，不做全局聚合。
- 云端项目只消费增量包，不反向接管本地抽取逻辑。
- 共享契约中的 ID、时间语义、证据模型是唯一真源。

## 与知识图谱的关系

Temporal Knowledge Processing 是 Knowledge Graph 的前置加工层。

- Knowledge Graph 负责存储、关系组织和检索承接。
- Temporal Knowledge Processing 负责把当前对象加工成可入库的时序资产。

## 与分析引擎的关系

- Analysis Engine 提供单文/单批次的结构信号与图谱构件。
- Temporal Knowledge Processing 负责把这些信号转成带时间语义、可审核、可导出的知识资产。

## 与 API 层的关系

- API 层只暴露查询、审核、导出和验证接口。
- 领域规则与校验逻辑保留在本模块或核心服务层。

## 验收标准

- 当前工作对象可生成带时间与证据的结构化节点边。
- 当前对象内的溯源查询可返回局部演化链路。
- 候选关系可审核、可冲突提示、可回退。
- 增量导出包可被云端项目消费。

## 非目标

- 不承担跨对象聚合分析。
- 不承担长期演化统计和云端看板。
- 不将所有历史知识史能力一次性塞进本地模块。

## 关联文档 | Related Docs

- [README.md](README.md)
- [platform-domains.md](platform-domains.md)
- [analysis-engine.md](analysis-engine.md)
- [library.md](library.md)
- [../roadmap/README.md](../roadmap/README.md)