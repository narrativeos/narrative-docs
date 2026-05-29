# Narrative Knowledge Hub

narrative-docs 是 NarrativeOS 的知识与规范中枢（Knowledge Hub），用于统一承载：

- 架构记忆（Architecture Memory）
- 产品知识（Product Knowledge）
- 用户文档（User Documentation）
- AI 上下文（AI Context）

目标是建立单一事实源（SSOT），降低多仓库协作中的上下文漂移。

## 文档导航

统一入口按六个层级组织，所有阅读从本页进入。

### 1. Architecture Memory

- 总览: [architecture/README.md](architecture/README.md)
- 系统架构: [architecture/system/README.md](architecture/system/README.md)
- 运行时架构: [architecture/runtime/README.md](architecture/runtime/README.md)
- 存储架构: [architecture/storage/README.md](architecture/storage/README.md)
- Atlas 架构: [architecture/atlas/README.md](architecture/atlas/README.md)
- Spatial 架构: [architecture/spatial/README.md](architecture/spatial/README.md)

### 2. ADR

- ADR 索引: [adr/README.md](adr/README.md)
- ADR-001 运行时边界: [adr/ADR-001-runtime.md](adr/ADR-001-runtime.md)
- ADR-002 存储基线: [adr/ADR-002-storage.md](adr/ADR-002-storage.md)

### 3. Product Knowledge

- 总览: [product/README.md](product/README.md)
- 愿景: [product/vision/README.md](product/vision/README.md)
- 路线图: [product/roadmap/README.md](product/roadmap/README.md)
- 工作流: [product/workflows/README.md](product/workflows/README.md)
- 模块定义: [product/modules/README.md](product/modules/README.md)

### 4. Developer Guide

- 总览: [developer/README.md](developer/README.md)
- 环境搭建: [developer/setup/README.md](developer/setup/README.md)
- 工作区协作: [developer/workspace/README.md](developer/workspace/README.md)
- 编码规范: [developer/coding/README.md](developer/coding/README.md)
- 插件开发: [developer/plugins/README.md](developer/plugins/README.md)
- SDK 规范: [developer/sdk/README.md](developer/sdk/README.md)

### 5. User Documentation

- 总览: [user/README.md](user/README.md)
- 快速开始: [user/getting-started/README.md](user/getting-started/README.md)
- 编辑器: [user/editor/README.md](user/editor/README.md)
- Atlas 使用: [user/atlas/README.md](user/atlas/README.md)
- GIS 使用: [user/gis/README.md](user/gis/README.md)
- 云能力: [user/cloud/README.md](user/cloud/README.md)

### 6. AI Context Layer

- 总览: [ai/README.md](ai/README.md)
- Copilot 上下文: [ai/copilot/README.md](ai/copilot/README.md)
- Prompt 规范: [ai/prompts/README.md](ai/prompts/README.md)
- Repo Rules: [ai/repo-rules/README.md](ai/repo-rules/README.md)
- 架构上下文: [ai/architecture-context/README.md](ai/architecture-context/README.md)

## 推荐阅读路径

- 新成员入门: Product -> Developer -> User
- 架构设计与变更: Architecture -> ADR -> AI Context
- 实施与交付: Developer -> AI Context -> Product

## 双语与机读标准 | Bilingual + Machine-readable Standard

- 人读优先: 每个关键入口文档包含中文主叙述与英文摘要
- 机读友好: 关键规范提供稳定标题、清单结构、路径链接
- 结构清单: 使用 [assets/doc-index.yaml](assets/doc-index.yaml) 作为机读索引
- 术语统一: 使用 [assets/glossary.zh-en.md](assets/glossary.zh-en.md) 统一中英文术语
- Prompt 模板: 使用 [ai/prompts/README.md](ai/prompts/README.md) 与模板规范任务输入输出

## 文档边界

- 各代码仓库 docs 目录仅保留局部说明
- 权威文档统一维护在 narrative-docs
- 任何跨仓库规范应先更新本仓库再落到代码实现

## 许可策略

- narrative-docs 已统一采用 Apache-2.0
- 该仓库承载规范、schema、API 与 AI 规则，采用 Apache-2.0 以提供更清晰的生态与专利保护边界
- 所有新增文档与后续演进默认遵循 Apache-2.0

## 维护原则

- 先有规范，再有实现
- 先有 ADR，再有长期演进
- AI 参与实现、重构、测试与文档，CI 负责验收
