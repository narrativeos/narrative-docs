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
  runtime:
    queue_state: normal | high_watermark | degraded
    expected_fast_latency_ms: int
    expected_deep_latency_ms: int
  output:
    key_metrics:
      structure_integrity: float
      ai_template_ratio: float
      rhythm_index: float
      sensory_density: float
    evidence_links:
      - sentence_ref: string
        evidence_type: string
        confidence: float
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
runtime:
  queue_state: normal
  expected_fast_latency_ms: 780
  expected_deep_latency_ms: 5200
output:
  key_metrics:
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
runtime:
  queue_state: normal
  expected_fast_latency_ms: 1120
  expected_deep_latency_ms: 46200
output:
  key_metrics:
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
runtime:
  queue_state: high_watermark
  expected_fast_latency_ms: 1650
  expected_deep_latency_ms: 0
output:
  key_metrics:
    structure_integrity: 0.73
    ai_template_ratio: 0.22
    rhythm_index: 0.53
    sensory_density: 0.37
  evidence_links:
    - sentence_ref: p19-s04
      evidence_type: degraded_partial_evidence
      confidence: 0.68
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
runtime:
  queue_state: normal
  expected_fast_latency_ms: 930
  expected_deep_latency_ms: 8100
output:
  key_metrics:
    structure_integrity: 0.79
    ai_template_ratio: 0.16
    rhythm_index: 0.59
    sensory_density: 0.51
  evidence_links:
    - sentence_ref: p12-s05
      evidence_type: broken_anchor_reference
      confidence: 0.00
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
runtime:
  queue_state: normal
  expected_fast_latency_ms: 840
  expected_deep_latency_ms: 17400
output:
  key_metrics:
    structure_integrity: 0.88
    ai_template_ratio: 0.09
    rhythm_index: 0.74
    sensory_density: 0.62
  evidence_links:
    - sentence_ref: p08-s03
      evidence_type: metaphor_density_peak
      confidence: 0.89
constraints:
  no_user_system: true
  external_identity_context: repro_workspace_gamma
```

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
