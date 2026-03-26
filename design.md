# Finance Dive 布局规范（CSS Grid）

> 目标：**用 Grid 规范内容宽度与排布**，而不是新增视觉模块。

## 1) 核心原则

1. 页面内容必须放在统一 Grid 轨道内，避免每个区块各自定义宽度。
2. 默认内容区使用固定上限宽度（可读性优先），两侧保留弹性留白。
3. 允许某些区块“跨满宽”（如 Hero 分隔区域），但内部正文仍按内容轨道对齐。

---

## 2) 标准内容网格：`.content-grid`

在 `src/styles/global.css` 中定义：

- 三轨结构：`留白 / 内容 / 留白`
- 内容最大宽度：`980px`
- 任意直接子元素默认落在内容轨道
- 带 `.content-grid__full` 的区块可跨满宽

语义说明：

- `content-start / content-end`：正文主轨道
- `full-start / full-end`：页面可用全宽

---

## 3) 首页使用方式

首页主容器使用：

- `main.page-enter.app-layout.content-grid`

首屏区块使用：

- `section.theme-hero.content-grid__full`

这样可实现：

- 主题 Hero 分隔线可占满版面宽度
- 卡片列表、主题面板、CTA 都自动对齐到统一内容宽度

---

## 4) 响应式约束

- 移动端优先，不单独写复杂多列模板。
- Grid 自动通过左右弹性轨道收缩，保障竖屏可读性。
- 桌面横屏通过 `980px` 内容上限保持阅读密度一致。

---

## 5) 开发约定（给后续开发者 / Agent）

1. 新页面优先复用 `.content-grid`，不要重复写 `max-width + margin`。
2. 只有确实需要“出血布局”时才用 `.content-grid__full`。
3. 组件内部可以用 Flex/Grid，但组件外层必须先落到页面主 Grid 轨道。
4. 如需调整全站内容宽度，只改 `.content-grid` 的中间轨道值。
