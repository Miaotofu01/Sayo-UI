# Sayo UI

**零依赖 CSS 框架 + 弹性交互引擎。**

GitHub Primer 暗色/浅色双主题。自定义光标、平滑拖尾、点击波纹、弹性物理、Toast 通知、Dialog 弹窗……两个文件，即插即用。

## 快速开始

```html
<link rel="stylesheet" href="sayo.css">
<script src="sayo.js"></script>

<body data-syo-cursor data-syo-trail>
  <!-- 你的内容 -->
</body>
```

一行属性开启全套交互：自定义光标、环境光晕、平滑拖尾、点击反馈。

### 浅色主题

```html
<html data-syo-theme="light">
```

或在运行时切换：`document.documentElement.setAttribute('data-syo-theme', 'light')`。

## Demo 演示

项目自带的 `index.html` 是一个完整的在线演示页，展示了所有组件和交互效果。**无需构建，直接用浏览器打开即可：**

```bash
# 方式一：直接打开
xdg-open index.html        # Linux
open index.html            # macOS
start index.html           # Windows

# 方式二：本地服务器（推荐，避免跨域限制）
python3 -m http.server 8080
# 然后打开 http://localhost:8080
```

页面上可以直接体验：

- 🖱️ **自定义光标 + 环境光晕 + 平滑拖尾** — 页面加载即自动激活
- 🌗 **暗色 / 浅色主题切换** — 右上角太阳/月亮图标，一键切换
- 🌐 **中英文切换** — 右上角"中"/"EN"按钮
- 📋 **全部组件** — Nav、Editor、Card、Tag、Button、Stat、Toast、Dialog、Skeleton、Tooltip、Tabs、Dropdown
- 🎯 **Scroll Spy** — 左侧导航随着滚动自动高亮当前章节
- 📐 **设计令牌展示** — 配色、字体排印可视化预览
- 📦 **图标库** — 点击侧边栏"图标库"链接，浏览全部 32 个 SVG 图标

## 文件清单

| 文件 | 大小 | 说明 |
|------|------|------|
| `sayo.css` | ~54 KB（gzip ~15 KB） | 设计令牌（暗色 + 浅色）、reset、布局、组件、工具类 |
| `sayo.js` | ~46 KB（gzip ~17 KB） | 交互引擎 — 光标、拖尾、波纹、视差、入场动画、Toast、数字跳动、惯性滚动、Dialog、Scroll Spy、Dropdown |
| `sayo.d.ts` | ~13 KB | TypeScript 类型定义 |
| `icons/` | 32 个 SVG | 自定义单线图标集（25 个 UI 图标 + 6 个 logo 变体 + 1 个 favicon） |

## CSS：设计令牌

所有视觉属性通过 `--syo-*` CSS 变量暴露，在 `:root` 里覆盖即可换肤。

```css
:root {
  --syo-bg-base: #0d1117;     /* 页面背景 */
  --syo-bg-surface: #161b22;  /* 卡片、导航栏 */
  --syo-accent: #bc8cff;      /* 强调色 */
  --syo-blue: #58a6ff;        /* 链接、光标 */
  --syo-font-sans: "Inter", "Noto Sans SC", ...;
  --syo-font-mono: "Fira Code", ...;
}
```

完整令牌列表见 `sayo.css` 的 `:root` 块，共 ~70 个变量。

## CSS：组件

| 类名 | 说明 |
|------|------|
| `.syo-nav` | 固定顶部导航栏 |
| `.syo-editor` | 代码编辑器窗口（标题栏 + 行号 + 语法高亮） |
| `.syo-card` | 悬停上浮卡片 |
| `.syo-tag` | 带色点的标签 |
| `.syo-btn` | 按钮（`--primary`、`--ghost`、`--sm`、`--lg`） |
| `.syo-input` `.syo-select` | 表单输入（文本、下拉） |
| `.syo-checkbox` `.syo-radio` | 自定义复选框 / 单选框 |
| `.syo-toggle` | 滑块开关（基础版 / 主题版 / 语言版 / `--sm` 小号） |
| `.syo-form-group` `.syo-form-label` `.syo-form-hint` | 表单布局 |
| `.syo-dialog-overlay` `.syo-dialog` | 弹性缩放弹窗 |
| `.syo-stat` | 数据统计卡片 |
| `.syo-toast` | 弹性滑入通知（4 种变体） |
| `.syo-inertia` | 惯性滚动容器 |
| `.syo-table` | 基础表格 |
| `.syo-grid-2/3/4` | 响应式 CSS Grid |
| `.syo-section` | 带顶部分割线的页面区块 |
| `.syo-reveal` | 滚动触发的交错入场动画 |
| `.syo-container` | 居中定宽容器 |
| `.syo-skeleton` | 加载占位骨架（`--text` / `--circle` / `--btn` 变体） |
| `.syo-tooltip` | 弹性弹出 tooltip（纯 CSS，`data-syo-tooltip` 驱动） |
| `.syo-tabs` | 标签页切换（纯 CSS，`:checked` + `:has()` 驱动） |
| `.syo-dropdown` | 下拉菜单（弹性展开 + 点击外部 / Escape 关闭） |

## CSS：工具类

```
.syo-text-muted              弱化文字色
.syo-text-sm / .xs / .lg     字号
.syo-text-mono               等宽字体
.syo-flex / .syo-flex-between / .syo-flex-wrap
.syo-gap-1 … .syo-gap-6      Flex / Grid 间距
.syo-mt-1 … .syo-mt-6        上外边距
.syo-mb-1 … .syo-mb-6        下外边距
.syo-p-4 / .syo-py-12        内边距
```

## JavaScript：交互引擎

### 属性自动初始化（零 JS 代码）

在 `<body>` 上添加属性即可：

| 属性 | 效果 |
|------|------|
| `data-syo-cursor` | 全局自定义光标 + 环境光晕 |
| `data-syo-trail` | 全局平滑折线拖尾 |
| `data-syo-ripple` | 在此容器内启用点击波纹 |
| `data-syo-parallax="8"` | 鼠标驱动的视差偏移（值 = 最大像素偏移） |
| `data-syo-countup="1337"` | 滚动到可见区域时数字跳动 |
| `data-syo-inertia` | 启用惯性拖拽滚动 |
| `data-syo-scrollspy="80"` | 滚动时自动高亮导航链接（值 = 顶部偏移量） |
| `data-syo-dropdown` | 下拉菜单容器（自动绑定点击外部和 Escape 关闭） |
| `.syo-reveal`（类名） | 滚动触发的交错入场 |

### JS API

```js
// 光标
Sayo.cursor.init({ size: 16, accentR: 88, accentG: 166, accentB: 255 });
Sayo.cursor.destroy();

// 拖尾（全局或限定容器）
Sayo.trail.init();
Sayo.trail.init({ container: '#hero', maxLength: 20 });

// 波纹 + 闪烁
Sayo.ripple.init();

// 视差
Sayo.parallax.init('.my-element', { maxShift: 10 });

// 入场动画（DOMContentLoaded 时自动初始化）
Sayo.reveal.init();

// Toast — 弹性滑入通知
Sayo.toast.show('文件保存成功', { type: 'success' });
Sayo.toast.show('连接超时，请重试', { type: 'error', duration: 6000 });
Sayo.toast.show('新版本 v2.1.0 已发布', { type: 'info' });
Sayo.toast.show('免费额度即将用尽', { type: 'warning' });

// CountUp — 弹性数字跳动
Sayo.countUp.animate(el, { to: 1337, duration: 3000 });
// 或属性驱动：<span data-syo-countup="1337">0</span>

// 惯性滚动
Sayo.inertiaScroll.init('#my-scroll');
// 或属性驱动：<div data-syo-inertia class="syo-inertia">

// Dialog — 弹性弹窗 + 焦点锁定
Sayo.dialog.show({ title: '设置', body: '<p>内容</p>' });
const ok = await Sayo.dialog.confirm({ title: '删除文件', message: '确定吗？' });
await Sayo.dialog.alert({ title: '上传完成', message: '3 个文件已成功上传。' });

// Scroll Spy — 滚动时自动高亮导航链接
Sayo.scrollSpy.init({ nav: '.sidebar', offset: 100 });

// Dropdown — 下拉菜单
Sayo.dropdown.init(document.querySelector('[data-syo-dropdown]'));
// 或属性驱动：<div data-syo-dropdown> 自动初始化

// 全局销毁 — 一键清理所有模块
Sayo.destroy();
```

## 中英文切换

文档页内置轻量 i18n，通过 data 属性驱动。切换按钮在导航栏右侧。

```html
<span data-i18n="key">默认文本</span>
```

```js
// 通过 localStorage 持久化语言偏好
localStorage.setItem('sayo-lang', 'en'); // 或 'zh'
```

## 图标

`icons/` 目录包含 32 个自定义单线图标（25 个 UI 图标 + 6 个 logo 概念变体 + favicon），全部使用 `stroke="currentColor"` 继承文字颜色。预览见 `icons/index.html`。

## TypeScript

导入 `sayo.d.ts` 即可获得完整类型覆盖。`window.Sayo` 已全局声明，无需 import。

```ts
Sayo.toast.show('Saved', { type: 'success' });        // type: ToastType
const ok = await Sayo.dialog.confirm({ title: '...' }); // Promise<boolean>
Sayo.cursor.init({ size: 18 });                        // opts: SayoCursorOptions
```

## 暗色 / 浅色主题

Sayo UI 默认使用 GitHub Primer Dark 暗色配色。给 `<html>` 添加 `data-syo-theme="light"` 切换到浅色。

所有 `--syo-*` 变量即时更新——背景、文字、边框、功能色、语法高亮全部适配，无需刷新页面。

```html
<html data-syo-theme="light">
```

```js
// 运行时切换
document.documentElement.setAttribute('data-syo-theme', 'light');
document.documentElement.removeAttribute('data-syo-theme'); // 回到暗色
```

导航栏的主题切换按钮会记住你的选择（localStorage 持久化）。

---

所有模块遵循 `prefers-reduced-motion: reduce`。装饰性动效（拖尾、波纹、视差、入场动画）会被跳过；功能性模块（光标圆环、Toast、CountUp、惯性滚动、Dialog）始终工作。

## 疑难解答

### 光晕 / 拖尾不显示

**最可能的原因：系统开启了"减少动效"。**

Sayo UI 遵循 [`prefers-reduced-motion: reduce`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) 媒体查询。当操作系统或浏览器设置为"减少动态效果"时，光晕、拖尾、波纹等装饰性动效会被静默跳过——只保留功能性光标圆环。

**排查步骤：**

```js
// 1. 打开浏览器控制台，检查系统是否要求减少动效
window.matchMedia('(prefers-reduced-motion: reduce)').matches
// → true  = 动效被禁用，只有基础光标
// → false = 所有效果应该正常工作

// 2. 检查光标是否正常加载
!!document.getElementById('syo-cursor')
// → true  = 光标圆环已渲染

// 3. 检查 glow canvas 是否创建
!!document.getElementById('syo-cursor-canvas')
// → true  = 光晕已激活（仅 reduced-motion: false 时）
```

**如何关闭减少动效：**

| 系统 | 设置路径 |
|------|----------|
| **Linux (GNOME)** | Settings → Accessibility → 关闭 "Reduce Animations" |
| **Linux (KDE)** | System Settings → Workspace Behavior → Desktop Effects |
| **Linux (Cinnamon)** | System Settings → Effects → 开启特效 |
| **macOS** | System Settings → Accessibility → Display → 关闭 "Reduce motion" |
| **Windows** | Settings → Accessibility → Visual Effects → 关闭 "Animation effects" |
| **Chrome DevTools** | Rendering 标签 → 取消勾选 "Emulate CSS prefers-reduced-motion" |

### 系统光标也消失了

1. 确认 `sayo.js` 已加载（检查 Network 面板）
2. 确认 `<body>` 有 `data-syo-cursor` 属性，或手动调用过 `Sayo.cursor.init()`
3. 检查浏览器控制台是否有 JS 错误

如果 JS 加载失败，Sayo UI 会自动回退——CSS 不会隐藏系统光标。只有 JS 成功初始化自定义光标后，系统光标才会被替换。

### 如何按需启用 / 禁用模块

```js
// 只想要自定义光标，不要拖尾
Sayo.cursor.init();
// 不调用 Sayo.trail.init() 即可

// 手动销毁单个模块
Sayo.cursor.destroy();  // 恢复系统光标
```

## 浏览器兼容

现代浏览器（ES6+）。已在 Chrome、Firefox、Safari 15+ 测试。

## License

MIT
