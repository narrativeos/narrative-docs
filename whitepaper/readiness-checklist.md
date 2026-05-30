# 白皮书附录 B：就绪度检查清单

本页不是给第一次阅读项目的人准备的。

它是发布前的校核清单，用于回答一个更窄的问题：

在当前证据和文档状态下，哪些内容可以稳妥地对外说，哪些内容仍应保留为“基本完成”或“需补强”。

## 评分方式

- 已完成：可直接对外发布
- 基本完成：主体可用，建议补充增强材料
- 需补强：对外发布前建议先补

## 使用边界

- 对外读者通常不需要先读本页
- 维护者、评审者和发布负责人应在对外发布前使用本页
- 本页的结论必须服从 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) 与 [evidence-registry.md](evidence-registry.md) 的证据状态

## 证据规则（强制）

- 每个“已完成/基本完成/需补强”结论必须绑定可验证文档路径
- 若条目依赖“建议补充项”未关闭，则不得标记为“已完成”
- 就绪度状态更新时，需在 PR 描述中附上证据链接或验证记录

补充阻断规则：

- 若核心指标仅有建议值（无实测值），不得标记“可直接对外发布”
- 若状态与映射表不一致，视为发布阻断项
- 若 evidence_link 缺失或不可访问，状态自动降为“基本完成”

## A. 叙事完整性

- 已完成：项目定位与目标清晰（见 [README.md](../README.md), [product/vision/README.md](../product/vision/README.md)）
- 已完成：核心架构与能力主线完整（见 [architecture/system/README.md](../architecture/system/README.md), [product/modules/README.md](../product/modules/README.md)）
- 基本完成：差异化表达充分，建议补定量对比

## B. 技术可信性

- 已完成：系统分层与运行时边界定义
- 已完成：ADR 机制建立（见 [adr/README.md](../adr/README.md)）
- 已完成：基准测试与验收指标入口（见 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)）
- 基本完成：研究方法、标注协议与复现样板已建立（见 [research-methodology-and-reproducibility.md](research-methodology-and-reproducibility.md), [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md), [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md), [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md)）

## C. 交付可行性

- 已完成：V1-V3 路线图明确（见 [product/roadmap/README.md](../product/roadmap/README.md)）
- 已完成：角色工作流可追踪（见 [product/workflows/README.md](../product/workflows/README.md)）
- 基本完成：建议补里程碑验收指标表

## D. 开源治理

- 已完成：许可证清晰（Apache-2.0）
- 已完成：治理文档（见 [GOVERNANCE.md](../GOVERNANCE.md)）
- 已完成：行为准则（见 [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md)）
- 基本完成：贡献流程模板可从 GitHub 模板扩展

## E. 安全与合规

- 基本完成：本地优先与隐私边界已有描述
- 已完成：安全策略与漏洞披露流程（见 [SECURITY.md](../SECURITY.md)）
- 已完成：数据分类与保留周期说明（见 [DATA_CLASSIFICATION_AND_RETENTION.md](../DATA_CLASSIFICATION_AND_RETENTION.md)）

## F. 生态与扩展

- 基本完成：插件与 SDK 章节具备（见 [developer/plugins/README.md](../developer/plugins/README.md), [developer/sdk/README.md](../developer/sdk/README.md)）
- 已完成：API 兼容性与版本策略（见 [API_COMPATIBILITY_AND_VERSIONING.md](../API_COMPATIBILITY_AND_VERSIONING.md)）

## 主链路发布前终校（10-12 文件）

以下清单用于发布前最后一轮人工校对，按严重级别从高到低执行。

### P0（阻断发布）

- [ ] 事实与状态一致：凡出现“已完成/已验证/可发布”的表述，均能在 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) 或 [evidence-registry.md](evidence-registry.md) 找到对应证据。
- [ ] 关键编号与数量一致：章节编号、条目数量与正文清单一致（避免跳号、错计数、前后矛盾）。
- [ ] 边界声明一致：首期范围、冻结边界、非目标在 [whitepaper/one-page-summary.md](one-page-summary.md), [whitepaper/project-foundation.md](project-foundation.md), [whitepaper/implementation-freeze.md](implementation-freeze.md) 不冲突。

### P1（高优先，建议发布前完成）

- [ ] 入口链路可达：从 [../index.md](../index.md) -> [../README.md](../README.md) -> [README.md](README.md) -> [one-page-summary.md](one-page-summary.md) -> [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md) 的跳转无断链。
- [ ] 术语首定义清晰：主线页在首屏均提供术语入口并可回链 [../assets/glossary.zh-en.md](../assets/glossary.zh-en.md)。
- [ ] 命名口径统一：核心术语（如 Full MRI Walkthrough、Contract、SSOT）在主链路文档写法一致。
- [ ] 附录角色清晰：映射表与就绪度清单在 [README.md](README.md), [../index.md](../index.md), [../governance-overview.md](../governance-overview.md) 中均被标记为附录/终校材料，而非正文主线。

### P2（优化项，可在后续迭代完成）

- [ ] 首屏长度受控：入口页首屏控制在“可快速分流”的信息密度，长清单下沉到 overview 或分区 README。
- [ ] 图文平衡：架构主文至少保留一张系统全景图和一条可执行 walkthrough 入口。
- [ ] 风格统一：overview 页的开场句式与推荐阅读顺序保持同模板风格。

### 终校目标文件

- [x] [../index.md](../index.md)
- [x] [../README.md](../README.md)
- [x] [README.md](README.md)
- [x] [one-page-summary.md](one-page-summary.md)
- [x] [project-foundation.md](project-foundation.md)
- [x] [market-acceptance.md](market-acceptance.md)
- [x] [implementation-freeze.md](implementation-freeze.md)
- [x] [evidence-registry.md](evidence-registry.md)
- [x] [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [x] [../architecture/README.md](../architecture/README.md)
- [x] [../architecture/system/README.md](../architecture/system/README.md)
- [x] [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)

## 本轮终校结果（2026-05-30）

本轮按“主链路发布前终校（10-12 文件）”执行，结论如下。

### P0 结果

- [x] 事实与状态一致：通过。
	说明：主链路文件中的“已完成/已验证/可发布”表述与证据边界未发现明显冲突，且 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) 对 TBD/Measured 边界约束清晰。
- [x] 关键编号与数量一致：通过。
	说明：本轮已修正并复核 [project-foundation.md](project-foundation.md) 的成果数量描述与 [competitor-matrix.md](competitor-matrix.md) 的小节编号一致性问题。
- [x] 边界声明一致：通过。
	说明：首期边界与非目标在 [one-page-summary.md](one-page-summary.md), [project-foundation.md](project-foundation.md), [implementation-freeze.md](implementation-freeze.md) 之间未发现互相否定。

### P1 结果

- [x] 入口链路可达：通过。
	说明：目标链路文件均存在且入口关系清晰（index -> README -> whitepaper -> analysis-engine）。
- [x] 术语首定义清晰：通过。
	说明：白皮书主线与架构主线已补术语入口并回链 [../assets/glossary.zh-en.md](../assets/glossary.zh-en.md)。
- [x] 命名口径统一：通过。
	说明：主链路中的 Full MRI Walkthrough、Contract、SSOT 写法已统一。
- [x] 附录角色清晰：通过。
	说明：映射表与就绪度清单已在入口页被标记为附录/终校材料。

### P2 结果

- [x] 首屏长度受控：通过。
	说明：首页和 README 已做分层下沉，减少重复清单。
- [x] 图文平衡：通过。
	说明：架构主文保留系统全景图与主链路图，分析引擎保留 Full MRI Walkthrough。
- [x] 风格统一：通过。
	说明：overview 页开场句式与推荐阅读顺序已统一模板。

### 残余风险（非阻断）

- 市场与验收的实测证据仍偏少，当前“可发布”更多是文档与边界层面的可发布，而非能力已全面实证。
- 建议在下一轮优先补 measured 指标与访谈/试点证据，再提升对外结论强度。

### 本轮审稿覆盖文件

- [../index.md](../index.md)
- [../README.md](../README.md)
- [README.md](README.md)
- [one-page-summary.md](one-page-summary.md)
- [project-foundation.md](project-foundation.md)
- [market-acceptance.md](market-acceptance.md)
- [implementation-freeze.md](implementation-freeze.md)
- [evidence-registry.md](evidence-registry.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [../architecture/README.md](../architecture/README.md)
- [../architecture/system/README.md](../architecture/system/README.md)
- [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)

## 建议补充的最小文档集（优先级从高到低）

- 优先补充竞品量化对比与差异化证据。
- 补充“已知限制”专章并与路线图联动。
- 补充里程碑验收实测数据与计算口径。
- 补充市场接受度证据来源与试点记录。
- 补充开工冻结表的批准人与变更条件。

## 发布角色说明

如果把白皮书看作一本书，本页更像出版前的终校单，而不是正文章节。

它存在的价值是防止 NarrativeOS 在证据不足时把规划说成事实。

## 维护规则

- 每次重大架构或路线图更新后，必须同步更新本清单状态
- 清单中的“需补强”项关闭后，应在对应文档中加入交叉链接
- 每次发布评审前，必须核对 [core-docs-mapping.md](core-docs-mapping.md) 的状态一致性

## 备注

如果未来需要对外公开展示本页，建议只展示结果摘要，不展示完整内部校核项。
