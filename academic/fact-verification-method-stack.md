# Fact Verification Method Stack

本页给出事实发现与核查的落地方法栈，目标是在现有 Kernel First 架构下实现“可解释、可复核、可扩展”的执行路径。

## 设计原则

- 先检索后判定：避免直接由生成模型给出不可追溯结论
- 先证据后强度：没有可回链证据时不得提升结论强度
- 先门禁后发布：fact_gate_decision 不通过不得进入发布

## 研究基线（推荐最小集合）

- FEVER（NAACL 2018）：claim-evidence-verdict 标准任务范式
- SciFact（EMNLP 2020）：科学文献领域的支持/反驳与 rationale 对齐范式
- ColBERTv2（NAACL 2022）：高精度晚交互检索并显著压缩索引体积
- CITADEL（2022）：多向量检索加速路线，兼顾精度与吞吐

## 参考流水线

```text
Discover -> Retrieve -> Rerank -> Verify -> Aggregate -> Gate
```

### Discover

- 目标：抽取可核查的事实候选（fact_candidate）
- 最小输出：fact_candidate_id, claim_id, boundary, uncertainty

### Retrieve

- 目标：召回 primary_source 与 secondary_source
- 推荐策略：BM25 + dense/hybrid 召回

### Rerank

- 目标：提升 top-k 证据相关性并减少误召回
- 推荐策略：Cross-Encoder 重排（速度/精度按档位选择）

### Verify

- 目标：输出 verification_status 与 rationale_spans
- 推荐策略：NLI 判定（support/refute/neutral）+ 边界校验

### Aggregate

- 聚合指标：verifiability_rate, hallucination_ratio
- 输出：fact_gate_decision 与 required_actions

## 算法与组件选型矩阵

| 层 | 基线实现（优先稳定） | 增强实现（优先精度） |
| --- | --- | --- |
| Retrieve | BM25 + 向量检索（HNSW） | ColBERTv2 / CITADEL |
| Rerank | MiniLM Cross-Encoder | 更大参数 Cross-Encoder |
| Verify | 轻量 NLI 分类器 | 领域适配 NLI（科学/叙事分 profile） |
| Orchestration | 组件化 Pipeline | 组件化 Pipeline + 动态路由 |

## 档位建议

### 标准档（standard）

- 适用：日常回归与协作
- 配置：BM25 + dense + MiniLM rerank + NLI verify

### 严格档（strict）

- 适用：对外发布前、规则变更后
- 配置：hybrid + 高精度 rerank + 领域适配 NLI

## 与 Golden Set 的衔接

- 结果记录： [Template: Golden Set Fact Check Ledger](templates-golden-set-fact-check-ledger.md)
- 变更审查： [Template: Golden Set Change Review](templates-golden-set-change-review.md)
- 发布聚合： [Template: Golden Set Release Ledger](templates-golden-set-release-ledger.md)

门禁约束：

- fact_gate_decision = fail -> blocked_release = true
- release ledger 任一条目 fact_gate_decision = fail -> release_go_no_go = no-go

## 风险与控制

- 误报风险：修辞性句子误入事实候选
  - 控制：Discover 前置边界过滤与不确定性标注
- 证据污染：核查源与被检文本同源错误
  - 控制：grounding_source 分级与最小源多样性要求
- 跨域偏差：科学阈值直接套用到叙事场景
  - 控制：profile 分档阈值与独立回归样例

## 关联

- [Fact Verification Protocol](fact-verification-protocol.md)
- [Golden Set Field Dictionary](golden-set-field-dictionary.md)
- [Golden Set Threshold Policy](golden-set-threshold-policy.md)
- [Golden Set Action Playbook](golden-set-action-playbook.md)
