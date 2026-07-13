# Sayo UI — Project Context

## 项目结构

| 文件 | 角色 |
|------|------|
| `sayo.css` | CSS 框架 — 令牌、reset、组件、工具类 |
| `sayo.js` | JS 交互引擎 — 11 个模块，全部挂在 `window.Sayo` |
| `sayo.d.ts` | TypeScript 类型定义 |
| `index.html` | 文档 + 实时演示页（同时也是 i18n 和语法高亮的宿主） |
| `icons/` | 20 个单线 SVG 图标 |

## 零构建

没有任何构建步骤。直接打开 `index.html` 即可预览。

## 核心约定

- **CSS 变量驱动**：所有颜色/间距/字体通过 `--syo-*` 暴露，暗色 = `:root`，浅色 = `html[data-syo-theme="light"]`
- **JS 模块模式**：每个模块用 IIFE 包裹，API 通过 `Sayo.xxx` 暴露，数据属性（`data-syo-cursor` 等）自动初始化
- **弹性缓动**：hover/press 动画统一用 `--syo-ease-elastic`，强调手感

## 容易踩的坑

1. **CSS 括号不能丢** — 用 Edit 工具改 `.syo-editor-code` 附近的规则时小心，少一个 `}` 整个文件后面全挂
2. **语法高亮的 placeholder-token 模式** — 高亮器先把 i18n span 换成 `\x00S{id}\x00`，把所有 token 换成 `\x00K{id}\x00`，全部正则跑完后一次性 resolve。顺序错了会串色。前缀 `K` 是为了防止数字 regex 匹配到 token ID
3. **i18n 的 HTML 注释** — 代码注释翻译（`syn.*` 键）里 `<!--` 和 `-->` 必须写成 `&lt;!--` 和 `--&gt;`，否则 innerHTML 会当真实注释吞掉
4. **resize 导致侧边栏状态** — 移动端 off-canvas 模式（≤768px）和桌面端 collapse 是两套逻辑，resize 跨越断点时要手动 closeMobile()
5. **`prefers-reduced-motion`** — 光晕/拖尾/波纹/视差在 reduced motion 下静默跳过，但光标圆环（`data-syo-cursor`）始终创建。用户报"拖尾不显示"第一件事查这个

## 修改后验证

无测试套件。改动后直接：
1. `node -e "new Function(require('fs').readFileSync('sayo.js','utf8'))"` — JS 语法检查
2. 肉眼检查 CSS 括号：`grep -c '{' sayo.css` == `grep -c '}' sayo.css`
3. 在浏览器打开 `index.html`，肉眼确认主题切换、语言切换、光标、拖尾都正常
