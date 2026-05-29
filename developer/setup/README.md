<!-- doc-nav:start -->
> 返回路径： [文档首页](../../README.md) | [上一级](../README.md)
<!-- doc-nav:end -->

# Setup

## EN Summary

This document defines the canonical development environment and tooling baseline for contributors.

## Machine-readable Metadata

```yaml
doc_id: developer-setup-README
path: developer/setup/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## Canonical Dev Environment

- IDE: VS Code
- AI IDE: Cursor（可选，不绑定）
- Rust: rust-analyzer + CodeLLDB + TOML tooling
- TS/React: ESLint + Prettier
- Python: Ruff + Pylance
- Git: gh CLI + Lazygit（推荐）
- Dev Environment: Optional DevContainer

原则：官方基线应面向广泛贡献者，避免高门槛绑定。
