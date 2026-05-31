# Trust and Methodology

本页定义 NarrativeOS 在学术场景中的方法透明规则。

## Kernel First 方法约束

本分区采用 Kernel First：先定义稳定、可泛化的底层方法内核，再通过上层配置适配领域场景。

- Method Kernel（不可变核心）：原语、质量维度、强度分级、降级与失败分类
- Scenario Composer（可变配置）：方法组合、数据聚合、术语映射、报告模板

红线：领域术语和业务偏好不得下沉到 Method Kernel。

## Method Kernel 不可变核心

以下原语是跨域不可变核心，用于科学文献与叙事文本的统一论证分析：

- claim
- evidence
- warrant
- counterclaim
- alternative
- uncertainty
- boundary

## Kernel 输入输出契约（建议基线）

输入示例：

```yaml
study_id: study-001
document_id: doc-001
claims:
  - id: c-1
    text: <claim-text>
evidence_items:
  - id: e-1
    source_spans: ["sentence:12"]
    support_to: ["c-1"]
context:
  profile: research | detective
  aggregation_policy: conservative | balanced | aggressive
```

输出示例：

```json
{
  "claim": "<claim-text>",
  "evidence": ["e-1"],
  "source_spans": ["sentence:12"],
  "confidence": 0.81,
  "strength": "moderate",
  "degrade_reasons": [],
  "action": "collect_more_counterevidence"
}
```

## 质量维度与强度分级

Method Kernel 的统一质量维度：

- testability
- sufficiency
- validity
- falsifiability
- robustness
- auditability

结论强度分级：

- strong
- moderate
- weak
- exploratory

## 降级触发规则（必须执行）

出现任一情况时，结论强度必须自动降级至少一级：

- missing_evidence
- unresolved_conflict
- broken_warrant
- missing_boundary
- overgeneralization

## Failure Taxonomy（最小集合）

- missing_pointer：证据定位缺失
- weak_support：证据定位存在但语义支撑不足
- unresolved_counterevidence：冲突证据未处理
- unsupported_causality：将相关性表述为因果
- scope_mismatch：结论超出声明边界
- fact_refuted：候选事实被证据直接反驳
- hallucination_detected：核查结果与系统陈述冲突
- retrieval_gap：候选事实无足够检索证据

## 事实发现与核查（Kernel 扩展）

事实发现与核查属于 Method Kernel 的 validity 与 auditability 维度约束，建议最小字段：

- fact_candidate_id
- verification_status
- grounding_source

核查状态：verified | refuted | controversial | unverifiable。

降级约束：

- 出现 refuted 时，结论强度必须至少降级一级
- hallucination_detected 不得进入 pass 发布路径
- retrieval_gap 未闭环时，gate_decision 不得为 pass

协议参考： [Fact Verification Protocol](fact-verification-protocol.md)

## 稳定性验证矩阵（Kernel）

Method Kernel 的发布优先级以稳定性为先，至少覆盖以下五类验证：

1. 输入扰动稳定性：轻微文本扰动不应导致无理由强度跳变
2. 参数漂移稳定性：profile 参数微调不应破坏结论链完整性
3. 样本规模稳定性：样本扩增后主结论方向保持一致
4. 跨语料一致性：同类任务在不同语料上的评分逻辑保持一致
5. 冲突证据压力：存在反证时必须触发降级或补证动作

建议记录字段：

- test_case_id
- baseline_version
- profile
- perturbation_type
- expected_behavior
- observed_behavior
- pass_or_fail
- reviewer

## Golden Set Regression Gate

每次 profile 变更或规则变更后，必须运行 Golden Set 回归：

- 必含科学文献样例（research profile）
- 必含叙事样例（detective profile）

最低通过条件：

1. claim-evidence-warrant 链完整率不下降
2. unresolved_counterevidence 比例不上升到阈值外
3. strength 跳变均有 degrade_reasons 解释
4. source_spans 回链有效率保持在门槛以上

## 与现有架构的对齐

- 与 [architecture/system/README.md](../architecture/system/README.md) 对齐：Kernel 归属分析引擎层契约内核
- 与 [architecture/insight-engine/README.md](../architecture/insight-engine/README.md) 对齐：输出保持“结论 -> 证据 -> 原文”链路
- 与 [architecture/runtime/README.md](../architecture/runtime/README.md) 对齐：仅定义契约，不引入跨 runtime 直连依赖叙述

## 声明分级

研究结论必须先归类再发布，分级与 [whitepaper/research-methodology-and-reproducibility.md](../whitepaper/research-methodology-and-reproducibility.md) 保持一致：

- Design-ready：路径已定义，未形成稳定实验结果
- Study-ready：任务、样本、协议、复现包模板齐备
- Evidence-ready：样本、版本、指标、证据链接齐备且可复核

约束：只有 Evidence-ready 才可用于更强外部宣称。

## 指标说明卡模板

每个核心指标应至少包含以下字段：

- 指标名称
- 指标定义
- 计算或判断逻辑
- 适用场景
- 不适用场景
- 常见误读
- 最小验证步骤

## 示例模板

```yaml
metric_name: <name>
definition: <what-it-means>
logic: <how-it-is-derived>
use_when: <contexts>
do_not_use_when: <contexts>
common_misreadings:
  - <risk-1>
  - <risk-2>
minimum_validation:
  - <step-1>
  - <step-2>
```

## NarrativeOS 首批核心指标卡（示例）

### 指标卡 1: evidence_traceability_rate

- 指标定义：结论中具备有效证据定位的条目占比
- 计算逻辑：有效条目数 / 结论总条目数
- 适用场景：解释性输出复核、报告质量审查
- 不适用场景：纯统计任务且无结论性叙述输出
- 常见误读：只验证“指针存在”而不验证“语义支持强度”
- 最小验证步骤：
1. 固定 diagnostics 输出版本
2. 运行 evidence pointer resolver
3. 人工抽检支持强度

参考：
- [whitepaper/reproducibility-package-evidence-traceability.md](../whitepaper/reproducibility-package-evidence-traceability.md)
- [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)

### 指标卡 2: unsupported_conclusion_ratio

- 指标定义：没有足够证据支撑的结论占比
- 计算逻辑：弱支撑或无支撑结论数 / 结论总条目数
- 适用场景：审稿前风险筛查、解释质量回归
- 不适用场景：无证据链要求的草稿探索阶段
- 常见误读：把“证据不存在”和“证据弱”混为一类
- 最小验证步骤：
1. 建立 failure reason 标签
2. 区分 missing_pointer 与 weak_support
3. 计算占比并输出失败表

参考：
- [whitepaper/reproducibility-package-evidence-traceability.md](../whitepaper/reproducibility-package-evidence-traceability.md)

### 指标卡 3: topic_transition_rate

- 指标定义：主题迁移速度的比较指标
- 计算逻辑：按统一切片口径统计主题迁移事件并归一化
- 适用场景：跨时期语料比较、主题演化研究
- 不适用场景：单文本且无时间维度对照
- 常见误读：跨口径样本直接比较迁移率
- 最小验证步骤：
1. 冻结时间切片
2. 固定样本纳排规则
3. 只在同口径下比较

参考：
- [whitepaper/study-template-v2-corpus-comparative-analysis.md](../whitepaper/study-template-v2-corpus-comparative-analysis.md)

### 指标卡 4: 导入到报告完成时长

- 指标定义：单文闭环从导入到报告生成的端到端耗时
- 计算逻辑：以统一流程起止点采样 P50/P90
- 适用场景：V1 可用性与效率基准
- 不适用场景：包含额外人工编辑的混合流程
- 常见误读：把一次性最佳时间当作稳定能力
- 最小验证步骤：
1. 固定流程步骤
2. 记录样本量与时间窗
3. 同口径输出统计值

参考：
- [whitepaper/benchmark-and-acceptance-metrics.md](../whitepaper/benchmark-and-acceptance-metrics.md)

## 三问门禁（用于评审）

- 是否明确说明了方法边界？
- 是否提供了可执行验证步骤？
- 是否给出了失败时的分流路径？

不满足任一项时，该指标说明不应进入对外发布。

## 发布门禁（Kernel First）

以下条件必须同时满足，相关结论才可进入对外叙述：

1. claim-evidence-warrant 链完整
2. 至少记录 1 条替代解释或反证处理记录
3. strength 与 degrade_reasons 自洽且可复核
4. 输出可回链 source_spans

## 关联

- [Reproducibility Kit](reproducibility-kit.md)
- [Publication Support](publication-support.md)