<!-- doc-nav:start -->
> 返回路径： [白皮书目录](README.md) | [文档首页](../README.md)
<!-- doc-nav:end -->

# 开源白皮书就绪度检查清单

## 评分方式

- 已完成：可直接对外发布
- 基本完成：主体可用，建议补充增强材料
- 需补强：对外发布前建议先补

## 证据规则（强制）

- 每个“已完成/基本完成/需补强”结论必须绑定可验证文档路径
- 若条目依赖“建议补充项”未关闭，则不得标记为“已完成”
- 就绪度状态更新时，需在 PR 描述中附上证据链接或验证记录

## A. 叙事完整性

- 已完成：项目定位与目标清晰（见 [README.md](../README.md), [product/vision/README.md](../product/vision/README.md)）
- 已完成：核心架构与能力主线完整（见 [architecture/system/README.md](../architecture/system/README.md), [product/modules/README.md](../product/modules/README.md)）
- 基本完成：差异化表达充分，建议补定量对比

## B. 技术可信性

- 已完成：系统分层与运行时边界定义
- 已完成：ADR 机制建立（见 [adr/README.md](../adr/README.md)）
- 已完成：基准测试与验收指标入口（见 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)）

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

## 建议补充的最小文档集（优先级从高到低）

- 优先补充竞品量化对比与差异化证据。
- 补充“已知限制”专章并与路线图联动。
- 补充里程碑验收实测数据与计算口径。

## 维护规则

- 每次重大架构或路线图更新后，必须同步更新本清单状态
- 清单中的“需补强”项关闭后，应在对应文档中加入交叉链接
