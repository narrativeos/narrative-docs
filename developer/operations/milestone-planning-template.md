# Milestone Planning Template

## 摘要（中文）

用于首版产品原型到验证阶段的里程碑规划模板。强调范围冻结、可验收结果和跨角色责任对齐。

## Executive Summary (EN)

This template helps teams define milestones with clear scope, acceptance gates, owners, and dependencies for prototype-to-validation delivery.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-milestone-planning-template
path: developer/operations/milestone-planning-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [product_manager, tech_lead, designer, operator]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用说明 | How To Use

1. 先填写项目北极星目标与非目标清单。
2. 每个里程碑必须包含可验证产物与通过标准。
3. 每个里程碑仅保留 1 个直接负责人（DRI）。
4. 周会仅允许调整后续里程碑，不回改已通过里程碑定义。

## 0. 项目基线 | Project Baseline

- 项目名称：
- 当前阶段：
- 北极星目标（一句话）：
- 非目标（本阶段不做）：
- 目标用户：
- 核心任务链路：
- 发布窗口：

## 1. 里程碑总览 | Milestone Overview

| Milestone ID | 里程碑名称 | 目标日期 | DRI | 状态 | 通过门槛（Gate） |
|---|---|---|---|---|---|
| M1 | 范围与验收冻结 | YYYY-MM-DD |  | Not Started | 核心场景与指标冻结 |
| M2 | 可点击原型闭环 | YYYY-MM-DD |  | Not Started | 关键任务全流程可走通 |
| M3 | 工程化演示版 | YYYY-MM-DD |  | Not Started | 真实样本数据接入完成 |
| M4 | 用户验证与决策 | YYYY-MM-DD |  | Not Started | 可用性测试和路线收敛 |

## 2. 里程碑详情模板 | Per-Milestone Detail

### [Milestone ID] [里程碑名称]

- 目标：
- 范围内（In Scope）：
- 范围外（Out of Scope）：
- 输入依赖：
- 输出产物：
- DRI：
- 协作角色：
- 计划开始：
- 计划完成：

#### 通过门槛（必须全部满足）

- [ ] Gate 1:
- [ ] Gate 2:
- [ ] Gate 3:

#### 失败条件（任一触发即不通过）

- [ ] Fail 1:
- [ ] Fail 2:

#### 验证方式

- 验证人：
- 验证时间：
- 验证证据链接：

## 3. 指标与验收 | Metrics & Acceptance

| 指标 | 基线值 | 目标值 | 采集方式 | 责任人 |
|---|---|---|---|---|
| 任务完成率 |  |  | 可用性测试记录 |  |
| 首次完成时长 |  |  | 任务计时 |  |
| 严重阻塞数（P0/P1） |  |  | 风险台账统计 |  |

## 4. 变更控制 | Change Control

- 变更申请编号：
- 变更内容：
- 影响里程碑：
- 影响范围：
- 风险等级：Low / Medium / High
- 审批人：
- 决策：Approve / Reject / Defer

## 5. 周会更新区 | Weekly Update

| 周次 | 本周达成 | 偏差说明 | 纠偏动作 | 下周重点 |
|---|---|---|---|---|
| W1 |  |  |  |  |
| W2 |  |  |  |  |
| W3 |  |  |  |  |
| W4 |  |  |  |  |

## 6. 首版建议里程碑（原型项目） | Recommended v1 Milestones

1. M1：冻结角色、场景、指标、非目标。
2. M2：完成选书-阅读-标注-导出可点击原型。
3. M3：接入本地样本数据并完成演示脚本。
4. M4：完成 3-5 位目标用户测试并形成下一阶段 backlog。
