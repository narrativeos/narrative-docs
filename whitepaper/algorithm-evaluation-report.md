# ALGO-TASK-001 Algorithm Evaluation Report (Single-Workstation Feasibility)

## Executive Summary (EN)

This report audits the feasibility and computational efficiency of NarrativeOS core algorithms on mainstream consumer laptops below RMB 10,000. The conclusion is method-level and complexity-based (document audit), not a measured benchmark claim.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-algo-task-001-algorithm-evaluation-report
path: whitepaper/algorithm-evaluation-report.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ALGO-TASK-001
status: in_progress
owner: research
reviewer: maintainer
assessment_type: document-level-feasibility-audit
hardware_baseline: mainstream-laptop-under-10000-rmb
```

## 目标与边界 | Scope

本报告用于回答一个明确问题：

- 在不依赖高端服务器和大规模集群的前提下，NarrativeOS 在 narrative-docs 中定义的核心算法，是否可在主流笔记本上稳定运行？

边界约束：

- 范围仅限 narrative-docs 中方法定义与协议约束
- 不下钻 narrative-core、narrative-api、SDK 的实现代码
- 不输出 measured 跑分，只输出可行性与效率分级判断

## 单机基线假设 | Hardware Baseline

采用“万元以下主流笔记本”区间作为统一评估口径：

```yaml
baseline_hardware_profile:
  cpu:
    physical_cores: 6..10
    logical_threads: 12..16
    note: modern mobile CPU (Apple Silicon / x86 H-series)
  memory_gb: 16..32
  storage:
    type: nvme-ssd
    seq_read_mb_s: 2500..7000
  gpu:
    class: integrated-or-entry-discrete
    vram_gb: 0..8
  os: macOS_or_Windows
```

判定原则：

- 可行性判定优先看算法阶数与瓶颈主项
- 效率分级优先看在该区间下的可持续吞吐，而非单次峰值

## 评测方法 | Estimation Method

本报告中的数值均为“文献支撑 + 工程经验”的保守估算，不是 measured 跑分。

口径说明：

- 文献支撑：来自 FEVER、SciFact、ColBERTv2、CITADEL、BERTopic、TextTiling 这类公开方法与任务范式的常见计算形态。
- 工程经验：基于 6-10 核、16-32GB 内存、NVMe SSD 的主流笔记本执行经验。
- 估算表达：统一使用区间值，并附 confidence level，避免把单点值写成能力承诺。

置信级别：

- High：方法学非常直接，推断链条短
- Medium：有较稳定的文献类比，但实现策略会影响结果
- Low：主要依赖经验外推，适合保守定位

## 核心算法清单 | Core Algorithm Set

本报告纳入以下核心算法族：

1. Fact Verification Pipeline
2. Golden Set Regression Gate
3. Strength Degradation Logic
4. Analysis Engine Six-Engine Baseline
5. Narrative Segmentation Protocol

参考入口：

- [../academic/fact-verification-protocol.md](../academic/fact-verification-protocol.md)
- [../academic/fact-verification-method-stack.md](../academic/fact-verification-method-stack.md)
- [../academic/trust-methodology.md](../academic/trust-methodology.md)
- [../academic/golden-set-threshold-policy.md](../academic/golden-set-threshold-policy.md)
- [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)
- [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md)

## 复杂度与效率核实总表 | Complexity and Efficiency Audit

| Algorithm | Dominant Steps | Time Complexity (Main Term) | Memory Sensitivity | Feasibility on Baseline Laptop | Efficiency Tier |
| --- | --- | --- | --- | --- | --- |
| Fact Verification Pipeline | retrieve + rerank + verify | retrieval近似 O(q log N) + rerank O(k) + verify O(k) | 对候选证据集与中间向量敏感 | 可行（需限制 top-k 与批次） | B |
| Golden Set Regression Gate | 指标聚合与阈值判定 | O(n)（n 为候选/样本条目数） | 低到中 | 可行 | A |
| Strength Degradation Logic | 规则触发与状态转移 | O(n)（按 claim 链遍历） | 低 | 可行 | A |
| Analysis Engine (Fast Scan) | lexical + syntax + style | 近似 O(T) 到 O(T log T) | 中（解析缓存） | 可行 | B |
| Analysis Engine (Full MRI) | 当前基线六引擎全开 + 关系建模 | 近似 O(T log T) + 聚类/图构建项 | 高（语义嵌入与图中间态） | 可行但需离线批次 | C |
| Narrative Segmentation | 边界候选 + 迁移分类 | O(S) 到 O(S log S)（S 为句段数） | 中 | 可行 | B |

说明：

- 上表复杂度为文档级上界推断，用于运行预算，不替代代码级 profile。
- 对事实核查流水线，瓶颈通常由候选数 k 与检索库规模 N 共同决定。
- 对 Full MRI，瓶颈主要来自语义表示与主题/关系建模，不是词法层本身。

## 代表实例与估算结果 | Representative Instances and Estimates

下面每行都用一个最小参照实例来锚定估算值。时间区间为单机串行估算，适用于 6-10 核 CPU、16-32GB 内存的主流笔记本。

| Algorithm | Representative Instance | Input Scale | Estimated Time | Estimated Peak Memory | Confidence | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Fact Verification Pipeline | 单个 claim，对 50 个候选证据做检索，对 20 个候选做 rerank，再做 NLI verify | 1 claim, 50 retrieve, 20 rerank, 20 verify | 0.4-1.8 s / claim | 1.5-4.0 GB | Medium | 检索+重排是主要成本；若 rerank 模型更大，时间上移至 2-4 s/claim |
| Golden Set Regression Gate | 100-300 条 Golden Set 样本的阈值聚合与门禁判定 | 100-300 rows | 10-120 ms / run | < 200 MB | High | 基本是 O(n) 汇总；结果稳定，适合每次变更都跑 |
| Strength Degradation Logic | 20 条 claim-evidence 链的强度降级与 reason 记录 | 20 chains | 1-20 ms / run | < 100 MB | High | 规则状态机，几乎不构成算力压力 |
| Analysis Engine (Fast Scan) | 1 篇 3k-5k 中文字文章，跑词法+句法+风格的轻量入口 | 3k-5k Chinese chars | 6-25 s / doc | 1.2-3.5 GB | Medium | 句法解析占主导；若分词/依存分析更重，时间上移至 30 s 左右 |
| Analysis Engine (Full MRI) | 1 篇 10k-20k 中文字长文，当前基线六引擎全开，含语义聚类与图构建 | 10k-20k Chinese chars | 3-18 min / doc | 4.0-10.0 GB | Low-Medium | 更适合离线；如果嵌入模型本地推理，时间可能继续上升 |
| Narrative Segmentation | 6 篇短文，共 60-100 个候选边界做分段与迁移分类 | 60-100 boundaries | 0.2-2.0 s / doc | < 500 MB | High | 主要是边界规则和轻量分类，适合前置切分 |

### 代表实例说明

- Fact Verification Pipeline 的实例对齐 FEVER / SciFact 风格的 claim-evidence-verdict 流程，假设 top-k 受控，rerank 使用 MiniLM 量级 Cross-Encoder。
- Golden Set Regression Gate 的实例对应一次变更后对 100-300 条样本做阈值聚合，计算量近似线性。
- Strength Degradation Logic 的实例对应单轮核查后对 20 条 chain 做降级理由记录，属于规则引擎级开销。
- Fast Scan 的实例对应一篇中短篇中文文本，重点看句法和风格特征是否能在秒到十几秒内稳定跑完。
- Full MRI 的实例对应 10k-20k 字长文，当前基线六引擎加语义聚类，结论是“可跑但应离线”。
- Narrative Segmentation 的实例对应多篇文档的边界候选集，验证的是分段与迁移分类的稳定性而不是重计算。

### 估算依据摘要

| Algorithm | Estimation Basis | Why This Range Is Reasonable |
| --- | --- | --- |
| Fact Verification Pipeline | FEVER/SciFact 范式 + HNSW/BM25 检索 + MiniLM 量级重排 | 检索通常是毫秒到几十毫秒，重排和 NLI 才是单机上真正占时的部分 |
| Golden Set Regression Gate | 纯聚合与阈值比较 | 仅做统计汇总和规则判断，属于低开销 O(n) |
| Strength Degradation Logic | 规则状态机与 reason 记录 | 不涉及大规模模型推理，主要是条件判断与链路遍历 |
| Fast Scan | 词法/句法/风格三类轻量引擎 | 主流 NLP 解析在 CPU 上通常可在秒级到十几秒完成中短文本 |
| Full MRI | 当前基线六引擎 + 语义聚类 + 图构建 | 多引擎串联后，时间与内存峰值会明显上升，适合离线批处理 |
| Narrative Segmentation | TextTiling / boundary classification 类任务 | 分段问题多为边界识别和轻量分类，单机可快速完成 |

## 算法逐项核实 | Per-Algorithm Feasibility

### 1) Fact Verification Pipeline

输入输出契约来自 [../academic/fact-verification-protocol.md](../academic/fact-verification-protocol.md)。

可行性判断：

- Discover/Aggregate 在主流笔记本上成本可控
- Retrieve/Rerank/Verify 是主要算力压力段
- 在 top-k 收敛、批次切分后，可达到稳定分钟级处理

建议运行策略：

- 默认 `threshold_tier: standard`
- 默认启用 hybrid 召回但限制 rerank 候选上限
- 大文档采用分块核查并合并 gate 结果

### 2) Golden Set Regression Gate

规则定义来自 [../academic/golden-set-threshold-policy.md](../academic/golden-set-threshold-policy.md)。

可行性判断：

- 指标计算和阈值判断属于轻量计算
- 对内存与并行能力要求低
- 适合在本机每次变更后执行

建议运行策略：

- 常态使用 `standard`
- 对外发布前切换 `strict`
- 连续两轮 `lenient` 后强制回到 `standard`

### 3) Strength Degradation Logic

规则定义来自 [../academic/trust-methodology.md](../academic/trust-methodology.md)。

可行性判断：

- 本质是规则触发和状态机降级
- 复杂度低，适合全链路默认开启
- 对性能影响通常低于检索与语义建模阶段

建议运行策略：

- 作为默认安全阀，不建议在单机模式下关闭
- 记录 `degrade_reasons` 以支持审计与复盘

### 4) Analysis Engine Six-Engine Baseline

架构定义来自 [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)。

可行性判断：

- Fast Scan：主流笔记本可稳定运行，适合作为日常入口
- Full MRI：可运行，但应避免与大批量任务并发
- 语义和图构建阶段对内存峰值最敏感

建议运行策略：

- 默认先跑 Fast Scan，再按风险触发 Full MRI
- Full MRI 采用单任务串行或小并发
- 长文本优先做分段再做全局合并

### 5) Narrative Segmentation Protocol

协议定义来自 [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md)。

可行性判断：

- 句段边界和迁移分类在本机可稳定处理
- 难点在一致性验证与人工复核，不在纯算力
- 可作为 Full MRI 前置切分步骤

建议运行策略：

- 固定切片规则与样本纳排口径
- 对边界冲突样本保留复核记录

## 效率分级规则 | Efficiency Tiering

```yaml
efficiency_tiers:
  A: realtime_or_near_realtime_on_baseline_laptop
  B: minute_level_stable_execution
  C: hour_level_or_offline_batch_preferred
  D: not_recommended_on_baseline_laptop
```

当前结论：

- A: Golden Set Regression Gate, Strength Degradation Logic
- B: Fact Verification (constrained), Narrative Segmentation, Analysis Fast Scan
- C: Analysis Full MRI (long documents / batch scenarios)
- D: none at method definition level

## 整体效能矩阵 | Overall Efficiency Matrix

| Algorithm | Representative Instance | Estimated Time | Estimated Memory | Tier | Confidence | Main Bottleneck | Recommended Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Fact Verification Pipeline | 1 claim / 50 retrieve / 20 rerank | 0.4-1.8 s | 1.5-4.0 GB | B | Medium | rerank + NLI | 保持 top-k 收敛，默认 batch=small |
| Golden Set Regression Gate | 100-300 rows | 10-120 ms | < 200 MB | A | High | none meaningful | 每次变更都跑 |
| Strength Degradation Logic | 20 chains | 1-20 ms | < 100 MB | A | High | none meaningful | 默认开启 |
| Analysis Fast Scan | 3k-5k chars | 6-25 s | 1.2-3.5 GB | B | Medium | syntax parsing | 先跑 Fast Scan，再决定是否上 Full MRI |
| Analysis Full MRI | 10k-20k chars | 3-18 min | 4.0-10.0 GB | C | Low-Medium | embeddings + clustering + graph | 仅在离线或预发布场景执行 |
| Narrative Segmentation | 60-100 boundaries | 0.2-2.0 s | < 500 MB | B | High | boundary scoring | 作为前置切分环节 |

### 架构可行性判断

- 轻量闭环可行：Fast Scan + constrained fact verification + gate + segmentation，可在主流笔记本上形成稳定分钟级以内体验。
- 深度闭环可行但需降级：Full MRI 不是“不能跑”，而是“应离线、单任务、低并发地跑”。
- 门禁层几乎无压力：Golden Set Regression Gate 与 Strength Degradation Logic 都适合始终开启。
- 最大瓶颈不是门禁，而是当前基线六引擎全开时的语义表示、聚类、图构建与重排成本。

## 与大模型生成速度对标 | LLM Generation Speed Analogy

为了帮助把上面的时间区间转换成“体感”，这里用一个统一参照：假定大模型输出速度为 100 tokens/s。

粗略换算下，10k 中文字文档通常会落在约 7k-10k tokens 的量级，因此如果是纯输出型生成，体感时间大约相当于 70-100 秒。

对照到本报告的加工路径，可以这样理解：

| Path | 10k 字级别体感 | 与 100 tokens/s 生成速度的关系 | 结论 |
| --- | --- | --- | --- |
| 首次 Fast Scan | 秒级到十几秒 | 明显快于整篇生成 | 接近实时交互，适合先看轮廓 |
| 首次 Full MRI | 3-18 分钟 | 明显慢于整篇生成 | 更像批处理作业，不是即时问答 |
| 后续差异加工，仅重跑门禁/局部核查 | 几秒到几十秒 | 接近或快于整篇生成 | 体感较接近“刷新结果” |
| 后续差异加工，若重新触发 Full MRI | 仍为分钟级 | 仍慢于整篇生成 | 体感与首次 Full MRI 接近 |

解释要点：

- 若只触发门禁、阈值聚合、局部核查，用户会感到“很快出结果”，更接近实时响应。
- 一旦差异把 Full MRI 拉起，整体体感会退回分钟级，更像提交一轮离线任务。
- 因此，是否“实时”，关键不在于文档长度本身，而在于差异是否只落到轻量路径。

## 产品接受度判断 | Product Acceptance View

从产品接受度看，这个速度是分层可接受的，而不是单一结论。

| Path | User Perception | Product Acceptance | Product Requirement |
| --- | --- | --- | --- |
| 首次 Fast Scan | 秒级到十几秒，接近交互式反馈 | 可接受 | 适合作为默认入口，优先给轮廓和初判 |
| 首次 Full MRI | 分钟级，更像后台分析任务 | 有条件可接受 | 只能作为深度模式、离线任务或预发布核查 |
| 后续差异加工，仅重跑门禁/局部核查 | 几秒到几十秒，接近刷新结果 | 可接受 | 适合变更后快速回看与回归门禁 |
| 后续差异加工，若重新触发 Full MRI | 仍为分钟级 | 有条件可接受 | 需要进度反馈、队列状态和完成通知 |

产品判断规则：

- 如果用户目标是“先知道大概问题在哪里”，秒级到十几秒是可接受的。
- 如果用户目标是“拿到一份深度、可解释、可追踪的完整结论”，分钟级也可接受，但必须被明确包装成深度分析，而不是即时交互。
- 如果没有进度反馈、队列状态或结果分层，分钟级体验通常会被用户判定为慢。

## 优化空间判断 | Optimization Headroom

结论先行：**有明确优化空间，但不是无限空间。**

当前结论更接近“把高成本路径压缩到更可控的分钟级/秒级体验”，而不是把所有深度分析都压成实时交互。

### 1) 按优化手段拆分

| Optimization Type | Main Levers | Likely Gain Range | Comment |
| --- | --- | --- | --- |
| 架构优化 | 分层路由、轻重路径拆分、缓存复用、增量重算、并行度收敛 | 1.5x-3x overall | 对用户体感改善最明显，尤其是差异加工和常见路径 |
| 算法优化 | top-k 收敛、候选过滤、轻量 reranker、解析缓存、图构建裁剪 | 1.3x-2.5x on common path | 适合压缩主成本项，但通常需要保持质量约束 |
| 参数/工程优化 | batch size、线程调度、I/O 预取、向量缓存、分段窗口调优 | 1.1x-1.8x | 属于低风险增益，单独使用上限有限 |

### 2) 按算法族拆分

| Algorithm | Current Bottleneck | Practical Improvement Space | Upper Bound Judgment |
| --- | --- | --- | --- |
| Golden Set Regression Gate | 几乎无明显主瓶颈 | 10%-30% | 已接近效率地板，更多是工程整理而不是性能突破 |
| Strength Degradation Logic | 规则判断与记录 | 10%-25% | 同样接近地板，优化意义主要在稳定性和可维护性 |
| Narrative Segmentation | 边界候选与轻量分类 | 20%-50% | 通过缓存和边界裁剪可明显提速，但不会改变任务本质 |
| Fact Verification Pipeline | rerank + NLI | 50%-200% | 通过候选收缩、缓存和模型轻量化有较大压缩空间 |
| Analysis Fast Scan | 句法解析 + 轻量多引擎串联 | 30%-150% | 若把重复解析和深浅层逻辑分离，体感提升最明显 |
| Analysis Full MRI | embeddings + clustering + graph | 100%-400% | 空间最大，但更多来自“重构执行方式”，不是单点调参 |

### 3) 对整体效率的判断

- **保守可达增益**：如果只做参数和工程优化，整体效率通常有 **1.2x-1.8x** 的提升空间。
- **稳健可达增益**：如果把架构改成“轻重分层 + 增量重算 + 缓存复用”，整体效率通常有 **1.5x-3x** 的提升空间。
- **较激进可达增益**：如果对 Full MRI 路径做更深的执行重构，并允许更强的任务拆分与离线化，局部重路径可能达到 **2x-4x**，但这通常只适用于深度分析链路，不是全场景平均值。

### 4) 空间上限判断

- 门禁层和规则层已经接近低成本边界，继续优化的回报有限。
- 真正的大头在 Fact Verification、Fast Scan 和 Full MRI 的重型链路。
- 如果目标是“把主流笔记本上的整体体验做得更顺”，最有效的不是继续压缩所有环节，而是把**默认路径切薄、深度路径离线化、差异路径增量化**。
- 因此，**整体可见提升是 1.5x-3x 级别最现实，超过 4x 仍可能，但通常只会出现在局部链路，不太可能成为全系统平均值。**

## 风险与缓解 | Risks and Mitigation

| Risk | Trigger | Impact | Mitigation |
| --- | --- | --- | --- |
| retrieval candidate explosion | top-k 无约束增长 | 延迟与内存峰值失控 | 限制 top-k、分块检索、先粗后精 |
| full-mri memory peak | 当前基线六引擎并发 + 长文本 | 进程抖动或任务中断 | 串行执行、分段处理、降低并发 |
| threshold drift misuse | lenient 连续使用 | 质量门禁失真 | 执行 tier 切换审计规则 |
| claim-boundary mismatch | boundary 缺失或错误 | verify 误判率上升 | boundary 前置校验，失败即回退 |

## 可宣称边界 | Claim Boundary

本报告结论属于“可行性审计”，不是性能实测声明。

因此：

- 可以宣称：方法链在主流笔记本具备可运行路径，且可通过分级策略控制成本
- 不可宣称：已经达到稳定 measured 性能目标

对外发布仍应遵守 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) 的 Planned/Measured 约束。

## 逐算法实例模板清单 | Instance Template Checklist

以下模板可直接复用于后续扩样、复跑或补充 measured 证据。每个模板都保留了“实例描述、规模假设、关键参数、参考来源、估算值、适用边界”六个最小字段。

### 1) Fact Verification Pipeline

```yaml
algorithm: Fact Verification Pipeline
instance_name: single_claim_verification
instance_description: 单个 claim 经过检索、重排与核查的最小闭环
scale_assumption:
  claims: 1
  retrieve_candidates: 50
  rerank_candidates: 20
  verify_candidates: 20
key_parameters:
  retrieve_mode: hybrid_bm25_dense
  rerank_model: MiniLM_class_cross_encoder
  verify_mode: NLI_support_refute_neutral
reference_sources:
  - FEVER
  - SciFact
  - fact-verification-method-stack.md
estimated_values:
  time: 0.4-1.8 s / claim
  memory: 1.5-4.0 GB
confidence: medium
applicable_boundary: top-k受控、批次切分、单机串行或低并发
```

### 2) Golden Set Regression Gate

```yaml
algorithm: Golden Set Regression Gate
instance_name: change_review_gate
instance_description: 100-300 条样本的阈值聚合与门禁判定
scale_assumption:
  rows: 100-300
  profiles: standard_or_strict
key_parameters:
  threshold_tier: standard
  metrics: [traceability_pass_rate, hallucination_ratio, unresolved_counterevidence_ratio]
reference_sources:
  - golden-set-threshold-policy.md
  - golden-set-action-playbook.md
estimated_values:
  time: 10-120 ms / run
  memory: < 200 MB
confidence: high
applicable_boundary: 每次变更后常态执行
```

### 3) Strength Degradation Logic

```yaml
algorithm: Strength Degradation Logic
instance_name: claim_chain_degrade_pass
instance_description: 20 条 claim-evidence 链的强度降级与 reason 记录
scale_assumption:
  chains: 20
  reasons: 0-5 per chain
key_parameters:
  triggers: [missing_evidence, unresolved_conflict, broken_warrant, missing_boundary, overgeneralization]
reference_sources:
  - trust-methodology.md
  - fact-verification-protocol.md
estimated_values:
  time: 1-20 ms / run
  memory: < 100 MB
confidence: high
applicable_boundary: 规则状态机常驻启用
```

### 4) Analysis Engine (Fast Scan)

```yaml
algorithm: Analysis Engine (Fast Scan)
instance_name: short_document_fast_scan
instance_description: 3k-5k 中文字文章的轻量分析入口
scale_assumption:
  text_length: 3k-5k Chinese chars
  engines: [lexical, syntax_rhythm, semantic, rhetoric_style]
key_parameters:
  profile: fast_scan
  evidence_level: basic_or_strict
reference_sources:
  - architecture/analysis-engine/README.md
estimated_values:
  time: 6-25 s / doc
  memory: 1.2-3.5 GB
confidence: medium
applicable_boundary: 主入口、交互式体验、预筛查
```

### 5) Analysis Engine (Full MRI)

```yaml
algorithm: Analysis Engine (Full MRI)
instance_name: long_document_full_mri
instance_description: 10k-20k 中文字长文的当前基线六引擎全开深度分析
scale_assumption:
  text_length: 10k-20k Chinese chars
  engines: [lexical, syntax_rhythm, semantic, narrative_flow, rhetoric_style, emotion_sensory]
key_parameters:
  profile: full_mri
  concurrency: 1
  segmentation_first: true
  chunk_then_aggregate: true
reference_sources:
  - architecture/analysis-engine/README.md
estimated_values:
  time: 3-18 min / doc
  memory: 4.0-10.0 GB
confidence: low_to_medium
applicable_boundary: 离线批处理、预发布核查、低并发串行
```

### 6) Narrative Segmentation Protocol

```yaml
algorithm: Narrative Segmentation Protocol
instance_name: boundary_detection_batch
instance_description: 60-100 个候选边界的分段与迁移分类
scale_assumption:
  boundaries: 60-100
  documents: 6
key_parameters:
  labels: [topic_shift, scene_shift, voice_shift, bridge_transition, no_boundary]
reference_sources:
  - annotation-protocol-narrative-segmentation.md
  - architecture/analysis-engine/README.md
estimated_values:
  time: 0.2-2.0 s / doc
  memory: < 500 MB
confidence: high
applicable_boundary: 前置切分、标注一致性验证、轻量批处理
```

### 模板使用说明

- 若后续要补 measured，只需在对应模板里追加 `measured_value`、`sample_size`、`time_window` 与 `evidence_link`。
- 若某算法的实例规模变化过大，应先重写 `scale_assumption`，再重算估算值。
- 若希望更保守，可把 `estimated_values` 改成更窄的区间并增加 `confidence` 说明。

## 结论 | Conclusion

在万元以下主流笔记本口径下，NarrativeOS 核心算法总体“可行但需分级运行”：

- 门禁与降级逻辑可作为常态默认开启
- 事实核查可在受控候选规模下稳定运行
- Full MRI 应定位为离线或低并发深度任务

从数值估算看，整个架构在单机上的可行性结论是：

- 若首期目标是“单文诊断 + 证据回链 + 轻量门禁”，架构是可行的，而且可以做到秒级到分钟级的交互体验。
- 若首期目标是“单文 Full MRI + 全量语义建模 + 图谱输出”，架构仍可行，但更像离线批处理系统，不适合承诺实时。
- 若首期目标是“多文批量 Full MRI + 高频复跑”，则必须依赖批次切分和更强机器，否则容易触发内存峰值与排队延迟。

该结论满足 ALGO-TASK-001 的第一阶段目标：先完成可行性与效率边界核实，再进入 measured 采样。

## Next Actions

1. 基于本报告补齐 measured 首批三指标：导入到报告时长、关键流程成功率、证据可追溯率。
2. 将本报告中的效率分级参数下沉到 runbook 默认配置。
3. 在 evidence registry 中新增 ALGO-001 入账条目并关联复跑记录。
