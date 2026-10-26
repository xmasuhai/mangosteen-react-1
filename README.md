# 🚀 山竹记账-前端 React 版 项目启动与开发规范

> 网页预览：http://xmasuhai.github.io/mangosteen-react-1-publish/index.html

为了确保团队环境的一致性，本项目通过 **Corepack** 严格锁定了 Node.js 版本和包管理器（`pnpm`）。请在开发前按照以下步骤配置你的本地环境。

## 🛠️ 环境准备

### 1. 检查 Node.js 版本
请确保你的本地 Node.js 版本符合项目要求：
* **要求版本**：`>=26`
* **检查命令**：`node -v`

### 2. 开启官方 Corepack
本项目利用 Node.js 自带的 Corepack 来管理包管理器版本，无需你全局手动安装 pnpm。请在终端执行以下命令开启它：

```bash
corepack enable
corepack prepare pnpm@12.15.0 --activate
```

## 📦 技术栈

本项目的主要依赖与开发工具如下：

### 运行时依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| [react](https://react.dev/) | 18.3.1 | UI 框架 |
| [react-dom](https://react.dev/) | 18.3.1 | React DOM 渲染 |
| [react-router-dom](https://reactrouter.com/) | 6.30.6 | 路由管理 |
| [zustand](https://zustand-demo.pmnd.rs/) | 5.0.16 | 轻量级全局状态管理 |
| [swr](https://swr.vercel.app/) | 2.5.1 | 数据请求与缓存 |
| [axios](https://axios-http.com/) | 1.20.0 | HTTP 客户端 |
| [styled-components](https://styled-components.com/) | 6.6.0 | CSS-in-JS 样式方案 |
| [@react-spring/web](https://www.react-spring.dev/) | 10.1.2 | 春风物理动画 |
| [cn](https://github.com/lukeed/cn) | 0.5.0 | 类名合并工具 |

### 开发依赖

| 依赖 | 版本 | 用途 |
|------|------|------|
| [vite](https://vitejs.dev/) | 8.3.5 | 构建工具与开发服务器 |
| [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) | 6.1.2 | Vite React 插件 |
| [unocss](https://unocss.dev/) | 66.12.0 | 原子化 CSS 引擎 |
| [@unocss/vite](https://unocss.dev/) | 66.12.0 | UnoCSS Vite 插件 |
| [@unocss/preset-wind4](https://unocss.dev/) | 66.12.0 | Wind4 预设 |
| [@unocss/preset-attributify](https://unocss.dev/) | 66.12.0 | Attributify 预设 |
| [typescript](https://www.typescriptlang.org/) | 7.0.2 | 类型检查 |
| [sass-embedded](https://sass-lang.com/) | 1.106.1 | Sass 编译器 |
| [eslint](https://eslint.org/) | 10.13.0 | 代码检查 |
| [@antfu/eslint-config](https://github.com/antfu/eslint-config) | 10.0.0 | Antfu ESLint 配置 |
| [stylelint](https://stylelint.io/) | 17.16.0 | 样式代码检查 |
| [stylelint-config-standard-scss](https://github.com/stylelint-scss/stylelint-config-standard-scss) | 17.0.0 | SCSS 样式检查配置 |

### 包管理器与运行时要求

* **包管理器**：`pnpm >=12.15.0`（`packageManager: pnpm@12.15.0`）
* **Node.js**：`>=26`

## 📦 依赖安装与启动

配置完成后，你可以直接在项目根目录下执行以下命令：

### 安装依赖

```bash
pnpm install
```

> ⚠️ **注意**：请勿使用 `npm install` 或 `yarn install`。项目中配置了拦截脚本（`preinstall`），使用非 `pnpm` 命令将会导致安装失败。

### 本地开发

```bash
pnpm dev
```

### 代码检查

```bash
pnpm lint
```

### 自动修复代码检查问题

```bash
pnpm lint:fix
```

### 项目打包

```bash
pnpm build
```

### 预览构建产物

```bash
pnpm preview
```

---

## ❓ 常见问题排查

**Q: 运行 `pnpm install` 提示 `Command not found`？**
A: 请确保你已经成功执行了 `corepack enable`。如果依然报错，请尝试重启终端。

**Q: 运行 `npm install` 报错 `请使用 pnpm 进行安装！`？**
A: 本项目已锁定包管理器，请严格使用 `pnpm install` 提交和管理依赖。

**Q: `node -v` 显示版本低于 `26` 怎么办？**
A: 请升级你的 Node.js 到 `>=26` 版本后再进行开发，否则可能会遇到依赖安装或构建失败的问题。
