# Fact Verification Protocol

本页定义事实发现与事实核查的统一协议，作为 Method Kernel 与 Scenario Composer 之间的可复核契约。

## 目标

- 将事实核查从“提示性动作”升级为“门禁前置动作”
- 保持跨域一致：research 与 detective 共用同一核查状态机
- 输出可直接进入 Golden Set 回归与发布台账

## Discover -> Retrieve -> Verify -> Aggregate

### Step 1: Discover（事实候选发现）

输入对象最小字段：

```yaml
fact_candidate_id: <id>
claim_id: <claim-id>
claim_text: <text>
boundary: <scope>
uncertainty: low | medium | high
```

要求：

- 非陈述性片段（修辞、反问、纯情绪表述）不进入候选集
- boundary 缺失时不得进入 Verify

### Step 2: Retrieve（证据检索）

要求：

- 至少返回 1 条 primary_source
- 若 primary_source 不足，必须标注 retrieval_gap
- 证据必须可回链到 source_spans

### Step 3: Verify（事实核查）

核查状态枚举：

- verified：证据支持且边界一致
- refuted：存在明确反证
- controversial：支持与反证并存且未收敛
- unverifiable：证据不足或不可判定

最小输出：

```yaml
fact_candidate_id: <id>
verification_status: verified | refuted | controversial | unverifiable
grounding_source: <source-id-or-type>
rationale_spans:
  - <span-ref>
```

### Step 4: Aggregate（聚合与门禁）

建议指标：

- verifiability_rate = (verified + refuted) / total_candidates
- hallucination_ratio = refuted / total_candidates

门禁约束：

- 出现 refuted 条目时，强度必须触发降级或阻塞发布
- unresolved controversial 条目超过阈值时，gate_decision 不得为 pass

## 证据源等级

- L1: primary_source（原始文献、原始档案、直接证据）
- L2: secondary_source（综述、评论、二手整理）
- L3: auxiliary_source（背景资料、索引信息）

约束：

- 结论强度提升必须至少包含 L1 证据
- 仅 L2/L3 证据时，不得输出 strong

## 失败分类补充

本协议补充以下失败类型，建议并入 Failure Taxonomy：

- fact_refuted：候选事实被证据直接反驳
- hallucination_detected：核查结果与系统陈述冲突
- retrieval_gap：候选事实无足够检索证据

## 标准处置动作建议

- fact_refuted -> rebound_to_discovery
- hallucination_detected -> update_grounding_baseline
- retrieval_gap -> resolve_counterevidence
- 任一修复后 -> rerun_golden_set

## 从事实核查扩展到知识纠错

本协议可直接复用于“知识性校对与名词入库”场景。

### 平台域责任映射（并入当前基线六域）

本扩展按平台当前基线六域承接，不作为独立校对域：

- Text Lab：承接事实候选发现与基础一致性预检。
- Insight Engine：承接核查解释、建议生成与风险判定。
- Narrative Atlas：承接证据锚点回看与定位联动。
- Knowledge Graph（Library）：承接词条入库、别名合并与证据资产沉淀。
- Corpus Observatory：承接跨批次误报/漏报与核查稳定性趋势。

约束：

- correction_status=accepted 必须具备可追溯 evidence，并能映射到对应域责任。
- 任一关键域出现 no-go 信号时，不得给出 pass 型聚合结论。

### 扩展对象

- 专有名词一致性（人名、机构名、法规名、术语）
- 事实表述一致性（引用、时间、版本、来源）

### 扩展输出字段

```yaml
correction_candidate_id: <id>
candidate_type: term | citation | factual_statement
correction_status: accepted | rejected | pending_review
registry_action: add_term | merge_alias | deprecate_term | no_action
registry_evidence:
  - source_span: <span-ref>
  - source_level: L1 | L2 | L3
```

### 门禁约束（知识纠错）

- 无 L1 或可追溯来源时，correction_status 不得为 accepted。
- registry_action=add_term 时，必须附最小来源回链。
- 出现 rejected 且被误用的条目，必须触发 rerun_golden_set。
- 涉及跨域协作的 correction candidate，必须记录 primary_domain 与协作域。

## 关联

- [Trust and Methodology](trust-methodology.md)
- [Research Workflows](research-workflows.md)
- [Golden Set Field Dictionary](golden-set-field-dictionary.md)
- [Golden Set Threshold Policy](golden-set-threshold-policy.md)
- [Golden Set Action Playbook](golden-set-action-playbook.md)
- [Product Platform Domains](../product/modules/platform-domains.md)
