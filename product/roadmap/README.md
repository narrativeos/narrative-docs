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

执行入口： [../developer/coding/local-cloud-function-alignment-sprint-pack.md](../developer/coding/local-cloud-function-alignment-sprint-pack.md)

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
