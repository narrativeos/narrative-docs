<!-- doc-nav:start -->
> 返回路径： [白皮书目录](README.md) | [文档首页](../README.md)
<!-- doc-nav:end -->

# 核心文档映射表（按开源白皮书标准）

## 目标

将 narrative-docs 现有核心内容映射到主流开源白皮书章节，形成稳定的“章节 -> 权威来源”关系。

## 映射总表

| 白皮书章节 | 当前权威来源 | 状态 | 备注 |
| --- | --- | --- | --- |
| 01 执行摘要 | [whitepaper/one-page-summary.md](one-page-summary.md), [README.md](../README.md), [product/vision/README.md](../product/vision/README.md) | 完成 | 已补齐对外一页纸摘要 |
| 02 问题定义与市场空白 | [README.md](../README.md), [product/vision/README.md](../product/vision/README.md) | 基本完成 | 建议补竞品对比量化指标 |
| 03 解决方案与产品定位 | [README.md](../README.md), [product/modules/README.md](../product/modules/README.md) | 完成 | 可直接用于白皮书主叙事 |
| 04 技术架构与系统边界 | [architecture/system/README.md](../architecture/system/README.md), [architecture/platform/README.md](../architecture/platform/README.md), [adr/README.md](../adr/README.md), [whitepaper/benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) | 完成 | 架构、ADR 与验收指标已形成联动 |
| 05 核心能力与工作流 | [product/workflows/README.md](../product/workflows/README.md), [product/modules/README.md](../product/modules/README.md) | 完成 | 支持按角色展示价值 |
| 06 路线图与里程碑 | [product/roadmap/README.md](../product/roadmap/README.md) | 完成 | 已有 V1-V3 结构 |
| 07 开源治理与协作模型 | [GOVERNANCE.md](../GOVERNANCE.md), [developer/README.md](../developer/README.md), [ai/repo-rules/README.md](../ai/repo-rules/README.md), [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md), [developer/coding/docs-governance-standard.md](../developer/coding/docs-governance-standard.md), [developer/coding/docs-governance-backlog.md](../developer/coding/docs-governance-backlog.md) | 完成 | 治理标准、待治理清单与流程门禁已建立 |
| 08 安全、隐私与合规 | [SECURITY.md](../SECURITY.md), [architecture/system/README.md](../architecture/system/README.md), [user/cloud/README.md](../user/cloud/README.md), [DATA_CLASSIFICATION_AND_RETENTION.md](../DATA_CLASSIFICATION_AND_RETENTION.md) | 完成 | 漏洞披露、数据保留与云模式边界已形成联动 |
| 09 生态、扩展与接口 | [API_COMPATIBILITY_AND_VERSIONING.md](../API_COMPATIBILITY_AND_VERSIONING.md), [developer/plugins/README.md](../developer/plugins/README.md), [developer/sdk/README.md](../developer/sdk/README.md), [product/modules/platform-domains.md](../product/modules/platform-domains.md) | 完成 | 已补齐 API 兼容性与版本治理策略 |
| 10 风险、限制与后续计划 | [product/roadmap/README.md](../product/roadmap/README.md), [adr/README.md](../adr/README.md) | 部分完成 | 建议补“已知限制”专章 |

## 状态判定规则（证据驱动）

- 完成：存在权威文档且可验证证据闭环
- 基本完成：主叙事可用，但仍缺关键证据或量化数据
- 部分完成：仅有框架或映射，缺失关键内容

状态更新时应同步 [readiness-checklist.md](readiness-checklist.md)。

## 核心阅读路径（对外版）

- 第一步：项目定位与价值
  - [README.md](../README.md)
  - [product/vision/README.md](../product/vision/README.md)
- 第二步：架构与可信性
  - [architecture/system/README.md](../architecture/system/README.md)
  - [architecture/platform/README.md](../architecture/platform/README.md)
  - [adr/README.md](../adr/README.md)
- 第三步：能力与落地节奏
  - [product/modules/README.md](../product/modules/README.md)
  - [product/workflows/README.md](../product/workflows/README.md)
  - [product/roadmap/README.md](../product/roadmap/README.md)
- 第四步：开源协作与实施
  - [developer/README.md](../developer/README.md)
  - [ai/README.md](../ai/README.md)

## 整理原则

- 不重复发明内容：白皮书章节优先引用已存在权威文档
- 不打散事实源：技术细节仍在 architecture 和 adr，白皮书只做汇总与映射
- 不失去可维护性：所有章节映射必须落到具体路径，避免口号化描述
