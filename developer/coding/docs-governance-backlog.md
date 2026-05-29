# Documentation Governance Backlog

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document tracks prioritized documentation governance issues, owners, SLAs, and acceptance criteria.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-docs-governance-backlog
path: developer/coding/docs-governance-backlog.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, reviewer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用说明

- 优先级使用 P0/P1/P2，定义见 [docs-governance-standard.md](docs-governance-standard.md)
- 每个条目必须有责任角色、目标截止时间和验收条件
- 状态值：Open / In Progress / Blocked / Done

## Backlog（治理项）

| ID | Priority | Status | Problem | Owner | Due | Acceptance Criteria |
| --- | --- | --- | --- | --- | --- | --- |
| DG-001 | P0 | Done | Prompt 模板结构错误，影响机读与稳定复用（ai/prompts/templates/task-template.md） | Maintainer + Reviewer | 2026-06-05 | 模板无占位残留，格式可解析，示例字段可直接复用 |
| DG-002 | P0 | Done | RULE 编号在 repo-rules、copilot-instructions、PR 模板间存在口径漂移 | Maintainer | 2026-06-05 | RULE-01..RULE-09 口径统一，引用链唯一真源化 |
| DG-003 | P1 | Done | user/cloud 文档仅提纲，缺少可执行任务路径 | User Docs Owner | 2026-06-12 | 至少 1 条端到端流程、故障排查、验收标准齐备 |
| DG-004 | P1 | Done | user/gis 文档仅提纲，缺少示例与坐标系实操说明 | User Docs Owner | 2026-06-12 | 增加 GIS 最小可复现任务、输入输出样例、精度与坐标系校验 |
| DG-005 | P1 | Done | developer/plugins 文档缺少插件开发最小示例与兼容矩阵 | Dev Docs Owner | 2026-06-12 | 提供 analyze/visualize/report 示例与版本兼容说明 |
| DG-006 | P1 | Done | developer/sdk 文档缺少接入步骤、错误语义和迁移示例 | Dev Docs Owner | 2026-06-12 | 提供 TS/Python 双栈最小接入路径与错误处理样例 |
| DG-007 | P1 | Done | README 与 getting-started 缺少 5 分钟复现路径与贡献入口 | Maintainer + Dev Docs Owner | 2026-06-19 | 新成员可按步骤完成一次文档贡献并通过模板校验 |
| DG-008 | P1 | Done | 白皮书就绪度状态描述偏乐观，证据与结论未完全对齐 | Whitepaper Owner | 2026-06-19 | readiness-checklist 与 core-docs-mapping 状态改为证据驱动 |
| DG-009 | P2 | Done | EN Summary 同质化，影响专业度与检索表现 | All Module Owners | 2026-06-30 | 关键页面摘要去模板化，重复句式显著下降 |
| DG-010 | P2 | Done | 缺少统一贡献总入口（CONTRIBUTING） | Maintainer | 2026-06-30 | 新增 CONTRIBUTING 并在首页与治理文档建立交叉链接 |
| DG-011 | P0 | Done | 首页“首个成功任务”路径偏治理导向，缺少角色分流与执行路径 | Maintainer | 2026-06-01 | README 提供 User/Contributor/Integrator 三条可执行首个成功路径 |
| DG-012 | P0 | Done | Getting Started 缺少“用户首个成功任务”与“贡献者首个成功任务”双闭环 | User Docs Owner | 2026-06-01 | 入门页包含前置条件、步骤、验收，并支持 reviewer 复核 |
| DG-013 | P0 | Done | Setup/Workspace 偏工具清单，缺少命令级自检与验证标准 | Dev Docs Owner | 2026-06-01 | Setup/Workspace 增加可执行命令、验收标准与排障链接 |
| DG-014 | P0 | Done | 缺少全局排障入口，跨仓问题分散且难检索 | Maintainer + Support | 2026-06-01 | 新增 TROUBLESHOOTING 中心并接入首页导航与关键入口 |
| DG-015 | P0 | Done | Analysis Engine 文档缺少输入输出契约、运行剖面、验收场景与排障 | Architect + Dev Docs Owner | 2026-06-03 | analysis-engine 文档具备可执行规范结构并支持 reviewer 复核 |
| DG-016 | P0 | Done | SDK 文档缺少生产级接入模式（异步任务、重试幂等、兼容矩阵） | Dev Docs Owner | 2026-06-03 | SDK 文档覆盖交互/异步场景并给出迁移与回滚模板 |
| DG-017 | P0 | Done | Plugins 文档缺少生命周期、注册流程、回归测试矩阵与发布策略 | Dev Docs Owner | 2026-06-03 | Plugins 文档覆盖从契约到灰度发布的全链路执行信息 |
| DG-018 | P1 | Done | 白皮书指标缺少“建议值/实测值”分层与证据模板 | Whitepaper Owner | 2026-06-05 | benchmark 文档具备 planned/measured 双轨与证据记录模板 |
| DG-019 | P1 | Done | 就绪度清单缺少证据缺失阻断规则 | Whitepaper Owner | 2026-06-05 | readiness-checklist 明确发布阻断条件与状态降级规则 |
| DG-020 | P1 | Done | 映射表缺少证据版本与状态字段，难以发布审计 | Whitepaper Owner | 2026-06-05 | core-docs-mapping 增加证据状态/版本并定义一致性检查 |
| DG-021 | P1 | Done | 缺少 API 规格入口与 OpenAPI 维护约定，接口真源不清晰 | Integrations Owner | 2026-06-07 | developer/api 提供规范入口、目录约定、维护流程与验收标准 |
| DG-022 | P1 | Done | 缺少 Ops Runbook 最小集，安装验证与回滚流程无统一入口 | Operations Owner | 2026-06-07 | developer/operations 覆盖安装验证、回滚与故障决策树 |
| DG-023 | P1 | Done | 缺少 CHANGELOG 与 What's New 索引，外部难以理解近期变化 | Maintainer | 2026-06-07 | CHANGELOG 与 WHATS_NEW 建立并接入首页、索引与治理流程 |
| DG-024 | P1 | Done | 缺少最小 docs CI 门禁，模板残留与死链无法自动阻断 | Maintainer + Automation | 2026-06-08 | 新增 docs-quality-check 工作流，覆盖模板残留与 Markdown 链接检查 |

## 周报字段（建议）

- 新增条目数
- 关闭条目数
- 超期条目数
- 平均修复时长
- Gate 通过率

## 关联文档 | Related Docs

- [docs-governance-standard.md](docs-governance-standard.md)
- [../../CONTRIBUTING.md](../../CONTRIBUTING.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)
- [../../whitepaper/core-docs-mapping.md](../../whitepaper/core-docs-mapping.md)
