# Temporal Knowledge Processing Repo Design

## 摘要（中文）

本页把时序知识加工模块落到仓库级设计：narrative-core 负责抽取与时序加工，narrative-api 负责接口与导出，narrative-studio 负责审核与回看，云端项目负责聚合与长期分析。

## Executive Summary (EN)

This document decomposes the temporal knowledge processing module into repo-level responsibilities: narrative-core for extraction and temporal processing, narrative-api for interfaces and export, narrative-studio for review and replay, and the cloud project for aggregation and long-term analysis.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-temporal-knowledge-processing-repo-design
path: product/modules/temporal-knowledge-processing-repo-design.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 设计目标

- 把“提取、加工、当前对象分析”落到本地仓库边界。
- 把“跨对象聚合、长期演化分析”留给云端项目。
- 用共享契约保证本地与云端之间的输入输出一致。

## 仓库职责划分

### narrative-core

职责：领域模型、抽取加工、时序字段补全、关系校验、当前对象查询的核心实现。

输入：

- 原始文本
- 证据锚点
- 既有术语节点和关系边

输出：

- 时序化节点
- 时序化关系
- 候选边
- 校验结果

边界：

- 不负责 UI 渲染。
- 不负责云端聚合。
- 不负责跨对象统计。

### narrative-api

职责：对外接口、请求校验、错误映射、增量包导出、当前对象查询接口。

输入：

- API 请求
- 查询参数
- 审核动作

输出：

- 统一 JSON 响应
- 增量同步包
- 标准错误码

边界：

- 不承载领域规则计算。
- 不承载 DAG 校验逻辑。
- 不直接做跨对象聚合分析。

### narrative-studio

职责：候选边审核、冲突提示、证据回看、工作流编排。

输入：

- 候选边列表
- 证据链结果
- 当前对象查询结果

输出：

- accept/reject 结果
- 冲突提示
- 回看定位

边界：

- 不直接写入图数据库。
- 不承载云端聚合逻辑。
- 不替代 API / Core 的领域校验。

### cloud-project

职责：接收本地增量包、去重合并、跨对象时序查询、长期演化统计。

输入：

- 本地导出包
- 云端聚合请求
- 统计查询请求

输出：

- 合并后的全局图谱
- 跨对象查询结果
- 演化趋势与统计结果

边界：

- 不重复实现本地抽取逻辑。
- 不强行接管当前对象加工。
- 只消费共享契约包。

## 功能点到仓库的映射

| 功能点 | 主责仓库 | 协作仓库 | 说明 |
| --- | --- | --- | --- |
| 时序字段落地 | narrative-core | narrative-api | 核心模型与迁移 |
| 当前对象抽取 | narrative-core | narrative-studio | 单文/批次加工 |
| 当前对象溯源查询 | narrative-api | narrative-core | 对外查询入口 |
| 时间窗检索 | narrative-core | narrative-api | 过滤与返回 |
| 候选审核与冲突提示 | narrative-studio | narrative-api / narrative-core | 审核闭环 |
| 增量包导出 | narrative-api | narrative-core | 统一同步格式 |
| 增量包接入与聚合 | cloud-project | narrative-api | 云端入库 |
| 跨对象时序查询 | cloud-project | narrative-api | 云端检索服务 |

## 关键接口

### Core -> API

- extractTemporalGraph(text, context)
- validateHierarchy(edges)
- queryCurrentObjectLineage(termId, timeRange)

### API -> Studio

- getCandidateEdges(batchId)
- reviewCandidateEdge(edgeId, action)
- replayEvidence(sentenceRef)

### API -> Cloud

- exportIncrementalBundle(payload)
- submitAggregationBundle(bundle)
- queryCrossObjectTimeline(termId, timeRange)

## 依赖关系

- narrative-core 依赖统一的时序语义定义与证据模型。
- narrative-api 依赖 core 的领域服务与错误模型。
- narrative-studio 依赖 api 返回的审阅与查询结果。
- cloud-project 依赖本地导出的增量包契约。

## 验收标准

- 每个仓库职责单一，不出现重复实现。
- 本地对象级查询能返回证据回链与时间信息。
- 审核结果可驱动增量导出。
- 云端可以消费本地包并完成跨对象查询。

## 非目标

- 不在本页定义长期知识史路线图。
- 不在本页定义云端聚合算法细节。
- 不把 UI 组件设计写进领域模块职责。

## 关联文档 | Related Docs

- [temporal-knowledge-processing.md](temporal-knowledge-processing.md)
- [README.md](README.md)
- [platform-domains.md](platform-domains.md)
- [analysis-engine.md](analysis-engine.md)
- [../roadmap/README.md](../roadmap/README.md)