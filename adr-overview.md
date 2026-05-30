---
layout: default
title: ADR 架构决策
parent: Developer 开发者
nav_order: 60
has_children: true
---

# ADR 架构决策

本页面向需要追溯关键架构决策的读者。

它用于回答“为什么关键技术分岔口是这样选的”。

如果你只想了解系统长什么样，先去架构文档；如果你想理解某个关键约束为何被锁定，再回到 ADR。

## 推荐阅读顺序

- 第一步：先看 [adr/README.md](adr/README.md) 了解 ADR 的作用与使用方式
- 第二步：再读 [adr/ADR-001-runtime.md](adr/ADR-001-runtime.md) 理解多运行时隔离为什么是首期约束
- 第三步：读 [adr/ADR-002-storage.md](adr/ADR-002-storage.md) 了解 DuckDB 基线为何被锁定

## 章节入口

- [ADR 总览](adr/README.md)
- [ADR-001 Runtime](adr/ADR-001-runtime.md)
- [ADR-002 Storage](adr/ADR-002-storage.md)
