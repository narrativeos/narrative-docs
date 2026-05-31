# Product V1 Mock Simulation Dataset

## 摘要（中文）

本页定义 V1 原型设计前置所需的场景化 mock 模拟数据，用于交互验证、指标验收、失败演练与回归对比。

## Executive Summary (EN)

This document defines scenario-based mock datasets for Product V1 prototyping, acceptance checks, and failure drills.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-v1-mock-simulation-dataset
path: product/scenarios/v1-mock-simulation-dataset.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, design, developer, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用原则

- 所有样本均为模拟数据，不承载真实用户身份信息。
- 若需要身份上下文，仅使用 external_identity_context 字段，不引入内建用户系统语义。
- 原型评审、交互演示、可用性测试必须引用 scene_id 与 dataset_id。

## 场景清单

| scene_id | 场景名称 | 目标路径 | 预期时长 | 主要风险 |
| --- | --- | --- | --- | --- |
| SCN-V1-001 | 短文快速诊断 | Import -> Fast -> Insight | 2-5 分钟 | 首次反馈过慢 |
| SCN-V1-002 | 长文深度诊断 | Import -> Fast -> Deep -> Atlas | 8-15 分钟 | Deep 队列拥塞 |
| SCN-V1-003 | 高负载降级 | Import -> Fast(degrade) -> Explain | 3-8 分钟 | 降级不可解释 |
| SCN-V1-004 | 证据链失败恢复 | Insight -> Show Evidence -> Retry | 2-6 分钟 | 结论不可回链 |
| SCN-V1-005 | 导出与快照复现 | Export -> Snapshot -> Replay | 3-7 分钟 | manifest 版本错配 |

## 数据结构约定

```yaml
mock_record:
  dataset_id: string
  scene_id: string
  profile: fast_scan | full_mri | degrade_path
  input:
    doc_id: string
    title: string
    word_count: int
    paragraph_count: int
    language: zh-CN
  options:
    engines: [lexical_dna, syntax_rhythm, semantic_network, narrative_flow, rhetoric_style, emotion_sensory]
    evidence_level: basic | strict
  runtime:
    queue_state: normal | high_watermark | degraded
    expected_fast_latency_ms: int
    expected_deep_latency_ms: int
  output:
    engines:
      lexical_dna:
        metrics: {char_freq_topk, token_freq_topk, ttr, zipf_slope, high_freq_anomaly_score}
        signals: [signal_code]
        artifacts: {lexical_histogram}
        diagnostics: [{id, summary, evidence}]
        confidence: float
      syntax_rhythm:
        metrics: {avg_sentence_length, sentence_var, dependency_distance_avg, long_sentence_ratio, rhythm_index}
        signals: [signal_code]
        artifacts: {rhythm_timeline}
        diagnostics: [{id, summary, evidence}]
        confidence: float
      semantic_network:
        metrics: {paragraph_similarity_avg, semantic_overlap, topic_cluster_count}
        signals: [signal_code]
        artifacts: {semantic_galaxy}
        diagnostics: [{id, summary, evidence}]
        confidence: float
      narrative_flow:
        metrics: {topic_segment_count, transition_jump_score, flow_stability}
        signals: [signal_code]
        artifacts: {topic_flow_map}
        diagnostics: [{id, summary, evidence}]
        confidence: float
      rhetoric_style:
        metrics: {rhetoric_density, ai_template_ratio, style_fingerprint_score, abstraction_density}
        signals: [signal_code]
        artifacts: {style_fingerprint}
        diagnostics: [{id, summary, evidence}]
        confidence: float
      emotion_sensory:
        metrics: {emotion_balance_score, sensory_density, sensory_lexicon_hit_rate}
        signals: [signal_code]
        artifacts: {emotion_sensory_map}
        diagnostics: [{id, summary, evidence}]
        confidence: float
    summary_metrics:
      structure_integrity: float
      ai_template_ratio: float
      rhythm_index: float
      sensory_density: float
    evidence_links:
      - sentence_ref: string
        evidence_type: string
        confidence: float
    coverage_assertion:
      all_six_engines_present: true
      contract_shape_valid: true
  constraints:
    no_user_system: true
    external_identity_context: optional
```

## Mock Dataset 包

### Dataset A: 作者短文样本（Fast 优先）

```yaml
dataset_id: DS-V1-AUTHOR-SHORT-001
scene_id: SCN-V1-001
profile: fast_scan
input:
  doc_id: doc-short-001
  title: 雨夜站台
  word_count: 1860
  paragraph_count: 24
  language: zh-CN
options:
  engines: [lexical_dna, syntax_rhythm, semantic_network, narrative_flow, rhetoric_style, emotion_sensory]
  evidence_level: basic
runtime:
  queue_state: normal
  expected_fast_latency_ms: 780
  expected_deep_latency_ms: 5200
output:
  engines:
    lexical_dna:
      metrics: {char_freq_topk: [的,了,在], token_freq_topk: [站台,雨夜,灯], ttr: 0.63, zipf_slope: -1.08, high_freq_anomaly_score: 0.14}
      signals: [lexical_dense_band]
      artifacts: {lexical_histogram: artifact://lexical/hist/doc-short-001/v1}
      diagnostics: [{id: diag-lex-01, summary: 高频名词集中在空间意象, evidence: [p02-s01, p04-s02]}]
      confidence: 0.9
    syntax_rhythm:
      metrics: {avg_sentence_length: 24.1, sentence_var: 11.3, dependency_distance_avg: 4.2, long_sentence_ratio: 0.22, rhythm_index: 0.67}
      signals: [rhythm_minor_flattening]
      artifacts: {rhythm_timeline: artifact://rhythm/timeline/doc-short-001/v1}
      diagnostics: [{id: diag-syn-01, summary: 中段句长趋同导致节奏轻微变平, evidence: [p03-s02, p03-s03]}]
      confidence: 0.88
    semantic_network:
      metrics: {paragraph_similarity_avg: 0.61, semantic_overlap: 0.48, topic_cluster_count: 3}
      signals: [semantic_centered_cluster]
      artifacts: {semantic_galaxy: artifact://semantic/galaxy/doc-short-001/v1}
      diagnostics: [{id: diag-sem-01, summary: 语义簇稳定但转场词不足, evidence: [p06-s01, p07-s01]}]
      confidence: 0.85
    narrative_flow:
      metrics: {topic_segment_count: 4, transition_jump_score: 0.31, flow_stability: 0.77}
      signals: [flow_stable_single_arc]
      artifacts: {topic_flow_map: artifact://narrative/flow/doc-short-001/v1}
      diagnostics: [{id: diag-nar-01, summary: 叙事主线清晰，后段收束略快, evidence: [p18-s02, p22-s01]}]
      confidence: 0.84
    rhetoric_style:
      metrics: {rhetoric_density: 0.27, ai_template_ratio: 0.12, style_fingerprint_score: 0.73, abstraction_density: 0.33}
      signals: [metaphor_light_usage]
      artifacts: {style_fingerprint: artifact://style/fingerprint/doc-short-001/v1}
      diagnostics: [{id: diag-sty-01, summary: 比喻使用克制，风格辨识度中高, evidence: [p07-s01, p09-s02]}]
      confidence: 0.86
    emotion_sensory:
      metrics: {emotion_balance_score: 0.69, sensory_density: 0.58, sensory_lexicon_hit_rate: 0.41}
      signals: [sensory_balanced_cool_tone]
      artifacts: {emotion_sensory_map: artifact://emotion/map/doc-short-001/v1}
      diagnostics: [{id: diag-emo-01, summary: 以视觉和触觉线索驱动氛围, evidence: [p04-s01, p10-s03]}]
      confidence: 0.87
  summary_metrics:
    structure_integrity: 0.84
    ai_template_ratio: 0.12
    rhythm_index: 0.67
    sensory_density: 0.58
  evidence_links:
    - sentence_ref: p03-s02
      evidence_type: long_sentence_cluster
      confidence: 0.91
    - sentence_ref: p07-s01
      evidence_type: abstraction_density
      confidence: 0.86
  coverage_assertion:
    all_six_engines_present: true
    contract_shape_valid: true
constraints:
  no_user_system: true
  external_identity_context: editorial_workspace_alpha
```

### Dataset B: 长文章节样本（Deep 路径）

```yaml
dataset_id: DS-V1-AUTHOR-LONG-001
scene_id: SCN-V1-002
profile: full_mri
input:
  doc_id: doc-long-001
  title: 城市边界
  word_count: 12840
  paragraph_count: 132
  language: zh-CN
options:
  engines: [lexical_dna, syntax_rhythm, semantic_network, narrative_flow, rhetoric_style, emotion_sensory]
  evidence_level: strict
runtime:
  queue_state: normal
  expected_fast_latency_ms: 1120
  expected_deep_latency_ms: 46200
output:
  engines:
    lexical_dna:
      metrics: {char_freq_topk: [城,界,夜], token_freq_topk: [边界,街区,回声], ttr: 0.57, zipf_slope: -1.02, high_freq_anomaly_score: 0.19}
      signals: [lexical_repetition_cluster]
      artifacts: {lexical_histogram: artifact://lexical/hist/doc-long-001/v3}
      diagnostics: [{id: diag-lex-11, summary: 中后段关键词复现率偏高, evidence: [p64-s02, p79-s01]}]
      confidence: 0.89
    syntax_rhythm:
      metrics: {avg_sentence_length: 31.2, sentence_var: 14.6, dependency_distance_avg: 5.1, long_sentence_ratio: 0.43, rhythm_index: 0.49}
      signals: [rhythm_fatigue_zone]
      artifacts: {rhythm_timeline: artifact://rhythm/timeline/doc-long-001/v3}
      diagnostics: [{id: diag-syn-12, summary: 连续长句堆叠造成阅读疲劳段, evidence: [p41-s03, p42-s01, p43-s02]}]
      confidence: 0.9
    semantic_network:
      metrics: {paragraph_similarity_avg: 0.54, semantic_overlap: 0.39, topic_cluster_count: 7}
      signals: [semantic_shift_break]
      artifacts: {semantic_galaxy: artifact://semantic/galaxy/doc-long-001/v3}
      diagnostics: [{id: diag-sem-13, summary: 章节切换处语义突变明显, evidence: [p41-s03, p48-s02]}]
      confidence: 0.87
    narrative_flow:
      metrics: {topic_segment_count: 12, transition_jump_score: 0.62, flow_stability: 0.52}
      signals: [flow_jump_needs_bridge]
      artifacts: {topic_flow_map: artifact://narrative/flow/doc-long-001/v3}
      diagnostics: [{id: diag-nar-14, summary: 两处主题跳变缺少过渡节点, evidence: [p52-s01, p76-s02]}]
      confidence: 0.85
    rhetoric_style:
      metrics: {rhetoric_density: 0.31, ai_template_ratio: 0.18, style_fingerprint_score: 0.68, abstraction_density: 0.46}
      signals: [style_variance_drop]
      artifacts: {style_fingerprint: artifact://style/fingerprint/doc-long-001/v3}
      diagnostics: [{id: diag-sty-15, summary: 后段风格多样性下降，模板化风险抬升, evidence: [p88-s03, p96-s01]}]
      confidence: 0.84
    emotion_sensory:
      metrics: {emotion_balance_score: 0.55, sensory_density: 0.44, sensory_lexicon_hit_rate: 0.29}
      signals: [emotion_single_band]
      artifacts: {emotion_sensory_map: artifact://emotion/map/doc-long-001/v3}
      diagnostics: [{id: diag-emo-16, summary: 情绪频段集中在低激活区, evidence: [p63-s01, p90-s02]}]
      confidence: 0.82
  summary_metrics:
    structure_integrity: 0.71
    ai_template_ratio: 0.18
    rhythm_index: 0.49
    sensory_density: 0.44
  evidence_links:
    - sentence_ref: p41-s03
      evidence_type: semantic_shift_break
      confidence: 0.79
    - sentence_ref: p76-s02
      evidence_type: rhythm_fatigue_zone
      confidence: 0.83
  coverage_assertion:
    all_six_engines_present: true
    contract_shape_valid: true
constraints:
  no_user_system: true
  external_identity_context: editorial_workspace_alpha
```

### Dataset C: 过载降级样本（Degrade）

```yaml
dataset_id: DS-V1-DEGRADE-001
scene_id: SCN-V1-003
profile: degrade_path
input:
  doc_id: doc-overload-001
  title: 试验文稿-并发压测
  word_count: 6200
  paragraph_count: 68
  language: zh-CN
options:
  engines: [lexical_dna, syntax_rhythm, semantic_network, narrative_flow, rhetoric_style, emotion_sensory]
  evidence_level: basic
runtime:
  queue_state: high_watermark
  expected_fast_latency_ms: 1650
  expected_deep_latency_ms: 0
output:
  engines:
    lexical_dna:
      metrics: {char_freq_topk: [测,试,并], token_freq_topk: [并发,压测,回退], ttr: 0.51, zipf_slope: -0.98, high_freq_anomaly_score: 0.23}
      signals: [lexical_hotspot_detected]
      artifacts: {lexical_histogram: artifact://lexical/hist/doc-overload-001/v2}
      diagnostics: [{id: diag-lex-21, summary: 压测词汇集中，语料分布偏窄, evidence: [p05-s01, p11-s03]}]
      confidence: 0.82
    syntax_rhythm:
      metrics: {avg_sentence_length: 26.8, sentence_var: 15.2, dependency_distance_avg: 4.9, long_sentence_ratio: 0.35, rhythm_index: 0.53}
      signals: [rhythm_partial_only]
      artifacts: {rhythm_timeline: artifact://rhythm/timeline/doc-overload-001/v2}
      diagnostics: [{id: diag-syn-22, summary: 降级模式下仅输出局部节奏诊断, evidence: [p19-s04]}]
      confidence: 0.72
    semantic_network:
      metrics: {paragraph_similarity_avg: 0.49, semantic_overlap: 0.34, topic_cluster_count: 4}
      signals: [semantic_partial_due_backpressure]
      artifacts: {semantic_galaxy: artifact://semantic/galaxy/doc-overload-001/v2}
      diagnostics: [{id: diag-sem-23, summary: 语义图谱降采样输出, evidence: [p23-s02]}]
      confidence: 0.68
    narrative_flow:
      metrics: {topic_segment_count: 6, transition_jump_score: 0.58, flow_stability: 0.49}
      signals: [flow_low_resolution]
      artifacts: {topic_flow_map: artifact://narrative/flow/doc-overload-001/v2}
      diagnostics: [{id: diag-nar-24, summary: 叙事流仅保留主链路节点, evidence: [p31-s01]}]
      confidence: 0.66
    rhetoric_style:
      metrics: {rhetoric_density: 0.25, ai_template_ratio: 0.22, style_fingerprint_score: 0.61, abstraction_density: 0.38}
      signals: [style_partial_evaluation]
      artifacts: {style_fingerprint: artifact://style/fingerprint/doc-overload-001/v2}
      diagnostics: [{id: diag-sty-25, summary: 风格评估降采样，模板率结果可用但置信度下降, evidence: [p27-s03]}]
      confidence: 0.7
    emotion_sensory:
      metrics: {emotion_balance_score: 0.47, sensory_density: 0.37, sensory_lexicon_hit_rate: 0.21}
      signals: [emotion_low_confidence]
      artifacts: {emotion_sensory_map: artifact://emotion/map/doc-overload-001/v2}
      diagnostics: [{id: diag-emo-26, summary: 情绪与感官输出受降级影响需标注谨慎使用, evidence: [p33-s02]}]
      confidence: 0.64
  summary_metrics:
    structure_integrity: 0.73
    ai_template_ratio: 0.22
    rhythm_index: 0.53
    sensory_density: 0.37
  evidence_links:
    - sentence_ref: p19-s04
      evidence_type: degraded_partial_evidence
      confidence: 0.68
  coverage_assertion:
    all_six_engines_present: true
    contract_shape_valid: true
constraints:
  no_user_system: true
  external_identity_context: load_test_workspace
```

### Dataset D: 证据回链失败样本（恢复流程）

```yaml
dataset_id: DS-V1-EVIDENCE-FAIL-001
scene_id: SCN-V1-004
profile: fast_scan
input:
  doc_id: doc-linkfail-001
  title: 暮色研究
  word_count: 3400
  paragraph_count: 37
  language: zh-CN
options:
  engines: [lexical_dna, syntax_rhythm, semantic_network, narrative_flow, rhetoric_style, emotion_sensory]
  evidence_level: strict
runtime:
  queue_state: normal
  expected_fast_latency_ms: 930
  expected_deep_latency_ms: 8100
output:
  engines:
    lexical_dna:
      metrics: {char_freq_topk: [暮,色,城], token_freq_topk: [暮色,街道,回响], ttr: 0.6, zipf_slope: -1.05, high_freq_anomaly_score: 0.17}
      signals: [lexical_balance_ok]
      artifacts: {lexical_histogram: artifact://lexical/hist/doc-linkfail-001/v1}
      diagnostics: [{id: diag-lex-31, summary: 词汇分布均衡，无显著异常, evidence: [p04-s02]}]
      confidence: 0.9
    syntax_rhythm:
      metrics: {avg_sentence_length: 22.7, sentence_var: 10.8, dependency_distance_avg: 3.9, long_sentence_ratio: 0.19, rhythm_index: 0.59}
      signals: [rhythm_stable_mid]
      artifacts: {rhythm_timeline: artifact://rhythm/timeline/doc-linkfail-001/v1}
      diagnostics: [{id: diag-syn-32, summary: 节奏整体稳定, evidence: [p12-s05]}]
      confidence: 0.88
    semantic_network:
      metrics: {paragraph_similarity_avg: 0.58, semantic_overlap: 0.42, topic_cluster_count: 4}
      signals: [semantic_transition_soft]
      artifacts: {semantic_galaxy: artifact://semantic/galaxy/doc-linkfail-001/v1}
      diagnostics: [{id: diag-sem-33, summary: 语义迁移平滑, evidence: [p11-s02, p13-s01]}]
      confidence: 0.86
    narrative_flow:
      metrics: {topic_segment_count: 5, transition_jump_score: 0.29, flow_stability: 0.74}
      signals: [flow_consistent]
      artifacts: {topic_flow_map: artifact://narrative/flow/doc-linkfail-001/v1}
      diagnostics: [{id: diag-nar-34, summary: 叙事路径连续性良好, evidence: [p15-s01]}]
      confidence: 0.85
    rhetoric_style:
      metrics: {rhetoric_density: 0.29, ai_template_ratio: 0.16, style_fingerprint_score: 0.7, abstraction_density: 0.35}
      signals: [style_mixed_human_like]
      artifacts: {style_fingerprint: artifact://style/fingerprint/doc-linkfail-001/v1}
      diagnostics: [{id: diag-sty-35, summary: 风格一致性较好，模板风险可控, evidence: [p12-s05]}]
      confidence: 0.84
    emotion_sensory:
      metrics: {emotion_balance_score: 0.63, sensory_density: 0.51, sensory_lexicon_hit_rate: 0.33}
      signals: [emotion_calm_band]
      artifacts: {emotion_sensory_map: artifact://emotion/map/doc-linkfail-001/v1}
      diagnostics: [{id: diag-emo-36, summary: 感官提示偏视觉通道, evidence: [p09-s03, p12-s05]}]
      confidence: 0.83
  summary_metrics:
    structure_integrity: 0.79
    ai_template_ratio: 0.16
    rhythm_index: 0.59
    sensory_density: 0.51
  evidence_links:
    - sentence_ref: p12-s05
      evidence_type: broken_anchor_reference
      confidence: 0.00
  coverage_assertion:
    all_six_engines_present: true
    contract_shape_valid: true
constraints:
  no_user_system: true
  external_identity_context: qa_workspace_beta
```

### Dataset E: 导出复现样本（Snapshot）

```yaml
dataset_id: DS-V1-EXPORT-001
scene_id: SCN-V1-005
profile: full_mri
input:
  doc_id: doc-export-001
  title: 风格实验日志
  word_count: 5100
  paragraph_count: 56
  language: zh-CN
options:
  engines: [lexical_dna, syntax_rhythm, semantic_network, narrative_flow, rhetoric_style, emotion_sensory]
  evidence_level: strict
runtime:
  queue_state: normal
  expected_fast_latency_ms: 840
  expected_deep_latency_ms: 17400
output:
  engines:
    lexical_dna:
      metrics: {char_freq_topk: [风,格,实], token_freq_topk: [风格,实验,日志], ttr: 0.66, zipf_slope: -1.1, high_freq_anomaly_score: 0.1}
      signals: [lexical_diverse_band]
      artifacts: {lexical_histogram: artifact://lexical/hist/doc-export-001/v2}
      diagnostics: [{id: diag-lex-41, summary: 词汇丰富度较高且分布均衡, evidence: [p05-s02, p09-s01]}]
      confidence: 0.92
    syntax_rhythm:
      metrics: {avg_sentence_length: 20.4, sentence_var: 9.1, dependency_distance_avg: 3.5, long_sentence_ratio: 0.15, rhythm_index: 0.74}
      signals: [rhythm_lively]
      artifacts: {rhythm_timeline: artifact://rhythm/timeline/doc-export-001/v2}
      diagnostics: [{id: diag-syn-42, summary: 节奏弹性好，阅读负担低, evidence: [p08-s03, p14-s02]}]
      confidence: 0.9
    semantic_network:
      metrics: {paragraph_similarity_avg: 0.63, semantic_overlap: 0.47, topic_cluster_count: 5}
      signals: [semantic_multi_core]
      artifacts: {semantic_galaxy: artifact://semantic/galaxy/doc-export-001/v2}
      diagnostics: [{id: diag-sem-43, summary: 多主题并行但耦合有序, evidence: [p12-s01, p22-s02]}]
      confidence: 0.88
    narrative_flow:
      metrics: {topic_segment_count: 7, transition_jump_score: 0.24, flow_stability: 0.81}
      signals: [flow_well_connected]
      artifacts: {topic_flow_map: artifact://narrative/flow/doc-export-001/v2}
      diagnostics: [{id: diag-nar-44, summary: 叙事链路连续，转场自然, evidence: [p18-s01, p30-s03]}]
      confidence: 0.87
    rhetoric_style:
      metrics: {rhetoric_density: 0.34, ai_template_ratio: 0.09, style_fingerprint_score: 0.79, abstraction_density: 0.28}
      signals: [metaphor_density_peak]
      artifacts: {style_fingerprint: artifact://style/fingerprint/doc-export-001/v2}
      diagnostics: [{id: diag-sty-45, summary: 修辞活跃且模板率低, evidence: [p08-s03, p26-s01]}]
      confidence: 0.89
    emotion_sensory:
      metrics: {emotion_balance_score: 0.76, sensory_density: 0.62, sensory_lexicon_hit_rate: 0.45}
      signals: [emotion_sensory_rich]
      artifacts: {emotion_sensory_map: artifact://emotion/map/doc-export-001/v2}
      diagnostics: [{id: diag-emo-46, summary: 多感官通道协同，情绪分布均衡, evidence: [p08-s03, p21-s02]}]
      confidence: 0.9
  summary_metrics:
    structure_integrity: 0.88
    ai_template_ratio: 0.09
    rhythm_index: 0.74
    sensory_density: 0.62
  evidence_links:
    - sentence_ref: p08-s03
      evidence_type: metaphor_density_peak
      confidence: 0.89
  coverage_assertion:
    all_six_engines_present: true
    contract_shape_valid: true
constraints:
  no_user_system: true
  external_identity_context: repro_workspace_gamma
```

## 算法覆盖矩阵与判定规则

| Engine | 必填输入覆盖 | 必填输出覆盖 | 覆盖状态 |
| --- | --- | --- | --- |
| Engine 1 Lexical DNA | doc_id/title/text-length/profile | metrics/signals/artifacts/diagnostics/confidence | covered |
| Engine 2 Syntax & Rhythm | 段落与句级结构输入 | metrics/signals/artifacts/diagnostics/confidence | covered |
| Engine 3 Semantic Network | 段落语义输入 | metrics/signals/artifacts/diagnostics/confidence | covered |
| Engine 4 Narrative Flow | 段落序列与主题候选输入 | metrics/signals/artifacts/diagnostics/confidence | covered |
| Engine 5 Rhetoric & Style | 修辞与风格候选输入 | metrics/signals/artifacts/diagnostics/confidence | covered |
| Engine 6 Emotion & Sensory | 情绪与感官候选输入 | metrics/signals/artifacts/diagnostics/confidence | covered |

判定规则：

- 任一 dataset 缺失任一引擎节点，判定为 not-covered。
- 任一引擎缺失 metrics/signals/artifacts/diagnostics/confidence 任一字段，判定为 not-covered。
- prototype 评审时需同时满足 coverage_assertion.all_six_engines_present=true 与 coverage_assertion.contract_shape_valid=true。

## 原型测试读取建议

- 交互层：默认加载 Dataset A 作为 happy path。
- 稳定性演示：切换 Dataset C 验证降级可解释性。
- 故障演练：使用 Dataset D 验证 evidence retry 流程。
- 复现能力：使用 Dataset E 验证导出与回放一致性。

## 验收字段（原型评审必填）

```yaml
prototype_test_record:
  scenario_id: string
  dataset_id: string
  ui_flow_pass: true | false
  evidence_trace_pass: true | false
  degrade_explainable: true | false
  export_replay_pass: true | false
  notes: string
```

## 关联文档

- ../v1-design-baseline.md
- ../workflows/README.md
- ../prototype/v1-prototype-spec.md
