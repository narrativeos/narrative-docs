# GIS Guide

## 摘要（中文） | Summary (ZH)

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN) | 英文摘要

This document defines the minimum GIS workflow, coordinate system checks, and troubleshooting practices for NarrativeOS spatial analysis.

## Machine-readable Metadata | 机读元数据

```yaml
doc_id: user-gis-README
path: user/gis/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [user, operator, support]
agent_ready: true
source_of_truth: narrative-docs
```

## 本页用途 | Purpose

定义 GIS 最小可复现任务、坐标系基线与跨模块联动策略。

## 阅读路径（建议） | Recommended Path

- 第一步：完成“GeoJSON 到空间洞察”最小任务
- 第二步：检查坐标系与精度基线
- 第三步：打通 GIS -> Atlas -> Insight -> Report 联动链路

## 标准参考 | Standards Reference

- [../../whitepaper/benchmark-and-acceptance-metrics.md](../../whitepaper/benchmark-and-acceptance-metrics.md)
- [../../whitepaper/core-docs-mapping.md](../../whitepaper/core-docs-mapping.md)
- [../../whitepaper/readiness-checklist.md](../../whitepaper/readiness-checklist.md)

## 适用范围 | Scope

- 城市叙事、地理语义、空间可视化任务
- 面向编辑、研究者、空间分析协作者
- 与 Atlas、Insight 结果联动展示

## 最小可复现任务：从 GeoJSON 到空间洞察

### 前置条件

- 已完成 [getting-started](../getting-started/README.md)
- 准备一个 GeoJSON 或 CSV（含经纬度字段）
- 数据字段至少包含 `id`、`text`、`lat`、`lon`

### 步骤

1. 在 GIS 模块导入样例文件。
2. 选择坐标系（默认 `EPSG:4326`）。
3. 执行空间索引初始化。
4. 运行一次空间聚类或热区分析。
5. 将结果同步到 Atlas 视图进行联动查看。

### 验收标准

- 地图图层可正常渲染，无空白瓦片。
- 点位数量与导入记录数一致（允许过滤差异）。
- 空间分析结果可在 Atlas 中完成跳转联动。

## 坐标系与精度基线

- Web 可视化默认使用 `EPSG:4326` 或 `EPSG:3857`
- 外部数据接入时必须声明原始 CRS
- 禁止在未记录转换规则时混用坐标系

精度建议：

- 城市级分析：误差容忍 10-50m
- 街区级分析：误差容忍 1-10m
- 研究复现：记录坐标转换方法与版本

## 常用分析任务

- 热区识别：识别高密度叙事节点
- 路径分析：观察叙事线索空间迁移
- 区域对比：比较不同行政区的主题差异

## 与其他模块联动

- GIS -> Atlas：空间节点映射到语义关系图
- GIS -> Insight：输出空间证据链
- GIS -> Report：生成可引用地图快照

## 常见问题排查 | Troubleshooting

### 现象 1：导入后点位偏移严重

- 检查原始数据 CRS 是否声明
- 确认是否错误执行了重复投影转换
- 抽样验证已知地标点位

### 现象 2：地图为空或只显示底图

- 检查数据是否包含有效经纬度
- 检查过滤条件是否把全部数据排除
- 检查图层可见性与样式配置

### 现象 3：Atlas 联动失败

- 检查 `id` 字段是否与文本对象一致
- 检查同步任务是否完成
- 检查权限是否允许跨模块读取

## 关联文档 | Related Docs

- [User Documentation](../README.md)
- [Atlas Guide](../atlas/README.md)
- [Spatial Architecture](../../architecture/spatial/README.md)
- [Platform Domains Module](../../product/modules/platform-domains.md)
