# Product Modules

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document maps core product modules and their responsibilities across the NarrativeOS platform.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-modules-README
path: product/modules/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, developer, user, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 核心模块（示例）

- narrative-core: 核心能力与基础抽象
- narrative-studio: 工作台与生产力入口
- narrative-editor: 编辑体验与内容交互
- narrative-atlas: 知识结构能力
- narrative-spatial: 空间/GIS 能力
- narrative-api: 对外 API 能力层
- narrative-sdk-ts / narrative-sdk-py: 开发者集成层

## 关键能力模块（产品定义）

- [platform-domains.md](platform-domains.md): 平台域模块设计（当前基线六域）与协同主链路
- [corpus-observatory.md](corpus-observatory.md): 语料观测与语言向量资产模块
- [library.md](library.md): 语言百科型知识库模块
- [style-genome.md](style-genome.md): 风格基因卡与文风演化模块
- [analysis-engine.md](analysis-engine.md): 核心分析引擎模块（当前基线六引擎）与产品交付物
- [insight-engine.md](insight-engine.md): 证据链驱动的 AI 洞察模块
- [visual-os.md](visual-os.md): 语言驾驶舱模块与核心可视化交互能力
- [temporal-knowledge-processing.md](temporal-knowledge-processing.md): 时序知识加工模块（本地提取、加工与当前对象分析）
- [temporal-knowledge-processing-repo-design.md](temporal-knowledge-processing-repo-design.md): 仓库级模块设计（core/api/studio/cloud 边界）
- [proofreading-capability-gap-closure-plan.md](proofreading-capability-gap-closure-plan.md): 校对补齐能力在产品中的角色、边界与演进路径
- [proofreading-competitive-benchmark.md](proofreading-competitive-benchmark.md): 校对补齐竞争力是否成立的产品判断模块

## 校对能力在模块体系中的位置

校对相关条目用于说明“平台当前基线六域如何协同承接校对能力”。

- 定位页：`proofreading-capability-gap-closure-plan.md` 负责定义角色与边界。
- 判定页：`proofreading-competitive-benchmark.md` 负责定义 go/no-go 判断口径。
- 总映射页：`platform-domains.md` 负责定义功能点到域模块责任表。
