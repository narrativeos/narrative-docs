# RSCH-TASK-001 V2 语料研究任务回放作业单

## Executive Summary (EN)

This worksheet operationalizes RSCH-TASK-001 for replaying one V2 corpus comparative study and recording workflow evidence.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: whitepaper-rsch-task-001-v2-corpus-runbook
path: whitepaper/rsch-task-001-v2-corpus-runbook.md
lang_primary: zh-CN
lang_secondary: en
audience: [researcher, maintainer, reviewer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
task_id: RSCH-TASK-001
status: done
owner: research
reviewer: maintainer
```

## 任务目标 | Goal

完成 1 次 V2 语料比较研究任务回放，验证 [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md) 的可执行性，并产出 1 条 workflow evidence。

## 关联文档 | Related Docs

- [study-template-v2-corpus-comparative-analysis.md](study-template-v2-corpus-comparative-analysis.md)
- [research-methodology-and-reproducibility.md](research-methodology-and-reproducibility.md)
- [benchmark-and-acceptance-metrics.md](benchmark-and-acceptance-metrics.md)
- [evidence-registry.md](evidence-registry.md)

## 输入物清单 | Inputs

- 语料样本清单
- 纳入与排除规则
- 结果摘要
- 聚类/趋势/对比输出
- 失败模式记录

## 推荐开放获取校准样本 | Recommended Open-Access Calibration Paper

首轮更建议先用下列更贴近中文城市文学语境的论文做 workflow preflight：

```yaml
preferred_calibration_paper:
  title: Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy
  doi: 10.1080/21514399.2011.11833931
  venue: Chinese Literature Today
  rationale:
    - closer to Chinese literary urban writing
    - centered on a specific literary text
    - better aligned with narratology-facing evaluation
```

流程型备选样本：

```yaml
backup_calibration_paper:
  title: Digital heroism in Indonesian media: Cross-Cultural solidarity and viral narrative transformation
  doi: 10.1016/j.ssaho.2025.102295
  venue: Social Sciences & Humanities Open
  rationale:
    - narrative-oriented topic
    - journal-article structure is segmentation-friendly
    - open-access and publicly traceable
```

首轮建议：

- 先用优先候选验证 workflow 是否能跑通
- 跑通后再切换到与正式研究问题一致的中文城市写作样本
- 不要把校准样本直接纳入 `CORPUS-URBAN-CN-PILOT-001` 的正式统计结果

## 执行步骤 | Steps

1. 选择或构建 1 个最小语料集。
2. 记录样本边界、来源和去重规则。
3. 按 study template 运行一次比较分析。
4. 汇总 trend、cluster、compare 三类输出。
5. 记录成功样本、失败样本与边界样本。
6. 产出 workflow evidence 并回填 evidence registry。

## 回填模板 | Fill-in Template

```yaml
run_id: RSCH-RUN-001
task_id: RSCH-TASK-001
status: pending | in_progress | done
corpus_id: TBD
sample_size: TBD
time_window: TBD
research_question: TBD
outputs:
  trend_view: TBD
  cluster_view: TBD
  compare_view: TBD
sample_boundary_finding: TBD
failure_mode: TBD
evidence_link: TBD
owner: research
reviewer: maintainer
```

## 首轮执行草稿 | Starter Draft

以下内容是建议的首轮最小语料回放配置，用于验证 study template 是否能被真实执行。

历史标记：

- 以下 `starter_run` 为历史快照（2026-05-30），用于保留首轮启动时的上下文。
- 当前实际完成态以文末 `Current Status`、`RSCH-RUN-002-HANS003` 与 `RSCH-RUN-003-THIRD-SAMPLE` 为准。

```yaml
starter_run:
  snapshot_label: historical_snapshot
  snapshot_as_of: 2026-05-30
  run_id: RSCH-RUN-001
  task_id: RSCH-TASK-001
  status: in_progress
  corpus_id: CORPUS-URBAN-CN-PILOT-001
  sample_size_target: 30
  workflow_calibration_paper_doi: 10.1080/21514399.2011.11833931
  backup_calibration_paper_doi: 10.1016/j.ssaho.2025.102295
  time_window:
    - 1990-2005: 10
    - 2006-2014: 10
    - 2015-2025: 10
  genre_constraint: essay_or_criticism
  required_artifacts:
    - corpus_manifest.md
    - trend_summary.md
    - cluster_notes.md
    - compare_table.md
    - failure_mode_sheet.md
```

说明：

- 首轮建议用 30 篇最小语料，而不是直接追求 1200 篇
- 目标是验证流程是否闭环，而不是先验证统计显著性
- 若 30 篇样本都无法形成稳定输入清单，说明语料定义还需收紧
- 在正式语料构建前，可先用开放获取校准样本做单文 preflight，检查分段、趋势摘要和证据回链链路是否可用

## Preflight 记录 | Preflight Record

以下记录仅表示本任务已经进入 preflight 阶段，不表示正式语料分析已完成。

```yaml
preflight_record:
  snapshot_label: historical_snapshot
  snapshot_as_of: 2026-05-30
  run_id: RSCH-RUN-001-PREFLIGHT
  task_id: RSCH-TASK-001
  status: in_progress
  date_started: 2026-05-30
  objective: validate single-paper workflow before formal corpus assembly
  calibration_sample:
    title: Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy
    doi: 10.1080/21514399.2011.11833931
    role: workflow_calibration_only
  formal_corpus_status: not_started
  formal_corpus_requirement: replace calibration sample with Chinese urban writing corpus slices before any comparative claim
  next_actions:
    - create initial corpus manifest
    - verify first 3 source leads for 2015-2025 slice fit
    - run segmentation-oriented walkthrough on calibration sample
```

当前 preflight 判断：

- 优先校准样本已确定
- 正式研究语料尚未建立
- 当前阶段只能验证流程可达性，不能输出比较研究结论

## 历史结果摘要 | Historical Result Notes

以下为首轮 preflight 阶段保留的历史占位摘要；当前有效结论以 HANS 系列回放块与文末状态为准。

- 样本边界判断：TBD
- 主要差异信号：TBD
- 失败模式：TBD
- 是否建议升级为 measured 支撑：TBD

建议首轮至少记录：

- 1 个年代切片边界问题
- 1 个样本纳入争议
- 1 个结果不可解释的失败样本

## 最小输出模板 | Minimal Output Templates

### corpus_manifest.md

```md
# Corpus Manifest

| sample_id | period | genre | source_status | include | note |
| --- | --- | --- | --- | --- | --- |
| TBD | 1990-2005 | essay | verified | yes | TBD |
| TBD | 2006-2014 | criticism | verified | yes | TBD |
| TBD | 2015-2025 | essay | pending | no | source unclear |
```

第一版草稿：

```md
# Corpus Manifest Draft v0

## A. Workflow Calibration Sample

| sample_id | role | title | period | genre | source_status | include | note |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CAL-001 | calibration_only | Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy | calibration | literary criticism | verified | yes | 用于 workflow preflight，不纳入正式比较统计 |

## B. Formal Corpus Candidate Slots

| sample_id | period | genre | source_status | include | note |
| --- | --- | --- | --- | --- | --- |
| CN-URBAN-2015-001 | 2015-2025 | essay_or_criticism | dropped_due_to_fulltext_access | no | 已关联 LEAD-2015-001，但全文交付链路未通过，已从 demo 路线移出 |
| CN-URBAN-2015-002 | 2015-2025 | essay_or_criticism | candidate_only | no | 已关联 LEAD-2015-002，首轮判断更适合作为背景来源 |
| CN-URBAN-2015-003 | 2015-2025 | essay_or_criticism | candidate_only | no | 已关联 LEAD-2015-003，当前保留为 calibration-only |
| CN-URBAN-2006-001 | 2006-2014 | essay_or_criticism | pending | no | 待补中期切片样本 |
| CN-URBAN-1990-001 | 1990-2005 | essay_or_criticism | pending | no | 待补早期切片样本 |

## Inclusion Notes

- `CAL-*` 仅用于流程校准，不进入正式统计。
- `CN-URBAN-*` 只有在来源、版权边界和文本完整性核验通过后才可改为 `include = yes`。
- 正式样本优先顺序：先补 2015-2025 切片，再补 2006-2014 和 1990-2005。

## Candidate Acquisition Queue

以下条目是已经检索到的真实开放获取来源，但当前仅能标记为 `candidate_only`，还不能直接视为正式纳入样本。

历史标记：

- 本节及紧随其后的 triage/checklist 主要用于保留来源发现轨迹。
- 当前有效执行状态以 `single_sample_demo_run`、`third_sample_stability_run` 与文末 `Current Status` 为准。

| lead_id | target_slice | status | title | doi | fit_note |
| --- | --- | --- | --- | --- | --- |
| LEAD-2015-001 | 2015-2025 | candidate_only | Unraveling the Urban Myth: History, City, and Literature in Xi Xi's Fiction | 10.1080/21514399.2019.1605255 | 明确处理 city 和 literature，主题贴合，但需核验其对应文本是否适合归入正式切片 |
| LEAD-2015-002 | 2015-2025 | candidate_only | Body-Writing: Shanghai Baby's Love Affair with Transnational Capitalism | 10.1080/21514399.2010.11833910 | 主题与上海城市书写高度相关，但发表年份较早，需确认是否应作为背景来源而非 2015-2025 正式样本 |
| LEAD-2015-003 | 2015-2025 | candidate_only | Body-Writing: Cruel Youth, Urban Linglei, and Special Economic Zone Syndrome in Mian Mian's Candy | 10.1080/21514399.2011.11833931 | 已作为 workflow calibration 使用，后续需判断能否仅保留校准角色而不进入正式语料 |

## First-pass Inclusion Triage

首轮判定只回答“是否值得继续核验”，不回答“是否已正式纳入”。

| lead_id | first_pass_decision | rationale | manifest_mapping |
| --- | --- | --- | --- |
| LEAD-2015-001 | dropped_due_to_fulltext_access | 2019 年发表且主题贴合，但已探测到不能直接稳定获取全文，因此从当前路线直接放弃 | CN-URBAN-2015-001 |
| LEAD-2015-002 | background_only | 与上海城市书写高度相关，但 2010 年发表，更适合作为背景来源或对照来源，而非首个 2015-2025 切片样本 | CN-URBAN-2015-002 |
| LEAD-2015-003 | calibration_only | 已被选为 workflow calibration 样本；为避免校准样本和正式样本混用，首轮不纳入正式比较 | CN-URBAN-2015-003 |

## Second-pass Verification Note (Historical Snapshot)

当前保留 `LEAD-2015-001` 的失败记录，但它已从当前路线放弃。

```yaml
second_pass_verification:
  lead_id: LEAD-2015-001
  mapped_sample_id: CN-URBAN-2015-001
  provisional_status: dropped_due_to_fulltext_access
  evidence_known:
    publication_year: 2019
    journal: Chinese Literature Today
    pages: 58-67
    title_signals:
      - history
      - city
      - literature
    crossref_full_text_route: present
  pass_so_far:
    - target slice aligns with publication year 2019
    - topic keywords align with urban literature framing
    - article-form criticism likely satisfies genre constraint
  still_required:
    - none_for_demo_route
  cli_access_check:
    date: 2026-05-30
    result: blocked_by_cloudflare_challenge
    note: CLI request to tandfonline full-text route returned HTTP 403 with challenge page, so browser-side verification is still required
  inclusion_decision: dropped
```

当前 blocker：

- Crossref 元数据表明存在 full-text route，但 CLI 实测被 Cloudflare challenge 拦截。
- 按当前规则，这已经足以触发放弃，不再继续保留为候选。

## P1 Formal Admission Checklist (Historical Snapshot)

以下检查单仅适用于 `P1` 主线来源，即当前最接近正式样本的正式文学研究条目。

```yaml
formal_admission_checklist:
  target_sample_id: CN-URBAN-2015-001
  target_lead_id: LEAD-2015-001
  source_priority: P1
  required_checks:
    - id: access
      question: Can the full text be opened in a stable browser session?
      status: blocked
      note: CLI access failed with Cloudflare challenge; browser confirmation still missing
    - id: genre_fit
      question: Does the article function as essay_or_criticism rather than translation or pure primary text?
      status: provisional_pass
      note: title, venue, and article framing suggest criticism, but page-level confirmation still preferred
    - id: length_segmentability
      question: Is the body long enough and structurally segmentable for the V2 workflow?
      status: pending
      note: page span suggests likely adequacy, but正文 still not verified
    - id: time_slice_fit
      question: Does it fit the 2015-2025 slice rule used by the current runbook?
      status: provisional_pass
      note: publication year = 2019
    - id: role_conflict
      question: Does it duplicate the calibration-only role used by another sample?
      status: pass
      note: distinct from current calibration sample DOI 10.1080/21514399.2011.11833931
    - id: rights_boundary
      question: Are rights and reuse constraints recorded clearly enough for research use?
      status: pending
      note: source chain known, but stable access and reuse boundary still need explicit confirmation
  admission_rule:
    all_required_pass: false
    current_decision: paused_not_primary_target
```

当前决策：

- `CN-URBAN-2015-001` 已从 demo 路线放弃，不再消耗研究精力。
- 除非未来出现新的直接全文链路，否则不再恢复这条线索的 admission 检查。

## Formal Lead Queue

当前已确认以下正式来源线索可继续跟踪：

| formal_lead_id | title | doi | source_chain | provisional_role |
| --- | --- | --- | --- | --- |
| FORMAL-001 | Unraveling the Urban Myth: History, City, and Literature in Xi Xi's Fiction | 10.1080/21514399.2019.1605255 | Chinese Literature Today / Taylor & Francis / Crossref | dropped_due_to_fulltext_access |
| FORMAL-002 | The City as the Protagonist | 10.1080/21514399.2020.1750850 | Chinese Literature Today / Taylor & Francis / Crossref | thematic supplement lead |
| FORMAL-003 | Ruined City | 10.1080/21514399.2017.1319202 | Chinese Literature Today / Taylor & Francis / Crossref | text-type lead pending genre check |

当前判断：

- `FORMAL-001` 与现有 `LEAD-2015-001` 实际上是同一条核心正式来源线索确认，当前已因全文获取失败而放弃。
- `FORMAL-002` 和 `FORMAL-003` 可以证明，围绕 city / urban narrative 仍存在连续出版链路。
- 但它们暂未进入正式样本槽位，因为体裁与正文可达性尚未逐条核验。

## Explicit OA Journal Queue

若按“`demo validation case` 采用 `OA-only`”策略推进，当前可登记以下 OA 期刊线索：

| oa_lead_id | title | doi | journal_chain | oa_signal | provisional_role |
| --- | --- | --- | --- | --- | --- |
| OA-003 | Smog and the Psyche: Chen Qiufan's Reading of the Urban Anthropocene | 10.22599/wcj.35 | Writing Chinese / White Rose University Press | Crossref license = CC BY 4.0; metadata includes PDF link; DOI landing currently returns 404 in browser and CLI verification | dropped_due_to_fulltext_access |
| OA-001 | "The City's Charms and Challenges" by P K Leung (translation) | 10.22599/wcj.56 | Writing Chinese / White Rose University Press | Crossref license = CC BY 4.0; article page reachable, but Crossref PDF link currently returns 404 | dropped_due_to_fulltext_access |
| OA-002 | Contested Boundaries: Platformisation, Gender, and the Evolution of Jinjiang Literature City | 10.22599/wcj.75 | Writing Chinese / White Rose University Press | Crossref license = CC BY 4.0; direct PDF link | explicit-OA methodology-adjacent lead |
| HANS-001 | 城市之美——《城市意象》中的山水城市景观构建策略研究 | 10.12677/Design.2023.84464 | Hanspub / Design | search result exposes direct PDF; browser open triggers download | direct-access urban-background lead |
| HANS-002 | 城市规划设计中的生态城市规划探索 | 10.12677/GSER.2019.82019 | Hanspub / 地理科学研究 | search result exposes direct PDF; browser open triggers download | direct-access urban-method lead |
| HANS-003 | 《京之轴》：城市形象的空间生产与多维叙事建构 | 10.12677/arl.2026.151004 | Hanspub / 艺术研究快报 | search result exposes direct PDF; browser open triggers download | direct-access urban-narrative lead |
| HANS-004 | 基于叙事理论的城市文创设计策略研究 | 10.12677/Design.2023.83203 | Hanspub / Design | search result exposes direct PDF; browser open triggers download | direct-access narrative-design lead |

当前判断：

- `OA-003` 在主题与 metadata 上都很强，但既然 DOI landing 当前 404，就按现规则直接放弃。
- `OA-001` 在“城市文学 / 香港文学”主题上有一定贴近度，但其 Crossref PDF 直链当前返回 404，因此也按现规则直接放弃。
- `OA-002` 更适合补充平台文学与当代中文网络文学的方法参照。
- Hanspub 来源在浏览器侧可直接触发 PDF 下载，说明“直接全文获取”门槛可通过，但当前命中条目多偏城市规划/景观研究。
- `HANS-003` 相比其他 Hanspub 条目更贴近“城市叙事建构”主题，可作为当前 Hanspub 线的优先核验对象。
- 因此当前可执行池分为三类：`OA-002`（方法学平台研究）、`HANS-001/004`（背景或设计叙事补充）与 `HANS-003`（城市叙事优先候选）。

## OA-only Demo Triage (Historical Snapshot)

| oa_lead_id | first_pass_decision | rationale |
| --- | --- | --- |
| OA-003 | dropped_due_to_fulltext_access | 虽有 CC BY 4.0 与强 metadata 信号，但 DOI landing 当前 404，已触发“不能直接获取全文即放弃”规则 |
| OA-001 | dropped_due_to_fulltext_access | 文章页可达，但 Crossref PDF 直链当前返回 404，已触发“不能直接获取全文即放弃”规则 |
| OA-002 | methodology_only | 许可清晰且公开可得，但研究对象是网文平台化与性别边界，更适合方法学与平台研究参照 |
| HANS-001 | background_only | 浏览器可直接下载 PDF，满足获取门槛；但体裁偏城市景观/设计研究，先作为背景样本 |
| HANS-002 | methodology_only | 浏览器可直接下载 PDF，满足获取门槛；当前更接近城市规划方法研究 |
| HANS-003 | documented_workflow_evidence | 已完成单样本回放与最小对照扩展，形成 `RSCH-001` 与 `RSCH-002` 两条可追溯 evidence |
| HANS-004 | background_only | 浏览器可直接下载 PDF 且包含叙事理论框架，但主任务仍偏文创设计策略 |

当前解释（历史语义）：

- `dropped_due_to_fulltext_access`: 一旦正文直接获取失败，就从 demo 路线移出，不再进入下一轮核验。
- `methodology_only`: 可作为本土或中文相关方法参照保留，但不进入当前正式语料槽位。
- `background_only`: 可直接获取全文但体裁不完全匹配时，先保留为背景样本。
- `documented_workflow_evidence`: 已完成 runbook 回放并入账 evidence registry，可支持流程可执行与稳定性初判结论。

## 状态词典 | Canonical Status Dictionary

为避免后续更新出现状态漂移，runbook 统一采用以下词典：

- `pending`: 尚未执行，仅完成候选登记或模板占位。
- `in_progress`: 正在执行，尚未满足 completion gate。
- `done`: 对应运行入口已满足 completion gate，且关键产物已回填。
- `candidate_only`: 仅表示线索可回查，不代表可纳入当前样本。
- `background_only`: 可直接获取但仅作为背景参照，不进入正式比较主轴。
- `methodology_only`: 仅用于方法学参照，不进入正式语料槽位。
- `calibration_only`: 仅用于流程校准，不进入正式比较统计。
- `dropped_due_to_fulltext_access`: 因全文直接获取失败而从 demo 路线移出。
- `documented_workflow_evidence`: 已形成可回链 evidence（如 `RSCH-001`、`RSCH-002`），可支撑流程可执行或稳定性初判结论。

约束：

- 不再新增 `second_pass_ready`、`review_next`、`workflow_evidence_recorded` 等并行状态词。
- 历史段落若保留旧词，必须标注 `Historical Snapshot`。

## HANS-003 Second-pass Verification Note (Historical Snapshot)

```yaml
hans_second_pass_verification:
  lead_id: HANS-003
  doi: 10.12677/arl.2026.151004
  paper_url: https://www.hanspub.org/journal/paperinformation?paperid=134181
  fulltext_delivery:
    browser_pdf_open: pass_download_triggered
    pdf_url: https://pdf.hanspub.org/arl_2560596.pdf
  metadata_and_content_signals:
    journal: 艺术研究快报
    pages: 22-29
    keywords:
      - 空间叙事
      - 城市符号学
      - 城市形象
      - 符号建构
    abstract_focus: 纪录片《京之轴》中的城市形象建构、叙事策略、符号转译与跨媒介传播
  demo_fit_assessment:
    narrative_relevance: pass
    urban_focus: pass
    segmentability: provisional_pass
    genre_alignment_with_current_demo: pass_with_scope_note
  current_decision: documented_workflow_evidence
  linked_evidence:
    - RSCH-001
    - RSCH-002
  next_step:
    - introduce fourth sample for broader stability check
```

## OA-003 Admission Note

```yaml
oa_admission_note:
  lead_id: OA-003
  doi: 10.22599/wcj.35
  metadata_status:
    license: pass
    abstract_relevance: pass
    journal_chain_traceability: pass
  delivery_status:
    doi_landing_browser: fail_404
    doi_landing_cli: fail_404
    crossref_pdf_metadata: present
  current_decision: dropped_due_to_fulltext_access
  demo_readiness: rejected
  blocker:
    - Crossref metadata gives a PDF link, but the DOI landing page currently resolves to 404 in both browser and CLI verification.
  next_check:
    - none_for_demo_route
```

## Unified Lead Priority Matrix

| priority | lead_bucket | representative_ids | default_action | escalation_rule |
| --- | --- | --- | --- | --- |
| P1 | formal literature leads | LEAD-2015-001 / FORMAL-001 | drop on access failure | 已探测到全文不可直接获取的条目直接移出 |
| P2 | direct-access OA urban-narrative leads | HANS-003 / HANS-001 / HANS-004 | maintain HANS-003 as baseline evidence, use HANS-001/004 as controls | HANS-003 已完成 RSCH-001/002，可作为后续扩展基线 |
| P3 | explicit OA methodology leads | OA-002 / HANS-002 | retain as methodology_only | 不进入当前正式语料槽位 |
| P4 | localized methodology leads | METHOD-001..003 | retain as methodology references | 不进入当前正式语料槽位 |

执行说明（当前有效）：

- 当前 RSCH 若以 `demo validation case` 为目标，则只保留已经通过直接全文检查的 OA 条目。
- `OA-003` 与 `OA-001` 都已从当前路线移出，因为全文交付链路未通过。
- 当前已保留的可执行条目为 `OA-002`、`HANS-001`、`HANS-002`、`HANS-003`、`HANS-004`。
- `HANS-003` 已完成单样本与第三样本稳定性扩展，并已入账 `RSCH-001`/`RSCH-002`。
- 非 OA 条目不再保留为 reserve lead；只要全文不可直接获取，就直接移出。
- P3 与 P4 的主要价值是补足方法论语境，而不是替代正式样本。

首轮结果解释：

- `background_only`: 保留在研究背景池中，不作为当前切片的优先正式候选。
- `calibration_only`: 仅承担流程校准角色，默认不进入正式比较统计。

使用约束：

- `LEAD-*` 只表示“已发现且可回查”的来源，不表示已通过语料切片核验。
- 若某来源继续承担 `workflow calibration` 角色，则默认不进入正式比较统计。
- 正式纳入前仍需补充：文本完整性、切片对应关系、版权边界、去重判断。
```

### trend_summary.md

```md
# Trend Summary

- Research Question: TBD
- Time Slice Finding 1: TBD
- Time Slice Finding 2: TBD
- Main Caveat: TBD
```

### compare_table.md

```md
| comparison_axis | slice_a | slice_b | observed_difference | confidence_note |
| --- | --- | --- | --- | --- |
| narrative_object_focus | HANS-003 (city-image construction in documentary narrative) | HANS-004 (city cultural-creative design strategy) | HANS-003 更偏城市形象叙事结构，HANS-004 更偏设计应用策略 | medium |
| symbol_system_depth | HANS-003 (space -> symbol -> media translation) | HANS-004 (narrative theory -> design method mapping) | HANS-003 的符号链条更完整，HANS-004 的方法落地导向更强 | low_to_medium |
```

### failure_mode_sheet.md

```md
# Failure Modes

- Failure 1: TBD
- Failure 2: TBD
- Suspected Cause: TBD
```

## HANS-003 单样本 Demo Run Entry

以下运行入口用于记录 `HANS-003` 单样本 demo 回放的完成态，并作为后续稳定性扩展的基线证据。

```yaml
single_sample_demo_run:
  run_id: RSCH-RUN-002-HANS003
  task_id: RSCH-TASK-001
  status: done
  sample_id: HANS-003
  doi: 10.12677/arl.2026.151004
  sample_title: 《京之轴》：城市形象的空间生产与多维叙事建构
  source_urls:
    paper_page: https://www.hanspub.org/journal/paperinformation?paperid=134181
    pdf_url: https://pdf.hanspub.org/arl_2560596.pdf
  role: demo_primary_single_sample
  execution_scope:
    - segmentation_walkthrough
    - trend_summary_single_sample
    - evidence_traceability_check
  required_outputs:
    - trend_summary_hans003.md
    - segment_notes_hans003.md
    - excerpt_review_hans003.md
    - compare_table_hans003_vs_hans004.md
    - evidence_links_hans003.md
    - failure_mode_hans003.md
  pass_gate:
    fulltext_direct_access: pass
    narrative_alignment: pass
    artifact_completeness: pass
  next_action_owner: research
```

执行说明（当前有效）：

- 本入口只验证“单样本叙事分析流程可跑通”，不输出跨年代比较结论。
- 若 `artifact_completeness = pass`，则可回填 1 条 workflow evidence 到 evidence registry。
- 若执行失败，必须回填失败模式，不可只更新状态。

## 对照样本接入 | Control Sample Intake

```yaml
control_sample_intake:
  intake_id: RSCH-CTRL-001
  linked_run_id: RSCH-RUN-002-HANS003
  control_sample_id: HANS-004
  doi: 10.12677/Design.2023.83203
  title: 基于叙事理论的城市文创设计策略研究
  intake_status: done
  admissibility:
    fulltext_direct_access: pass
    theme_related_to_narrative: pass_with_scope_gap
    role: control_sample_for_compare_table
  compare_scope:
    - narrative_object_focus
    - symbol_system_depth
  note: 对照样本用于开启最小比较视图，不代表其已升级为正式主样本。
```

## 第三样本稳定性扩展 | Third-Sample Stability Extension

```yaml
third_sample_stability_run:
  run_id: RSCH-RUN-003-THIRD-SAMPLE
  task_id: RSCH-TASK-002
  status: done
  prerequisite_evidence: RSCH-001
  base_pair:
    - HANS-003
    - HANS-004
  third_sample_candidate_queue:
    - sample_id: HANS-001
      doi: 10.12677/Design.2023.84464
      provisional_role: urban-background control
    - sample_id: OA-002
      doi: 10.22599/wcj.75
      provisional_role: methodology-platform control
  selected_sample:
    sample_id: HANS-001
    doi: 10.12677/Design.2023.84464
    role: urban-background control
  selection_gate:
    direct_fulltext_access: pass
    narrative_relevance: pass_with_scope_note
    segmentability: pass
  required_outputs:
    - compare_table_three_sample.md
    - stability_check_note.md
    - evidence_delta_note.md
  completion_gate:
    third_sample_intake: pass
    compare_stability_review: pass
  next_action_owner: research
```

执行说明（当前有效）：

- 该入口用于验证“最小对照结论”在第三样本引入后是否保持稳定。
- 若差异方向发生反转，必须在 `stability_check_note.md` 中降级置信度并记录触发条件。
- 若第三样本仅补强已有趋势，可在 `evidence_delta_note.md` 标记为稳定性增强。

### compare_table_three_sample.md

```md
# Compare Table (Three-sample)

| comparison_axis | HANS-003 | HANS-004 | sample_3 (TBD) | stability_signal | confidence_note |
| --- | --- | --- | --- | --- | --- |
| narrative_object_focus | 城市形象建构主轴 | 文创设计策略导向 | HANS-001：城市景观/城市意象建构导向 | stable_with_scope_shift | medium |
| symbol_system_depth | 空间叙事-符号-传播链 | 叙事理论-设计方法转译 | HANS-001：景观策略与意象组织，符号层深度弱于 HANS-003 | stable | medium |
```

### stability_check_note.md

```md
# Stability Check Note

- Run ID: RSCH-RUN-003-THIRD-SAMPLE
- Third Sample Selected: HANS-001 (10.12677/Design.2023.84464)
- Does key difference direction remain stable?: yes (no reversal detected)
- If reversed, confidence downgrade applied?: no
- Reviewer decision: keep prior direction, mark scope-sensitive stability
```

### evidence_delta_note.md

```md
# Evidence Delta Note

- Baseline evidence: RSCH-001
- New delta from third sample: 说明“城市相关样本”中存在设计/景观导向分支，增强了比较轴对体裁差异的解释力
- Impact on existing conclusion: 不改变“HANS-003 在叙事-符号链条上更完整”的方向性判断，但将外推范围收敛到城市叙事相关体裁
- Registry update required: yes (append RSCH-002 as stability extension evidence)
```

### compare_table_hans003_vs_hans004.md

```md
# Compare Table (HANS-003 vs HANS-004)

| comparison_axis | sample_a | sample_b | observed_difference | confidence_note |
| --- | --- | --- | --- | --- |
| narrative_object_focus | HANS-003 | HANS-004 | HANS-003 以城市形象建构为叙事主轴；HANS-004 以文创设计策略为落地导向 | medium |
| symbol_system_depth | HANS-003 | HANS-004 | HANS-003 呈现空间叙事与城市符号学联动；HANS-004 更强调叙事理论向设计方法转译 | low_to_medium |
```

### trend_summary_hans003.md

```md
# Trend Summary (HANS-003)

- Run ID: RSCH-RUN-002-HANS003
- Sample: HANS-003
- Time Context: single-sample walkthrough (no cross-slice comparison)
- Narrative Finding 1: 文本将“京之轴”作为空间叙事主线，通过地点与历史符号串联城市形象生产。
- Narrative Finding 2: 叙事重心从物理空间描述扩展到符号建构与跨媒介传播，具备“空间 -> 文化符号 -> 传播机制”的三段结构。
- Evidence Strength Note: 已补段落级短锚点与复核注记，当前为中高置信（仍待新增第三样本验证稳定性）。
- Main Caveat: 当前 compare 仍是 HANS-003 与 HANS-004 的最小对照，结论外推范围有限。
```

### segment_notes_hans003.md

```md
# Segment Notes (HANS-003)

| segment_id | page_range | excerpt_anchor | narrative_function | confidence_note |
| --- | --- | --- | --- | --- |
| H003-S01 | 22-24 | 锚点 A：摘要段中“城市形象建构/空间生产”语义段落 | 建立城市空间问题域，定义“京之轴”叙事对象 | medium_to_high |
| H003-S02 | 24-27 | 锚点 B：正文中“空间叙事/城市符号学”共现段落 | 从空间描写转向城市符号学阐释，连接影像叙事策略 | medium |
| H003-S03 | 27-29 | 锚点 C：结论段中“符号转译/跨媒介传播”收束段落 | 汇总符号建构与跨媒介传播意义，形成结论层 | medium |
```

### excerpt_review_hans003.md

```md
# Excerpt Review (HANS-003)

说明：为避免复制原文，以下仅保留短语级锚点与页码定位，用于复核链路，不替代全文阅读。

| excerpt_id | page_ref | short_anchor_token | interpretation | reviewer_note |
| --- | --- | --- | --- | --- |
| H003-E01 | p.22-23 | 城市形象建构 / 空间生产 | 证明文本把城市形象问题放在空间叙事框架内启动 | 与 S01 一致，支持 narrative_object_focus |
| H003-E02 | p.24-26 | 空间叙事 / 城市符号学 | 证明论证从空间层进入符号系统层，支撑中段转折 | 与 S02 一致，支持 symbol_system_depth |
| H003-E03 | p.27-29 | 符号转译 / 跨媒介传播 | 证明结论层落到传播机制与意义扩散 | 与 S03 一致，支持 ending synthesis |

复核结论：

- 三个锚点与分段笔记一致，未出现段落功能冲突。
- 现阶段证据足以支撑“流程可执行 + 最小对照可运行”判断。
```

### evidence_links_hans003.md

```md
# Evidence Links (HANS-003)

- run_id: RSCH-RUN-002-HANS003
- source_paper_page: https://www.hanspub.org/journal/paperinformation?paperid=134181
- source_pdf: https://pdf.hanspub.org/arl_2560596.pdf
- local_artifact_trend_summary: runbook section trend_summary_hans003.md
- local_artifact_segment_notes: runbook section segment_notes_hans003.md
- local_artifact_excerpt_review: runbook section excerpt_review_hans003.md
- local_artifact_compare_table: runbook section compare_table_hans003_vs_hans004.md
- local_artifact_failure_mode: runbook section failure_mode_hans003.md
- reproducibility_note: browser path can open paper page and trigger PDF download; CLI 403 on some providers is treated as anti-bot noise, not automatic fail for this source.
```

### failure_mode_hans003.md

```md
# Failure Modes (HANS-003)

- Failure 1: 段落级锚点不足，当前切片更偏页级定位，证据粒度不够细。
- Failure 2: 样本单篇导致比较轴缺失，无法支撑跨切片统计结论。
- Suspected Cause: 本轮目标是最小可运行验证，优先验证链路而非完整比较实验。
- Recovery Action: 已补 3 个锚点、逐段短摘录复核与 HANS-004 对照样本；下一轮引入第三样本做稳定性复核。
```

## 完成定义 | Definition of Done

- 至少 1 份最小语料回放记录
- 至少 1 个样本边界结论
- 至少 1 个失败模式记录
- evidence registry 中对应 task 的结果链接已回填

## 当前状态 | Current Status

- 状态：done
- 已完成：首轮最小语料配置、时间切片、输出物清单、HANS-003 二轮核验记录、HANS-004 对照样本接入、最小 compare 草稿、逐段摘录复核注记
- 当前执行入口：`RSCH-RUN-002-HANS003`（单样本 demo）
- 后续增强项：新增第三样本并复跑 compare，评估差异结论是否稳定（不影响本轮最小回放闭环完成）
- 阶段切换：本作业单的“流程可执行验证”目标已完成；当前 NarrativeOS 论证主目标已转向架构设计与算法能力的验证与优化（见 evidence registry 的 `ARCH-OPT-TASK-001` 与 `ALGO-TASK-001`）。
