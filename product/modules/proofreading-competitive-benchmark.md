---
layout: default
title: 校对能力对标 Benchmark
parent: LibreOffice/Word 插件端
grand_parent: Product 产品
nav_order: 202
---

## 术语说明 | Terminology Note

本页中 Benchmark 的语义为 competitive validation（竞争力验证），而不是替代性宣称。

- 对外定位：必要补充 + 本地增强
- 边界约束：complement, not replace

术语规范来源： [../../developer/coding/docs-terminology-note-template.md](../../developer/coding/docs-terminology-note-template.md)

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

本页首先是产品设定页，其次才是竞争力验证参考页。

它回答四个产品问题：

- 我们对外到底承诺什么，不承诺什么
- 校对功能在产品中的角色是什么（补充、增强、联动）
- 什么叫"基础不弱、体验更强"
- 哪些条件下可进入推广，哪些条件下必须收敛

## 对外产品设定 | External Product Positioning

NarrativeOS 的校对补齐能力对外定位为三件事：

- 必要补充：补齐文本诊断链路中第三方工具无法覆盖的上下文与证据回链空白。
- 本地增强：在本地语料、术语库、项目规范约束下，提升建议可用性与复核效率。
- 联动入口：把校对建议纳入 Workspace 的 结论 -> 证据 -> 原文 主链路，而不是做孤立纠错框。

## 替代边界声明 | Replacement Boundary

本模块明确不做以下承诺：

- 不承诺"全面替代"第三方通用校对产品。
- 不承诺在所有语种、所有体裁、所有行业一次性达到最优。
- 不将单轮 benchmark 结果包装为市场统治性结论。

推荐对外表达：

- NarrativeOS proofreading works as an evidence-linked local enhancement layer.
- It is designed to complement, not replace, third-party proofreading products.

## 混合使用策略 | Hybrid Strategy

面向真实团队的推荐工作方式：

- 第一道：第三方校对工具完成通用纠错与风格初筛。
- 第二道：NarrativeOS 在项目上下文中完成证据回链、术语一致性与风险提示。
- 第三道：编辑/审校基于证据链完成最终决策与留痕。

该策略目标不是"替代谁"，而是把复核链路从黑箱建议升级为可追溯决策。

## 模块目标 | Module Goals

Competitive Benchmark 在本页中的目标是支撑产品设定，而不是主导产品叙事。

核心目标：

- 证明校对补齐能力可稳定承担"必要补充 + 本地增强"角色
- 证明证据链联动可持续降低复核成本
- 为对外沟通提供克制、可验证、可复核的表达边界

## 模块范围 | Module Scope

- 对外口径范围：产品角色、边界、典型使用策略、声明约束
- 对内验证范围：基于授权或模拟数据的竞争力测量
- 能力覆盖范围：P0/P1/P2 分层能力 + 证据链复核链路
- 不引入用户系统语义；身份上下文仅通过 external_identity_context 传递

## 域模块判定映射 | Domain Decision Map

本页判断的是"域融合后的校对补齐能力是否成立"，不是独立校对系统是否高分。

- Text Lab：基础发现能力是否达到不弱于竞品的底线。
- Narrative Atlas：问题定位与证据回看是否支持低成本复核。
- Insight Engine：建议解释可用率是否持续领先。
- Knowledge Graph（Library）：术语与知识纠错沉淀是否稳定可复用。
- Corpus Observatory：跨轮次误报/漏报趋势是否可控。

判定约束：

- 任一域出现关键 no-go，整体结论不得标记为 go。
- 不允许用单指标高分掩盖某一域失败样本。
- 不允许把"局部领先"外推为"全面替代"。

## 非目标 | Non-goals

- 不把 benchmark 结果直接写成市场已验证结论
- 不用单轮结果替代长期产品判断
- 不以单个高分指标掩盖解释性、复核成本或失败样本问题
- 不把 NarrativeOS 校对补齐叙述为第三方工具替代品

## 用户价值 | User Value

对产品团队，本页的价值是：

- 统一对外叙事，避免过度承诺
- 防止仅凭内部感觉推进校对能力宣传
- 把体验指标与能力指标放在同一判断框架

## 竞争力验证（支持性章节） | Competitive Validation (Supporting)

以下内容用于支撑对外设定，不替代产品主叙事。

### 对打对象分层

- Baseline-A: 通用校对工具
- Baseline-B: 专业写作校对工具
- Baseline-C: 领域专用公文校对工具

说明：对打报告中可使用匿名代号，避免品牌偏置。

### 评测范围 | Evaluation Scope

- 通用基线：DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001
- 补齐专项：DS-V1-PRF-P0-001、DS-V1-PRF-P1-001、DS-V1-PRF-P2-001
- 稳定性样本：DS-V1-DEGRADE-001、DS-V1-EVIDENCE-FAIL-001、DS-V1-EXPORT-001

### 关键指标 | Key Metrics

能力指标：

- proofreading_recall
- proofreading_false_positive_ratio
- term_consistency_alignment_rate
- registry_new_term_precision
- knowledge_density_kd

体验指标：

- explanation_usable_rate
- review_cycle_time_sec

### 产品判定原则 | Product Decision Rules

- 基础不弱：前四项指标不低于最佳竞品 - 1%。
- 知识有效性：knowledge_density_kd 达到对应档位阈值，且不与 hallucination_ratio 改善方向冲突。
- 体验超越：explanation_usable_rate 与 review_cycle_time_sec 同时优于竞品中位数。

### 阶段闸门 | Stage Gates

- 连续两轮 P0/P1/P2 全部 pass，可进入下一阶段推广。
- 任一轮出现 proofreading_false_positive_ratio 超阈值，立即 no-go 并回滚到 shadow_only。
- 若 explanation_usable_rate 连续两轮低于 0.90，进入交互与证据链专项整改。

## 使用方式 | How To Use

本页用于产品设定对齐与阶段判断，不替代执行作业单。

```text
先对齐对外承诺边界
  -> 再执行支持性竞争力验证
  -> 形成 go/no-go 判断
  -> 决定扩展、收敛或回退
```

执行细节见 workflow 作业单。

## 路线图挂钩 | Roadmap Alignment

为避免该页在模块层"单独出现"造成突兀，本页在产品体系中的位置是：

- 它不是独立产品线 roadmap。
- 它是路线图中"校对补齐里程碑"对应的判定契约页。

对应关系：

- 路线图阶段入口： [../roadmap/README.md](../roadmap/README.md)
- 角色与边界定义： [proofreading-capability-gap-closure-plan.md](../../developer/coding/proofreading-capability-gap-closure-plan.md)
- 执行与复核： [../workflows/proofreading-competitive-benchmark-runbook.md](../workflows/proofreading-competitive-benchmark-runbook.md)

## 结果表达约束 | Reporting Constraints

- 单轮结果只能说明当前轮次表现，不能外推为市场结论。
- 若 fail/no-go 存在，必须与 pass 结果同时展示。
- 若解释性和复核效率不占优，不得以基础指标达标单独宣称超越。
- 对外文本必须显式包含"complement, not replace"边界语句。

## 结果结构（内部） | Internal Result Shape

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

## 对外文案建议 | External Copy Recommendations

- 推荐表达：NarrativeOS 提供 evidence-linked proofreading enhancement for domain workflows.
- 推荐表达：It complements third-party proofreading with local context, traceability, and review efficiency.
- 禁用表达：fully replace all proofreading products。

## 关联文档 | Related Docs

- 能力定位：proofreading-capability-gap-closure-plan.md
- 执行作业单：../workflows/proofreading-competitive-benchmark-runbook.md
- 场景数据：../../developer/operations/v1-mock-simulation-dataset.md
- 原型规范：../../developer/coding/v1-prototype-spec.md
- 阈值策略：../../academic/golden-set-threshold-policy.md
- 竞品背景：../../whitepaper/competitor-matrix.md
- 市场接受度：../../whitepaper/market-acceptance.md
- 白皮书结果模板：../../whitepaper/proofreading-competitive-results-template.md