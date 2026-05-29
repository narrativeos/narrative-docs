# Cloud Guide

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines cloud collaboration modes, sync workflow, permission checks, and troubleshooting for NarrativeOS users.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: user-cloud-README
path: user/cloud/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [user, operator, support]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

定义 Cloud 协作模式、权限基线、同步验收与冲突处理路径。

## 阅读路径（建议） | Recommended Path

- 第一步：确认 Local/Cloud 双模式差异
- 第二步：完成“创建并共享项目”最小可复现任务
- 第三步：按权限模型与冲突策略完成协作验证

## 标准参考 | Standards Reference

- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [../../whitepaper/core-docs-mapping.md](../../whitepaper/core-docs-mapping.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)

## 适用范围 | Scope

- 面向作者、编辑、机构协作成员
- 用于项目同步、协同编辑、权限控制
- 不覆盖核心本地分析流程（本地模式可独立运行）

## 运行模式

### Local Mode（默认）

- 数据保存在本地工作区
- 不依赖网络，不触发云同步
- 适合单机写作与离线分析

### Cloud Mode（可选）

- 显式开启后才执行云同步
- 支持团队协作、权限共享、版本回溯
- 不改变本地优先原则

## 最小可复现任务：创建并共享项目

### 前置条件

- 已完成 [getting-started](../getting-started/README.md)
- 当前账号具备项目创建权限
- 网络连接可用（仅 Cloud Mode 需要）

### 步骤

1. 在 Workspace 创建项目并导入 1 篇文本。
2. 在项目设置中开启 Cloud Sync。
3. 添加 1 名协作者并授予 Reviewer 权限。
4. 协作者打开同一项目并添加 1 条注释。
5. 项目拥有者确认注释已同步到本地视图。

### 验收标准

- 项目状态显示 `Synced`。
- 协作者注释在 60 秒内出现在拥有者界面。
- 关闭网络后，本地阅读与诊断功能仍可用。

## 权限模型（最小基线）

- Owner：项目配置、成员管理、导出与删除
- Editor：内容编辑、批注、任务标注
- Reviewer：评论、审阅、证据校验
- Viewer：只读访问

建议：生产环境避免使用全员 Owner 权限。

## 离线与在线行为差异

- 离线：可编辑本地内容，不会推送到云端
- 恢复在线：按时间戳执行增量同步与冲突提示
- 冲突策略：默认保留双方版本并提示人工合并

## 常见问题排查 | Troubleshooting

### 现象 1：项目一直显示 Syncing

- 检查网络与账号状态
- 检查项目权限是否被回收
- 重试手动同步并查看错误提示

### 现象 2：协作者看不到最新内容

- 确认协作者在同一项目空间
- 确认权限至少为 Viewer
- 检查是否误在 Local Mode 打开了本地副本

### 现象 3：出现同步冲突

- 先比较冲突片段的时间戳与作者
- 以段落为单位合并并保留审阅注释
- 合并后再次执行手动同步

## 关联文档 | Related Docs

- [User Documentation](../README.md)
- [Getting Started](../getting-started/README.md)
- [Workspace](../../developer/workspace/README.md)
- [Data Classification and Retention](../../DATA_CLASSIFICATION_AND_RETENTION.md)
