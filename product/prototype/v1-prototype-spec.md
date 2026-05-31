# Product V1 Prototype Specification

## 摘要（中文）

本页在场景 mock 数据基础上定义 V1 产品原型，覆盖信息架构、页面结构、关键交互、状态机、失败路径与评审门槛。

## Executive Summary (EN)

This document defines the Product V1 prototype based on scenario mock datasets, including IA, screen specs, interaction states, failure handling, and review gates.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-v1-prototype-spec
path: product/prototype/v1-prototype-spec.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, design, developer, qa, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 设计前置依赖

- 必须先加载场景数据：../scenarios/v1-mock-simulation-dataset.md
- 原型评审必须按 scene_id + dataset_id 执行，不接受纯静态页面评审。

## 原型目标

- 验证 V1 的单文闭环体验是否成立。
- 验证 Fast/Deep 双路径在真实交互中的可理解性。
- 验证失败与降级路径在产品层是否可解释、可恢复。

## 信息架构（IA）

```text
Workspace
  ├─ Import Panel
  ├─ Diagnostic Console
  │   ├─ Fast Summary
  │   ├─ Deep Progress
  │   └─ Degrade Explanation
  ├─ Atlas View
  │   ├─ Structure Terrain
  │   ├─ Semantic Galaxy
  │   ├─ Rhythm Timeline
  │   └─ Heat Layer
  ├─ Insight Panel
  │   ├─ Conclusion Cards
  │   ├─ Evidence Links
  │   └─ Retry/Repair Actions
  └─ Export Center
      ├─ Report Export
      └─ Snapshot Replay
```

## 页面规格

### Screen P1: Import + Fast Start

目标：导入后 2 秒内出现首次可用反馈。

主要元素：

- 文稿基本信息卡（title/word_count/paragraph_count）
- Fast Scan 首次反馈卡（latency、关键指标）
- Deep 分析状态条（queued/running/completed）

绑定数据：DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001

### Screen P2: Workspace Tri-pane

目标：形成阅读-观察-诊断连续回路。

布局：

- 左栏 Text Pane
- 中栏 Atlas View
- 右栏 Insight Panel

关键交互：

- 点击句子 -> Atlas 对应节点高亮
- 点击 Insight 证据 -> 左栏定位原文句子
- 切换 Layer 保持右栏结论上下文不丢失

绑定数据：DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001

### Screen P3: Degrade Recovery

目标：系统降级时仍可解释、可继续。

状态组件：

- 当前状态：Degraded due to queue pressure
- 降级原因：queue_state/high_watermark
- 可执行动作：Retry Deep、Continue Fast、Export Partial

绑定数据：DS-V1-DEGRADE-001

### Screen P4: Evidence Repair

目标：当 evidence link 失效时引导修复而非静默失败。

状态组件：

- 失效提示：Evidence anchor not found
- 修复动作：Retry Anchor、Switch Nearby Evidence、Report Issue
- 修复结果：新锚点回链或标记为待修复

绑定数据：DS-V1-EVIDENCE-FAIL-001

### Screen P5: Export + Replay

目标：导出结果可复现，manifest 与 artifact 一致。

状态组件：

- Export 成功提示（report + snapshot_id）
- Replay 校验结果（pass/fail）
- 失败时回滚建议（fallback 到只读报告）

绑定数据：DS-V1-EXPORT-001

## 交互状态机

```text
Idle
  -> Importing
  -> FastReady
  -> DeepRunning
  -> DeepCompleted
  -> ExportReady

DeepRunning
  -> Degraded
  -> DeepCompleted

Degraded
  -> RetryDeep
  -> ContinueFast
  -> ExportPartial

EvidenceBroken
  -> RetryAnchor
  -> SwitchNearbyEvidence
  -> MarkAsIssue
```

## 事件与埋点（原型阶段）

| event_id | Trigger | Required Fields |
| --- | --- | --- |
| EVT-P1-FAST-FIRST-FEEDBACK | Fast 首次反馈出现 | dataset_id, latency_ms, queue_state |
| EVT-P2-EVIDENCE-CLICK | 点击证据链 | dataset_id, sentence_ref, evidence_type |
| EVT-P3-DEGRADE-ENTER | 进入降级模式 | dataset_id, queue_state, reason_code |
| EVT-P4-EVIDENCE-RETRY | 证据修复动作触发 | dataset_id, retry_count, result |
| EVT-P5-EXPORT-REPLAY | 导出后回放校验 | dataset_id, snapshot_id, replay_result |

## 原型评审门槛

- Gate-01：五个场景均可跑通主路径。
- Gate-02：SCN-V1-003 与 SCN-V1-004 的失败路径有明确恢复动作。
- Gate-03：所有结论卡可回链到 sentence_ref（SCN-V1-004 允许先失败后恢复）。
- Gate-04：导出与回放在 SCN-V1-005 中一致性通过。

## 输出物清单

- 低保真流程稿（Lo-fi flow）
- 高保真关键屏（Hi-fi key screens）
- 交互状态表（state + transition）
- 场景验收记录（scene_id + dataset_id）

## 关联文档

- ../v1-design-baseline.md
- ../v1-two-week-sprint-plan.md
- ../scenarios/v1-mock-simulation-dataset.md
- ../workflows/README.md
