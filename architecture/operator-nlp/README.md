# NLP Operator — 协议优先架构

## 摘要（中文）

本页定义 `narrative-operator-nlp` 的协议优先（Protocol-First）架构标准，防止算子架构在未来演化中崩塌。

## Executive Summary (EN)

This document defines the Protocol-First architecture standard for `narrative-operator-nlp`, establishing three protocol layers as the "traffic exits" for all operators.

## 设计原则 | Design Principles

协议优先架构将算子间的通信约束为三个标准层级，各司其职：

```
┌─────────────────────────────────────────────────┐
│                   External World                 │
│  LLM / Agent / Dify / LangGraph / Studio UI      │
├─────────────────────────────────────────────────┤
│                                                   │
│  ① MCP (Model Context Protocol)                   │
│     → 标准接口层（首选）                            │
│     → 系统标准语言，供 LLM/Agent 调用               │
│                                                   │
├─────────────────────────────────────────────────┤
│                                                   │
│  ② gRPC (Protobuf)                                │
│     → 内部高性能层（核心）                          │
│     → 算子内部、算子与核心 OS 之间的总线             │
│     → 运行于 Unix Domain Socket                    │
│                                                   │
├─────────────────────────────────────────────────┤
│                                                   │
│  ③ FastAPI + JSON                                 │
│     → 开发调试层（辅助）                            │
│     → 人类可读、快速验证的接口窗口                   │
│     → 手动测试 NLP 效果、Studio 前端快速原型         │
│                                                   │
└─────────────────────────────────────────────────┘
```

---

## ① MCP (Model Context Protocol) — 标准接口层

**定位：** 整个 NarrativeOS 的"系统标准语言"。

**适用场景：**
- 给 LLM / Agent 调用
- 所有工作流编排（Dify、LangGraph）通过 MCP 调用算子
- 实现"通用算子化"的核心通道

**约束：**
- 所有对外暴露的算子能力必须提供 MCP 接口
- MCP 接口是**首选**的调用方式
- 禁止绕过 MCP 直接暴露内部 gRPC 给外部调用者

---

## ② gRPC (Protobuf) — 内部高性能层

**定位：** 算子内部、算子与核心 OS 之间的"总线"。

**适用场景：**
- 海量文本处理
- 对延迟极其敏感的场景
- 算子间内部通信

**约束：**
- 所有算子间通信优先走 gRPC + Unix Domain Socket
- Protobuf schema 作为内部契约，与 MCP schema 保持语义对齐
- 性能关键路径必须走 gRPC，不走 FastAPI

---

## ③ FastAPI + JSON — 开发调试层

**定位：** 人类可读、快速验证的"接口窗口"。

**适用场景：**
- 手动测试 NLP 效果
- 给 Studio 前端做快速原型开发
- 调试与探索性开发

**约束：**
- 不承载生产流量
- 不用于算子间内部通信
- 仅作为开发和调试入口

---

## 协议选择矩阵

| 场景 | 协议 | 理由 |
|------|------|------|
| LLM/Agent 调用 | MCP | 标准接口层，通用算子化 |
| 工作流编排（Dify/LangGraph） | MCP | 生态兼容 |
| 算子间内部通信 | gRPC + UDS | 高性能、低延迟 |
| 手动测试 NLP 效果 | FastAPI + JSON | 快速验证 |
| Studio 前端原型 | FastAPI + JSON | 快速迭代 |
| 生产环境算子调用 | MCP / gRPC | 按场景选择 |
| 跨语言调用（Rust↔Python） | gRPC + Protobuf | 类型安全、高性能 |

---

## 与现有架构的关系

```
narrative-operator-nlp
  ├── MCP 接口  ← 外部世界（Agent / Dify / Studio）
  ├── gRPC 服务 ← 内部总线（与其他算子 / OS Core 通信）
  └── FastAPI   ← 开发调试入口

narrative-core
  └── 通过 gRPC 与 operator-nlp 通信

narrative-studio
  └── 通过 MCP 或 FastAPI 调用 operator-nlp
```

---

## 文档索引

- [System 系统架构](../system/README.md): 全局系统边界
- [Runtime 运行时](../runtime/README.md): 运行时分工与隔离
- [Platform 平台架构](../platform/README.md): 平台域模型与能力进化
