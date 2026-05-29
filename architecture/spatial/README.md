# Spatial Architecture

## 模块职责

Spatial 负责 GIS/空间分析相关能力，并支持 NarrativeOS 中与地理空间相关的场景。

## 边界要求

- 空间能力通过清晰接口接入上层产品功能
- 坐标系、投影、空间索引等约束需文档化
- 与 Atlas/Editor 的交互应通过契约而非隐式耦合
