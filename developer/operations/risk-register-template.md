# Risk Register Template

## 摘要（中文）

用于大项目执行阶段的风险识别、分级、应对与跟踪。支持周会滚动更新与升级机制。

## Executive Summary (EN)

This template tracks delivery risks with scoring, mitigation, triggers, and escalation to keep large projects under control.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-risk-register-template
path: developer/operations/risk-register-template.md
lang_primary: zh-CN
lang_secondary: en
audience: [product_manager, tech_lead, operator]
agent_ready: true
source_of_truth: narrative-docs
```

## 风险分级规则 | Scoring Model

- 概率（P）：1-5
- 影响（I）：1-5
- 风险分（R）= P x I
- 分级：
  - 1-5: Low
  - 6-11: Medium
  - 12-25: High

## 响应时限 | Response SLA

- High：24 小时内给出处置方案，48 小时内执行。
- Medium：72 小时内给出处置方案，1 周内执行。
- Low：进入观察列表，双周复评。

## 风险台账主表 | Master Register

| Risk ID | 类别 | 风险描述 | P | I | R | 等级 | 触发信号 | 责任人 | 缓解动作 | 预案（Contingency） | 截止日期 | 状态 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R-001 | Scope | 范围持续膨胀导致延期 | 4 | 4 | 16 | High | 连续两周新增需求 > 已完成需求 |  | 冻结非核心需求 | 拆分到下一里程碑 | YYYY-MM-DD | Open |
| R-002 | Data | 数据源不可用或结构变化 | 3 | 5 | 15 | High | 抓取失败率 > 10% |  | 增加重试与备用源 | 切换离线样本演示 | YYYY-MM-DD | Open |
| R-003 | UX | 原型无法完成核心任务 | 3 | 4 | 12 | High | 可用性测试完成率 < 80% |  | 简化流程与文案 | 降级功能保闭环 | YYYY-MM-DD | Open |
| R-004 | Tech | 关键性能达不到演示要求 | 2 | 4 | 8 | Medium | 首屏或关键动作超时 |  | 优先优化关键路径 | 使用预计算缓存 | YYYY-MM-DD | Open |
| R-005 | Compliance | 内容授权边界不清晰 | 2 | 5 | 10 | Medium | 出现外部展示需求 |  | 明确内外部使用政策 | 替换可公开样本 | YYYY-MM-DD | Open |

## 风险项详情模板 | Risk Item Detail

### [Risk ID] [风险标题]

- 类别：Scope / Schedule / Data / UX / Tech / Compliance / Team
- 描述：
- 根因：
- 当前证据：
- P：
- I：
- R：
- 等级：
- 触发阈值：
- 缓解动作（Mitigation）：
- 预案动作（Contingency）：
- 责任人：
- 支持人：
- 截止日期：
- 当前状态：Open / Monitoring / Mitigating / Closed

## 升级规则 | Escalation Rules

1. 任一 High 风险进入红色看板，必须在下一次例会优先处理。
2. 同一风险连续两周未下降等级，自动升级给项目负责人拍板。
3. 触发合规风险时，暂停对外演示，直到书面确认边界。

## 周会检查清单 | Weekly Risk Review

- [ ] 本周新增风险是否已录入并评分。
- [ ] High 风险是否有明确责任人与截止日期。
- [ ] 已关闭风险是否有复盘结论可复用。
- [ ] 风险变化是否同步到里程碑计划。

## 本项目首批建议重点风险 | Initial Focus Risks

1. 范围蔓延：新增需求未经过里程碑变更流程。
2. 数据依赖：外部站点结构变化导致抓取失效。
3. 原型可用性：核心任务链路步数过多导致流失。
4. 合规边界：全文样本使用范围未明确。
5. 交付节奏：关键角色并行不足导致阻塞。
