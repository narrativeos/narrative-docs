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

## 代码架构：协议适配器模式

核心 NLP 能力只编写一次，通过不同的"协议适配器"（Adapter）暴露为不同协议。

### 项目结构标准

```
narrative-operator-nlp/
├── core/                  # 逻辑核心 — 纯 Python，零协议依赖
│   ├── __init__.py
│   ├── analyzer.py        # 主分析函数：text → NarrativeSchema
│   └── schema.py          # NSP Python 数据类定义
├── adapters/              # 协议适配层 — 每种协议一个文件
│   ├── mcp_server.py      # MCP Tool 封装
│   ├── grpc_server.py     # gRPC Protobuf 服务
│   ├── grpc_client.py     # gRPC 客户端（供 Worker Runtime 调用）
│   └── fastapi_app.py     # FastAPI HTTP Endpoint
├── schemas/               # 核心契约定义
│   ├── narrative.proto    # Protobuf 定义
│   └── narrative.schema.json  # JSON Schema
├── examples/              # 使用示例
│   ├── call_via_mcp.py    # 通过 MCP 调用算子
│   └── call_via_http.py   # 通过 FastAPI 调用算子
├── docs/
│   └── PROTOCOL.md        # NSP 数据结构标准
├── tests/
└── README.md
```

### 核心层 (core/)

`core/analyzer.py` 是唯一包含 NLP 引擎（HanLP）调用的地方，返回统一的 Python 对象：

```python
# core/analyzer.py — 逻辑核心
from .schema import NarrativeDocument

def analyze(text: str) -> NarrativeDocument:
    """唯一的核心分析函数。接收文本，返回 NSP 标准化结果。"""
    raw = hanlp.load(...)(text)
    mapper = HanlpSchemaMapper()
    return mapper.map(raw)
```

### 适配器层 (adapters/)

每个适配器文件将 `core.analyze()` 封装为对应协议的入口：

```python
# adapters/mcp_server.py — MCP 适配器
from mcp.server import Server
from core.analyzer import analyze

server = Server("narrative-operator-nlp")

@server.tool()
async def analyze_text(text: str) -> dict:
    """分析文本，返回叙事原子"""
    result = analyze(text)
    return result.model_dump()
```

```python
# adapters/fastapi_app.py — FastAPI 适配器
from fastapi import FastAPI
from core.analyzer import analyze

app = FastAPI()

@app.post("/analyze")
async def analyze_endpoint(text: str):
    result = analyze(text)
    return result.model_dump()
```

```python
# adapters/grpc_server.py — gRPC 适配器
import grpc
from core.analyzer import analyze
from schemas import narrative_pb2, narrative_pb2_grpc

class NarrativeService(narrative_pb2_grpc.NarrativeServiceServicer):
    def Analyze(self, request, context):
        result = analyze(request.text)
        return narrative_pb2.AnalyzeResponse(...)
```

### 核心优势

| 原则 | 说明 |
|------|------|
| **写一次，多协议暴露** | 核心 NLP 逻辑只维护一份 |
| **适配器可独立测试** | MCP/gRPC/HTTP 各有独立测试，不污染核心逻辑 |
| **协议切换零成本** | 新增协议只需写一个新适配器文件 |
| **核心逻辑零协议依赖** | `core/` 不 import 任何 `mcp`/`grpc`/`fastapi` 包 |

---

## GitHub 仓库标准清单

`narrative-operator-nlp` 仓库必须包含以下文件，作为项目成熟度的基线门禁：

| 文件 | 用途 | 必填 |
|------|------|------|
| `docs/PROTOCOL.md` | NSP 数据结构标准定义 | ✅ |
| `schemas/narrative.proto` | Protobuf 契约定义 | ✅ |
| `schemas/narrative.schema.json` | JSON Schema 定义 | ✅ |
| `examples/call_via_mcp.py` | MCP 调用示例 | ✅ |
| `examples/call_via_http.py` | FastAPI 调用示例 | ✅ |
| `core/analyzer.py` | 核心分析函数 | ✅ |
| `adapters/mcp_server.py` | MCP 适配器 | ✅ |
| `adapters/grpc_server.py` | gRPC 适配器 | ✅ |
| `adapters/fastapi_app.py` | FastAPI 适配器 | ✅ |

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

## 部署策略

### 当前推荐：Sidecar 同容器部署（local-first）

```
┌──────────────────────────────────────┐
│           同一部署单元                  │
│  Docker container / systemd unit      │
│                                       │
│  ┌──────────┐   gRPC + UDS   ┌──────┐ │
│  │  Worker   │◄──────────────►│ NLP  │ │
│  │  Runtime  │               │ Op   │ │
│  └──────────┘               └──────┘ │
│                                       │
│  进程 A (core)          进程 B (nlp)   │
└──────────────────────────────────────┘
```

- Worker Runtime 和 NLP Operator 作为两个独立进程运行
- 通过 gRPC over Unix Domain Socket 通信（零网络开销）
- 同容器部署，无额外网络依赖，符合 local-first 原则
- 适合开发环境、单机部署、Docker Compose

### 未来演进：独立容器部署（cloud-ready）

```
┌──────────┐    gRPC/TCP    ┌──────────┐
│  Worker   │──────────────►│ NLP Op   │
│  Runtime  │               │ (replica)│
└──────────┘               └──────────┘
       │                        │
       └── k8s Service Mesh ────┘
```

- 算子独立扩缩容，按 NLP 负载调整副本数
- 通信从 UDS 切换为 gRPC over TCP，对应用层透明
- 适用于 Kubernetes / 云原生部署

### 禁止的做法

| ❌ 做法 | 理由 |
|---------|------|
| 将 operator-nlp 代码直接导入 Worker Runtime | 依赖耦合、版本锁死、GIL 竞争 |
| 通过共享文件系统传递任务数据 | 无契约约束，易产生隐式耦合 |
| 绕过协议层直接调用内部函数 | 破坏协议优先原则，无法独立部署 |

---

## 文档索引

- [Narrative Schema 叙事协议标准](narrative-schema.md): NSP 实体/关系标准化规范
- [System 系统架构](../system/README.md): 全局系统边界
- [Runtime 运行时](../runtime/README.md): 运行时分工与隔离
- [Platform 平台架构](../platform/README.md): 平台域模型与能力进化
