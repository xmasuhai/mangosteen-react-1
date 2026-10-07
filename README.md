# 🚀  山竹记账-前端 React 版 项目启动与开发规范

> 网页预览：http://xmasuhai.github.io/mangosteen-react-1-publish/index.html

为了确保团队环境的一致性，本项目通过 **Corepack** 严格锁定了 Node.js 版本和包管理器（`pnpm`）。请在开发前按照以下步骤配置你的本地环境。

## 🛠️ 环境准备

### 1. 检查 Node.js 版本
请确保你的本地 Node.js 版本符合项目要求：
* **要求版本**：`>=22.23.2`
* **检查命令**：`node -v`

### 2. 开启官方 Corepack
本项目利用 Node.js 自带的 Corepack 来管理包管理器版本，无需你全局手动安装 pnpm。请在终端执行以下命令开启它：

```bash
corepack enable
corepack prepare pnpm@11.27.0 --activate
```

## 📦 依赖安装与启动

配置完成后，你可以直接在项目根目录下执行以下命令：

### 安装依赖

```bash
pnpm install
```

> ⚠️ **注意**：请勿使用 `npm install` 或 `yarn install`。项目中配置了拦截脚本，使用非 `pnpm` 命令将会导致安装失败。

### 本地开发

```bash
pnpm dev
```

### 项目打包

```bash
pnpm build
```

---

## ❓ 常见问题排查

**Q: 运行 `pnpm install` 提示 `Command not found`？**
A: 请确保你已经成功执行了 `corepack enable`。如果依然报错，请尝试重启终端。

**Q: 运行 `npm install` 报错 `请使用 pnpm 进行安装！`？**
A: 本项目已锁定包管理器，请严格使用 `pnpm install` 提交和管理依赖。

---
---

- `pnpm run dev`

使用 React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
