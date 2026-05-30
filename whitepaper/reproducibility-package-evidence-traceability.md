# Evidence Traceability 复现包示例

## Executive Summary (EN)

This document provides a minimal reproducibility package example for the evidence traceability rate used in NarrativeOS explanation and diagnostics workflows.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-reproducibility-package-evidence-traceability
path: whitepaper/reproducibility-package-evidence-traceability.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: example-foundation
owner: research
```

## 目标 | Goals

本文件给出 `evidence traceability rate` 的最小复现包示例。

它服务于两个目的：

- 让“结论可回链”从概念约束变成可复核任务
- 为后续 measured 指标建立统一实验包结构

## 指标定义 | Metric Definition

主指标：`evidence_traceability_rate`

定义：

$$
\text{evidence\_traceability\_rate} = \frac{\text{结论中具有有效 evidence 定位的条目数}}{\text{全部诊断结论条目数}}
$$

辅助指标：

- `unsupported_conclusion_ratio`
- `invalid_evidence_pointer_ratio`
- `evidence_to_source_resolution_time`

有效 evidence 的最低要求：

- 可定位到 sentence、segment 或 relation
- 指针存在且能被解析
- 解析结果与结论文本语义不明显冲突

## 研究任务定义 | Study Definition

```yaml
study_id: STUDY-EVIDENCE-001
title: 单文诊断结论证据可回链率评估
research_track: computational_linguistics
research_question: NarrativeOS 输出的诊断结论中，有多少比例能够稳定回链到有效原文证据？
hypothesis: 在 strict evidence level 下，结论证据可回链率应高于 basic evidence level。
task_definition: explanation_traceability_audit
baseline: human_reviewer_checklist
status: study-ready
```

## 数据输入 | Input Data

最小输入由三部分组成：

- 诊断 JSON 输出
- 对应原文或可定位文本切片
- evidence 指针解析器版本

示例结构：

```json
{
  "document_id": "doc-001",
  "profile": "full_mri",
  "diagnostics": [
    {
      "id": "diag-01",
      "summary": "长句连续堆叠导致阅读疲劳",
      "evidence": ["sentence:12", "sentence:13"]
    },
    {
      "id": "diag-02",
      "summary": "中段主题迁移过快",
      "evidence": ["segment:5"]
    }
  ]
}
```

## 复现步骤 | Repro Steps

1. 固定 `document_id`、模型版本与 evidence parser 版本。
2. 导出 diagnostics JSON 与原文切片索引。
3. 运行 evidence pointer resolver，检查每条 evidence 是否可解析。
4. 由人工 reviewer 对可解析结果进行语义复核。
5. 计算主指标和辅助指标，并输出失败条目列表。

## 人工复核清单 | Human Review Checklist

每条 diagnostics 至少检查：

- evidence 是否存在
- evidence 是否可解析
- evidence 是否定位到正确句段
- 证据是否足以支持该结论
- 若不足，失败原因属于哪一类

失败原因建议标签：

- `missing_pointer`
- `invalid_pointer`
- `wrong_resolution`
- `weak_support`
- `version_mismatch`

## 输出物 | Outputs

最小输出物包括：

- metrics summary
- failure case table
- 3 个成功样本
- 3 个失败样本
- 解析器版本与环境记录

示例：

```yaml
metrics_summary:
  evidence_traceability_rate: 0.91
  unsupported_conclusion_ratio: 0.06
  invalid_evidence_pointer_ratio: 0.03
failure_case_table:
  - diag_id: diag-08
    failure_reason: weak_support
  - diag_id: diag-11
    failure_reason: invalid_pointer
```

## 最小环境记录 | Environment Record

```yaml
env:
  os: macos
  python: 3.12
  node: 20.x
  parser_version: parser-v1
  schema_version: diagnostics-v1
```

## 常见失真来源 | Common Distortions

- diagnostics 版本与 evidence parser 版本不一致
- 文本切片更新后未同步刷新 evidence 指针
- 结论摘要由上层重写，导致与原始证据脱节
- 只验证指针存在，不验证语义支持强度

## 发布要求 | Release Expectations

若要把该指标升级为 `measured`，至少还需：

- 明确样本量与时间窗口
- 明确 strict/basic 两种 evidence level 的口径差异
- 至少 1 轮人工复核记录
- 在 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) 中登记版本和 evidence_link

## 与现有文档关系 | Related Mapping

- 方法学总则： [research-methodology-and-reproducibility.md](research-methodology-and-reproducibility.md)
- benchmark： [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- 证据台账： [evidence-registry.md](evidence-registry.md)
- 分析引擎输出契约： [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)

## 执行作业单 | Execution Worksheet

若要把本复现包示例转化为一次 measured snapshot 采集，使用：

- [bench-task-001-evidence-traceability-audit.md](bench-task-001-evidence-traceability-audit.md)