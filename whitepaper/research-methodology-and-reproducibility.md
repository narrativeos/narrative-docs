# 研究方法与复现基线

## Executive Summary (EN)

This document defines the minimum research methodology, corpus protocol, annotation rules, and reproducibility package requirements for NarrativeOS claims that target narratology, digital humanities, and computational linguistics audiences.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-research-methodology-and-reproducibility
path: whitepaper/research-methodology-and-reproducibility.md
lang_primary: zh-CN
lang_secondary: en
audience: [maintainer, researcher, contributor, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: foundation
owner: maintainer
```

## 目标 | Goals

本文件用于补齐 NarrativeOS 面向研究共同体时的最小方法学基线。

它回答四个问题：

- 研究型论断应建立在什么样的语料、任务和指标之上
- 哪些标注与复核要求属于最低门槛
- 哪些复现实验材料必须随结论一起提供
- 哪些对外说法在没有方法学支撑前不得升级为“已验证”

本文件不替代架构设计，不替代产品工作流，也不替代 benchmark 文档。

它的职责更窄：为研究有效性提供方法约束。

## 适用范围 | Scope

本文件适用于以下三类场景：

- 叙事学 / 文学理论导向的结构分析与解释性研究
- 数字人文 / 语料研究导向的比较、聚类、演化与统计研究
- NLP / 计算语言学导向的特征抽取、建模、评测与可复算实验

以下内容不在本文件直接覆盖范围内：

- 纯产品交互评审
- 未形成稳定任务定义的探索性脑暴
- 仅供内部原型试用、且不对外形成研究结论的临时实验

## 研究声明分级 | Claim Levels

NarrativeOS 的研究相关声明分为三层：

- Design-ready：架构与方法路径已定义，但尚无稳定实验结果
- Study-ready：已有明确研究任务、样本口径、标注协议与实验包模板
- Evidence-ready：已有可复核样本、版本、指标、证据链接与结果摘要

约束：

- 仅处于 Design-ready 的能力，不得表述为“研究上已证明”
- 仅处于 Study-ready 的能力，不得表述为“结果已稳定复现”
- 只有达到 Evidence-ready，且同时满足 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) 与 [evidence-registry.md](evidence-registry.md) 约束，才可形成更强的外部研究宣称

## 研究任务最小模板 | Minimum Study Template

每个正式研究任务至少应补齐以下字段：

```yaml
study_id: STUDY-XXX
title: 研究标题
research_track: narratology | digital_humanities | computational_linguistics
research_question: 研究问题
hypothesis: 可证伪假设
task_definition: 任务定义
corpus_definition: 样本来源与边界
annotation_protocol: 标注协议或规则来源
metrics: [metric-a, metric-b]
baseline: 对照方法或人工基线
repro_package: docs/path/or/release
owner: role-or-team
status: design-ready | study-ready | evidence-ready
```

最低要求：

- `research_question` 不能为空
- `hypothesis` 必须可证伪，不能只写愿景
- `corpus_definition` 必须能说明样本边界与纳入排除规则
- `metrics` 至少包含 1 个主指标和 1 个辅助指标
- `baseline` 不能为空，不能只和“无方法”比较

## 语料定义基线 | Corpus Definition Baseline

任何用于支撑研究结论的语料，至少要记录：

- 语料名称与版本
- 文本数量、语言、时间跨度、体裁与来源
- 纳入标准与排除标准
- 清洗规则与去重规则
- 版权或使用权限边界
- 是否包含人工修订、机器生成、OCR、翻译文本等混杂因素

来源策略补充：

- 不应默认把 CNKI 视为唯一或必需入口；正式样本与方法学参照均可来自期刊官网、出版社页面、DOI 落地页、开放数据库或其他可回查来源。
- 同一条来源线索若存在 CNKI 与非 CNKI 双重链路，应优先记录更稳定、可公开回查的链路。
- “来源可回查”与“正文可稳定抓取”不是同一件事；若站点受到登录墙、Cloudflare challenge 或机构权限限制，必须单独记录。
- 若某来源只适合承担方法学参照角色，而不适合进入正式比较语料，也应显式标注其角色边界。
- 若可选，优先记录“明确声明公开存取”的期刊链路，例如带 Creative Commons 许可、期刊官网直接开放 PDF、或 Crossref 明确登记 license URL 的来源。
- 若当前任务属于 `demo validation case`，则来源策略可进一步收紧为 `OA-only`：只允许使用明确公开存取、可直接稳定获取全文且权利边界可记录的样本进入 demo 流程；一旦探测到不能直接获取全文，就应立即放弃该条目，而不是保留为后续候选。
- “可直接稳定获取全文”的判定以实际使用路径为准：若浏览器可直接触发 PDF 下载或打开正文，则视为通过；若仅 CLI 因反爬策略返回 403，但浏览器侧可直接获取，不应误判为失败。

示例：

```yaml
corpus_id: CORPUS-URBAN-CN-1990-2025
language: zh-CN
genres: [essay, criticism]
time_window: 1990-01-01..2025-12-31
sample_size: 1200
inclusion_rule: 已发表中文城市写作文本，长度 >= 1500 字
exclusion_rule: 重复转载、节选不全、无法确认来源的文本
dedup_rule: title+author+hash
license_note: research-use-only or public-source
mixing_flags:
  translated_text: false
  ai_generated_text: partial
  ocr_reconstructed: false
```

来源示例：

```yaml
source_leads:
  formal_corpus_leads:
    - title: Unraveling the Urban Myth: History, City, and Literature in Xi Xi's Fiction
      doi: 10.1080/21514399.2019.1605255
      source_chain: Chinese Literature Today / Taylor & Francis / Crossref
      role: formal-source lead
    - title: The City as the Protagonist
      doi: 10.1080/21514399.2020.1750850
      source_chain: Chinese Literature Today / Taylor & Francis / Crossref
      role: thematic supplement lead
  methodology_leads:
    - title: 重新发现定量文学研究：概念、传统与范式
      source_chain: 数字人文研究 / CNKI专题入口可回查
      role: methodology reference
    - title: 数字人文视域下的文学创作与接受研究
      source_chain: 文艺论坛 / CNKI专题入口可回查
      role: methodology reference
  oa_journal_leads:
    - title: "The City's Charms and Challenges" by P K Leung (translation)
      doi: 10.22599/wcj.56
      source_chain: Writing Chinese: A Journal of Contemporary Sinophone Literature / White Rose University Press
      license: CC BY 4.0
      role: explicit-open-access lead
    - title: Contested Boundaries: Platformisation, Gender, and the Evolution of Jinjiang Literature City
      doi: 10.22599/wcj.75
      source_chain: Writing Chinese: A Journal of Contemporary Sinophone Literature / White Rose University Press
      license: CC BY 4.0
      role: explicit-open-access methodology-adjacent lead
```

## 标注协议基线 | Annotation Protocol Baseline

当研究任务依赖人工判断时，必须有标注协议。

至少包括：

- 标注目标：标什么，不标什么
- 标注单位：词、句、段、篇章、关系边
- 标注标签定义与正反例
- 冲突处理规则
- 复核流程与仲裁责任人
- 版本号与更新时间

如果任务涉及以下对象，建议优先建立人工标注协议：

- 叙事转折
- 修辞结构
- 主题迁移
- 情绪色调
- 感官表达
- AI 模板句或模板段

### 一致性要求 | Inter-Annotator Agreement

若任务包含 2 名及以上标注者，至少记录 1 个一致性指标。

建议门槛：

- 分类标签：Cohen's kappa >= 0.70
- 多标签或偏序判断：Krippendorff's alpha >= 0.67
- 连续量表：相关系数或 ICC 需明确口径

若低于门槛：

- 不得直接把该标注集作为强结论依据
- 必须说明争议标签、修订动作与下一轮校准计划

## 指标与基线 | Metrics and Baselines

每项研究至少定义三类内容：

- 主指标：直接回答研究问题
- 辅助指标：解释为什么得到该结果
- 对照基线：人工基线、规则基线、传统模型基线或历史版本基线

示例：

- 叙事分段任务：主指标可使用 segment-level F1；辅助指标可使用 boundary distance；基线可为 TextTiling 或人工专家平均值
- 风格分类任务：主指标可使用 macro-F1；辅助指标可使用 per-class precision/recall；基线可为词频+SVM 或已有版本模型
- 解释性任务：主指标可使用 evidence traceability rate；辅助指标可使用 unsupported conclusion ratio；基线可为人工审核结果

要求：

- 所有指标必须写清计算口径
- 指标名称相同但口径变化时，必须视为新版本
- 不允许只报告最优案例，不报告样本范围与失败分布

## 复现包要求 | Reproducibility Package Requirements

任何进入 `study-ready` 或 `evidence-ready` 的任务，都应附带最小复现包。

最小复现包包含：

- 任务定义
- 数据快照或可重建清单
- 数据预处理说明
- 特征或模型配置
- 指标计算脚本或等价伪代码
- 运行环境版本
- 结果摘要与失败样例
- 证据链接与结论边界说明

建议模板：

```yaml
repro_package:
  study_id: STUDY-XXX
  code_ref: repo/path/or/tag
  data_ref: docs/path/or/dataset-release
  env:
    os: macos|linux
    python: 3.x
    node: 20.x
    model_versions:
      embedding: bge-xxx
      parser: hanlp-xxx
  steps:
    - prepare corpus
    - run feature extraction
    - run evaluation
    - inspect failure cases
  outputs:
    - metrics summary
    - confusion or error slices
    - evidence samples
```

## 证据样本要求 | Evidence Sample Requirements

研究结论不能只停留在聚合指标，还应至少提供有限数量的可阅读样本。

建议每个正式研究任务最少提供：

- 3 个成功样本
- 3 个失败样本
- 1 组边界样本

每个样本应包含：

- 原文片段或可回链定位
- 系统结论
- 对应证据
- 人工判断或基线判断
- 差异说明

## 研究数据治理补充要求 | Research Data Governance Addendum

除 [../DATA_CLASSIFICATION_AND_RETENTION.md](../DATA_CLASSIFICATION_AND_RETENTION.md) 的通用规则外，研究型任务额外要求：

- 记录语料来源合法性与使用权限
- 标明是否可公开共享全文、片段或仅共享统计结果
- 涉及人工标注时，记录标注者角色与训练方式
- 涉及访谈或用户研究时，记录同意方式与脱敏策略
- 涉及跨语言比较时，记录翻译、转写或标准化步骤

若这些信息缺失，则该研究任务最多只能归类为 `design-ready`。

## 与现有文档的映射关系 | Mapping

- 架构与能力边界：见 [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md) 与 [../architecture/corpus-learning/README.md](../architecture/corpus-learning/README.md)
- 对外指标约束：见 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- 证据台账与状态：见 [evidence-registry.md](evidence-registry.md)
- 工作流与角色场景：见 [../product/workflows/README.md](../product/workflows/README.md)
- 数据分级与保留：见 [../DATA_CLASSIFICATION_AND_RETENTION.md](../DATA_CLASSIFICATION_AND_RETENTION.md)

## 发布门禁补充 | Additional Release Gates

若某能力要以“研究支持”或“学术适配”对外表述，除原有门禁外，至少再满足：

- Gate R1: 存在明确 study_id、研究问题与可证伪假设
- Gate R2: 存在语料定义、标注协议或规则来源
- Gate R3: 存在最小复现包与失败样本摘要
- Gate R4: 研究结论与 benchmark/evidence 状态一致

任一 Gate R 未满足，不建议对外使用“研究已验证”表述。

## 当前优先实施项 | Immediate Priorities

若只做首批补强，建议优先完成以下三项：

- 为 V2 语料研究路径补 1 个正式 study template，见 [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md)
- 为叙事分段或修辞识别补 1 份人工标注协议，见 [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md)
- 为 `evidence traceability rate` 补 1 个最小复现包示例，见 [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md)

对应执行作业单：

- [rsch-task-001-v2-corpus-runbook.md](rsch-task-001-v2-corpus-runbook.md)
- [anno-task-001-segmentation-consistency.md](anno-task-001-segmentation-consistency.md)
- [bench-task-001-evidence-traceability-audit.md](bench-task-001-evidence-traceability-audit.md)

这三项完成后，NarrativeOS 才会从“研究设计友好”更接近“研究执行就绪”。

## 关联文档 | Related Docs

- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [evidence-registry.md](evidence-registry.md)
- [readiness-checklist.md](readiness-checklist.md)
- [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md)
- [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md)
- [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md)
- [../architecture/corpus-learning/README.md](../architecture/corpus-learning/README.md)
- [../architecture/analysis-engine/README.md](../architecture/analysis-engine/README.md)