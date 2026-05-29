# Setup

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

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

## 本页用途

定义贡献者的最小开发环境基线与 10 分钟可执行自检路径。

## 阅读路径（建议）

- 第一步：完成本页“10 分钟环境自检”
- 第二步：进入 [../workspace/README.md](../workspace/README.md) 打开多仓工作区
- 第三步：进入 [../coding/README.md](../coding/README.md) 对齐交付门禁

## 标准参考

- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)

## Canonical Dev Environment

- IDE: VS Code
- AI IDE: Cursor（可选，不绑定）
- Rust: rust-analyzer + CodeLLDB + TOML tooling
- TS/React: ESLint + Prettier
- Python: Ruff + Pylance
- Git: gh CLI + Lazygit（推荐）
- Dev Environment: Optional DevContainer

原则：官方基线应面向广泛贡献者，避免高门槛绑定。

## 10 分钟环境自检

### 前置条件

- 当前目录位于 NarrativeOS 工作区根目录
- 本机可访问 GitHub 与依赖源

### 执行命令

```bash
git --version
node --version
python3 --version
rustc --version
```

可选检查：

```bash
gh --version
code --version
```

### 验收标准

- 四项基础命令全部可执行
- 版本信息成功输出且无错误
- 可选工具缺失时有替代方案（例如不依赖 gh 也可提交流程）

## 推荐安装顺序

1. Git
2. Node.js（LTS）
3. Python 3.10+
4. Rust stable toolchain
5. VS Code 与必要扩展

## 常见问题排查

- `node` 不存在：检查 PATH 或重新安装 Node LTS
- `rustc` 不存在：通过 rustup 安装 stable 工具链
- `python3` 指向旧版本：检查 pyenv/conda shell 初始化顺序

更多问题见 [../../TROUBLESHOOTING.md](../../TROUBLESHOOTING.md)。

## 下一步

- 完成 [../workspace/README.md](../workspace/README.md) 的工作区打开与验证
