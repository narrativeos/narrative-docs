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

## 目标与边界

目标：

- 补齐基础校对、知识校验、一致性校验、风险识别、公文专项能力。
- 建立自学习闭环，支持规则与名词库持续增长。
- 保持“可解释、可追溯、可回滚”的工程治理红线。

边界：

- 不依赖一次性构建超大词库。
- 不以黑箱模型输出替代证据链。

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

## 自学习架构

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

## 输出契约（产品层）

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

## 对打评测框架

评测维度：

- 基础纠错召回率
- 误报率
- 知识核查命中率
- 解释可用率
- 编辑决策耗时

判定规则：

- “超越”必须同时满足：基础不弱、解释更强、复核更快。

## 关联文档

- ../../architecture/analysis-engine/README.md
- ../../architecture/corpus-learning/README.md
- ../../academic/fact-verification-protocol.md
- ../../academic/golden-set-threshold-policy.md
- ../scenarios/v1-mock-simulation-dataset.md
- ../prototype/v1-prototype-spec.md
