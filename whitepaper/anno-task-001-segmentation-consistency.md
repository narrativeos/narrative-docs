# ANNO-TASK-001 叙事分段一致性作业单

## Executive Summary (EN)

This worksheet operationalizes ANNO-TASK-001 for recording a double-annotation run and agreement metrics for narrative segmentation.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-anno-task-001-segmentation-consistency
path: whitepaper/anno-task-001-segmentation-consistency.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, annotator, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: ANNO-TASK-001
status: in_progress
owner: research
reviewer: maintainer
```

## 任务目标 | Goal

完成 1 次叙事分段双标注与一致性记录，形成至少 1 个 agreement 指标和 1 组冲突案例说明。

## 关联文档 | Related Docs

- [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md)
- [research-methodology-and-reproducibility.md](research-methodology-and-reproducibility.md)
- [evidence-registry.md](evidence-registry.md)

## 输入物清单 | Inputs

- 双标注结果
- 仲裁记录
- 文本切片或段落索引
- 标注者培训说明

## 推荐开放获取校准样本 | Recommended Open-Access Calibration Paper

若首轮只选 1 篇公开可获取论文做协议校准，建议优先使用更贴近文学叙事的候选：

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
    - journal article segmentation is clearer than book-length prose
    - contains claim progression and thematic pivots suitable for boundary discussion
    - publicly traceable for arbitration and reviewer replay
```

使用边界：

- 首轮只用于协议校准与冲突模式观察
- 正式评测集仍应扩展到多篇文本

## 执行步骤 | Steps

1. 选择一组最小文本样本并编号。
2. 由两位标注者独立完成边界标注。
3. 汇总标签冲突和边界冲突。
4. 计算一致性指标。
5. 完成仲裁并记录典型冲突样本。
6. 回填 workflow evidence。

## 回填模板 | Fill-in Template

```yaml
run_id: ANNO-RUN-001
task_id: ANNO-TASK-001
status: pending | in_progress | done
sample_set: TBD
annotators:
  - TBD
  - TBD
agreement_metrics:
  boundary_kappa: TBD
  label_alpha: TBD
conflict_cases: TBD
arbitration_summary: TBD
evidence_link: TBD
owner: research
reviewer: maintainer
```

## 首轮执行草稿 | Starter Draft

以下内容是建议的首轮双标注配置，用于先验证协议清晰度，而不是立即构造正式评测集。

```yaml
starter_run:
  run_id: ANNO-RUN-001
  task_id: ANNO-TASK-001
  status: in_progress
  seed_paper_doi: 10.1080/21514399.2011.11833931
  backup_paper_doi: 10.1016/j.ssaho.2025.102295
  sample_set:
    documents: 6
    paragraphs_per_doc_target: 8-20
    total_candidate_boundaries_target: 60-100
  annotators:
    - annotator-a
    - annotator-b
  arbitration_role: senior-reviewer
  required_outputs:
    - raw_annotations.yaml
    - agreement_metrics.yaml
    - arbitration_notes.md
    - conflict_cases.md
```

说明：

- 首轮建议先用 6 篇文本做协议校准
- 若首轮冲突密度过高，优先修协议示例，不要急于扩样本
- 正式评测样本应在协议校准稳定后另建

## Preflight 记录 | Preflight Record

以下记录仅表示 ANNO 任务已经进入 preflight 阶段，不表示正式一致性评测已经完成。

```yaml
preflight_record:
  run_id: ANNO-RUN-001-PREFLIGHT
  task_id: ANNO-TASK-001
  status: in_progress
  date_started: 2026-05-30
  objective: validate segmentation protocol clarity before formal evaluation set
  calibration_sample_doi: 10.1080/21514399.2011.11833931
  backup_sample_doi: 10.1016/j.ssaho.2025.102295
  formal_evaluation_status: not_started
  next_actions:
    - freeze first annotator pair
    - prepare paragraph indexing rules
    - produce first conflict case sheet draft
```

当前 preflight 判断：

- 协议校准样本已确定
- 正式一致性评测尚未开始
- 当前阶段只能验证标签边界与仲裁流程，不能宣称 agreement 指标已经形成

## 冲突案例记录 | Conflict Notes

- 冲突样本 1：TBD
- 冲突样本 2：TBD
- 仲裁原则：TBD

建议首轮重点观察以下冲突类型：

- `bridge_transition` 与 `no_boundary` 的混淆
- `topic_shift` 与 `rhetorical_pivot` 的混淆
- 单段内部转折是否应记为 `intra_paragraph_candidate`

## 最小输出模板 | Minimal Output Templates

### raw_annotations.yaml

```yaml
document_id: TBD
annotator: annotator-a
boundaries:
  - paragraph: 3
    label: topic_shift
    confidence: high
    notes: TBD
```

### agreement_metrics.yaml

```yaml
run_id: ANNO-RUN-001
boundary_kappa: TBD
label_alpha: TBD
sample_size: TBD
notes: 首轮用于协议校准，未达门槛时不得作为正式评测集
```

### conflict_cases.md

```md
| case_id | document_id | annotator_a | annotator_b | arbitration | note |
| --- | --- | --- | --- | --- | --- |
| TBD | TBD | no_boundary | bridge_transition | TBD | TBD |
```

第一版 conflict case sheet 草稿：

```md
| case_id | document_id | annotator_a | annotator_b | arbitration | note |
| --- | --- | --- | --- | --- | --- |
| ANNO-PREFLIGHT-001 | cal-paper-bodywriting-01 | no_boundary | bridge_transition | bridge_transition | 句段表面连续，但叙事功能从场景描述切到解释性串联，保守记为过桥边界 |
| ANNO-PREFLIGHT-002 | cal-paper-bodywriting-01 | topic_shift | rhetorical_pivot | rhetorical_pivot | 主题未完全切换，核心变化是论证姿态转折，因此不按 topic_shift 处理 |
| ANNO-PREFLIGHT-003 | cal-paper-bodywriting-01 | bridge_transition | no_boundary | no_boundary | 若缺少稳定的前后主题差异证据，则不应为了局部连接词强行标边界 |
```

使用说明：

- 上述条目是协议校准用的冲突样式草稿，不表示真实双标注已经完成。
- 其作用是先冻结冲突记录格式和仲裁语言，便于后续真实样本回填。

### arbitration_notes.md

```md
# Arbitration Notes

- Reviewer: TBD
- Principle Applied: 持续性证据优先 / 主题变化优先 / 场景变化优先
- Key Disputes:
  - TBD
```

## 完成定义 | Definition of Done

- 至少 1 个边界一致性指标
- 至少 1 个标签一致性指标或明确说明无法计算原因
- 至少 1 组冲突案例记录
- evidence registry 中对应 task 的结果链接已回填

## 当前状态 | Current Status

- 状态：in_progress
- 已准备：首轮双标注样本规模、角色分工与输出物清单
- 阻塞项：缺双标注结果与仲裁记录
