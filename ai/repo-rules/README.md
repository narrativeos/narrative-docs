# Repo Rules for AI

建议维护统一 copilot-instructions 规则，核心包括：

- Runtime isolation mandatory
- No cross-runtime import
- DuckDB is canonical storage
- IPC over shared dependency
- Plugin API contract only
- Prefer typed interfaces
- Documentation required

这些规则用于稳定 AI 输出质量与一致性。
