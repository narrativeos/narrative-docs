# Proofreading Capability Gap Closure Plan

## 摘要（中文）

本页定义 NarrativeOS 从“零规则库、零名词库”起步补齐校对能力的整体实施方案，目标是在保持可解释与可追溯前提下，逐步达到并超越传统校对类产品的可用水平。

## Executive Summary (EN)

This document defines an end-to-end capability closure plan for NarrativeOS proofreading, starting from zero rulebase and zero terminology registry with self-learning governance.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-proofreading-gap-closure-plan
path: product/modules/proofreading-capability-gap-closure-plan.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页用于统一校对能力在 NarrativeOS 产品中的角色、边界与阶段目标，避免把“校对补齐”误写成一套独立于主产品之外的技术工程。

它回答四个产品层问题：

- 校对能力到底服务什么产品价值
- 首期必须补齐哪些能力，哪些不应抢占主路径
- 如何与现有诊断工作台和证据链体验对齐
- 什么情况下可以认为能力已经从“可用”进入“可竞争”

## 模块目标 | Module Goals

Proofreading Capability 的目标不是把 NarrativeOS 做成通用纠错器，而是把“发现问题 -> 理解原因 -> 接受建议 -> 完成修订”的闭环补完整。

核心目标：

- 补齐基础校对、知识校验、一致性校验、风险识别、公文专项能力
- 让作者/编辑在当前工作台内直接完成修订决策，而不是跳出到第二套工具
- 保持“可解释、可追溯、可回滚”的工程治理红线

## 模块范围 | Module Scope

- 基础文字与标点纠错
- 语法句式冲突检测
- 文内一致性与编号链检查
- 专有名词与引用一致性校验
- 知识性核查与高风险表达提醒
- 修订建议、证据回链与复核动作的联动输出

## 域模块集成映射 | Domain Integration Map

本模块不新增独立产品域，而是把校对功能点分配到既有域模块中执行。

- Text Lab：承接 typo/punctuation/grammar 与一致性预检入口。
- Narrative Atlas：承接问题热区可视化与证据锚点定位。
- Insight Engine：承接修订建议、风险提示、traceability 解释。
- Knowledge Graph（Library）：承接规则候选、术语词条与证据沉淀。
- Corpus Observatory：承接误报/漏报趋势与回归质量监控。
- Style Genome：承接风格相关背景特征，不承担校对主判定。

集成原则：

- 每个 issue_type 必须有唯一主责域，不允许域外悬空。
- 任何 accepted 建议必须可回链到证据与来源。
- 任何高风险结果必须可触发回滚或 shadow_only 降级。

## 非目标 | Non-goals

- 不依赖一次性构建超大词库
- 不以黑箱模型输出替代证据链
- 不以“自动替用户重写全文”作为主产品路径
- 不把校对页做成脱离当前基线六引擎工作台的第二套产品

## 用户价值 | User Value

对作者/编辑，校对能力应提供三类直接价值：

- 更快发现明确可修的问题，而不是重复人工扫读
- 每条建议都能解释“为什么改”，而不是只给机械结论
- 把一次修订沉淀为后续可复用的规则、词条与证据资产

## 体验原则 | Experience Principles

- 建议优先：先呈现可执行修订建议，再展开底层规则细节
- 证据优先：任何高置信建议都必须可回链到规则、来源或原文
- 工作台一体化：校对结果应嵌入当前基线六引擎工作台，而不是另起一套流程
- 渐进增强：先保证 P0 可用，再扩展 P1/P2，不以一次性“全能”作为目标

## 能力分层（P0/P1/P2）

### P0: 生存层（必须先完成）

- 基础文字与标点纠错
- 语法句式冲突检测
- 文内一致性与编号链检查
- 自学习闭环与规则回滚机制

通过标准：

- proofreading_recall 达到 standard 档位
- proofreading_false_positive_ratio 不超 standard 档位

### P1: 竞争层（形成可替代能力）

- 专有名词一致性与引用一致性
- 知识性核查（事实/法规/术语）
- 导向风险与违规表达识别

通过标准：

- term_consistency_alignment_rate 达到 standard 档位
- registry_new_term_precision 达到 standard 档位

### P2: 超越层（形成差异化）

- 篇章级结构诊断与校对协同
- 证据链可视化修订工作台
- 同题对打评测持续优于竞品

通过标准：

- 在同题评测中基础校对不弱于竞品
- 解释可用率与复核效率指标显著更优

## 关键产品输出 | Key Outputs

- 问题列表（issue list）
- 修订建议（suggestions）
- 证据回链（evidence links）
- 风险与一致性提示（risk and consistency alerts）
- 可复核修订记录（review-ready correction record）

## 能力演进机制 | Capability Evolution

```text
错例发现
  -> 规则/词条候选生成
  -> 影子评估
  -> Golden Set 回归
  -> 受限启用
  -> 全量启用或回滚
```

关键对象：

- Rule Candidate Registry
- Seed Lexicon Registry
- Correction Evidence Ledger

这些对象属于支撑机制，不应直接成为产品主叙事。

对应域落点：

- Rule Candidate Registry -> Knowledge Graph（Library）
- Seed Lexicon Registry -> Knowledge Graph（Library）
- Correction Evidence Ledger -> Insight Engine + Knowledge Graph

## 产品层输出契约 | Product Contract

```yaml
proofreading_result:
  issue_id: <id>
  issue_type: typo | punctuation | grammar | consistency | knowledge | risk | official_doc
  severity: low | medium | high
  span_ref: <span>
  suggestion: <fix>
  evidence:
    - source: <rule-id-or-source-span>
  confidence: 0.0-1.0
  traceability: pass | fail
```

约束：

- traceability=fail 的结果不得作为强结论。
- high 严重等级结果必须进入复核队列。

## 成功判定 | Success Criteria

产品层成功信号：

- 用户能在当前工作台内直接消费校对建议
- 高价值建议具备稳定可解释性
- 误报被控制在可运营范围内
- 修订过程能沉淀为后续规则与词条资产

评测层成功信号：

- 在同题评测中基础校对不弱于竞品
- 解释可用率与复核效率指标显著更优

## 关联文档 | Related Docs

- 域模块映射： ../modules/platform-domains.md
- 架构定义： ../../architecture/analysis-engine/README.md
- 学习闭环： ../../architecture/corpus-learning/README.md
- 核查协议： ../../academic/fact-verification-protocol.md
- 阈值策略： ../../academic/golden-set-threshold-policy.md
- 场景数据： ../scenarios/v1-mock-simulation-dataset.md
- 原型规范： ../prototype/v1-prototype-spec.md
