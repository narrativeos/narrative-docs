---
layout: default
title: NarrativeStructure 文档重构工作台
parent: Product 产品
nav_order: 22
---

# NarrativeStructure — 文档智能化重构工作台

## 摘要

NarrativeStructure 是一款本地优先、以"项目包（Project Package）"为核心载体的文档智能化重构工作台。通过将文档离散化为**语义块（Semantic Block）**，结合 AI 驱动的流水线，实现对超大型文档（如 200 万字）的高精度还原与实时协作。

**数据哲学：** 文档即数据库 (Doc-as-Database)，生产线即资产 (Line-as-Asset)。

---

## 目标用户

- 知识架构师
- 技术文档工程师
- 大型文档项目管理者

## 核心价值

**让超大型文档的编辑不再是一场噩梦。**

NarrativeStructure 不是文档编辑器，而是文档的重构工厂。你将不再是一个苦苦修正 Markdown 格式的文员，而是一位控制着数十个智能体、管理着数百万字文档结构的"知识架构师"。

---

## 典型使用场景

### 场景一：超大型文档导入

> 用户将 200 万字的 PDF 文档拖入工作台，系统自动完成：
> 1. PDF 解析 → 离散化为 SemanticBlock
> 2. 层级识别：标题、段落、表格、图片自动分类
> 3. 逻辑树构建：基于语义关系重建文档结构
> 4. 存入 SQLite：每个 Block 获得唯一 UUID，支持稳定定位

### 场景二：文档结构重组

> 用户拖拽目录树中的章节节点，实时调整文档结构：
> - 拖拽改变层级（level）和父子关系（parent_id）
> - UI 修改直接驱动数据库更新，无需重新解析
> - 支持章节合并、拆分、重排序

### 场景三：智能流水线加工

> 用户启动 LangGraph 流水线，对全文执行质量优化：
> - 可视化节点：全自动执行或单步调试
> - 闭环纠错：输出未达 Quality Schema 时自动触发 Agent 重写
> - 支持对三类资产的实时修改：Markdown 内容、流程逻辑（PY）、提示词（YAML）

---

## 核心能力

| 能力 | 说明 |
|------|------|
| 语义块引擎 | 段落/标题/表格/图片作为最小操作单元，UUID 稳定定位 |
| 层级索引 | 不依赖 Markdown 符号，通过 level + parent_id 维护逻辑树 |
| 虚拟滚动编辑器 | Monaco Editor + 虚拟列表，200 万字秒级加载 |
| 双向联动目录 | 逻辑树实时渲染，拖拽重组直接驱动数据库 |
| LangGraph 流水线 | 可视化处理节点，全自动 + 单步调试 + 闭环纠错 |
| 三类资产编辑 | Markdown 内容、流程逻辑（PY）、提示词（YAML）在线修改与热加载 |
| 项目包隔离 | 每个项目独立文件夹，SQLite + assets/ + exports/ 自包含 |

---

## 项目包结构

```
my-project/
├── narrative.db      # SQLite 数据库（SemanticBlock + 处理状态）
├── assets/           # 原始 PDF、切片图片及媒体资源
├── exports/          # 最终导出产物（Markdown, PDF）
├── nodes/            # 处理脚本（.py）
└── prompts/          # LLM 指令模板（.yaml）
```

## 架构设计

- **后端控制：** 使用 `ProjectManager` 进行上下文切换，确保多项目并行开发时数据互不干扰。
- **操作单元：** 系统内一切操作基于 `SemanticBlock`，包括内容修改（基于版本号追踪）、结构调整（level/parent_id 解耦物理排版）、脚本热加载（importlib）与提示词动态替换。

## 性能基准

- 支持 200 万字文档，启动时间 ≤ 3 秒
- 虚拟滚动确保大文档流畅编辑
- SQLite 本地存储，单项目数据完整性自包含

## 开发实施优先级

| 阶段 | 内容 |
|------|------|
| Phase I：地基搭建 | 项目路径管理、SQLite 表结构初始化、PDF 解析导入 |
| Phase II：工作台构建 | 目录树组件、块级编辑与数据库同步 |
| Phase III：智能闭环 | LangGraph 工作流、三类资产编辑与热加载 |

## 产品愿景

NarrativeStructure 旨在成为文档重构领域的"VS Code"。你不再是一个苦苦修正 Markdown 格式的文员，而是一位控制着数十个智能体、管理着数百万字文档结构的"知识架构师"。
