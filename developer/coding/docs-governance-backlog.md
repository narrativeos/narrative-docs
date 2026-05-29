<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](README.md)
<!-- doc-nav:end -->

# Documentation Governance Backlog

## EN Summary

This document tracks prioritized documentation governance issues, owners, SLAs, and acceptance criteria.

## Machine-readable Metadata

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

## Backlog（首批治理项）

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

## 周报字段（建议）

- 新增条目数
- 关闭条目数
- 超期条目数
- 平均修复时长
- Gate 通过率

## 关联文档

- [docs-governance-standard.md](docs-governance-standard.md)
- [../../CONTRIBUTING.md](../../CONTRIBUTING.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)
- [../../whitepaper/core-docs-mapping.md](../../whitepaper/core-docs-mapping.md)
