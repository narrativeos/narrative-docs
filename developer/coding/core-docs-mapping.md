# 白皮书附录 A：核心文档映射表

本页不是白皮书正文，而是出版与维护附录。

它的用途只有两个：

- 帮维护者确认“白皮书章节 -> 权威来源”是否仍然一致
- 帮发布评审者快速核对每一章背后的事实源是否明确

## 目标 | Goals

将 narrative-docs 现有核心内容映射到主流开源白皮书章节，形成稳定的“章节 -> 权威来源”关系。

它服务于白皮书正文，但不替代正文阅读。

## 映射总表

| 白皮书章节 | 当前权威来源 | 状态 | 证据状态 | 证据版本 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 01 执行摘要 | [whitepaper/one-page-summary.md](../../whitepaper/one-page-summary.md), [README.md](../../README.md), [product/vision/README.md](../../product/vision/README.md) | 完成 | linked | vNext | 已补齐对外一页纸摘要 |
| 02 问题定义与市场空白 | [README.md](../../README.md), [product/vision/README.md](../../product/vision/README.md) | 基本完成 | partial | vNext | 建议补竞品对比量化指标 |
| 03 解决方案与产品定位 | [README.md](../../README.md), [product/modules/README.md](../../product/modules/README.md) | 完成 | linked | vNext | 可直接用于白皮书主叙事 |
| 04 技术架构与系统边界 | [architecture/system/README.md](../../architecture/system/README.md), [architecture/platform/README.md](../../architecture/platform/README.md), [adr/README.md](../../adr/README.md), [whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md), [whitepaper/research-methodology-and-reproducibility.md](../../whitepaper/research-methodology-and-reproducibility.md) | 完成 | partial | vNext | 架构、ADR、验收指标与研究方法基线已形成联动，实测指标待补 |
| 05 核心能力与工作流 | [product/workflows/README.md](../../product/workflows/README.md), [product/modules/README.md](../../product/modules/README.md), [whitepaper/study-template-v2-corpus-comparative-analysis.md](../../whitepaper/study-template-v2-corpus-comparative-analysis.md), [whitepaper/annotation-protocol-narrative-segmentation.md](../../whitepaper/annotation-protocol-narrative-segmentation.md), [whitepaper/reproducibility-package-evidence-traceability.md](../../whitepaper/reproducibility-package-evidence-traceability.md) | 完成 | linked | vNext | 已补研究执行样板，可将研究者路径下沉为任务模板、协议与复现包 |
| 06 路线图与里程碑 | [product/roadmap/README.md](../../product/roadmap/README.md) | 完成 | linked | vNext | 已有 V1-V3 结构 |
| 07 开源治理与协作模型 | [governance.md](../../governance.md), [developer/README.md](../README.md), [ai/repo-rules/README.md](../../ai/repo-rules/README.md), [code-of-conduct.md](../../code-of-conduct.md), [developer/coding/docs-governance-standard.md](docs-governance-standard.md), [developer/coding/docs-governance-backlog.md](docs-governance-backlog.md) | 完成 | linked | vNext | 治理标准、待治理清单与流程门禁已建立 |
| 08 安全、隐私与合规 | [security.md](../../security.md), [architecture/system/README.md](../../architecture/system/README.md), [user/cloud/README.md](../../user/cloud/README.md), [data-classification-and-retention.md](../../data-classification-and-retention.md) | 完成 | linked | vNext | 漏洞披露、数据保留与云模式边界已形成联动 |
| 09 生态、扩展与接口 | [api-compatibility-and-versioning.md](../../api-compatibility-and-versioning.md), [developer/plugins/README.md](../plugins/README.md), [developer/sdk/README.md](../sdk/README.md), [platform-domains.md](./platform-domains.md) | 完成 | linked | vNext | 已补齐 API 兼容性与版本治理策略 |
| 10 风险、限制与后续计划 | [product/roadmap/README.md](../../product/roadmap/README.md), [adr/README.md](../../adr/README.md) | 部分完成 | missing | vNext | 建议补“已知限制”专章 |

## 状态判定规则（证据驱动）

- 完成：存在权威文档且可验证证据闭环
- 基本完成：主叙事可用，但仍缺关键证据或量化数据
- 部分完成：仅有框架或映射，缺失关键内容

状态更新时应同步 [readiness-checklist.md](readiness-checklist.md)。

## 使用边界

- 对外首次阅读时，不建议把本页作为主入口
- 对内做发布校核、章节追溯或文档治理时，再使用本页
- 若正文与本页出现冲突，应先修正文威来源，再回填映射状态

## 一致性检查（发布前）

- 映射表状态与就绪度清单状态必须一致
- `证据状态=missing` 的条目不得声明“可直接对外发布”
- 核心指标若仅有 planned，无 measured 证据时应标注 `partial`

## 正文回溯路径（供编辑与评审使用）

- 第一步：项目定位与价值
  - [README.md](../../README.md)
  - [product/vision/README.md](../../product/vision/README.md)
- 第二步：架构与可信性
  - [architecture/system/README.md](../../architecture/system/README.md)
  - [architecture/platform/README.md](../../architecture/platform/README.md)
  - [adr/README.md](../../adr/README.md)
- 第三步：能力与落地节奏
  - [product/modules/README.md](../../product/modules/README.md)
  - [product/workflows/README.md](../../product/workflows/README.md)
  - [product/roadmap/README.md](../../product/roadmap/README.md)
- 第四步：开源协作与实施
  - [developer/README.md](../README.md)
  - [ai/README.md](../../ai/README.md)

## 整理原则

- 不重复发明内容：白皮书章节优先引用已存在权威文档
- 不打散事实源：技术细节仍在 architecture 和 adr，白皮书只做汇总与映射
- 不失去可维护性：所有章节映射必须落到具体路径，避免口号化描述

## 维护提示

如果 NarrativeOS 的白皮书以后进一步成稿，本页仍应保留在附录区，而不应重新回到主叙事链路。
