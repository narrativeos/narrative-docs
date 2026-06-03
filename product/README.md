# Product 产品概览

## 摘要

NarrativeOS 产品体系面向三类用户角色，提供从日常办公到知识治理的完整能力链。

本文档以**用户视角**介绍三个主要产品方向，回答"你是谁、你能做什么、你为何需要它"。

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-README
path: product/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [user, product, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

---

## 三大产品方向

NarrativeOS 不是一个单一工具，而是一个分层产品矩阵。不同角色在不同层级获得不同价值。

### 1. LibreOffice / Word 插件端 — 日常办公中的智能助手

**目标用户：** 工程师、技术人员、文档撰写者

**核心价值：** 在你已有的办公环境中，提供基于海量知识库的实时参数建议与标准溯源。

#### 典型场景

> 工程师在填写工艺单时，选中"切削速度"，右侧悬浮栏立即显示基于数千万级知识库中提取的"建议参数"，并标注"来源：GB/T 12345-202X"。

#### 能力边界

- 在现有办公套件中运行，无需切换工作台
- 选中即查：高亮文本 → 侧栏返回参数建议 + 标准来源
- 轻量级交互：不改变原有编辑习惯
- 离线可用：核心知识库本地缓存

#### 入口

- [插件端功能说明](modules/editor-plugin.md)（建设中）

---

### 2. NarrativeStudio — 专家级知识工作台

**目标用户：** 领域专家、知识工程师、标准维护人员

**核心价值：** 将非结构化标准文档（PDF/图片/扫描件）转化为结构化、可检索、可关联的知识资产。

#### 典型场景

> 专家将新的行业标准 PDF 拖入工作台，系统自动完成 OCR、实体提取（材质、参数、刀具型号）和自动归档，形成"机加工知识图谱"的一个新节点。

#### 能力边界

- 拖拽上传：支持 PDF、图片、扫描件等多格式
- 智能解析：OCR → 实体提取 → 关系构建 → 自动归档
- 知识图谱可视化：查看实体、关系、来源链
- 人工审核与修正：专家对 AI 提取结果进行确认与调整

#### 入口

- [Studio 工作台说明](modules/narrative-studio.md)（建设中）

---

### 3. NarrativeOS 底层大脑 — 知识时序治理引擎

**目标用户：** 系统管理员、知识治理负责人、平台运营者

**核心价值：** 对知识库进行全生命周期管理，确保知识资产的时效性、一致性与可追溯性。

#### 典型场景

> 当国家更新了某项标准，OS 自动识别之前的工艺参数可能已经过期，并向使用该参数的用户发送提醒："你引用的 GB/T 12345-2018 已更新为 2025 版，第 3.2 条切削速度上限已调整。"

#### 能力边界

- 时序管理：追踪每条知识的版本、生效时间、废止时间
- 变更影响分析：标准更新 → 自动定位受影响的参数、文档、用户
- 主动提醒：过期/变更知识的主动通知机制
- 审计追溯：谁在何时引用了哪个版本的哪条知识

#### 入口

- [OS 治理引擎说明](modules/narrative-os-core.md)（建设中）

---

## 产品关系图

```
┌─────────────────────────────────────────────────────┐
│  用户日常办公环境                                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  LibreOffice / Word 插件端                   │   │
│  │  (选中即查 · 参数建议 · 标准溯源)             │   │
│  └───────────────────┬─────────────────────────┘   │
│                      │ 查询/写入                     │
└──────────────────────┼──────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────┐
│  NarrativeStudio 专家工作台                           │
│  (OCR · 实体提取 · 知识图谱 · 人工审核)              │
│                      │                              │
│                      │ 知识入库                       │
└──────────────────────┼──────────────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────┐
│  NarrativeOS 底层大脑                                 │
│  (时序管理 · 变更影响分析 · 主动提醒 · 审计追溯)      │
└─────────────────────────────────────────────────────┘
```

- **插件端**是用户日常接触的前端触点
- **Studio**是专家构建与维护知识的中台工作台
- **OS 大脑**是保障知识质量与时效的底层引擎

三者协同，形成"采集 → 治理 → 消费"的完整知识闭环。

---

## 推荐阅读路径

| 你的角色 | 推荐阅读 |
|---------|---------|
| 日常用户（工程师/技术员） | [插件端功能说明](modules/editor-plugin.md) |
| 领域专家（知识工程师） | [Studio 工作台说明](modules/narrative-studio.md) |
| 平台运营/治理负责人 | [OS 治理引擎说明](modules/narrative-os-core.md) |
| 产品经理 | [产品愿景](vision/README.md) → [路线图](roadmap/README.md) |
| 开发者 | [开发者指南](../developer/README.md) |

---

## 子文档索引 | Subdocument Index

### 产品方向

- [modules/editor-plugin.md](modules/editor-plugin.md): LibreOffice/Word 插件端功能说明
- [modules/narrative-studio.md](modules/narrative-studio.md): NarrativeStudio 专家工作台
- [modules/narrative-os-core.md](modules/narrative-os-core.md): NarrativeOS 底层治理引擎

### 产品规划

- [vision](vision/README.md): 产品定位与价值主张
- [roadmap](roadmap/README.md): 里程碑与优先级
- [workflows](workflows/README.md): 用户与团队工作流

### 模块体系（技术视角）

- [modules](modules/README.md): 核心模块职责与关系
- [modules/platform-domains.md](modules/platform-domains.md): 平台域模块设计

### 开发计划

- [v1-design-baseline](v1-design-baseline.md): V1 设计基线
- [v1-two-week-sprint-plan](v1-two-week-sprint-plan.md): V1 两周迭代计划

---

## 协作规则 | Collaboration Rules

- 产品文档以用户视角为第一叙事角度，技术细节归入 Architecture 与 Developer 分区
- 涉及对外承诺的条目需同步到白皮书映射
- 新功能描述需明确归属三个产品方向之一