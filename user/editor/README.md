# Editor Guide

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines editor workspace layout and interaction patterns for read-observe-diagnose workflows.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: user-editor-README
path: user/editor/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [user, operator, support]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

定义 Editor 工作台的布局语义与核心交互路径，帮助用户快速进入“阅读-观察-诊断-修订”闭环。

## 阅读路径（建议） | Recommended Path

- 第一步：先理解三栏布局及各区域职责
- 第二步：按主舞台视图切换完成一次最小诊断路径
- 第三步：结合 Atlas/Visual OS 文档完成跨模块联动

## 标准参考 | Standards Reference

- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [../../developer/coding/readiness-checklist.md](../../developer/coding/readiness-checklist.md)

- 基础编辑流程
- 内容组织与结构化能力
- 与 Atlas/Spatial 的协作入口
- 故障排查与性能建议

## 工作台布局

编辑与诊断协作界面采用三栏布局：

- 左栏：资源树（项目、书籍、论文、语料集、作者、标签）
- 中栏：主舞台（文本视图 / 图谱视图 / 时间轴视图 / 地图视图）
- 右栏：诊断台（AI 模板率、结构完整度、节奏指数、抽象度、感官密度）

该布局用于支持“阅读 -> 观察 -> 诊断 -> 修订”的连续工作流。

## 相关文档

- Visual OS 架构： [../../architecture/visual-os/README.md](../../architecture/visual-os/README.md)
- Visual OS 模块： [../../product/modules/visual-os.md](../../product/modules/visual-os.md)
