# Temporal Knowledge Studio Task Pack

## 摘要（中文）

本页是 narrative-studio 的实现任务单，聚焦候选审核、证据回看、冲突提示和工作流编排。

## Executive Summary (EN)

This page defines the narrative-studio implementation tasks for candidate review, evidence replay, conflict hints, and workflow orchestration.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-coding-temporal-knowledge-studio-task-pack
path: developer/coding/temporal-knowledge-studio-task-pack.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, product, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft
```

## 目标

- 提供当前对象加工结果的人工审核入口。
- 提供证据回看与冲突提示。
- 把审核结果回流给 API / Core 的增量导出链路。

## 任务清单

### TKS-101

Title: [Studio][P0] 候选关系审核面板

Scope:

- 展示候选边、证据锚点与 review 动作。
- 支持 accept / reject。

Acceptance:

- 审核动作可追踪。
- 审核结果可回填。

### TKS-102

Title: [Studio][P0] 证据回看与原文定位

Scope:

- 点击证据可定位 sentence_ref / paragraph_ref。
- 支持回看原文片段。

Acceptance:

- 锚点定位稳定可用。
- 证据缺失时有可见提示。

### TKS-103

Title: [Studio][P0] 冲突关系提示

Scope:

- 高亮环路、重复边、疑似跨域非法边。
- 给出 rollback hint。

Acceptance:

- 冲突不可静默忽略。
- 提示可驱动复核动作。

### TKS-104

Title: [Studio][P0] 审核结果回流

Scope:

- 将审核结果同步回 API / Core。
- 保证状态机一致。

Acceptance:

- accept/reject 状态在链路中一致。

## 与其他仓库的边界

- narrative-core 提供候选边与校验结果。
- narrative-api 提供审核与查询接口。
- cloud-project 只消费最终增量包。

## 关联文档

- [temporal-knowledge-processing-repo-design.md](../product/modules/temporal-knowledge-processing-repo-design.md)
- [local-cloud-function-alignment-sprint-pack.md](local-cloud-function-alignment-sprint-pack.md)