# Product V1 Frontend Issue Breakdown

## 摘要（中文）

本页把 V1 原型规格转成可直接分配的前端 issue 清单，按页面拆分并统一组件、入参、出参与验收标准。

## Executive Summary (EN)

This page converts the V1 prototype spec into sprint-ready frontend issues, split by screens with component contracts and acceptance criteria.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-v1-frontend-issue-breakdown
path: product/prototype/v1-frontend-issue-breakdown.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, frontend, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用说明

- 每条 issue 可直接复制为 narrative-studio 或 narrative-editor 的工单。
- 估时单位建议使用 story points（SP）。
- 验收必须引用 dataset_id 执行，不接受纯静态页面验收。

## 标签与优先级约定

- Priority: P0 | P1 | P2
- Type: feature | chore | telemetry | qa
- Area: workspace | atlas | insight | export | repair | degrade | proofreading

## Epic FE-V1-001: Workspace Single-Doc Loop

### FE-V1-001-01 Import + Fast Start 页面骨架

- Priority: P0
- Type: feature
- Area: workspace
- Components:
  - ImportPanel
  - DocumentMetaCard
  - FastFeedbackCard
  - DeepProgressBar
- Inputs:
  - dataset_id
  - input.title
  - input.word_count
  - input.paragraph_count
  - runtime.expected_fast_latency_ms
  - runtime.queue_state
- Outputs:
  - onImportSubmitted(payload)
  - onFastFeedbackShown(dataset_id, latency_ms, queue_state)
  - onDeepProgressChanged(dataset_id, deep_status)
- Acceptance Criteria:
  - 导入后可展示文稿基础信息（title、word_count、paragraph_count）。
  - Fast 首次反馈可见且状态可追踪（queued/running/completed）。
  - 绑定 DS-V1-AUTHOR-SHORT-001 与 DS-V1-AUTHOR-LONG-001 演示通过。
  - 触发事件 EVT-P1-FAST-FIRST-FEEDBACK，字段完整。
- Estimate: 5 SP
- Depends On: FE-V1-001-10

### FE-V1-001-02 Workspace 三栏容器与状态同步

- Priority: P0
- Type: feature
- Area: workspace
- Components:
  - WorkspaceShell
  - TextPaneContainer
  - AtlasViewContainer
  - InsightPanelContainer
- Inputs:
  - dataset_id
  - view_mode
  - active_sentence_ref
  - active_layer
  - active_diagnostic_id
- Outputs:
  - onSentenceSelected(sentence_ref)
  - onAtlasNodeSelected(node_id, mapped_sentence_refs)
  - onDiagnosticSelected(diagnostic_id)
- Acceptance Criteria:
  - 三栏布局在 desktop 下固定工作区，不因侧栏交互抖动。
  - 切换 layer 时右栏结论上下文不丢失。
  - 从任一栏触发选择，其他两栏 300ms 内完成联动高亮。
- Estimate: 8 SP
- Depends On: FE-V1-001-10

### FE-V1-001-03 Text Pane 句段定位与回跳

- Priority: P0
- Type: feature
- Area: workspace
- Components:
  - TextPane
  - SentenceAnchor
  - ParagraphAnchor
  - TextScrollLocator
- Inputs:
  - doc_id
  - sentence_ref
  - paragraph_ref
  - highlight_mode
- Outputs:
  - onTextAnchorLocated(sentence_ref, status)
  - onTextSelectionChanged(sentence_ref)
- Acceptance Criteria:
  - 支持按 sentence_ref 精确滚动定位并高亮。
  - Insight 证据点击后可跳转至目标句段。
  - 锚点不存在时返回 EvidenceBroken 状态，不静默失败。
- Estimate: 5 SP
- Depends On: FE-V1-001-02

### FE-V1-001-04 Atlas 四层视图切换与锚点联动

- Priority: P0
- Type: feature
- Area: atlas
- Components:
  - AtlasView
  - LayerSwitcher
  - StructureTerrainView
  - SemanticGalaxyView
  - RhythmTimelineView
  - HeatLayerView
- Inputs:
  - output.engines.lexical_dna.artifacts
  - output.engines.syntax_rhythm.artifacts
  - output.engines.semantic_network.artifacts
  - output.engines.narrative_flow.artifacts
  - output.engines.rhetoric_style.artifacts
  - output.engines.emotion_sensory.artifacts
  - active_sentence_ref
- Outputs:
  - onLayerChanged(layer_id)
  - onAtlasSignalClicked(signal_id, sentence_ref)
  - onAtlasNodeFocused(node_id, sentence_refs)
- Acceptance Criteria:
  - 四层视图可切换且保持当前文本上下文。
  - 点击 Atlas 节点可反向定位 TextPane。
  - 至少支持 DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001 的 artifact 渲染。
- Estimate: 8 SP
- Depends On: FE-V1-001-02

### FE-V1-001-05 Insight Panel 结论卡与证据链

- Priority: P0
- Type: feature
- Area: insight
- Components:
  - InsightPanel
  - ConclusionCard
  - EvidenceLinkList
  - ShowEvidenceButton
- Inputs:
  - output.engines.*.diagnostics
  - output.evidence_links[].sentence_ref
  - output.evidence_links[].evidence_type
  - output.evidence_links[].confidence
  - output.summary_metrics
- Outputs:
  - onEvidenceClick(dataset_id, sentence_ref, evidence_type)
  - onDiagnosticCardOpened(diagnostic_id)
- Acceptance Criteria:
  - 右栏输出严格按 结论 -> 证据 -> 原文 顺序呈现。
  - 每条结论至少展示 1 个 evidence 链接。
  - 点击 Show Evidence 触发 EVT-P2-EVIDENCE-CLICK 且完成原文定位。
- Estimate: 8 SP
- Depends On: FE-V1-001-03, FE-V1-001-10

### FE-V1-001-06 Degrade Recovery 页面与动作闭环

- Priority: P0
- Type: feature
- Area: degrade
- Components:
  - DegradeBanner
  - DegradeReasonPanel
  - DegradeActionBar
- Inputs:
  - runtime.queue_state
  - degrade_reason_code
  - available_actions: [retry_deep, continue_fast, export_partial]
- Outputs:
  - onRetryDeep(dataset_id)
  - onContinueFast(dataset_id)
  - onExportPartial(dataset_id)
  - onDegradeEntered(dataset_id, queue_state, reason_code)
- Acceptance Criteria:
  - queue_state=high_watermark 时进入 Degraded 状态并显示原因。
  - 三个动作按钮均可触发且状态可回写。
  - 触发 EVT-P3-DEGRADE-ENTER，字段完整。
  - 绑定 DS-V1-DEGRADE-001 演示通过。
- Estimate: 5 SP
- Depends On: FE-V1-001-01

### FE-V1-001-07 Evidence Repair 失败恢复流

- Priority: P0
- Type: feature
- Area: repair
- Components:
  - EvidenceRepairPanel
  - BrokenAnchorAlert
  - RetryAnchorButton
  - NearbyEvidencePicker
  - ReportIssueButton
- Inputs:
  - broken_sentence_ref
  - evidence_type
  - retry_count
  - nearby_candidates[]
- Outputs:
  - onRetryAnchor(dataset_id, sentence_ref, retry_count)
  - onSwitchNearbyEvidence(dataset_id, from_ref, to_ref)
  - onReportEvidenceIssue(dataset_id, sentence_ref)
- Acceptance Criteria:
  - 锚点失效时显示 Evidence anchor not found，不可静默。
  - Retry Anchor 与 Switch Nearby Evidence 至少一条可恢复。
  - 恢复失败可 MarkAsIssue 并留痕。
  - 触发 EVT-P4-EVIDENCE-RETRY，字段完整。
  - 绑定 DS-V1-EVIDENCE-FAIL-001 演示通过。
- Estimate: 8 SP
- Depends On: FE-V1-001-03, FE-V1-001-05

### FE-V1-001-08 Export + Replay 页面闭环

- Priority: P1
- Type: feature
- Area: export
- Components:
  - ExportCenter
  - ExportStatusCard
  - ReplayValidationCard
  - ReadonlyFallbackHint
- Inputs:
  - dataset_id
  - snapshot_id
  - replay_result
  - manifest_consistency
- Outputs:
  - onExportStarted(dataset_id)
  - onExportCompleted(dataset_id, snapshot_id)
  - onReplayValidated(dataset_id, snapshot_id, replay_result)
- Acceptance Criteria:
  - 导出成功展示 report 与 snapshot_id。
  - replay_result 为 fail 时提供 fallback 到只读报告建议。
  - 触发 EVT-P5-EXPORT-REPLAY，字段完整。
  - 绑定 DS-V1-EXPORT-001 演示通过。
- Estimate: 5 SP
- Depends On: FE-V1-001-05, FE-V1-001-10

### FE-V1-001-09 Proofreading Workbench（P0/P1/P2）

- Priority: P1
- Type: feature
- Area: proofreading
- Components:
  - ProofreadingIssueBoard
  - SuggestionApplyPanel
  - RuleEvidencePanel
  - RegistryActionPanel
- Inputs:
  - issue_type: typo | grammar | punctuation | consistency | knowledge | risk | official_doc
  - suggestion
  - rule_id
  - source_span
  - confidence
  - traceability
  - lifecycle: candidate | shadow_only | active | deprecated
- Outputs:
  - onSuggestionApplied(dataset_id, issue_id)
  - onRegistryAction(dataset_id, term_id, action)
  - onThresholdBreached(dataset_id, metric_name, tier, observed_value)
- Acceptance Criteria:
  - issue_type 分组展示完整。
  - suggestion 支持 apply 与 undo。
  - traceability=pass 的建议均可回链证据。
  - 触发 EVT-P6-PROOFREAD-APPLY、EVT-P7-TERM-REGISTRY-ACTION、EVT-P8-THRESHOLD-BREACH。
  - 绑定 DS-V1-PRF-P0-001、DS-V1-PRF-P1-001、DS-V1-PRF-P2-001 演示通过。
- Estimate: 8 SP
- Depends On: FE-V1-001-05

### FE-V1-001-10 前端契约适配层与状态机

- Priority: P0
- Type: chore
- Area: workspace
- Components:
  - ContractAdapter
  - ViewModelNormalizer
  - FrontendStateMachine
- Inputs:
  - raw mock_record
  - runtime state
  - interaction events
- Outputs:
  - normalized view model
  - UI state transitions: Idle -> Importing -> FastReady -> DeepRunning -> DeepCompleted -> ExportReady
  - failure states: Degraded, EvidenceBroken
- Acceptance Criteria:
  - 契约字段映射覆盖 output.engines、summary_metrics、evidence_links、coverage_assertion。
  - 状态机转移可通过单元测试验证。
  - 不允许 UI 直接耦合引擎内部字段约定之外的实现细节。
- Estimate: 8 SP
- Depends On: 无

### FE-V1-001-11 事件埋点与可观测性

- Priority: P0
- Type: telemetry
- Area: insight
- Components:
  - EventTracker
  - EventSchemaValidator
  - SessionTracePanel
- Inputs:
  - EVT-P1..EVT-P8 payload
- Outputs:
  - validated events
  - missing field alerts
  - session event timeline
- Acceptance Criteria:
  - EVT-P1..EVT-P8 全部接线并通过 schema 校验。
  - 缺字段事件可在开发环境即时报警。
  - 可按 dataset_id 回放关键交互轨迹。
- Estimate: 5 SP
- Depends On: FE-V1-001-01..09

### FE-V1-001-12 QA 场景验收与回归包

- Priority: P0
- Type: qa
- Area: workspace
- Components:
  - ScenarioRunner
  - AcceptanceChecklistPanel
  - RegressionReportGenerator
- Inputs:
  - scene_id
  - dataset_id
  - gate rules
- Outputs:
  - scenario pass/fail report
  - gate check results
  - regression snapshot
- Acceptance Criteria:
  - SCN-V1-001..005 主路径与失败路径跑通。
  - Gate-00 至 Gate-07 有自动或半自动校验结果。
  - 产出可归档的回归报告。
- Estimate: 5 SP
- Depends On: FE-V1-001-01..11

## Sprint 建议排期（两周）

- Week 1:
  - FE-V1-001-10
  - FE-V1-001-01
  - FE-V1-001-02
  - FE-V1-001-03
  - FE-V1-001-05
  - FE-V1-001-11（并行）
- Week 2:
  - FE-V1-001-04
  - FE-V1-001-06
  - FE-V1-001-07
  - FE-V1-001-08
  - FE-V1-001-09
  - FE-V1-001-12

## DoR / DoD 统一标准

### Definition of Ready

- 有明确 dataset_id 与 scene_id。
- 入参与出参字段完整。
- 有可执行验收标准与触发事件。

### Definition of Done

- 页面交互与事件埋点同时通过。
- 证据链满足 结论 -> 证据 -> 原文。
- 失败路径可恢复或可留痕。
- 验收记录可追溯到场景数据与回归报告。

## 可直接复制的 Issue 模板

标题：FE-V1-XXX <页面> <功能>

- Priority:
- Type:
- Area:
- Components:
- Inputs:
- Outputs:
- Acceptance Criteria:
- Estimate:
- Depends On:
- Dataset Binding:
- Event Binding:
