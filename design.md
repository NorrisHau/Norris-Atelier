# Finance Dive 布局规范（CSS Grid）

## 1) 全站页面网格（列表/主页）

- 使用 `.content-grid` 管理页面宽度：`留白 / 内容 / 留白` 三轨。
- 中间内容轨道用于正文与列表，避免每个模块单独写 `max-width`。
- `.content-grid__full` 仅用于需要跨满宽的区块（例如 Hero 分隔段）。

---

## 2) 文章页网格（重点）

文章页统一由 `.article-wrapper` 控制，结构与职责如下：

1. **左轨**：目录 TOC（`aside.post-toc`）。
2. **中轨**：标题、时间、正文、标签、分享、上一篇/下一篇（最大 `960px`，居中）。
3. **右轨**：对称留白，保持视觉平衡。

对应规则：

- `.article-wrapper > *` 默认落在中轨 `content-start / content-end`。
- `aside.post-toc` 固定在左轨 `left-start / content-start`，桌面端 sticky。
- 所有文章主内容（包括标题信息）都被 `article-wrapper` 包裹和约束。
- 文章正文后（标签/分享/上一篇下一篇）必须放入 `div.post-article`，并且该容器也必须由 `article-wrapper` 统一约束。

---

## 3) 正文字体规范

- 文章正文统一使用**非衬线**字体：`Inter / Noto Sans SC / system-ui`。
- 适用范围：`p`、`li`、`blockquote`。
- 文章主标题使用单独样式 `.article-title`（衬线风格，最大 `55px`）用于层级对比。

---

## 4) 响应式策略

- `xl` 以下：`article-wrapper` 收敛为单列，TOC 自动隐藏（由模板类控制）。
- `xl` 及以上：启用三列网格（左 TOC + 中内容 + 右留白）。
- 中列始终最大 `960px`，避免超宽行长影响阅读体验。

---

## 5) 开发约定（给后续开发者 / Agent）

1. 文章页新增区块时，默认直接放进 `article-wrapper`，不要脱离中轨。
2. TOC 必须保持在左轨，不可插入正文中轨。
3. 若调整文章阅读宽度，仅修改 `.article-wrapper` 的中轨最大值。
4. 正文排版优先复用 `src/styles/typography.css` 的 `.app-prose` 规则。
