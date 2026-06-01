# Developer Docs Execution Sprint Plan

## 摘要（中文）

本页是 narrative-docs 的开发向执行清单，按两周冲刺编排任务、角色分工、验收标准与风险控制。

## Executive Summary (EN)

This document defines a two-week, developer-facing execution plan for narrative-docs, including tasks, owners, definition of done, and risk controls.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: developer-docs-execution-sprint-plan
path: developer/coding/developer-docs-execution-sprint-plan.md
lang_primary: zh-CN
lang_secondary: en
audience: [developer, contributor, maintainer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 目标与边界

目标：把文档治理变成开发默认流程，降低跨仓协作中的上下文漂移与交付回归。

边界：

- 聚焦 narrative-docs 的工程化治理，不替代各代码仓的实现细节文档。
- 以可执行任务和可验证门禁为主，不做大规模内容重写。

## 冲刺周期

- 周期长度：2 周
- 复盘节奏：每周一次进度评审 + 冲刺结束回顾
- 交付方式：任务项必须绑定验证命令与证据链接

## 角色分工（RACI 简化版）

- Maintainer：优先级决策、最终合并审批
- Docs Owner：文档结构、索引、导航与治理规则维护
- API Owner：OpenAPI 与兼容性说明联动维护
- CI Owner：门禁脚本与检查链路维护
- Reviewer：执行抽检与回归确认

## 两周执行清单

### Week 1：门禁工程化与入口收敛

| ID | 任务 | Owner | DoD | 验证命令 |
| --- | --- | --- | --- | --- |
| W1-01 | 将 Markdown 相对链接检查纳入本地/CI 门禁 | CI Owner | `make docs-check-all` 默认包含链接检查，断链会阻断 | `make docs-check-all` |
| W1-02 | 固化 API 变更联动规则（OpenAPI -> 兼容性说明 -> 索引） | API Owner | 规则写入贡献流程文档，新增示例完成演练 | `make docs-check-all` |
| W1-03 | 清理开发入口跳转链路（README/index/contributing） | Docs Owner | 新贡献者路径不超过 3 跳，关键入口无歧义 | 手动走查 + `make docs-check-all` |
| W1-04 | 更新文档索引与导航接入策略 | Docs Owner | 新增页面必须在 `assets/doc-index.yaml` 可追踪 | `make docs-check-all` |

### Week 2：跨仓协同与可观测交付

| ID | 任务 | Owner | DoD | 验证命令 |
| --- | --- | --- | --- | --- |
| W2-01 | 建立每周跨仓文档差异检查（api/core/studio） | Maintainer + Reviewer | 输出差异清单并完成首轮清零 | `make docs-check-all` + 差异报告 |
| W2-02 | 建立高频排障条目回灌流程 | Docs Owner | 高频问题可在排障中心按关键词命中 | 抽样检索 + 手动走查 |
| W2-03 | 建立冲刺发布证据模板（任务-命令-结果） | Reviewer | 每项任务都有可复核证据路径 | `make docs-check-all` |
| W2-04 | 形成下一冲刺 backlog 与风险清单 | Maintainer | 优先级、owner、依赖项明确 | 冲刺复盘记录 |

## 风险与缓解

| 风险 | 表现 | 缓解策略 |
| --- | --- | --- |
| 规则有脚本但未执行 | 本地通过率低、合并后回归 | 将门禁前置到默认命令与 PR 流程 |
| 文档与代码仓节奏不一致 | API/术语出现版本错位 | 固化每周跨仓对齐例会与差异清单 |
| 新文档未接入索引 | 页面存在但不可发现 | 以 `assets/doc-index.yaml` 作为必经检查项 |
| 贡献路径过长 | 新人上手慢、重复提问高 | 控制关键路径跳转层级并做月度走查 |

## 指标与验收

- 门禁通过率：冲刺期内保持 100%
- 断链数量：持续为 0
- 新增文档索引覆盖率：100%
- 开发首个成功任务耗时：15 分钟以内（抽样）
- 跨仓差异清单清零率：每周可追踪

## 关联文档

- [README.md](README.md)
- [docs-governance-standard.md](docs-governance-standard.md)
- [docs-release-readiness-checklist.md](docs-release-readiness-checklist.md)
- [local-cloud-function-alignment-sprint-pack.md](local-cloud-function-alignment-sprint-pack.md)
- [../../api-compatibility-and-versioning.md](../../api-compatibility-and-versioning.md)
- [../../troubleshooting.md](../../troubleshooting.md)
- [../../product/roadmap/README.md](../../product/roadmap/README.md)
