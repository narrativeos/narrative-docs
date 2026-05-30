# Example: Topic Evolution Three-Slice

本页用于执行“主题演化观察”的三时间片样例，目标是验证主题迁移与分段密度的方向稳定性。

## 作业单元信息

```yaml
task_id: ACAD-RSCH-003
workflow_type: topic_evolution
status: planned
owner: research
reviewer: maintainer
time_slices:
  - 1990-2005
  - 2006-2014
  - 2015-2025
```

## 输入

- 三时间片语料清单
- 统一预处理配置
- 主指标和辅助指标定义

## 执行步骤

1. 固定三时间片样本与去重规则。
2. 运行主题迁移与分段分析。
3. 输出分片指标并进行横向比较。
4. 记录方向反转或异常波动样本。

## 输出

- slice_metrics_summary.yaml
- transition_compare_table.csv
- stability_check_note.md
- anomalous_cases.yaml

## 验收

1. 三时间片口径一致
2. 主指标与辅助指标均已输出
3. 方向反转样本有单独说明

## 关联

- [research-workflows.md](research-workflows.md)
- [whitepaper/study-template-v2-corpus-comparative-analysis.md](../whitepaper/study-template-v2-corpus-comparative-analysis.md)