# Fact Conflict Detection Minimal Runbook

## 摘要（中文）

本页提供事实冲突识别的最小可执行流程，用于在单轮评审中快速识别“被反驳事实、冲突未闭环、证据缺口”并给出 Go/No-go 判定。

## Executive Summary (EN)

This runbook defines a minimal executable workflow for fact-conflict detection and release gating.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: product-workflows-fact-conflict-detection-minimal-runbook
path: product/workflows/fact-conflict-detection-minimal-runbook.md
lang_primary: zh-CN
lang_secondary: en
audience: [product, qa, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

本页用于定义事实冲突识别的执行主路径，保证输入口径、失败分类、处置动作和发布门禁在不同轮次中可复现。

它是 workflow 执行页，不替代协议页与白皮书结果页。

## 适用场景 | Use Cases

- 校对补齐评测中的事实一致性核验
- 研究与发布窗口中的事实风险前置拦截
- fail/no-go 后的冲突复盘与回归重跑

## 前置条件 | Preconditions

- 已确认不包含用户系统数据语义；输入范围限定为公开语料、测试样本或已授权资料。
- 已加载待核查 claim 列表与候选证据集。
- 阈值档位已按 [../../academic/golden-set-threshold-policy.md](../../academic/golden-set-threshold-policy.md) 锁定。
- 核查协议采用 [../../academic/fact-verification-protocol.md](../../academic/fact-verification-protocol.md)。

## 输入约束 | Input Constraints

- 每条 claim 必须具备稳定 id，禁止匿名自由文本直接入库。
- 每条 claim 至少提供一个 grounding_source 候选。
- 证据等级必须显式标注 L1/L2/L3。
- 同一 run 内 threshold_tier 不得变更。

## 执行主路径 | Main Flow

1. 初始化 run context。
2. 对每条 claim 执行检索、重排、核查，产出 verification_status。
3. 标记失败类型并映射处置动作。
4. 汇总门禁指标并输出 gate_decision。
5. 若 gate_decision=fail，写入 rollback 与 rerun 计划。

```yaml
run_context:
  run_id: fv-YYYYMMDD-001
  operator: <name-or-role>
  threshold_tier: lenient | standard | strict
  corpus_ref: <dataset-or-corpus-id>
```

## 必填输出 | Required Outputs

```yaml
required_fields:
  - claim_id
  - evidence_id
  - evidence_level
  - verification_status
  - failure_reason
  - action
  - verifiability_rate
  - hallucination_ratio
  - controversial_ratio
  - traceability_pass_rate
  - knowledge_density_kd
  - gate_decision
  - publish_blocked
```

## 域责任落点（当前基线六域）

- Text Lab：claim 标准化与语句边界对齐。
- Narrative Atlas：冲突 claim 的结构定位与证据锚点回看。
- Insight Engine：verification_status 推断与风险解释。
- Knowledge Graph/Library：术语归一、实体链接与知识项入库。
- Corpus Observatory：跨轮次冲突分布与趋势回归监控。

## 异常处理 | Failure Handling

- 若出现 fact_refuted：必须触发 rebound_to_discovery。
- 若出现 hallucination_detected：不得进入 pass 发布路径。
- 若出现 retrieval_gap 且未闭环：gate_decision 不得为 pass。
- 若 unresolved_conflict 超阈值：publish_blocked 必须为 true。

## 结果结构 | Result Shape

```yaml
fact_conflict_run_record:
  run_id: fv-2026-001
  threshold_tier: standard
  claim_results:
    - claim_id: C-001
      verification_status: verified | refuted | controversial | unverifiable
      evidence:
        - evidence_id: E-101
          evidence_level: L1
      failure:
        reason: fact_refuted | hallucination_detected | retrieval_gap | unresolved_conflict
        action: rebound_to_discovery | update_grounding_baseline | resolve_counterevidence | rerun_golden_set
  summary_metrics:
    verifiability_rate: 0.96
    hallucination_ratio: 0.02
    controversial_ratio: 0.04
    traceability_pass_rate: 0.95
    knowledge_density_kd: 0.047
  final_decision:
    gate_decision: pass | fail
    publish_blocked: true | false
    rollback_action: none | switch_shadow_only | rollback_ruleset
```

## 阻断条件 | Stop Conditions

- claim_id 缺失或证据等级缺失
- 关键失败类型未映射处置动作
- gate_decision=fail 且未记录 rollback_action
- 输入范围出现未授权数据

## 完成标准 | Completion Criteria

- 当前轮次所有 claim 已给出 verification_status 且 traceability 可回链。
- 门禁指标满足所选 threshold_tier。
- final_decision 与 publish_blocked 状态一致且可审计。

## 关联文档 | Related Docs

- ../../academic/fact-verification-protocol.md
- ../../academic/fact-verification-method-stack.md
- ../../academic/templates-golden-set-fact-check-ledger.md
- ../../academic/golden-set-threshold-policy.md
- ../modules/platform-domains.md
- proofreading-competitive-benchmark-runbook.md
- fact-conflict-detection-sample-2026-05.md
- ../../whitepaper/proofreading-competitive-results-template.md