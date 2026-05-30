# Example: Systematic Review Minimal Loop

本页用于执行“系统综述支持”的最小闭环，目标是把综述材料从聚合摘要推进到证据可回链表。

## 作业单元信息

```yaml
task_id: ACAD-RSCH-002
workflow_type: systematic_review_support
status: planned
owner: research
reviewer: maintainer
```

## 输入

- 文献集合清单（建议 20-50 篇）
- 每篇的摘要或可获取全文
- 纳入/排除规则

## 执行步骤

1. 按纳排规则冻结样本集。
2. 对每篇文本执行结构诊断并抽取关键结论。
3. 为每条结论绑定 evidence 指针。
4. 汇总主题簇与争议点，输出综述观察表。

## 输出

- review_corpus_manifest.yaml
- review_observation_table.csv
- review_evidence_table.yaml
- review_failure_cases.yaml

## 验收

1. 每篇至少 1 条可回链观察
2. 至少 3 条失败样例已归因
3. 主题簇结论可追溯到原文条目

## 关联

- [research-workflows.md](research-workflows.md)
- [reproducibility-kit.md](reproducibility-kit.md)