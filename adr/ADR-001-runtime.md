# ADR-001: Runtime Isolation and Communication Boundaries

- 状态: Accepted
- 日期: 2026-05-29
- 决策者: NarrativeOS Maintainers

## 背景

NarrativeOS 是 Rust/Tauri + TypeScript/React + Python Worker 的多运行时系统。若缺少明确边界，长期会出现耦合失控、跨仓上下文漂移与维护成本上升。

## 决策

- 采用运行时隔离作为强约束
- 禁止跨运行时直接导入依赖
- 运行时之间通过 IPC 或显式 API Contract 通信
- 违反边界的例外必须先记录 ADR

## 影响

- 提升架构稳定性与长期可维护性
- 增加初期接口设计成本
- 需要更严格的文档与 CI 规则来守护边界

## 备选方案

- 方案 A: 运行时自由互相调用（拒绝）
- 方案 B: 仅靠代码评审约束边界（拒绝）

## 后续动作

- 在 ai/repo-rules 中固化运行时边界规则
- 在 CI 中补充边界违规检查
