# Library Architecture

## 摘要（中文）

本节为英文摘要导读，便于国际协作与检索。

## Executive Summary (EN)

This document defines the Library architecture as the final knowledge convergence layer of NarrativeOS.

## Machine-readable Metadata

```yaml
doc_id: architecture-library-README
path: architecture/library/README.md
lang_primary: zh-CN
lang_secondary: en
audience: [architect, product, developer, ai-agent]
agent_ready: true
source_of_truth: narrative-docs
```

## 定位

Library 是 NarrativeOS 的最终知识汇聚层。

Library 不是文件夹系统，而是语言百科系统，用于承接所有分析结果并建立跨对象知识互联。

## 知识组织结构

Library 采用六类知识实体组织：

- 作品
- 作者
- 概念
- 主题
- 风格
- 修辞

六类实体通过关系网络互联，支持跨维度检索、比较与追踪。

## 数据汇聚机制

所有分析结果最终进入 Library：

```text
文本分析
  ↓
结构信号与向量输出
  ↓
知识实体映射
  ↓
关系建立
  ↓
Library 沉淀
```

## 平台价值

当系统累计大规模语料（如 1 万本书）后，Library 可演化为中文语言地图与数字人文研究底座。

## 架构约束

- 入库对象必须具备来源、时间与证据链
- 实体关系必须可解释且可回溯
- Library 必须支持持续增量更新，不依赖一次性离线构建
- Library 输出应可被 Atlas、Corpus、Genome、Insight 反向调用
