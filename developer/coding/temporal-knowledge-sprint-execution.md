# Temporal Knowledge Sprint Execution

## 摘要（中文）

本页将时序知识加工相关任务压缩为可直接进迭代的执行版，保留 owner、priority、depends on 与交付物。

## Executive Summary (EN)

This page compresses the temporal knowledge tasks into a sprint-ready execution plan with owner, priority, dependencies, and deliverables.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-temporal-knowledge-sprint-execution
path: developer/coding/temporal-knowledge-sprint-execution.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, architect, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 执行原则

- 优先先做本地闭环，再做云端接入。
- API 先冻结契约，再补实现细节。
- Studio 优先承接人工审核与回看，不抢领域计算。
- 云端只消费增量包，不回流改写本地加工逻辑。

## Sprint 顺序

1. narrative-core 先完成时序模型、抽取、校验与当前对象查询。
2. narrative-api 在 core 稳定后冻结接口、导出包与错误模型。
3. narrative-studio 并行完成审核、证据回看与冲突提示。
4. cloud-project 最后接入增量包、去重合并与跨对象查询。

## 执行矩阵

| ID | 仓库 | Priority | Depends On | Deliverable |
| --- | --- | --- | --- | --- |
| TKC-101 | narrative-core | P0 | none | 时序实体/关系模型 |
| TKC-102 | narrative-core | P0 | TKC-101 | 当前对象抽取管道 |
| TKC-103 | narrative-core | P0 | TKC-101 | 层级关系校验器 |
| TKC-104 | narrative-core | P0 | TKC-102, TKC-103 | 当前对象溯源查询 |
| TKC-105 | narrative-core | P1 | TKC-104 | 增量导出前置包装 |
| TKA-101 | narrative-api | P0 | TKC-104 | 当前对象溯源查询接口 |
| TKA-102 | narrative-api | P0 | TKC-103, TKS-101 | 候选关系审核接口 |
| TKA-103 | narrative-api | P0 | TKC-105 | 增量导出接口 |
| TKA-104 | narrative-api | P0 | TKC-103 | 错误码与响应模型 |
| TKS-101 | narrative-studio | P0 | TKC-102, TKA-101 | 候选关系审核面板 |
| TKS-102 | narrative-studio | P0 | TKA-101 | 证据回看与原文定位 |
| TKS-103 | narrative-studio | P1 | TKC-103 | 冲突关系提示 |
| TKS-104 | narrative-studio | P1 | TKA-102 | 审核结果回流 |
| LC-CLOUD-201 | cloud-project | P0 | TKA-103 | 增量包接入与去重合并 |
| LC-CLOUD-202 | cloud-project | P0 | LC-CLOUD-201 | 时序图谱增量写入 |
| LC-CLOUD-203 | cloud-project | P1 | LC-CLOUD-202 | 跨对象时序查询 API |
| LC-CLOUD-204 | cloud-project | P1 | LC-CLOUD-202 | 全局统计 API |
| LC-SHARED-301 | narrative-docs | P0 | none | 双端 ID 与时间语义契约 |
| LC-SHARED-302 | narrative-docs | P0 | LC-SHARED-301 | 增量同步包 JSON Schema |
| LC-SHARED-303 | narrative-docs | P0 | TKC-104, TKA-103, LC-CLOUD-203 | 端到端回放用例 |
| LC-SHARED-304 | narrative-docs | P0 | none | 验收门禁定义 |

## 本地阶段门禁

- 必须先完成 TKC-101 到 TKC-104。
- 若 TKA-101 或 TKS-101 依赖未稳定，不进入云端接入阶段。
- 云端阶段只在 TKA-103 可稳定导出后启动。

## 交付物检查

- 本地可输出时序化节点边。
- 本地可做当前对象溯源查询。
- Studio 可完成审核与证据回看。
- API 可导出统一增量包。
- 云端可接入并完成跨对象查询。

## 关联文档

- [temporal-knowledge-core-task-pack.md](temporal-knowledge-core-task-pack.md)
- [temporal-knowledge-api-task-pack.md](temporal-knowledge-api-task-pack.md)
- [temporal-knowledge-studio-task-pack.md](temporal-knowledge-studio-task-pack.md)
- [../modules/temporal-knowledge-processing-repo-design.md](../modules/temporal-knowledge-processing-repo-design.md)
- [local-cloud-function-alignment-sprint-pack.md](local-cloud-function-alignment-sprint-pack.md)