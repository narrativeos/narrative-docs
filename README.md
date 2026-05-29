# Narrative Knowledge Hub

narrative-docs 是 NarrativeOS 的知识与规范中枢（Knowledge Hub），用于统一承载：

- 架构记忆（Architecture Memory）
- 产品知识（Product Knowledge）
- 用户文档（User Documentation）
- AI 上下文（AI Context）

目标是建立单一事实源（SSOT），降低多仓库协作中的上下文漂移。

## 文档层级

- architecture: 系统与运行时架构、存储、Atlas、Spatial
- adr: 架构决策记录与历史
- product: 愿景、路线图、工作流、模块定义
- developer: 开发环境、工作区、工程规范、插件与 SDK
- user: 用户上手、编辑器、Atlas、GIS、云能力
- ai: Copilot 规则、提示词、仓库规则与架构上下文

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
