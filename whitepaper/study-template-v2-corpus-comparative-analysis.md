# V2 语料比较研究模板

## Executive Summary (EN)

This document provides a study-ready template for corpus-scale comparative analysis in NarrativeOS V2. It is designed to bridge product workflows and research-grade study definition.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-study-template-v2-corpus-comparative-analysis
path: whitepaper/study-template-v2-corpus-comparative-analysis.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, contributor, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
status: template-foundation
owner: maintainer
```

## 用途 | Purpose

本文件提供一个正式的 V2 研究任务模板，用于把“语料观测”从产品能力描述推进到可执行研究设计。

它不宣称已有实验结果。

它的职责是把研究问题、样本口径、对照方法、指标、输出物和复现包要求写成稳定模板。

## 适用场景 | Applicable Scenario

适用于以下类型的 V2 研究：

- 跨时期文本比较
- 跨作者风格比较
- 人类文本与 AI 文本比较
- 学科写作比较
- 城市叙事或主题演化研究

## 推荐开放获取校准样本 | Recommended Open-Access Calibration Paper

若首轮只选 1 篇更贴近“中文城市写作 / 文学叙事”语境的开放获取论文做流程校准，优先考虑：

- Title: Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy
- DOI: 10.1080/21514399.2011.11833931
- Venue: Chinese Literature Today
- Type: journal article with public full-text route in Crossref metadata

推荐理由：

- 直接处理中文文学文本、都市青年书写和特区症候，和“城市写作”主题更接近
- 文章围绕具体文学作品展开，适合 NarrativeOS 做 narrative flow、主题迁移和证据回链的轻量试跑
- 比一般媒体研究论文更接近文学研究与叙事分析的目标场景

备选的流程型校准样本仍可使用：

- Title: Digital heroism in Indonesian media: Cross-Cultural solidarity and viral narrative transformation
- DOI: 10.1016/j.ssaho.2025.102295
- Venue: Social Sciences & Humanities Open
- Type: open-access journal article

使用边界：

- 上述论文都更适合做 `workflow calibration sample`，不适合直接代表正式研究语料
- 它们都不应直接替代本模板中的“1990-2025 中文城市写作”正式样本定义
- 若要进入正式 V2 语料研究，仍应扩展到多篇中文城市写作样本并保持时间切片一致

## 当前正式来源线索 | Current Formal Source Leads

以下条目是已检索到、可回查的城市文学相关开放获取来源线索。它们目前只能视为 `candidate_only`，用于帮助后续构建正式语料，不等于已经纳入 `CORPUS-URBAN-CN-1990-2025`。

- Unraveling the Urban Myth: History, City, and Literature in Xi Xi's Fiction. DOI: 10.1080/21514399.2019.1605255. 主题明确涉及 history、city、literature，可作为 2015-2025 切片的优先核验线索。
- Body-Writing: Shanghai Baby's Love Affair with Transnational Capitalism. DOI: 10.1080/21514399.2010.11833910. 与上海城市书写高度相关，但更适合先作为背景来源或对照来源核验。
- Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy. DOI: 10.1080/21514399.2011.11833931. 当前已承担 workflow calibration 角色，除非后续重设样本边界，否则默认不直接计入正式比较统计。

纳入前置条件：

- 需确认候选条目与目标时间切片之间的对应关系。
- 需确认文本完整性、来源稳定性和版权边界。
- 需在作业单中完成去重和 include/no 决策后，才能进入正式比较。

当前首轮判定：

- `dropped_due_to_fulltext_access`: Unraveling the Urban Myth: History, City, and Literature in Xi Xi's Fiction. 主题仍然贴合，但既然已探测到不能直接稳定获取全文，就直接从当前路线放弃。
- `background_only`: Body-Writing: Shanghai Baby's Love Affair with Transnational Capitalism. 先保留为背景来源，不作为当前首个正式样本。
- `calibration_only`: Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy. 继续承担流程校准角色，不进入首轮正式比较。

当前推进状态：

- `CN-URBAN-2015-001` 已从当前路线移出，因为全文直接获取失败。
- 当前主线切换为：只保留那些已经通过“可直接获取全文”检查的 OA 条目。
- 一旦某条线索探测到不能直接稳定获取全文，即从 demo 路线直接放弃，不再保留为 reserve lead。

## 中文方法学线索池 | Chinese Methodology Lead Pool

来自相关专题入口（链接已移除）的当前判断是：它更适合补充中文数字人文与文学研究的方法学参照，而不是直接充当“中文城市写作”正式语料入口。

当前可回查的本土方法学线索包括：

- 重新发现定量文学研究：概念、传统与范式。来源：数字人文研究，2024-12-28。适合作为 NarrativeOS 讨论定量文学研究定位与方法边界的中文参照。
- 数字人文视域下的文学创作与接受研究。来源：文艺论坛，2024-12-01。适合作为“文学创作/接受”类研究任务的中文理论参照。
- 清初至嘉道时期词人地理分布可视化分析。来源：浙江大学学报(人文社会科学版)，2024-11-15。适合作为“文学地理 / 作家空间分布”类分析的中文方法先例。

使用边界：

- 上述条目当前应用于方法学与任务设计参照，不直接进入 `CORPUS-URBAN-CN-1990-2025` 的正式比较语料。
- 若后续需要构建“中国本土数字人文方法参照清单”，可从该入口继续扩展。

## 来源线索 | Source Leads

当前还已确认一组来自期刊官网 / Crossref 元数据链路的来源线索。

当前较相关的条目包括：

- Unraveling the Urban Myth: History, City, and Literature in Xi Xi's Fiction. DOI: 10.1080/21514399.2019.1605255. 来源链路为 Chinese Literature Today / Taylor & Francis。
- The City as the Protagonist. DOI: 10.1080/21514399.2020.1750850. 来源链路为 Chinese Literature Today / Taylor & Francis，可作为“城市作为叙事主体”方向的补充线索。
- Ruined City. DOI: 10.1080/21514399.2017.1319202. 来源链路为 Chinese Literature Today / Taylor & Francis，主题上接近城市叙事文本，但体裁需单独核验。

使用边界：

- 这些条目说明多来源链路是存在的，尤其集中在 Chinese Literature Today 这一出版链路。
- 但它们与现有 Xi Xi 条目一样，仍可能受站点访问策略影响，不能自动等同于正文可稳定抓取。
- 在正式纳入前，仍需分别核验体裁、全文可达性和是否适配当前 `genres: [essay, criticism]` 的约束。

## 明确公开存取期刊线索 | Explicit Open-Access Journal Leads

如果优先从“明确声明公开存取”的期刊获取论文，当前已识别到一条更干净的链路：Writing Chinese: A Journal of Contemporary Sinophone Literature / White Rose University Press。

当前可回查条目：

- Smog and the Psyche: Chen Qiufan's Reading of the Urban Anthropocene. DOI: 10.22599/wcj.35. Crossref 登记 CC BY 4.0 许可，且 metadata 中给出 PDF link；但截至当前核验，DOI 跳转在浏览器与 CLI 中都落到 404，因此按当前规则已从 demo 候选池放弃。
- "The City's Charms and Challenges" by P K Leung (translation). DOI: 10.22599/wcj.56. 文章页可达，但 Crossref 给出的 PDF 下载链路当前返回 404，因此按当前规则也从 demo 候选池放弃。
- Contested Boundaries: Platformisation, Gender, and the Evolution of Jinjiang Literature City. DOI: 10.22599/wcj.75. Crossref 给出的 PDF 链路实测返回 200，可继续保留为可直接获取全文的方法学参照。

Hanspub 新来源线索（用户提供）：

- 城市之美——《城市意象》中的山水城市景观构建策略研究. DOI: 10.12677/Design.2023.84464. 搜索页可直接看到 PDF 链接；浏览器直开 `pdf.hanspub.org` 时触发下载。
- 城市规划设计中的生态城市规划探索. DOI: 10.12677/GSER.2019.82019. 搜索页可直接看到 PDF 链接；浏览器直开 `pdf.hanspub.org` 时触发下载。
- 《京之轴》：城市形象的空间生产与多维叙事建构. DOI: 10.12677/arl.2026.151004. 搜索页提供 PDF 链接；浏览器直开 `pdf.hanspub.org/arl_2560596.pdf` 时触发下载。
- 基于叙事理论的城市文创设计策略研究. DOI: 10.12677/Design.2023.83203. 搜索页提供 PDF 链接；浏览器直开 `pdf.hanspub.org/design20230300000_92914116.pdf` 时触发下载。

当前判断：

- `wcj.35` 在 metadata 层面确实很强，但由于正文直接获取失败，已不再保留为 demo 候选。
- `wcj.56` 虽然文章页可达，但全文交付链路未通过直接获取测试，因此也不再保留为 demo 候选。
- 这类期刊链路在“许可清晰度”和“公开获取声明”上优于受站点挑战影响的普通全文页。
- `wcj.75` 目前是这组线索里唯一通过直接全文获取测试的条目，但它更接近平台研究，仍只适合作为方法学补充，而不是直接替代当前城市文学正式候选。
- Hanspub 线索在“浏览器直接下载全文”这一门槛上通过，说明它可作为当前 demo 路线的可执行来源池。
- 但现有 Hanspub 命中条目大多偏城市规划与景观方向，暂不等同于“城市文学批评”样本，当前更适合作为背景/方法学补充。
- 其中 `10.12677/arl.2026.151004` 与“城市叙事建构”主题最贴近，可作为当前 Hanspub 线中的优先核验条目。
- 基于详情页可见信息（关键词含“空间叙事/城市符号学/城市形象”，摘要明确讨论叙事策略与符号建构，篇幅 22-29 页），`10.12677/arl.2026.151004` 已完成单样本回放并形成 `RSCH-001`（documented）workflow evidence。

当前首轮判定：

- `dropped_due_to_fulltext_access`: `wcj.35` 已探测到正文无法直接稳定获取，因此不再进入 demo 后续核验。
- `dropped_due_to_fulltext_access`: `wcj.56` 文章页虽可达，但全文直链返回 404，因此也不再进入 demo 后续核验。
- `methodology_only`: `wcj.75` 保留为公开存取的方法学/平台研究参照，不进入当前正式语料槽位。

## 来源优先级矩阵 | Source Priority Matrix

为避免来源策略分散，当前 V2 城市写作研究采用以下优先级：

`demo validation case` 方向补充约束：当前如果目标是做可复现的演示验证，而不是做正式研究扩样，则来源策略收紧为 `OA-only`。这意味着当前主推进对象必须来自明确公开存取、可直接稳定获取全文、权利边界可记录的来源池；一旦探测到不能直接获取全文，就立刻从 demo 样本池放弃。

| 优先级 | 来源类型 | 当前代表条目 | 默认角色 | 进入正式样本前仍需补充 |
| --- | --- | --- | --- | --- |
| P1 | 正式文学研究线索 | 10.1080/21514399.2019.1605255 | `dropped_due_to_fulltext_access` | 已探测到正文直接获取失败，因此不再纳入 demo 路线 |
| P2 | 明确公开存取且可浏览器直接下载的城市相关条目 | 10.12677/arl.2026.151004 | `documented workflow evidence`（RSCH-001） | 下一步补第 3 样本并复跑 compare，检验结论稳定性 |
| P3 | 明确公开存取期刊中的方法学/平台研究条目 | 10.22599/wcj.75 | `methodology_only` | 不进入正式语料，只补方法参照 |
| P4 | 中文方法学条目 | METHOD-001..003 | `methodology reference` | 不进入正式语料，只补中文本土方法先例 |

执行规则：

- 当前阶段不再推进 P1；凡是全文直接获取失败的条目都从 demo 路线移出。
- 对于 `demo validation case`，当前主线限定为已经通过“可直接获取全文”门槛的 OA 条目。
- 若 CLI 因反爬策略返回 403，但浏览器可直接触发 PDF 下载，则按“可直接获取全文”通过处理。
- 当前不再优先核验 `wcj.35` 或 `wcj.56`；二者都已因全文获取失败被放弃。
- `10.12677/arl.2026.151004` 已完成最小回放闭环并入账 `RSCH-001`，可支撑“流程可执行 + 最小对照可运行”结论。
- 当前仍缺少第 3 个同类样本用于稳定性复核，因此尚不输出更强的跨样本结论。
- 对于后续正式研究扩样，可再单独评估是否恢复非 OA 的回查线索。
- P3 与 P4 默认不进入正式比较语料，除非研究问题改为方法学史或平台研究。

## 第 3 样本接入扩展 | Third-Sample Intake Extension

当 `RSCH-001` 已完成并需要验证 compare 结论稳定性时，按以下扩展流程接入第三样本。

```yaml
third_sample_extension:
  extension_id: RSCH-EXT-003
  prerequisite_evidence: RSCH-001
  objective: multi-sample stability check for compare conclusions
  intake_scope:
    current_pair:
      - HANS-003
      - HANS-004
    third_sample_candidate_queue:
      - sample_id: HANS-001
        doi: 10.12677/Design.2023.84464
        provisional_role: urban-background control
      - sample_id: OA-002
        doi: 10.22599/wcj.75
        provisional_role: methodology-platform control
  selection_rule:
    - must_pass_direct_fulltext_access
    - narrative_relevance_at_least_medium
    - segmentability_not_worse_than_existing_pair
  selected_sample:
    sample_id: HANS-001
    doi: 10.12677/Design.2023.84464
    role: urban-background control
  intake_status: done
  required_outputs:
    - compare_table_three_sample.md
    - stability_check_note.md
    - evidence_delta_note.md
  completion_gate:
    third_sample_intake: pass
    compare_stability_review: pass
```

扩展执行要点：

- 第 3 样本只在通过直接全文获取门槛后才可进入 compare。
- 若第 3 样本使已有差异结论发生反转，必须在 stability note 中记录并降级置信度。
- 若第 3 样本仅补强已有趋势，可在 evidence delta note 中标注为稳定性增强而非新结论。

当前 P1 推进门槛：

- `CN-URBAN-2015-001` 当前已从 demo 路线放弃。
- 若后续恢复该线索，仍需通过正文稳定可达、正文长度与可分段性、权利边界可记录三项检查后，才可升级为更明确的正式候选。

## Study Template

```yaml
study_id: STUDY-V2-CORPUS-001
title: 1990-2025 中文城市写作叙事结构演化分析
research_track: digital_humanities
status: study-ready
research_question: 1990-2025 中文城市写作中的叙事分段密度、主题迁移速度和抽象度是否存在可解释的年代差异？
hypothesis:
  - H1: 2015 年后的样本在主题迁移速度上显著高于 1990-2005 年样本。
  - H2: 城市经验类文本的感官密度下降时，抽象度与解释性表达占比会上升。
task_definition:
  primary_task: corpus_comparison
  secondary_tasks: [segmentation_analysis, style_shift_detection, evidence_traceability_audit]
corpus_definition:
  corpus_id: CORPUS-URBAN-CN-1990-2025
  language: zh-CN
  genres: [essay, criticism]
  sample_size_target: 1200
  time_slices:
    - 1990-2005
    - 2006-2014
    - 2015-2025
  inclusion_rule: 已公开发表且来源可核验，正文长度 >= 1500 字
  exclusion_rule: 重复转载、无法确认作者或明显缺页文本
  dedup_rule: title+author+hash
annotation_protocol:
  segmentation: whitepaper/annotation-protocol-narrative-segmentation.md
  rhetoric_optional: TBD
metrics:
  primary:
    - segment_density_by_1k_chars
    - topic_transition_rate
    - evidence_traceability_rate
  secondary:
    - abstractness_index
    - sensory_density
    - rhythm_variance
baseline:
  segmentation_baseline: TextTiling
  style_baseline: tfidf_plus_svm
  human_baseline: 双标注者一致结果
repro_package: whitepaper/reproducibility-package-evidence-traceability.md
outputs:
  - corpus_summary_table
  - trend_view
  - cluster_view
  - compare_view
  - compare_stability_view
  - failure_case_sheet
owner: research
reviewer: maintainer
```

## 研究问题拆解 | Research Question Breakdown

建议将 V2 研究问题拆成三个层次：

- 描述性问题：是否存在稳定差异
- 解释性问题：差异主要由哪些结构信号驱动
- 证据性问题：这些结论能否回链到具体样本与句段

若只能回答第一层，而不能回答第二层与第三层，则研究最多算“统计观察”，不应上升为强解释结论。

## 样本策略 | Sampling Strategy

建议采用分层采样而非单次抓取：

- 按年代分层
- 按体裁分层
- 按作者分层
- 按文本长度分层

每个层级至少记录：

- 候选样本数
- 实际入选样本数
- 剔除原因分布
- 可能的偏差来源

## 执行步骤 | Execution Steps

1. 冻结研究问题与假设，生成 `study_id`。
2. 生成语料清单并完成去重、切片与来源校验。
3. 对抽样子集执行人工标注或人工复核。
4. 运行分析引擎，生成 segmentation、style、evidence 三类输出。
5. 计算主指标与辅助指标，并和基线方法对比。
6. 输出趋势图、聚类图、差异表与失败案例表。
7. 整理最小复现包并登记 evidence 条目。

## 最小验收条件 | Minimum Acceptance

- 样本量、时间窗口和分层规则明确
- 至少 1 个主指标具备稳定口径
- 至少 1 个人工或传统方法基线可比较
- 至少 6 个样本被纳入成功/失败/边界案例集
- 若进入 compare 稳定性阶段，至少完成 3 样本比较并输出 1 份 stability note
- 结果与 [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md) 和 [evidence-registry.md](evidence-registry.md) 状态一致

## 失败模式提醒 | Common Failure Modes

- 只展示聚类图，不提供样本回链
- 样本来源混杂，未声明 AI 文本或翻译文本占比
- 指标变化来自预处理差异，而非文本差异
- 只展示显著结果，不展示失败案例与边界样本

## 与现有文档关系 | Related Mapping

- 研究方法总则： [research-methodology-and-reproducibility.md](research-methodology-and-reproducibility.md)
- 语料学习架构： [../architecture/corpus-learning/README.md](../architecture/corpus-learning/README.md)
- 研究者工作流： [../product/workflows/README.md](../product/workflows/README.md)
- 标注协议示例： [annotation-protocol-narrative-segmentation.md](annotation-protocol-narrative-segmentation.md)
- 复现包示例： [reproducibility-package-evidence-traceability.md](reproducibility-package-evidence-traceability.md)

## 执行作业单 | Execution Worksheet

若要把本模板转化为一次真实任务回放，使用：

- [rsch-task-001-v2-corpus-runbook.md](rsch-task-001-v2-corpus-runbook.md)