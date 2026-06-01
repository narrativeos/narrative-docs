# Product Roadmap

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines phased roadmap goals and release outcomes from V1 to V3.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-roadmap-README
path: product/roadmap/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, user, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 近期重点

- 完成 Knowledge Hub（narrative-docs）基础层
- 统一开发环境基线（VS Code + Copilot）
- 建立 AI-First 工程流程与 CI 守门

## 当前功能点对齐

本阶段不展开长期规划，优先对齐当前可执行功能点：

- 本地（NarrativeOS）：提取、加工、当前工作对象分析。
- 云端（Cloud Project）：跨对象聚合、长期演化分析、规模化查询服务。
- 共享契约：ID、时间语义、证据回链、增量同步动作。

执行入口： [../../developer/coding/local-cloud-function-alignment-sprint-pack.md](../../developer/coding/local-cloud-function-alignment-sprint-pack.md)

开发推进清单： [../../developer/coding/developer-docs-execution-sprint-plan.md](../../developer/coding/developer-docs-execution-sprint-plan.md)

## 文档治理推进板（开发向）

### P0（本周内）交付稳定性

1. 把链接有效性检查并入门禁链路（本地 + CI）。
2. 建立文档门禁基线快照（以 `assets/doc-index.yaml` 为清单源）。
3. 将 docs 质量目标纳入短期推进看板。

P0 指标（本周）：

- 断链数：0
- docs-check-all 通过率：100%
- 关键入口可达率（README/index/contributing 三跳内）：100%

### P1（2-4 周）跨仓协同效率

1. 建立 API 文档同步节奏：`openapi -> docs -> compatibility` 固定流程。
2. 强化贡献路径可执行性：新贡献者 15 分钟走查常态化。
3. 清理导航信息架构：按 user/developer/academic/product 角色复核入口语义。

P1 指标（双周）：

- API 契约改动文档联动覆盖率：100%
- 新贡献者首个成功任务（15 分钟）达成率：>= 90%
- 导航歧义项清零率：100%

### P2（1-2 个月）规模化治理能力

1. 建立季度文档审计机制：结构、时效、跨仓一致性三类审计。
2. 建立术语与双语一致性治理：关键概念词典变更流程化。
3. 沉淀故障与决策闭环：`troubleshooting -> ADR -> rules -> gates`。

P2 指标（月/季度）：

- 季度审计执行率：100%
- 术语/双语漂移问题环比下降：持续下降
- 高频问题回灌时效（发现到落库）：<= 7 天

### 功能点对齐矩阵

| 功能点 | 本地 NarrativeOS | 云端项目 | 共享契约 | 说明 |
| --- | --- | --- | --- | --- |
| 时序字段 | 负责落地 | 接收并保留 | 统一语义 | entity/edge 时间属性 |
| 当前对象抽取 | 主责 | 不主责 | 统一 schema | 单文/批次加工 |
| 当前对象溯源查询 | 主责 | 不主责 | 统一证据模型 | 局部演化链路 |
| 时间窗检索 | 主责 | 可复用索引 | 统一参数 | 本地过滤优先 |
| 审核与冲突提示 | 主责 | 仅接收结果 | 统一状态枚举 | 候选边审阅 |
| 增量导出/接入 | 主责导出 | 主责接入 | 统一包格式 | create/update/delete/rollback |
| 跨对象聚合分析 | 不主责 | 主责 | 统一 ID | 仅云端做聚合 |
| 全局统计 | 不主责 | 主责 | 统一指标口径 | 概念热度/增长/覆盖率 |

### 拆单视图

本地（NarrativeOS）：

- 时序字段扩展与存储迁移
- 当前对象实体关系抽取管道
- 当前对象溯源查询接口
- 时间窗过滤检索
- 候选关系审核与冲突提示
- 增量包导出器

云端（Cloud Project）：

- 增量包接入与去重合并
- 时序图谱增量写入
- 跨对象时序查询 API
- 全局统计 API

共享契约：

- 双端 ID 与时间语义契约冻结
- 增量同步包 JSON Schema
- 端到端回放用例（汽车 -> 运输工具）
- 验收门禁定义

## 中期重点

- 完善跨模块 contract 与 schema 管理
- 推进插件生态与 SDK 文档体系
- 增强 Atlas + Spatial 的场景化能力

## V1-V3 蓝图节奏

执行基线：V1 阶段默认采用 [../v1-design-baseline.md](../v1-design-baseline.md) 的范围边界、双门槛验收（Product KPI + Engineering SLO）与 No-go 规则。

执行排期：两周任务拆解与 owner 分配见 [../v1-two-week-sprint-plan.md](../v1-two-week-sprint-plan.md)。

### 校对补齐路线挂钩（跨阶段）

为避免校对能力在模块清单中显得孤立，路线图采用“阶段挂钩 + 判定页面分离”策略：

- 路线图只定义阶段目标与进入条件。
- 产品判定规则与对外边界保留在专页，不折叠进时间线正文。

阶段挂钩：

- V1：完成 P0/P1/P2 最小补齐闭环并建立 go/no-go 判定基线。
- V2：将术语一致性、证据回链与误报治理纳入跨样本稳定性验证。
- V3：形成机构场景下可复核、可留痕的校对增强运营节奏。

判定与执行入口：

- 判定口径： [../modules/proofreading-competitive-benchmark.md](../modules/proofreading-competitive-benchmark.md)
- 角色与边界： [../modules/proofreading-capability-gap-closure-plan.md](../modules/proofreading-capability-gap-closure-plan.md)
- 执行作业单： [../workflows/proofreading-competitive-benchmark-runbook.md](../workflows/proofreading-competitive-benchmark-runbook.md)

### V1：作者/编辑工作流闭环

目标：完成单文本从导入到诊断报告的高频闭环。

范围：

- Fast Scan + MRI
- Atlas 语言地图主入口
- AI 洞察与报告导出

成功标准：5-15 分钟内完成单稿诊断与修订决策支持。

发布闸门：若 Product KPI 或 Engineering SLO 任一不达标，不得进入 GA 发布。

### V2：研究者语料分析闭环

目标：完成千级语料的批量扫描、统计、聚类与趋势分析。

范围：

- 语料集管理
- 批量处理与聚类分析
- 趋势与主题迁移输出

成功标准：小时级任务可稳定输出跨语料比较结论。

### V3：机构级评估与知识沉淀闭环

目标：完成机构稿件评估、风格基线管理与知识资产沉淀。

范围：

- 批量导入与风格检测
- AI 模板率与重复结构检测
- 编辑评估报告与语料资产归档

成功标准：形成可规模化执行的 B 端评估流程与长期资产积累路径。

## 已验证样本

| 证据 ID | 来源 | 结论摘要 | 关联判断 |
| --- | --- | --- | --- |
| ROAD-002 | product/roadmap/README.md, product/workflows/README.md | V1 作者/编辑闭环、V2 语料分析闭环与 V3 机构评估闭环彼此递进 | 路线图已经与证据驱动的分阶段交付模式对齐 |
