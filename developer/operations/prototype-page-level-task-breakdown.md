# Prototype Page-level Task Breakdown (v2)

## 摘要（中文）

本清单将原型工作拆解到页面级别，适用于首版闭环“阅读-标注-证据-导出”。

说明：找书仅作为开发样本准备，不作为核心产品能力。

## Executive Summary (EN)

This page-level breakdown defines tasks, dependencies, acceptance gates, and ownership for the first prototype loop: read, annotate, evidence, and export. Book discovery is treated as data preparation only.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-operations-prototype-page-level-task-breakdown-v2
path: developer/operations/prototype-page-level-task-breakdown.md
lang_primary: zh-CN
lang_secondary: en
audience: [product_manager, designer, frontend_engineer, tech_lead, qa]
agent_ready: true
source_of_truth: narrative-docs
```

## 0. 原型边界与目标 | Scope & Goal

- 目标用户：数字人文研究者（主）
- 闭环任务：阅读 -> 标注 -> 证据登记 -> 导出
- 非核心能力（本阶段降级）：找书、推荐、复杂检索策略
- 本阶段不做：多租户权限、实时协作、复杂推荐算法
- 目标周期：2 周

## 1. 页面清单（建议 9 页） | Page Inventory

| Page ID | 页面名称 | 优先级 | 目标完成时间 |
| --- | --- | --- | --- |
| P01 | 项目首页 / Workspace Dashboard | P0 | D2 |
| P02 | 样本选择页 / Sample Selector | P2 | D9 |
| P03 | 书籍详情页 / Book Detail | P0 | D4 |
| P04 | 阅读器页 / Reader | P0 | D5 |
| P05 | 标注面板页 / Annotation Panel | P0 | D6 |
| P06 | 证据台账页 / Evidence Ledger | P0 | D7 |
| P07 | 导出中心页 / Export Center | P0 | D8 |
| P08 | 检索与过滤页 / Search & Filter | P1 | D9 |
| P09 | 会话与版本页 / Session & Version | P1 | D10 |
| P10 | 可用性测试页 / Task Playback | P0 | D10 |

## 2. 页面级任务拆解 | Per-page Breakdown

### P01 项目首页 / Workspace Dashboard

- 页面目标：让用户在 30 秒内理解当前数据集、进度和下一步动作。
- 关键模块：项目卡片、数据集状态、最近会话、快速入口。
- 必做任务：
  1. 显示当前研究任务、样本数量和标注进度。
  2. 显示最近一次导出时间。
  3. 提供“继续阅读”与“进入证据台账”双主按钮。
- 数据依赖：
  - assets/datasets/novel100_kepub_fulltext_top10.json
  - assets/datasets/fulltext/novel100_kepub_fulltext_top10/download_summary.json
- 验收标准：
  - 新用户 30 秒内点击到 P04。
  - 关键统计字段完整无空值。
- 角色分工：PM 需求验收，Design 信息层级，FE 实现卡片组件，QA 冒烟测试。

### P02 样本选择页 / Sample Selector（非核心）

- 页面目标：让开发者在小样本集合中选择测试书目。
- 关键模块：固定样本列表、状态标记（未读/已标注）、快速进入。
- 必做任务：
  1. 默认展示固定 8-10 本开发样本。
  2. 支持标题直达（可选，不做复杂筛选）。
  3. 提供“进入阅读”快捷入口。
- 数据依赖：
  - assets/datasets/novel100_kepub_fulltext_top10.json
- 验收标准：
  - 10 秒内选中样本并进入 P03。
  - 不依赖外部搜索服务。
- 角色分工：PM 定义最小样本集，Design 简化页面密度，FE 实现轻量列表，QA 校验样本可达性。

### P03 书籍详情页 / Book Detail

- 页面目标：让用户在进入正文前确认研究上下文与使用边界。
- 关键模块：元信息、章节统计、使用边界提示、开始阅读按钮。
- 必做任务：
  1. 展示 rank、title、author、章节总数。
  2. 展示数据来源与使用边界提示。
  3. 一键跳转 P04 第一章。
- 数据依赖：
  - assets/datasets/fulltext/novel100_kepub_fulltext_top10/*/meta.json
- 验收标准：
  - 元信息字段齐全。
  - 跳转成功率 100%。
- 角色分工：PM 定义展示字段，Design 版式，FE 路由和状态管理，QA 链路校验。

### P04 阅读器页 / Reader

- 页面目标：稳定阅读正文并支持章节切换。
- 关键模块：正文区、章节目录、上/下一章、阅读进度。
- 必做任务：
  1. 加载章节 txt 并保持段落结构。
  2. 提供章节导航和当前位置记录。
  3. 支持选中文本并一键创建标注。
- 数据依赖：
  - assets/datasets/fulltext/novel100_kepub_fulltext_top10/*/chapters/*.txt
- 验收标准：
  - 章节切换响应时间 < 300ms（本地数据）。
  - 页面刷新后可恢复至上次阅读位置。
- 角色分工：PM 定义阅读任务路径，Design 排版与可读性，FE 渲染性能，QA 长文稳定性测试。

### P05 标注面板页 / Annotation Panel

- 页面目标：将文本片段转为结构化标注。
- 关键模块：高亮片段、标签选择、注释输入、保存。
- 必做任务：
  1. 支持文本选择后创建标注。
  2. 支持至少 4 类标签（人物/事件/主题/证据强度）。
  3. 保存后立即可见并可编辑。
- 数据依赖：
  - 本地标注存储（JSON 或 IndexedDB，原型期可 JSON）
- 验收标准：
  - 单次标注创建时间 < 15 秒。
  - 标注重载后不丢失。
- 角色分工：PM 定义标签体系，Design 降低输入负担，FE 实现编辑状态机，QA 回归编辑流程。

### P06 证据台账页 / Evidence Ledger

- 页面目标：形成可追溯证据链，支持研究复核。
- 关键模块：标注列表、定位回跳、状态（草稿/确认）、审阅备注、冲突标记。
- 必做任务：
  1. 列表显示每条标注的来源章节和偏移。
  2. 支持点击回跳到正文定位。
  3. 支持状态流转（draft -> reviewed -> confirmed）。
- 数据依赖：
  - 标注数据集合
  - 章节索引
- 验收标准：
  - 任一证据可在 2 次点击内回到原文。
  - 状态流转日志完整且可回溯操作者。
- 角色分工：PM 定义证据字段标准，Design 设计复核流，FE 实现定位映射，QA 校验追溯准确性。

### P07 导出中心页 / Export Center

- 页面目标：将研究过程与结果导出为可复用产物。
- 关键模块：导出格式选择、范围选择、导出记录。
- 必做任务：
  1. 导出 CSV（证据台账）和 JSON（结构化标注）。
  2. 允许按书目/会话筛选导出。
  3. 记录导出时间与条目数。
- 数据依赖：
  - 标注数据
  - 证据台账数据
- 验收标准：
  - 导出文件字段与定义一致。
  - 同一筛选条件重复导出结果一致。
- 角色分工：PM 定义对外交付字段，Design 导出流程反馈，FE 序列化与下载，QA 样本对账。

### P08 检索与过滤页 / Search & Filter

- 页面目标：在已加载样本与已标注内容中快速回查。
- 关键模块：关键词检索、标签过滤、结果高亮。
- 必做任务：
  1. 支持样本内关键词检索。
  2. 支持按标签和作者过滤。
  3. 支持从结果跳转原文位置。
- 数据依赖：
  - 本地章节文本索引
  - 标注标签索引
- 验收标准：
  - 结果召回可解释，跳转位置准确。
- 角色分工：PM 定义检索优先规则，Design 结果信息密度，FE 索引与查询，QA 相关性抽检。

### P09 会话与版本页 / Session & Version

- 页面目标：让用户知道每次研究会话做了什么、改了什么。
- 关键模块：会话记录、版本快照、回滚提示。
- 必做任务：
  1. 展示最近会话和修改数量。
  2. 允许恢复到最近快照（原型可只读模拟）。
  3. 显示版本说明和变更摘要。
- 数据依赖：
  - 会话日志
  - 导出记录
- 验收标准：
  - 用户可理解当前版本状态并完成一次回看。
- 角色分工：PM 定义信息透明规则，Design 可读性设计，FE 状态展示，QA 一致性核对。

### P10 可用性测试页 / Task Playback

- 页面目标：统一执行核心闭环任务测试并记录指标。
- 关键模块：任务脚本、计时、成功/失败记录、问题标签。
- 必做任务：
  1. 内置 3 条核心任务（阅读定位、创建标注、导出结果）。
  2. 自动记录完成时长与错误点。
  3. 输出测试结果摘要。
- 数据依赖：
  - 测试任务配置
  - 会话行为日志
- 验收标准：
  - 可输出每位测试者的任务完成报告。
- 角色分工：PM 设定测试任务，Design 观察记录表，FE 埋点与回放，QA 汇总结论。

## 3. 交付节奏建议（2 周） | Delivery Cadence

| Day | 交付目标 | 页面 |
| --- | --- | --- |
| D1-D2 | 核心 IA 与阅读入口 | P01-P03 |
| D3-D4 | 阅读主链路可走通 | P04 |
| D5-D6 | 标注与台账闭环 | P05-P06 |
| D7-D8 | 导出与可演示路径 | P07 |
| D9 | 检索与样本选择补齐 | P02-P08 |
| D10 | 会话与测试收敛 | P09-P10 |

## 4. 通过门槛（原型 Ready） | Prototype Ready Gates

- [ ] Gate A：P01、P03、P04、P05、P06、P07 全流程无阻塞可演示。
- [ ] Gate B：至少 3 位目标用户完成任务测试。
- [ ] Gate C：导出文件经抽检字段一致。
- [ ] Gate D：风险台账中 High 风险均有处置动作。

## 6. 非核心功能降级原则 | Non-core Feature De-scope Rules

- 找书仅保留固定样本选择，不做开放式爬取与推荐。
- 检索仅覆盖本地样本与本地标注，不引入复杂召回策略。
- 任何新增“找书”需求默认进入下一里程碑，不阻断当前原型闭环交付。

## 5. 周会追踪字段（复制到任务工具） | Weekly Tracking Fields

- Page ID
- 本周目标
- 完成状态（Not Started / In Progress / Done / Blocked）
- 阻塞原因
- 责任人
- 截止时间
- 验收证据链接
