# Proofreading Competitive Benchmark

## 摘要（中文）

本页定义校对补齐能力的同题对打评测规范，用于验证 NarrativeOS 在基础校对不弱于竞品的前提下，实现解释可用率与复核效率优势。

## Executive Summary (EN)

This document defines the head-to-head benchmark protocol for proofreading capability closure.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-proofreading-competitive-benchmark
path: product/modules/proofreading-competitive-benchmark.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, architect, developer, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页不是单纯的测试协议页，而是产品侧用于统一“校对能力何时算形成竞争力”的判断页。

它回答三个产品问题：

- 校对能力应该和谁比较，而不是只看内部自评
- 什么叫“基础不弱、体验更强”
- 什么条件下可以继续扩展，什么条件下必须停止宣传或回退

## 模块目标 | Module Goals

Competitive Benchmark 的目标是把“能力补齐”转成“产品竞争力判断”，避免校对能力只停留在实验室指标。

核心目标：

- 验证“基础校对能力不弱于竞品”
- 验证“可解释性与复核效率优于竞品”
- 让产品团队对 go/no-go 判断采用统一口径

## 模块范围 | Module Scope

- 仅使用模拟或授权数据集
- 不引入用户系统语义；身份上下文仅通过 external_identity_context 传递
- 覆盖 P0/P1/P2 分层能力，而不是只比较单一纠错率
- 判定对象覆盖域融合后的完整链路，而非单一校对子流程

## 域模块判定映射 | Domain Decision Map

本页判断的是“域融合后的校对能力是否形成竞争力”，不是独立校对系统是否高分。

- Text Lab：基础发现能力是否达到不弱于竞品的底线。
- Narrative Atlas：问题定位与证据回看是否支持低成本复核。
- Insight Engine：建议解释可用率是否持续领先。
- Knowledge Graph（Library）：术语与知识纠错沉淀是否稳定可复用。
- Corpus Observatory：跨轮次误报/漏报趋势是否可控。

判定约束：

- 任一域出现关键 no-go，整体结论不得标记为 go。
- 不允许用单指标高分掩盖某一域的失败样本。

## 非目标 | Non-goals

- 不把 benchmark 结果直接写成市场已验证结论
- 不用单轮结果替代长期产品判断
- 不以单个高分指标掩盖解释性、复核成本或失败样本问题

## 用户价值 | User Value

对产品团队，本页的价值是：

- 统一“什么时候可以说具备竞争力”的判断口径
- 防止仅凭内部感觉推进校对能力宣传
- 把产品体验指标与能力指标放在同一张判断表上

## 对打对象分层

- Baseline-A: 通用校对工具
- Baseline-B: 专业写作校对工具
- Baseline-C: 领域专用公文校对工具

说明：对打报告中可使用匿名代号，避免品牌偏置。

## 评测范围 | Evaluation Scope

- 通用基线：DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001
- 补齐专项：DS-V1-PRF-P0-001、DS-V1-PRF-P1-001、DS-V1-PRF-P2-001
- 稳定性样本：DS-V1-DEGRADE-001、DS-V1-EVIDENCE-FAIL-001、DS-V1-EXPORT-001

## 关键指标 | Key Metrics

能力指标：

- proofreading_recall
- proofreading_false_positive_ratio
- term_consistency_alignment_rate
- registry_new_term_precision
- knowledge_density_kd

体验指标：

- explanation_usable_rate
- review_cycle_time_sec

## 产品判定原则 | Product Decision Rules

- 基础不弱：前四项指标不低于最佳竞品 - 1%。
- 知识有效性：knowledge_density_kd 达到对应档位阈值，且不与 hallucination_ratio 改善方向冲突。
- 体验超越：explanation_usable_rate 与 review_cycle_time_sec 同时优于竞品中位数。

## 使用方式 | How To Use

本页用于产品评审与阶段判断，不直接替代执行作业单。

```text
确定对打对象
  -> 选择分层数据集
  -> 执行评测与记录差异
  -> 形成 go/no-go 判断
  -> 决定继续扩展或回退
```

执行细节见 workflow 作业单。

## 结果表达约束 | Reporting Constraints

- 单轮结果只能说明“当前轮次表现”，不能直接外推为市场结论
- 若 fail/no-go 存在，必须与 pass 结果同时展示
- 若解释性和复核效率不占优，不得以“基础指标达标”单独宣称超越

## 阶段闸门 | Stage Gates

- 连续两轮 P0/P1/P2 全部 pass，可进入下一阶段推广。
- 任一轮出现 proofreading_false_positive_ratio 超阈值，立即 no-go 并回滚到 shadow_only。
- 若 explanation_usable_rate 连续两轮低于 0.90，进入交互与证据链专项整改。

## 结果结构 | Result Shape

```yaml
benchmark_record:
  run_id: bm-2026-001
  dataset_id: DS-V1-PRF-P1-001
  baseline_id: Baseline-B
  metrics:
    proofreading_recall:
      narrativeos: 0.91
      baseline: 0.90
      delta: +0.01
    proofreading_false_positive_ratio:
      narrativeos: 0.09
      baseline: 0.08
      delta: -0.01
    term_consistency_alignment_rate:
      narrativeos: 0.94
      baseline: 0.89
      delta: +0.05
    registry_new_term_precision:
      narrativeos: 0.93
      baseline: 0.85
      delta: +0.08
    knowledge_density_kd:
      narrativeos: 0.047
      baseline: 0.041
      delta: +0.006
    explanation_usable_rate:
      narrativeos: 0.96
      baseline: 0.71
      delta: +0.25
    review_cycle_time_sec:
      narrativeos: 78
      baseline: 123
      delta: -45
  decision:
    gate_result: pass | fail
    reason: <short rationale>
```

  ## 关联文档 | Related Docs

  - 能力定位： proofreading-capability-gap-closure-plan.md
  - 执行作业单： ../workflows/proofreading-competitive-benchmark-runbook.md
  - 场景数据： ../scenarios/v1-mock-simulation-dataset.md
  - 原型规范： ../prototype/v1-prototype-spec.md
  - 阈值策略： ../../academic/golden-set-threshold-policy.md
  - 竞品背景： ../../whitepaper/competitor-matrix.md
  - 市场接受度： ../../whitepaper/market-acceptance.md
  - 白皮书结果模板： ../../whitepaper/proofreading-competitive-results-template.md
