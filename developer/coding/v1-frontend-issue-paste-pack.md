# Product V1 Frontend Issue Paste Pack (Jira / Linear)

## 摘要（中文）

本页提供可直接粘贴到 Jira 或 Linear 的前端工单文本，按页面与能力拆分，默认采用 V1 数据集与事件口径。

## Executive Summary (EN)

This page provides copy-paste ready frontend tickets for Jira/Linear, aligned with V1 datasets and event contracts.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-v1-frontend-issue-paste-pack
path: product/prototype/v1-frontend-issue-paste-pack.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, frontend, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 使用方式

- 将每条 Ticket 作为独立 issue 创建。
- 保留 Ticket ID 作为跨团队依赖键。
- 必须绑定 scene_id + dataset_id 做验收。

## Ticket FE-101

Title: [V1][Workspace] Import + Fast Start 页面骨架

Labels: frontend, v1, p0, workspace, feature

Description:
- 实现 ImportPanel、DocumentMetaCard、FastFeedbackCard、DeepProgressBar。
- 导入后显示 title、word_count、paragraph_count。
- Fast 首次反馈可见，Deep 状态可跟踪。

Inputs:
- dataset_id
- input.title
- input.word_count
- input.paragraph_count
- runtime.expected_fast_latency_ms
- runtime.queue_state

Outputs:
- onImportSubmitted(payload)
- onFastFeedbackShown(dataset_id, latency_ms, queue_state)
- onDeepProgressChanged(dataset_id, deep_status)

Acceptance:
- DS-V1-AUTHOR-SHORT-001 与 DS-V1-AUTHOR-LONG-001 演示通过。
- 事件 EVT-P1-FAST-FIRST-FEEDBACK 字段完整。

Estimate: 5 SP

Depends On:
- FE-110

## Ticket FE-102

Title: [V1][Workspace] 三栏容器与状态同步

Labels: frontend, v1, p0, workspace, feature

Description:
- 实现 WorkspaceShell、TextPaneContainer、AtlasViewContainer、InsightPanelContainer。
- 三栏联动保持阅读-观察-诊断连续回路。

Inputs:
- dataset_id
- view_mode
- active_sentence_ref
- active_layer
- active_diagnostic_id

Outputs:
- onSentenceSelected(sentence_ref)
- onAtlasNodeSelected(node_id, mapped_sentence_refs)
- onDiagnosticSelected(diagnostic_id)

Acceptance:
- desktop 三栏稳定布局。
- layer 切换后右栏上下文不丢失。
- 任一栏操作可在 300ms 内完成跨栏联动。

Estimate: 8 SP

Depends On:
- FE-110

## Ticket FE-103

Title: [V1][TextPane] sentence_ref 定位与回跳

Labels: frontend, v1, p0, workspace, feature

Description:
- 实现 TextPane、SentenceAnchor、ParagraphAnchor、TextScrollLocator。
- 支持按 sentence_ref 精确滚动定位和高亮。

Inputs:
- doc_id
- sentence_ref
- paragraph_ref
- highlight_mode

Outputs:
- onTextAnchorLocated(sentence_ref, status)
- onTextSelectionChanged(sentence_ref)

Acceptance:
- Insight 证据点击可定位到原文句段。
- 锚点不存在时进入 EvidenceBroken 状态。

Estimate: 5 SP

Depends On:
- FE-102

## Ticket FE-104

Title: [V1][Atlas] 四层视图切换与锚点联动

Labels: frontend, v1, p0, atlas, feature

Description:
- 实现 AtlasView 与四层视图切换。
- 节点点击支持回跳 TextPane。

Inputs:
- output.engines.lexical_dna.artifacts
- output.engines.syntax_rhythm.artifacts
- output.engines.semantic_network.artifacts
- output.engines.narrative_flow.artifacts
- output.engines.rhetoric_style.artifacts
- output.engines.emotion_sensory.artifacts
- active_sentence_ref

Outputs:
- onLayerChanged(layer_id)
- onAtlasSignalClicked(signal_id, sentence_ref)
- onAtlasNodeFocused(node_id, sentence_refs)

Acceptance:
- 四层切换保持上下文不丢失。
- DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001 可渲染 artifacts。

Estimate: 8 SP

Depends On:
- FE-102

## Ticket FE-105

Title: [V1][Insight] 结论卡 + 证据链 + Show Evidence

Labels: frontend, v1, p0, insight, feature

Description:
- 实现 InsightPanel、ConclusionCard、EvidenceLinkList、ShowEvidenceButton。
- 强制输出顺序为 结论 -> 证据 -> 原文。

Inputs:
- output.engines.*.diagnostics
- output.evidence_links[].sentence_ref
- output.evidence_links[].evidence_type
- output.evidence_links[].confidence
- output.summary_metrics

Outputs:
- onEvidenceClick(dataset_id, sentence_ref, evidence_type)
- onDiagnosticCardOpened(diagnostic_id)

Acceptance:
- 每条结论至少绑定 1 个 evidence。
- 点击 Show Evidence 触发 EVT-P2-EVIDENCE-CLICK 并完成原文定位。

Estimate: 8 SP

Depends On:
- FE-103
- FE-110

## Ticket FE-106

Title: [V1][Degrade] Degrade Recovery 页面与动作闭环

Labels: frontend, v1, p0, degrade, feature

Description:
- 实现 DegradeBanner、DegradeReasonPanel、DegradeActionBar。
- 支持 Retry Deep / Continue Fast / Export Partial。

Inputs:
- runtime.queue_state
- degrade_reason_code
- available_actions: [retry_deep, continue_fast, export_partial]

Outputs:
- onRetryDeep(dataset_id)
- onContinueFast(dataset_id)
- onExportPartial(dataset_id)
- onDegradeEntered(dataset_id, queue_state, reason_code)

Acceptance:
- queue_state=high_watermark 时进入 Degraded 并显示原因。
- 触发 EVT-P3-DEGRADE-ENTER 字段完整。
- DS-V1-DEGRADE-001 演示通过。

Estimate: 5 SP

Depends On:
- FE-101

## Ticket FE-107

Title: [V1][Repair] Evidence Repair 失败恢复流

Labels: frontend, v1, p0, repair, feature

Description:
- 实现 EvidenceRepairPanel、BrokenAnchorAlert、RetryAnchorButton、NearbyEvidencePicker、ReportIssueButton。
- 支持恢复或留痕闭环。

Inputs:
- broken_sentence_ref
- evidence_type
- retry_count
- nearby_candidates[]

Outputs:
- onRetryAnchor(dataset_id, sentence_ref, retry_count)
- onSwitchNearbyEvidence(dataset_id, from_ref, to_ref)
- onReportEvidenceIssue(dataset_id, sentence_ref)

Acceptance:
- 显示 Evidence anchor not found，不可静默失败。
- Retry 或 Switch 至少一条恢复路径成功。
- 触发 EVT-P4-EVIDENCE-RETRY。
- DS-V1-EVIDENCE-FAIL-001 演示通过。

Estimate: 8 SP

Depends On:
- FE-103
- FE-105

## Ticket FE-108

Title: [V1][Export] Export + Replay 闭环

Labels: frontend, v1, p1, export, feature

Description:
- 实现 ExportCenter、ExportStatusCard、ReplayValidationCard、ReadonlyFallbackHint。
- 导出后验证 replay 一致性。

Inputs:
- dataset_id
- snapshot_id
- replay_result
- manifest_consistency

Outputs:
- onExportStarted(dataset_id)
- onExportCompleted(dataset_id, snapshot_id)
- onReplayValidated(dataset_id, snapshot_id, replay_result)

Acceptance:
- 导出成功展示 report + snapshot_id。
- replay fail 时提供只读回退建议。
- 触发 EVT-P5-EXPORT-REPLAY。
- DS-V1-EXPORT-001 演示通过。

Estimate: 5 SP

Depends On:
- FE-105
- FE-110

## Ticket FE-109

Title: [V1][Proofreading] Workbench（P0/P1/P2）

Labels: frontend, v1, p1, proofreading, feature

Description:
- 实现 ProofreadingIssueBoard、SuggestionApplyPanel、RuleEvidencePanel、RegistryActionPanel。
- 支持建议 apply/undo、证据回链、术语动作。

Inputs:
- issue_type: typo | grammar | punctuation | consistency | knowledge | risk | official_doc
- suggestion
- rule_id
- source_span
- confidence
- traceability
- lifecycle: candidate | shadow_only | active | deprecated

Outputs:
- onSuggestionApplied(dataset_id, issue_id)
- onRegistryAction(dataset_id, term_id, action)
- onThresholdBreached(dataset_id, metric_name, tier, observed_value)

Acceptance:
- issue_type 分组完整。
- traceability=pass 的建议均可回链。
- 触发 EVT-P6、EVT-P7、EVT-P8。
- DS-V1-PRF-P0-001、DS-V1-PRF-P1-001、DS-V1-PRF-P2-001 演示通过。

Estimate: 8 SP

Depends On:
- FE-105

## Ticket FE-110

Title: [V1][Core] 契约适配层与前端状态机

Labels: frontend, v1, p0, core, chore

Description:
- 实现 ContractAdapter、ViewModelNormalizer、FrontendStateMachine。
- 统一契约字段映射，屏蔽 UI 对引擎内部细节的依赖。

Inputs:
- raw mock_record
- runtime state
- interaction events

Outputs:
- normalized view model
- state transitions: Idle -> Importing -> FastReady -> DeepRunning -> DeepCompleted -> ExportReady
- failure states: Degraded, EvidenceBroken

Acceptance:
- 覆盖 output.engines、summary_metrics、evidence_links、coverage_assertion 字段映射。
- 状态机转移有单元测试。

Estimate: 8 SP

Depends On:
- 无

## Ticket FE-111

Title: [V1][Telemetry] EVT-P1..EVT-P8 事件接线与校验

Labels: frontend, v1, p0, telemetry, chore

Description:
- 实现 EventTracker、EventSchemaValidator、SessionTracePanel。
- 支持 dataset_id 维度事件回放。

Inputs:
- EVT-P1..EVT-P8 payload

Outputs:
- validated events
- missing field alerts
- session event timeline

Acceptance:
- EVT-P1..EVT-P8 全部可采集与校验。
- 缺字段事件在开发环境告警。

Estimate: 5 SP

Depends On:
- FE-101
- FE-102
- FE-103
- FE-104
- FE-105
- FE-106
- FE-107
- FE-108
- FE-109

## Ticket FE-112

Title: [V1][QA] 场景验收与回归包生成

Labels: frontend, v1, p0, qa, test

Description:
- 实现 ScenarioRunner、AcceptanceChecklistPanel、RegressionReportGenerator。
- 按 scene_id + dataset_id 输出验收结果。

Inputs:
- scene_id
- dataset_id
- gate rules

Outputs:
- scenario pass/fail report
- gate check results
- regression snapshot

Acceptance:
- SCN-V1-001..005 主路径与失败路径跑通。
- Gate-00..Gate-07 有可追溯结果。
- 产出回归报告可归档。

Estimate: 5 SP

Depends On:
- FE-101
- FE-102
- FE-103
- FE-104
- FE-105
- FE-106
- FE-107
- FE-108
- FE-109
- FE-110
- FE-111
