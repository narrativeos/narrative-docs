# NarrativeOS Engineering Rules

## Purpose

This file is the Copilot constitution for NarrativeOS repositories.
These rules are mandatory unless an ADR explicitly grants an exception.

## Hard Rules

1. Runtime isolation mandatory.
2. No cross-runtime import.
3. DuckDB is canonical storage.
4. IPC over shared dependency.
5. Plugin API contract only.
6. Cloud optional.
7. Prefer Rust workspace crates.
8. Prefer typed interfaces.
9. Documentation required.

## 中文说明

本文件是 NarrativeOS 仓库的 Copilot 宪法。
除非有 ADR 明确批准例外，否则以下规则必须执行。

## 强制规则

1. 必须保持运行时隔离。
2. 禁止跨运行时直接导入。
3. DuckDB 是规范化存储基线。
4. 跨运行时交互优先 IPC，不走共享依赖耦合。
5. 插件只能通过 API 合约边界接入。
6. 云能力为可选层，不能破坏本地可用性。
7. 优先使用 Rust workspace crates 组织共享能力。
8. 优先类型化接口与显式契约。
9. 代码变更必须同步文档。

## Enforcement

- Pull request template must include architecture impact and rule impact.
- Pull request template must include AI Review (Layer B) findings.
- Pull request template must include CI Gate (Layer C) results.
- CI must fail on lint/test/contract violations.
- Architecture and storage changes must update ADR.

## Change Process

- Propose rule changes via PR.
- Link related ADR in the PR description.
- Require maintainer approval before merge.
