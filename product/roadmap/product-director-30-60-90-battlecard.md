# Product Director 30-60-90 Battlecard

## 摘要（中文）

本页定义 NarrativeOS 在未来 90 天的产品推进主计划，目标是把项目从“可解释”推进到“可成交、可交付、可复用”。

## Executive Summary (EN)

This document defines a 30-60-90 day product operating plan to move NarrativeOS from a validated narrative into repeatable commercial delivery.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-roadmap-director-30-60-90-battlecard
path: product/roadmap/product-director-30-60-90-battlecard.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, maintainer, developer, operator, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
owner: product
reviewer: maintainer
cadence: weekly
```

## 核心目标

- 30 天：完成单场景可售卖闭环。
- 60 天：形成可复用交付模板。
- 90 天：建立可规模化经营节奏。

约束：

- 所有承诺必须回链证据，不允许超前宣称。
- 所有上线能力必须通过 Product KPI + Engineering SLO 双门槛。

## 北极星与阶段指标

| 阶段 | 北极星目标 | 核心指标 |
| --- | --- | --- |
| D1-D30 | 单场景可成交 | 试点签约数、首个成功时间、演示到试点转化率 |
| D31-D60 | 可复用交付 | 交付周期、复用率、方案返工率 |
| D61-D90 | 可规模化经营 | 复购意向、续约率、单位交付成本下降 |

## 30 天计划（D1-D30）

### 目标

聚焦一个可付费场景并形成最小成交闭环。

### 关键动作

1. 锁定单一优先场景（作者/编辑单文诊断）。
2. 输出统一对外价值口径（问题、差异、验收）。
3. 启动 3-5 个设计合作试点并绑定验收模板。
4. 建立周会看板与红黄绿机制。

### 周会节奏

| 周次 | 产出 | Owner |
| --- | --- | --- |
| Week 1 | 目标场景与 ICP 冻结，价值口径一页纸 | Product Director |
| Week 2 | 试点名单、试点合同目标、执行 runbook 锁定 | Product + Delivery |
| Week 3 | 首轮试点运行记录与失败分类 | Delivery + Research |
| Week 4 | go/no-go 评审与下阶段资源决策 | Product + Maintainer |

### D30 验收门槛

- 至少 3 个有效试点启动。
- 首个成功任务达到 15 分钟内可复现。
- 试点记录全部回链证据页与运行记录页。

## 60 天计划（D31-D60）

### 目标

把试点成功转成可复用交付能力。

### 关键动作

1. 固化标准交付包（输入要求、执行步骤、输出模板、风险说明）。
2. 建立客户分层交付策略（轻量版、标准版、深度版）。
3. 建立跨仓版本联动节奏（core/api/studio/docs）。
4. 形成指标周报模板并固定周复盘。

### D60 验收门槛

- 同一场景完成至少 2 次复用交付。
- API/文档联动覆盖率保持 100%。
- 返工率可测且连续下降。

## 90 天计划（D61-D90）

### 目标

形成可持续经营节奏并进入规模化准备。

### 关键动作

1. 建立版本发布与商业计划联动机制。
2. 建立价格与套餐实验策略。
3. 建立季度经营评审（价值、效率、风险三线）。
4. 明确扩场景进入标准，避免范围失控。

### D90 验收门槛

- 形成稳定季度经营节奏。
- 明确下一季度扩场景优先级与资源投放。
- 关键指标具备连续 8-12 周趋势数据。

## 组织分工（RACI）

| 事项 | Responsible | Accountable | Consulted | Informed |
| --- | --- | --- | --- | --- |
| 场景优先级与价值口径 | Product Lead | Product Director | Maintainer, Architect | All |
| 试点执行与验收 | Delivery Lead | Product Director | Research, Studio | All |
| 算法与证据门禁 | Research Lead | Maintainer | Product, Core | All |
| API 与文档联动 | API Owner + Docs Owner | Maintainer | Product Lead | All |
| 经营指标与复盘 | Product Ops | Product Director | Finance, Delivery | All |

## 风险预案

| 风险 | 早期信号 | 预案 |
| --- | --- | --- |
| 场景扩散导致资源稀释 | 同期并行需求超过 2 个核心场景 | 强制回到单场景优先级，冻结次要需求 |
| 指标有结论无证据 | 结果页未回链 run record | 阻断对外宣称，先补证据后发布 |
| 交付成功但不可复用 | 每个试点都在重新定义流程 | 固化交付模板并设复用率指标 |
| 研发节奏与承诺失配 | 试点承诺快于实现能力 | 执行范围降级，分阶段承诺 |

## 周会看板（建议字段）

```yaml
week_id: YYYY-WW
focus_scenario: <name>
pipeline:
  leads: <count>
  active_pilots: <count>
  converted: <count>
delivery:
  first_success_time_p50: <minutes>
  rerun_pass_rate: <percent>
  rework_rate: <percent>
risk:
  red_items: [<id>]
  mitigation_owner: <role>
decision:
  go_no_go: go | hold | no-go
  next_week_priority: <one sentence>
```

## 关联文档

- [README.md](README.md)
- [../v1-design-baseline.md](../../developer/coding/v1-design-baseline.md)
- [../workflows/README.md](../workflows/README.md)
- [../workflows/proofreading-competitive-benchmark-runbook.md](../workflows/proofreading-competitive-benchmark-runbook.md)
- [../../whitepaper/algorithm-selection-freeze-v1.md](../../whitepaper/algorithm-selection-freeze-v1.md)
- [../../whitepaper/evidence-registry.md](../../whitepaper/evidence-registry.md)
