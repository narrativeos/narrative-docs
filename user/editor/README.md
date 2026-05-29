<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Editor Guide

## EN Summary

This document defines editor workspace layout and interaction patterns for read-observe-diagnose workflows.

## Machine-readable Metadata

```yaml
doc_id: user-editor-README
path: user/editor/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [user, operator, support]
agent_ready: true
source_of_truth: narrative-docs
```

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
