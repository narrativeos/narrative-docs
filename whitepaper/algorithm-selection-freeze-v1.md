# Algorithm Selection Freeze V1

## 摘要（中文）

本页将 NarrativeOS 首期关键算法从“候选集合”推进到“默认实现 + 备选实现 + 切换条件 + 验收门槛”的可执行冻结状态。

## Executive Summary (EN)

This document freezes the V1 algorithm selections into executable defaults, fallbacks, switch triggers, and acceptance gates.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algorithm-selection-freeze-v1
path: whitepaper/algorithm-selection-freeze-v1.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, developer, reviewer, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: frozen-v1
owner: architect
reviewer: maintainer
task_ref: ALGO-TASK-001
```

## 使用边界

- 本页用于 V1 算法选型落地，不替代实现代码与性能实测记录。
- 如与 runbook、measurement sheet 冲突，以本页冻结值为准并触发复审。
- 任何选型变更都必须走“变更门禁”流程（见文末）。

## 关键算法冻结总表

| ALG ID | 算法能力 | 默认实现（V1） | 备选实现 | 切换触发条件 | V1 验收门槛 |
| --- | --- | --- | --- | --- | --- |
| ALG-001 | Fact Verification Retrieve | Hybrid Retrieve（BM25 + Dense HNSW） | BM25-only | memory pressure、向量索引不可用、冷启动阶段 | 召回质量不低于当前 baseline，且 gate 决策稳定 |
| ALG-002 | Fact Verification Rerank/Verify | MiniLM 量级 Cross-Encoder + NLI 验证 | 仅 NLI 验证（跳过 rerank） | rerank 阶段超时或批次拥堵 | 关键 claim 的判定方向稳定，不出现系统性反转 |
| ALG-003 | Golden Set Regression Gate | O(n) 指标聚合 + tier 阈值门禁 | strict-only 直判 | 发布前、争议样本回归、连续异常 | gate 判定可复跑且与阈值策略一致 |
| ALG-004 | Strength Degradation Logic | 规则状态机（always-on） | 无（仅允许参数收敛） | 不允许关闭；仅允许调参 | 每条降级都可追溯 reason 与 action |
| ALG-005 | Analysis Engine Fast Scan | 词法/句法/风格轻量链路（CPU 优先） | 降采样 Fast Scan | 单文长文本、并发上升、CPU 抢占高 | 单文首轮诊断维持分钟内体验窗口 |
| ALG-006 | Analysis Engine Full MRI | 当前基线六引擎全开 + 语义聚类 + 图构建（离线单并发） | 分段 MRI 后聚合 | 内存高压、运行超时、批处理排队 | 预发布场景可稳定完成，结果可解释 |
| ALG-007 | Narrative Segmentation | TextTiling + 边界规则融合 | 规则边界优先（禁用主题模型） | 分段一致性异常或样本域迁移 | 边界冲突可复核，迁移方向可解释 |

## 每个算法的落地方案

### ALG-001 Fact Verification Retrieve

默认实现：

- BM25（词项召回）与 Dense HNSW（语义召回）并行。
- 合并策略使用去重 + 分数归一。

冻结参数（默认）：

```yaml
retrieval_top_k: 50
dense_index: hnsw
hybrid_merge: weighted_union
```

降级策略：

- 向量索引不可用时自动降级为 BM25-only。
- 降级必须记录 `degrade_reason` 与 `impact_scope`。

### ALG-002 Fact Verification Rerank and Verify

默认实现：

- rerank 使用 MiniLM 量级 Cross-Encoder。
- verify 使用 NLI 判定（support/refute/insufficient）。

冻结参数（默认）：

```yaml
rerank_top_k: 20
verify_batch_size: 8
timeout_policy: bounded
```

降级策略：

- rerank 超时时，保留 NLI 验证链路并缩减候选规模。
- 降级后必须触发一次回归 gate。

### ALG-003 Golden Set Regression Gate

默认实现：

- 指标聚合按 O(n) 路径执行。
- tier 默认 `standard`，发布前切 `strict`。

冻结参数（默认）：

```yaml
threshold_tier_default: standard
threshold_tier_release: strict
lenient_consecutive_limit: 2
```

降级策略：

- 不允许跳过 gate。
- 若数据不完整，直接判定为 fail 并阻断发布。

### ALG-004 Strength Degradation Logic

默认实现：

- 规则状态机常开，覆盖证据冲突、支持不足、偏差判定。

冻结规则：

- 不允许关闭。
- 只允许调整阈值，不允许删除降级动作枚举。

必须留痕字段：

```yaml
degrade_reason: required
required_actions: required
fact_gate_decision: required
fact_check_ref: required
```

### ALG-005 Analysis Engine Fast Scan

默认实现：

- 词法、句法、风格三类轻量分析先行。
- 作为 Full MRI 的前置风险筛查入口。

冻结参数（默认）：

```yaml
mode: fast_scan_first
full_mri_trigger:
  - high_risk_diagnostics
  - unresolved_counterevidence
  - pre_release_review
```

降级策略：

- CPU 抢占或长文本场景下启用降采样 Fast Scan。

### ALG-006 Analysis Engine Full MRI

默认实现：

- 当前基线六引擎全开，包含语义聚类和关系图构建。
- 仅用于离线、预发布或争议样本复核。

冻结参数（默认）：

```yaml
full_mri_concurrency: 1
long_text_policy:
  segmentation_first: true
  chunk_then_aggregate: true
```

降级策略：

- 内存压力上升时，分段 MRI 后聚合，不允许直接跳过结论解释链。

### ALG-007 Narrative Segmentation

默认实现：

- TextTiling 作为主分段器，边界规则做后处理。

冻结参数（默认）：

```yaml
segmentation_baseline: texttiling
boundary_review_required: true
```

降级策略：

- 样本域突变时，退回规则边界优先并触发人工复核。

## 跨仓落实映射（V1）

| 仓库 | 必须落实内容 | 对应算法 |
| --- | --- | --- |
| narrative-core | 检索、重排、门禁、降级、分段策略实现与参数装配 | ALG-001..007 |
| narrative-api | 参数暴露、run freeze header、结果可追溯字段输出 | ALG-001..007 |
| narrative-studio | Fast Scan/MRI 触发路径、降级提示、证据回链展示 | ALG-005..007 + gate related |
| narrative-docs | 选型冻结、runbook、指标门禁与证据台账同步 | ALG-001..007 |

## 验收门禁（Go/No-go）

满足以下条件才可声明“选型已落实”：

1. 每个 ALG 都有默认实现与备选实现。
2. 每个 ALG 都有明确切换触发条件与降级留痕字段。
3. `ALGO-TASK-001` 至少达到 M2（measured）并更新 evidence registry。
4. 发布评审时 `threshold_tier_release=strict` 且 gate 通过。

## 变更门禁

任何算法选型变更必须同时满足：

1. 更新本页与 runbook。
2. 更新 measurement sheet 的版本冻结头。
3. 触发至少一轮回归复跑并记录 delta。
4. 更新 evidence registry 对应条目。
5. 由 maintainer 与 architect 双签字。

## 关联文档

- [algorithm-evaluation-report.md](algorithm-evaluation-report.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [algo-task-001-runbook.md](algo-task-001-runbook.md)
- [algo-task-001-measurement-sheet.md](algo-task-001-measurement-sheet.md)
- [error-taxonomy-and-fix-plan.md](error-taxonomy-and-fix-plan.md)
- [../academic/fact-verification-protocol.md](../academic/fact-verification-protocol.md)
- [../academic/golden-set-threshold-policy.md](../academic/golden-set-threshold-policy.md)
- [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)
