# Golden Set Threshold Policy

本页定义 Golden Set 回归门禁的阈值治理策略，目标是在不同阶段平衡稳定性与迭代速度。

## 阈值档位

采用三档策略：

- lenient（宽松）：用于早期探索与模板试运行
- standard（标准）：用于常规发布与团队协作基线
- strict（严格）：用于对外发布前或高风险变更

## 指标阈值建议

### traceability_pass_rate

- lenient: >= 0.90
- standard: >= 0.95
- strict: >= 0.98

### strength_shift_explained_rate

- lenient: >= 0.95
- standard: >= 0.98
- strict: = 1.00

### unresolved_counterevidence_ratio

- lenient: <= 0.08
- standard: <= 0.05
- strict: <= 0.02

### unsupported_causality_count（research）

- lenient: <= 1
- standard: = 0
- strict: = 0

### narrative_bias_misjudge_count（detective）

- lenient: <= 1
- standard: = 0
- strict: = 0

### verifiability_rate

- lenient: >= 0.85
- standard: >= 0.92
- strict: >= 0.97

### hallucination_ratio

- lenient: <= 0.05
- standard: <= 0.02
- strict: = 0

### proofreading_recall

- lenient: >= 0.80
- standard: >= 0.88
- strict: >= 0.93

### proofreading_false_positive_ratio

- lenient: <= 0.15
- standard: <= 0.10
- strict: <= 0.06

### term_consistency_alignment_rate

- lenient: >= 0.85
- standard: >= 0.92
- strict: >= 0.97

### registry_new_term_precision

- lenient: >= 0.85
- standard: >= 0.92
- strict: >= 0.97

## 校对相关阈值的域责任映射（并入当前基线六域）

校对相关阈值按平台域协同解释，不按独立校对子系统解释：

- proofreading_recall / proofreading_false_positive_ratio：Text Lab 主责，Insight Engine 协作。
- term_consistency_alignment_rate：Insight Engine 主责，Knowledge Graph 协作。
- registry_new_term_precision：Knowledge Graph（Library）主责，Insight Engine 协作。

执行建议：

- 回归记录中建议补充 `primary_domain` 与 `collab_domains` 字段。
- 若主责域阈值未达标，即使协作域指标达标，gate_decision 仍应为 fail 或 shadow_only。
- 若跨域指标互相冲突，优先采用“高误报保护”原则（先降级，再扩展）。

## 阈值选择规则

优先使用 standard。以下场景必须切换 strict：

1. 对外发布前
2. Kernel 规则变更
3. 新增或重写关键降级触发逻辑
4. 前一轮出现 gate_decision = fail

以下场景可临时使用 lenient：

1. 首次引入新 profile
2. Golden Set 样例仍在建设期

限制：连续两轮 lenient 后必须回到 standard。

补充：若 proofreading_false_positive_ratio 在任一档位超阈值，自动降级到 shadow_only 并触发规则回滚评审。

## 治理与审计

- 每次回归必须记录 threshold_tier 与选择理由
- 变更 threshold_tier 需由 Kernel Owner 审核
- 若使用 lenient 且结果为 pass，发布说明中必须显式标注

## 回归记录建议字段

```yaml
threshold_tier: lenient | standard | strict
tier_rationale: <reason>
approved_by: <kernel-owner>
approved_at: <yyyy-mm-dd>
primary_domain: Text Lab | Narrative Atlas | Insight Engine | Knowledge Graph | Corpus Observatory
collab_domains: [<domain-name>]
```

## 关联

- [Golden Set Field Dictionary](golden-set-field-dictionary.md)
- [Template: Golden Set Research Profile](templates-golden-set-research-profile.md)
- [Template: Golden Set Detective Profile](templates-golden-set-detective-profile.md)
