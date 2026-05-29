# Coding Rules

## AI-First Engineering 分工

- 人: 架构、产品边界、规范
- AI: 实现、重构、测试、文档维护
- CI: 编译、lint、测试、契约验证

## 质量守门

- Rust: cargo fmt / clippy / test
- TS: eslint / typecheck / vitest
- Python: ruff / pytest

## 变更要求

- 变更必须更新相关文档
- 架构与存储关键变更需更新 ADR
