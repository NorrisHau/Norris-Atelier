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

---

## 6) 品牌标识规范（NORRIS'S ATELIER）

### 6.1 Logo 结构（不可改）

- Logo 由三部分组成：`弧形拱顶 + 两个立柱 + 双行文字（NORRIS'S / ATELIER）`。
- SVG 必须保持“拱顶与立柱之间的负空间缝隙”（约 `2px` 视觉间距）。
- 不允许替换为 emoji 或其他图标系统；仅允许在同一几何结构内微调线宽/尺寸。

对应实现文件：

- `src/components/BrandLogo.astro`

### 6.2 Logo 动画规范（Structural Emergence & Intellectual Breath）

- **加载阶段（1.5s 总节奏）**
1. `0s~1s`：仅弧线使用 `stroke-dashoffset` 左到右绘制。
2. `0.5s`：立柱淡入并轻微上移归位（`opacity + translateY`）。
3. `1.0s`：文字淡入；`NORRIS'S`静态；`ATELIER`做轻微字距展开。
- **悬停阶段（0.3s）**
1. 容器：`translateY(-2px) scale(1.02)`。
2. 仅弧线：`translateY(-1px)`，强化负空间“呼吸感”。
3. `ATELIER` 颜色轻微变暖。
- **空闲阶段（可选）**
1. 仅弧线做微弱脉冲（约 `0.998 ~ 1.002`），周期 `3s`。

### 6.3 防抖动约束（重要）

- 禁止让加载期字距动画影响 header 布局宽度。
- Logo 容器不能使用会随文本变化的 `fit-content` 作为最终宽度基准。
- 当前稳定方案：
1. 容器固定宽度（`BrandLogo` 中已落地）。
2. `ATELIER` 文本设为 `display:block; width:100%`，字距动画在内部消化。
3. 对动画元素启用 `will-change: transform`，避免不必要重排。

---

## 7) 首页 Hero 与标题规范

- 首页副标题固定为：
`Crafting a resilient life through wealth, health, and logic.`
- 主标题“用极简框架，构建长期有效的投资系统”要求：
1. 保持单行（`white-space: nowrap`）。
2. 使用响应式流体字号（`clamp(...)`），禁止移动端硬编码固定像素值。

对应实现：

- `src/pages/index.astro`
- `src/styles/global.css` 中 `.theme-title--hero`

---

## 8) 首页主题切换（投资/科技/健康）

### 8.1 视觉规范

- 三个主题标识采用“平面化”方案（无边框）。
- 图标使用内联 SVG 线性图形，不使用 emoji。
- 激活态通过底色与文字颜色区分，不使用边框描边。

### 8.2 交互规范

- 必须支持点击切换对应 `tabpanel`（投资 / 科技 / 健康）。
- 初始化逻辑同时兼容 `DOMContentLoaded` 与 `astro:page-load`。
- 必须防止重复绑定事件（通过 `data-interactive-ready` 守卫）。
- 若首页存在其它脚本报错，不得阻断 tab 切换逻辑。

已修复的历史问题（避免回归）：

- `ReferenceError: Cannot access 'observer' before initialization`
- 原因：`observer` 在定义前被 `reveal()` 闭包引用。
- 处理：先声明 `let observer: IntersectionObserver | null = null;`，再赋值。

---

## 9) 站点图标（favicon）规范

- favicon 已切换为品牌拱门几何图形（与主 Logo 同语言）。
- 若后续更新 favicon，必须保持与主 Logo 的几何一致性：
1. 弧线拱顶
2. 双立柱
3. 深石板灰主色（`#34495E`）

对应文件：

- `public/favicon.svg`
