# Developer Guide

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document is the developer entry for environment setup, workspace operations, coding rules, and extension tracks.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-README
path: developer/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页用于统一开发与协作基线，目标是降低多仓库维护摩擦。

## 阅读路径（建议） | Recommended Path

- 第一步：按 [setup](setup/README.md) 与 [workspace](workspace/README.md) 建立环境
- 第二步：按 [api](api/README.md)、[coding](coding/README.md) 对齐接口与代码规范
- 第三步：在 [adr](../adr/README.md) 记录关键架构决策，形成可追溯上下文
- 第四步：在 [ai](../ai/README.md) 维护 AI 协作上下文，提升人机协作一致性
- 第五步：在 [governance](../governance.md) 与 [whitepaper](../whitepaper/README.md) 落实治理、验收与发布基线

## 子文档索引 | Subdocument Index

- [setup](setup/README.md): 开发工具与依赖
- [workspace](workspace/README.md): 多仓库工作区组织
- [api](api/README.md): API 规格入口与 OpenAPI 维护约定
- [sdk](sdk/README.md): SDK 设计与发布注意事项
- [plugins](plugins/README.md): 插件开发约束
- [coding](coding/README.md): 编码规范与质量门禁
- [coding/docs-release-readiness-checklist.md](coding/docs-release-readiness-checklist.md): 文档发布前就绪检查清单
- [operations](operations/README.md): 安装验证、回滚与故障处置 Runbook
- [operations/novel100-kepub-dataset.md](operations/novel100-kepub-dataset.md): 原型开发样本数据集（20世纪中文小说100强 x kepub）
- [operations/cross-repo-release-checklist.md](operations/cross-repo-release-checklist.md): 跨仓联合发布硬门禁清单
- [operations/go-no-go-meeting-template.md](operations/go-no-go-meeting-template.md): 发布 go/no-go 会议模板
- [operations/cross-repo-ci-status-matrix-template.md](operations/cross-repo-ci-status-matrix-template.md): 跨仓 CI 状态与证据矩阵模板
- [workspace/ai-native-bootstrap-checklist.md](workspace/ai-native-bootstrap-checklist.md): AI-Native 仓库初始化检查清单
- [../product/v1-design-baseline.md](../product/v1-design-baseline.md): V1 设计基线（开发计划）
- [../product/v1-two-week-sprint-plan.md](../product/v1-two-week-sprint-plan.md): V1 两周执行排期（迭代计划）

## 开发计划与版本管理 | Planning and Versioning

- [../product/v1-design-baseline.md](../product/v1-design-baseline.md): 版本范围、MVP、验收门槛
- [../product/v1-two-week-sprint-plan.md](../product/v1-two-week-sprint-plan.md): 迭代任务拆分、负责人与依赖关系
- [../whats-new.md](../whats-new.md): 版本更新摘要
- [../changelog.md](../changelog.md): 版本变更明细

## 开发流程专题 | Workflow Tracks

- [adr](../adr/README.md): 架构决策记录与历史追溯
- [ai](../ai/README.md): AI 协作上下文与提示词规范
- [governance](../governance.md): 开源治理与制度要求
- [whitepaper](../whitepaper/README.md): 治理标准、验收指标与研究模板
- [troubleshooting](../troubleshooting.md): 研发与运维故障排查基线

## 角色快速入口 | Role-based Quick Entry

- 后端开发者：先看 [api](api/README.md) 与 [coding](coding/README.md)，再补充 [adr](../adr/README.md) 的决策记录
- 前端与客户端开发者：先看 [sdk](sdk/README.md) 与 [plugins](plugins/README.md)，联动 [api](api/README.md) 对齐接口约束
- 文档与治理维护者：先看 [governance](../governance.md) 与 [whitepaper](../whitepaper/README.md)，再进入治理条目与检查模板
- AI 协作者与提示词维护者：先看 [ai](../ai/README.md)，再对照 [coding](coding/README.md) 与 [workspace](workspace/README.md) 统一协作边界
- 运维与发布负责人：先看 [operations](operations/README.md) 与 [troubleshooting](../troubleshooting.md)，并核对治理与安全要求

## 协作规则 | Collaboration Rules

- 开发规范以本层文档为主，冲突处以 [docs-governance-standard.md](coding/docs-governance-standard.md) 为准
- 关键流程变更要同步到 [troubleshooting.md](../troubleshooting.md) 与相关 Runbook

## 标准参考 | Standards Reference

- [Documentation Governance Standard](coding/docs-governance-standard.md)
- [Benchmark and Acceptance Metrics](../whitepaper/benchmark-and-acceptance-metrics.md)
- [Readiness Checklist](../developer/coding/readiness-checklist.md)
