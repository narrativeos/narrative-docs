# Product Knowledge

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines product intent, module boundaries, and evolution direction for NarrativeOS.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-README
path: product/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, user, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页记录 NarrativeOS 的产品定义与演进方向，避免“只做技术、不见产品边界”。

## 阅读路径（建议） | Recommended Path

- 第一步：读 [vision](vision/README.md) 统一价值主张
- 第二步：读 [modules](modules/README.md) 明确能力边界
- 第三步：读 workflows 与 roadmap 对齐执行节奏

## 子文档索引 | Subdocument Index

- [vision](vision/README.md): 产品定位与价值主张
- [modules](modules/README.md): 核心模块职责与关系
- [workflows](workflows/README.md): 用户与团队工作流
- [roadmap](roadmap/README.md): 里程碑与优先级
- [v1-design-baseline](v1-design-baseline.md): V1 可执行设计基线（范围、MVP、验收、Go/No-go）
- [v1-two-week-sprint-plan](v1-two-week-sprint-plan.md): V1 两周执行排期（任务、负责人、依赖、验收）
- [scenarios/v1-mock-simulation-dataset](scenarios/v1-mock-simulation-dataset.md): V1 场景 mock 模拟数据包
- [prototype/v1-prototype-spec](prototype/v1-prototype-spec.md): 基于 mock 数据的 V1 原型规范
- [modules/proofreading-capability-gap-closure-plan](modules/proofreading-capability-gap-closure-plan.md): 零规则库起步的校对能力补齐方案
- [modules/proofreading-competitive-benchmark](modules/proofreading-competitive-benchmark.md): 校对补齐同题对打评测规范
- [workflows/proofreading-competitive-benchmark-runbook](workflows/proofreading-competitive-benchmark-runbook.md): 校对补齐同题对打执行作业单

## 平台化补充

- 平台域模块设计（当前基线六域）: [modules/platform-domains.md](modules/platform-domains.md)
- 对应平台架构蓝图: [../architecture/platform/README.md](../architecture/platform/README.md)

## 协作规则 | Collaboration Rules

- 产品文档更新需与 [Architecture](../architecture/README.md) 和 [Developer](../developer/README.md) 保持口径一致
- 涉及对外承诺的条目需同步到白皮书映射
- V1 阶段需求评审必须引用 [v1-design-baseline](v1-design-baseline.md) 的 In/Out Scope 与双门槛验收口径
- V1 原型评审必须先引用 [scenarios/v1-mock-simulation-dataset](scenarios/v1-mock-simulation-dataset.md) 的 scene_id 与 dataset_id

## 标准参考 | Standards Reference

- [Core Docs Mapping](../developer/coding/core-docs-mapping.md)
- [Benchmark and Acceptance Metrics](../whitepaper/benchmark-and-acceptance-metrics.md)
- [Readiness Checklist](../developer/coding/readiness-checklist.md)
