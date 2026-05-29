# NarrativeOS 架构可行性与约束清单

## 摘要（中文） | Summary (ZH)

本页用于在正式进入实现之前，先审慎确认 NarrativeOS 的关键架构设定是否足以支撑长期演进、首期交付与后续扩展。

## Executive Summary (EN) | 英文摘要

This document captures the feasibility checks and architectural constraints that must hold for NarrativeOS to become a long-lived, stable foundation before implementation begins.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-architecture-feasibility
path: whitepaper/architecture-feasibility.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, architect, developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: draft-foundation
owner: architecture
reviewer: maintainer
last_reviewed: 2026-05-29
next_review: 2026-06-12
```

## 使用方式

本页不是架构宣言，而是实现前的可行性检查表。

它回答：哪些设定已经足够稳定，哪些还只是概念，哪些不应进入首期承诺。

## 1. 必须成立的前提

- 本地优先可以成立
- 运行时隔离可以成立
- 分层分析链路可以成立
- 统一 Schema 可以成立
- 插件边界可以成立
- 云增强可以作为异步补充而不是前置依赖

## 2. 关键架构判断

### 2.1 运行时组合

当前设定包含 Rust Host、TypeScript UI、Python Worker 等多运行时组合。

需要验证的问题：

- 协作边界是否足够清楚
- 数据交换是否足够稳定
- 调试和部署复杂度是否可接受

### 2.2 数据基线

当前以 DuckDB 作为存储基线，并扩展向量与图能力。

需要验证的问题：

- 首阶段是否真的需要更复杂的存储组合
- 统一分析输出是否能保持一致语义
- 数据演进是否容易被后续能力打散

### 2.3 可视化工作台

Narrative Atlas 与 Visual OS 需要承担解释性表达。

需要验证的问题：

- 视觉复杂度是否会压过文本解释本身
- 用户是否能从“看起来高级”转换为“实际可判断”
- 证据定位是否足以支撑决策

### 2.4 平台分域

六域架构有利于叙事清晰，但也可能带来过度拆分风险。

需要验证的问题：

- 是否每个域都有明确且不可替代的职责
- 是否会在首期就形成过多产品面
- 是否需要先合并某些域的实现边界，再逐步分化

## 3. 可行性决策矩阵

| 架构项 | 当前判断 | 主要风险 | 结论 | 备注 |
| --- | --- | --- | --- | --- |
| 多运行时组合 | 可行，但需边界清晰 | 调试与部署复杂 | 可进入后续版本 | 首期只保留最小协作面 |
| DuckDB 存储基线 | 可行，适合作为起点 | 后续扩展过早复杂化 | 可进入首期 | 先验证单文闭环 |
| 可视化工作台 | 有价值，但需控复杂度 | 视觉掩盖解释性 | 可进入首期 | 证据链必须前置 |
| 六域平台分拆 | 叙事清晰，工程易膨胀 | 产品面过多 | 可进入后续版本 | 首期先收敛域边界 |
| 云增强能力 | 方向正确 | 容易被误当成前置依赖 | 不应作为首期承诺 | 作为异步补充保留 |

## 4. 首期约束

- 不能把需要云端重分析的能力伪装成本地实时能力
- 不能把尚未验证的模型能力写成承诺
- 不能把没有证据链的结论写成默认输出
- 不能让插件边界绕过核心语义约束

## 5. 可行性结论模板

每项架构判断都应最终落到三种结果之一：

- 可进入首期
- 可进入后续版本
- 不应进入当前路线图

## 6. 需要补的证据

- 端到端最小闭环的时间与成功率
- 关键工作流的可解释性证据
- 多运行时协作的复杂度记录
- 数据与 Schema 统一性的实际验证

## 7. 相关 ADR

- [ADR-001: Runtime Isolation and Communication Boundaries](../adr/ADR-001-runtime.md)
- [ADR-002: DuckDB as Canonical Storage Baseline](../adr/ADR-002-storage.md)

## 8. 证据记录模板

```yaml
evidence_id: ARCH-XXX
evidence_type: benchmark | prototype | design_review | adr_link
source: docs/path/or/pr
date: YYYY-MM-DD
summary: 证据摘要
linked_decision: one-line decision
owner: architecture
```

## 9. 已验证样本

| 证据 ID | 来源 | 结论摘要 | 关联判断 |
| --- | --- | --- | --- |
| ARCH-001 | architecture/system/README.md, ADR-001, ADR-002 | 运行时隔离、显式 IPC/API Contract 和 DuckDB 基线构成首期架构硬约束 | 首期只在这些约束内展开实现 |
| ARCH-002 | architecture/platform/README.md, architecture/analysis-engine/README.md | 平台闭环与模块化六引擎表明应先收敛单文闭环，再逐步扩展平台分域 | 首期优先验证单文诊断闭环 |
| ARCH-003 | architecture/visual-os/README.md | Visual OS 以诊断优先、证据链可跳转和原文可追溯为核心要求 | 首期可视化工作台必须优先实现解释性与定位能力 |
