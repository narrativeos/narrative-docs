# BENCH-TASK-001 证据回链率测量作业单

## Executive Summary (EN)

This worksheet operationalizes BENCH-TASK-001 for producing a measured snapshot of evidence traceability rate in NarrativeOS.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-bench-task-001-evidence-traceability-audit
path: whitepaper/bench-task-001-evidence-traceability-audit.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: BENCH-TASK-001
status: in_progress
owner: research
reviewer: maintainer
```

## 任务目标 | Goal

产出 1 组可回链的 `evidence_traceability_rate` measured 快照，并将结果回填到 benchmark 与 evidence registry。

## 关联文档 | Related Docs

- [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [evidence-registry.md](evidence-registry.md)
- [research-methodology-and-reproducibility.md](research-methodology-and-reproducibility.md)

## 输入物清单 | Inputs

- diagnostics JSON
- evidence parser 版本
- 人工复核记录
- 样本时间窗口
- schema 版本

## 推荐开放获取校准样本 | Recommended Open-Access Calibration Paper

若首轮只选 1 篇公开可获取论文验证 evidence traceability 流程，建议优先使用更贴近文学叙事的候选：

```yaml
preferred_calibration_paper:
  title: Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy
  doi: 10.1080/21514399.2011.11833931
  venue: Chinese Literature Today
```

流程型备选候选：

```yaml
backup_calibration_paper:
  title: Digital heroism in Indonesian media: Cross-Cultural solidarity and viral narrative transformation
  doi: 10.1016/j.ssaho.2025.102295
  venue: Social Sciences & Humanities Open
  year: 2025
  rationale:
    - open-access journal article
    - argument structure is suitable for diagnostics-to-evidence linking
    - narrative topic makes theme-shift and claim-evidence checks easier to observe
```

使用边界：

- 首轮可用它做 evidence pointer 与人工复核流程校准
- 不应将单篇结果直接升级为总体 measured 结论

## 执行步骤 | Steps

1. 冻结样本集合与时间窗口。
2. 记录 parser/schema/model 版本。
3. 运行 evidence pointer resolver。
4. 完成人工复核并标注失败原因。
5. 计算 metrics summary。
6. 生成 failure case table。
7. 回填 benchmark 与 evidence registry。

## 回填模板 | Fill-in Template

```yaml
run_id: BENCH-RUN-001
task_id: BENCH-TASK-001
status: pending | in_progress | done
sample_size: TBD
time_window: TBD
document_set: TBD
env:
  parser_version: TBD
  schema_version: TBD
  model_versions: TBD
metrics_summary:
  evidence_traceability_rate: TBD
  unsupported_conclusion_ratio: TBD
  invalid_evidence_pointer_ratio: TBD
failure_case_count: TBD
evidence_link: TBD
owner: research
reviewer: maintainer
```

## 首轮执行草稿 | Starter Draft

以下内容是建议的首轮采样与记录口径，用于把本作业单从空模板推进到可执行状态。

```yaml
starter_run:
  run_id: BENCH-RUN-001
  task_id: BENCH-TASK-001
  status: in_progress
  sample_size_target: 20
  time_window: 2026-06-01..2026-06-07
  seed_paper_doi: 10.1080/21514399.2011.11833931
  backup_paper_doi: 10.1016/j.ssaho.2025.102295
  document_set:
    - longform-zh-sample-01
    - longform-zh-sample-02
    - longform-zh-sample-03
    - longform-zh-sample-04
    - longform-zh-sample-05
  evidence_level_comparison:
    - basic
    - strict
  env:
    parser_version: parser-v1
    schema_version: diagnostics-v1
    model_versions: freeze-at-run-start
  required_outputs:
    - metrics_summary.yaml
    - failure_case_table.md
    - reviewer_notes.md
```

说明：

- 首轮建议先做 20 份 diagnostics，而不是直接追求大样本
- 首轮目标是验证口径是否稳定，不是追求好看的 measured 数值
- 若 `basic` 和 `strict` 两组口径无法稳定区分，先修正文档和解析器，再扩大样本

## Preflight 记录 | Preflight Record

以下记录仅表示 BENCH 任务已经进入 preflight 阶段，不表示 measured 快照已经产出。

```yaml
preflight_record:
  run_id: BENCH-RUN-001-PREFLIGHT
  task_id: BENCH-TASK-001
  status: in_progress
  date_started: 2026-05-30
  objective: validate evidence traceability workflow before measured snapshot
  calibration_sample_doi: 10.1080/21514399.2011.11833931
  backup_sample_doi: 10.1016/j.ssaho.2025.102295
  measured_snapshot_status: not_started
  next_actions:
    - freeze first diagnostics sample set
    - record parser and schema versions
    - produce first reviewer-facing failure table draft
```

当前 preflight 判断：

- 校准样本已确定
- measured 快照尚未产生
- 当前阶段只能验证 evidence pointer 流程与复核口径，不能宣称 benchmark 已升级

## 人工复核记录 | Human Review Notes

- 复核人：TBD
- 复核日期：TBD
- 主要失败类型：TBD
- 边界样本说明：TBD

建议首轮失败类型优先统计以下四类：

- `missing_pointer`
- `invalid_pointer`
- `wrong_resolution`
- `weak_support`

## 最小输出模板 | Minimal Output Templates

### metrics_summary.yaml

```yaml
run_id: BENCH-RUN-001
sample_size: TBD
time_window: TBD
evidence_traceability_rate: TBD
unsupported_conclusion_ratio: TBD
invalid_evidence_pointer_ratio: TBD
notes: 首轮只用于口径校准，不用于对外宣称 measured
```

### failure_case_table.md

```md
| diag_id | document_id | failure_reason | reviewer_note |
| --- | --- | --- | --- |
| TBD | TBD | missing_pointer | TBD |
| TBD | TBD | weak_support | TBD |
```

第一版 reviewer failure table 草稿：

```md
| diag_id | document_id | failure_reason | reviewer_note |
| --- | --- | --- | --- |
| DIAG-PREFLIGHT-001 | cal-paper-bodywriting-01 | missing_pointer | 结论句存在，但未能解析到明确证据片段锚点；需检查 pointer schema 是否允许段内偏移 |
| DIAG-PREFLIGHT-002 | cal-paper-bodywriting-01 | invalid_pointer | pointer 指向的段落编号超出当前切片范围；需检查分段前后的索引重写 |
| DIAG-PREFLIGHT-003 | cal-paper-bodywriting-01 | weak_support | 命中的证据片段与结论主题相关，但不足以支撑“城市症候”级判断 |
```

使用说明：

- 上述条目是 reviewer-facing 草稿样式，不表示真实 measured 失败统计已经形成。
- 其作用是先冻结 failure taxonomy 和 reviewer note 写法，便于后续真实回填。

### reviewer_notes.md

```md
# Reviewer Notes

- Reviewers: TBD
- Review Date: TBD
- Boundary Cases:
  - TBD
- Version Risks:
  - TBD
```

## 完成定义 | Definition of Done

- 至少 1 份 metrics summary
- 至少 1 份 failure case table
- 至少 1 条 benchmark evidence 可回链
- benchmark 文档中的对应指标已补 version、sample_size、time_window 或明确标为仍未升级

## 当前状态 | Current Status

- 状态：in_progress
- 已准备：首轮执行草稿、建议样本规模与失败类型口径
- 阻塞项：缺真实 diagnostics 样本与人工复核记录
