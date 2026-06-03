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

## 本页用途 | Purpose

本页用于把 V1 场景数据转成可评审、可验证、可回滚的产品原型规格，统一页面职责、交互状态和通过门槛。

它不是视觉稿集合，也不是技术实现文档，而是产品原型的判断基线。

## 评审前提 | Review Preconditions

- 必须准备可导入资源包（单文件包或文件夹包），每次上传视为一本文献。
- 原型评审必须覆盖“上传资源包 -> 打开正文 -> 标注/检索 -> 导出”的完整路径，不接受纯静态页面评审。
- 原型评审前必须通过当前基线六引擎 I/O 全覆盖校验（见场景数据中的算法覆盖矩阵与 coverage_assertion 字段）。

## 原型目标 | Prototype Goals

- 验证 V1 的单文闭环体验是否成立。
- 验证 Fast/Deep 双路径在真实交互中的可理解性。
- 验证失败与降级路径在产品层是否可解释、可恢复。

## 信息架构（IA）

```text
Workspace
  ├─ Import Panel
  │   └─ CiteSpace Bridge Metadata
  ├─ Diagnostic Console
  │   ├─ Fast Summary
  │   ├─ Deep Progress
  │   └─ Degrade Explanation
  ├─ Atlas View
  │   ├─ Structure Terrain
  │   ├─ Semantic Galaxy
  │   ├─ Rhythm Timeline
  │   └─ Heat Layer
  ├─ 洞察面板 Insight Panel
  ├─ 标注操作 Annotation Actions
  │   ├─ Conclusion Cards
  │   ├─ Evidence Links
  │   └─ Retry/Repair Actions
  └─ Export Center
      ├─ Report Export
      └─ Snapshot Replay
```

## 页面规格 | Screen Specs

### Screen P1: Import + Fast Start

目标：资源包导入后 2 秒内出现首次可用反馈，并可进入正文打开路径。

主要元素：

- 资源包上传入口（导入文件包 / 导入文件夹包）
- 多源列表（支持多选）与“打开焦点源”入口
- Import/Fast/Deep 状态条（importing/running/completed/degraded）

绑定数据：DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001

### Screen P2: Text Lab Tri-pane

目标：形成阅读-观察-诊断连续回路。

布局：

- 左栏 Source Foundation（Brand/Source/File/Load State）+ Import + CiteSpace 元数据
- 中栏 Main Stage（Domain Navigation + 域主舞台；Atlas/Text Lab 含正文预览，Corpus/Genome/Insight/Library 使用独立工作台）
- 右栏 洞察面板 Insight Panel + 标注操作 Annotation Actions + 证据相关面板

关键交互：

- 左栏先上传并导入资源包，再通过多源列表选择一个或多个源；导入状态与正文打开状态分离，正文始终由“焦点源”驱动打开。
- 导航层级遵循“域导航（与主舞台同栏）-> 上下文导航（Layer/Mode，仅 Atlas）-> 工具控件（钻取/缩放）-> 当前位置面包屑”的秩序，避免同层竞争。
- 域导航 Domain Navigation 固定为（Text Lab/Atlas/Corpus/Genome/Insight/Library），不随当前文件切换而改变入口集合。
- 左栏顶部 Source Foundation 承载 Brand / Selected / Focus / Version Track / Source Scope / Load State 等对象上下文，且需随当前焦点源、已选源集合与加载状态实时联动。
- Source Foundation 为纯前提摘要卡，不再承载“打开正文”等直接操作按钮；动作入口由源工作台与右栏操作区承担。
- 左栏 Source Foundation 与相关输入面板服务于所有域：域切换时左栏结构与可见性保持稳定。
- 文本定位不再占用左栏；右栏 Operations Rail 承载常驻搜索、上一处/下一处跳转与搜索状态反馈。
- 标注输入不再占用左栏；右栏需承载 Annotation Actions，并与 Evidence Ledger 相邻组织，形成“标注 -> 证据沉淀 -> 导出”连续操作链。
- 一级导航需与主舞台保持强联动：Text Lab/Atlas/Corpus/Genome/Insight/Library 每个入口都必须驱动到对应域的默认任务与主舞台，且点击后状态与面包屑立即同步。
- Insight 域主舞台需包含 Conclusion Card / Evidence Chain / Actionable Suggestions / Source Preview 四块，并提供 Show Evidence 证据跳转。
- Library 域主舞台需包含 Structured Entries / Entity Relations / Concept & Topic Index / Evidence Provenance 四块，用于承载知识沉淀视图。
- 层级约束：Domain 是页面骨架切换层；Layer/Mode/Drill 仅作为 Atlas 域内上下文导航，不应泄漏到非 Atlas 域。
- 一级导航映射允许通过页面内 JSON 配置覆盖默认规则（`#top-nav-rules`），用于快速调整 IA 语义而不改联动逻辑代码。
- 中栏主舞台顶部的域导航区增加微标注（Global Navigation），明确其为一级入口而非页面内参数切换。
- 导航术语统一为中英对照并保持固定映射：全局导航 Global Navigation、层 Layer、模式 Mode、粒度 Drill、洞察面板 Insight Panel、标注操作 Annotation Actions、工作流状态 Workflow State、证据账本 Evidence Ledger、X-Ray 工作台 X-Ray Workbench、降级恢复 Degrade Recovery、证据修复 Evidence Repair；面包屑需沿用同一术语。
- 标题命名规范：页面左上主标题使用 Studio，导航项首项使用 Text Lab；浏览器页签标题采用 NarrativeOS Studio Workspace Prototype v1（保留历史命名以兼容已有外部链接）。
- 选择文件或文件夹后自动触发导入，导入按钮保留为手动重试入口。
- 导入重复资源包时通过左栏内联决策面板提供“替换现有文献 / 保留副本 / 取消导入”分支，避免误覆盖。
- 导入后的源列表支持轻量管理动作：焦点源重命名、焦点源打开、所选源删除（并级联删除其标注）；删除动作通过左栏内联确认面板完成。
- 导入后的源列表采用“双时态模型”：已导入待加载（imported）与近期项目（loaded），并按最近活动时间排序。
- 导入后的源列表提供“仅看近期项目（24h）”筛选开关；筛选开启时仅保留 24 小时内已加载源，空结果显示明确占位提示。
- 近期项目条目追加“NEW 24h”标识与相对时间（如“刚刚 / 5 分钟前”），提升时态可读性；若同标题/作者形成版本链，列表中需展示版本序号提示。
- 左栏“打开焦点源”按钮需根据当前焦点源状态切换文案：首次加载显示“打开正文”，已加载源显示“重新加载正文”。
- 左栏导入区块需具备状态联动反馈：空状态、已导入状态、已加载状态；状态文本与视觉样式同步更新。
- 任一文献首次加载后，导入区默认进入精简态（自动收起导入抽屉，仅保留文献选择、状态与核心操作）；用户可通过“展开导入抽屉 / 收起导入抽屉”手动切换。
- 右栏采用“决策优先”信息层级：洞察面板（结论）> 标注操作（输入）> 工作流状态（进度）> X-Ray 工作台（修复决策）> 证据账本（追溯）；通过卡片权重、对比度与排版节奏区分主次。
- 中栏 Atlas 上下文导航升级为“控制面驾驶舱”：在 Layer/Mode/Drill 之上增加控制面元信息（Control Surface），并通过胶囊状态、边框层级与按钮反馈强化“当前模式 -> 当前层 -> 当前粒度”的快速判读。
- 右栏信息面板支持“按块折叠/展开”并持久化用户偏好（刷新后保留），用于高密度场景下的注意力管理。
- 右栏支持“自动焦点面板”模式（默认开启）：随当前 Mode 自动展开最相关卡片并收起次级卡片；支持 Alt+A 快速切换自动/手动密度管理。
- 工作流面板提供三种“密度模板”一键切换：Research / Debug / Review；选择模板时自动关闭自动焦点并持久化布局，刷新后保留。
- 增加高频快捷键：Alt+O（打开/重载正文）、Alt+F（聚焦搜索）、Alt+I（展开/收起导入抽屉）、Alt+X（切换 X-Ray）、Alt+A（自动焦点开关）、Alt+R/D/V（Research/Debug/Review 模板）、Alt+1..4（切换 Layer）。
- 点击句子 -> Atlas 对应节点高亮
- 点击 Insight 证据 -> 左栏定位原文句子
- 切换 Layer 保持右栏结论上下文不丢失
- 搜索框支持 Enter 跳转下一命中，Shift+Enter 跳转上一命中。

导出一致性要求：

- Export + Replay 产物需包含 import_audit（导入决策轨迹），记录 new_import / duplicate_replace / duplicate_copy / duplicate_cancel / rename / delete 等事件，确保文献管理操作可追溯。
- 左栏提供“最近导入审计”可视列表（最近 N 条），用于快速核对导入与管理动作。
- 移动端（窄屏）上下文导航采用双行 sticky（Layer 行 + Mode 行），滚动时保持可见，减少导航漂移。

新增组件（CiteSpace Bridge Metadata）：

- 当前焦点源引用元数据卡：record_id/source_dataset/times_cited/centrality/burst/cluster
- 多选状态下需提供聚合 CiteSpace 元数据视图：selected_sources/focus_rank/times_cited 汇总/centrality 均值/burst 峰值/cluster 数量
- 对接 JSON 预览：用于与 CiteSpace 或外部引文网络工具对接
- 元数据来源：优先读取数据集中的 citespace 字段；缺失时由系统按当前文献生成 fallback 元数据

绑定数据：DS-V1-AUTHOR-SHORT-001、DS-V1-AUTHOR-LONG-001

### Screen P3: 降级恢复 Degrade Recovery

目标：系统降级时仍可解释、可继续。

状态组件：

- 当前状态：Degraded due to queue pressure
- 降级原因：queue_state/high_watermark
- 可执行动作：重试深度分析 Retry Deep、继续快速路径 Continue Fast、导出部分结果 Export Partial

绑定数据：DS-V1-DEGRADE-001

### Screen P4: 证据修复 Evidence Repair

目标：当 evidence link 失效时引导修复而非静默失败。

状态组件：

- 失效提示：Evidence anchor not found
- 修复动作：重试锚点 Retry Anchor、切换邻近证据 Switch Nearby Evidence、上报问题 Report Issue
- 修复结果：新锚点回链或标记为待修复

绑定数据：DS-V1-EVIDENCE-FAIL-001

### Screen P5: Export + Replay

目标：导出结果可复现，manifest 与 artifact 一致。

状态组件：

- Export 成功提示（report + snapshot_id）
- Replay 校验结果（pass/fail）
- 失败时回滚建议（fallback 到只读报告）

绑定数据：DS-V1-EXPORT-001

### Screen P6: Proofreading Workbench（补齐专项）

目标：在不破坏当前基线六引擎主链路的前提下，把校对补齐结果纳入统一工作台，并保证建议、证据和状态变化都可追溯。

状态组件：

- 问题分组：typo/grammar/punctuation/consistency/knowledge/risk/official_doc
- 建议编辑：逐条 suggestion + 一键应用（可撤销）
- 证据回链：rule_id/source_span/confidence/traceability
- 生命周期标记：candidate/shadow_only/active/deprecated

域责任标签：

- Text Lab：问题发现入口（typo/punctuation/grammar/consistency）
- Narrative Atlas：问题锚点定位与证据回看
- Insight Engine：建议解释、风险提示、go/no-go 提示
- Knowledge Graph（Library）：术语与规则资产沉淀状态
- Corpus Observatory：跨轮次质量趋势提示

绑定数据：DS-V1-PRF-P0-001、DS-V1-PRF-P1-001、DS-V1-PRF-P2-001

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
| EVT-P6-PROOFREAD-APPLY | 应用校对建议 | dataset_id, issue_id, issue_type, confidence, traceability |
| EVT-P7-TERM-REGISTRY-ACTION | 术语条目动作 | dataset_id, term_id, action, reviewer_result |
| EVT-P8-THRESHOLD-BREACH | 阈值越界 | dataset_id, metric_name, tier, observed_value |

## 原型评审门槛 | Review Gates

- Gate-00：所有参与评审的数据集满足 all_six_engines_present=true 且 contract_shape_valid=true。
- Gate-01：五个场景均可跑通主路径。
- Gate-02：SCN-V1-003 与 SCN-V1-004 的失败路径有明确恢复动作。
- Gate-03：所有结论卡可回链到 sentence_ref（SCN-V1-004 允许先失败后恢复）。
- Gate-04：导出与回放在 SCN-V1-005 中一致性通过。
- Gate-05：补齐专项数据集（DS-V1-PRF-P0/1/2）均满足 traceability=pass 的建议可解释可回链。
- Gate-06：阈值门槛满足 [../../academic/golden-set-threshold-policy.md](../../academic/golden-set-threshold-policy.md) 中 proofreading_recall、proofreading_false_positive_ratio、term_consistency_alignment_rate、registry_new_term_precision、knowledge_density_kd 对应档位要求。
- Gate-07：P6 页面中每类校对建议都可映射到域责任标签，且可回链到对应证据与记录。

## 输出物清单 | Deliverables

- 低保真流程稿（Lo-fi flow）
- 高保真关键屏（Hi-fi key screens）
- 交互状态表（state + transition）
- 场景验收记录（scene_id + dataset_id）
- 校对补齐验收记录（issue_type + traceability + threshold_tier）

## 关联文档

- ../v1-design-baseline.md
- ../v1-two-week-sprint-plan.md
- ../scenarios/v1-mock-simulation-dataset.md
- ../workflows/README.md
- ../../academic/golden-set-threshold-policy.md
- ../modules/proofreading-capability-gap-closure-plan.md
