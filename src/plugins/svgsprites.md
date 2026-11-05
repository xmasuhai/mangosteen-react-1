# svgsprites 插件文档

## 插件概述

`svgsprites` 是一个 Vite 插件，用于将指定目录下的多个 SVG 文件合并为单个 SVG sprite，并在浏览器运行时将该 sprite 注入到页面中，以便通过 `<use xlink:href="#icon-name">` 的方式复用图标。

### 核心功能

- 扫描图标目录，收集所有 `.svg` 文件。
- 图标目录默认为 `src/assets/icons`，可以通过 `inputFolder` 配置进行修改。
- 使用 `svgstore` 将多个 SVG 合并为一个 sprite，每个图标对应一个 `<symbol>`。
- 通过 SVGO 对图标进行优化（可针对特定图标跳过优化）。
- 在开发模式下监听文件新增与修改，自动重新生成 sprite 并通过 Vite HMR 推送更新。
- 在浏览器端创建隐藏的 SVG 容器并插入到 `document.body`，支持无 body 时的延迟插入。

### 使用场景

- 项目中存在大量独立 SVG 图标，希望统一管理并减少 HTTP 请求。
- 需要在开发时热更新图标，避免手动重新构建。
- 需要对部分复杂图标跳过自动优化，保留原始结构。

## 步骤解析（Vite 构建流程）

### 1. 插件初始化

调用 `svgsprites(options)` 时，插件会：

1. 解析并补齐配置默认值（`resolveOptions`）。
2. 生成虚拟模块 ID（`createVirtualModuleIds`），包括公开 ID 与内部 ID（带 `\0` 前缀）。
3. 返回 Vite 插件对象，注册 `configureServer`、`resolveId`、`load` 钩子。

### 2. 模块解析阶段（resolveId）

当代码中出现 `import 'virtual:svgsprites'` 时，Vite 调用 `resolveId` 钩子。插件将公开虚拟模块 ID 映射为内部 ID，阻止 Vite 将其当作真实文件处理。

### 3. 模块加载阶段（load）

Vite 调用 `load` 钩子时，插件：

1. 调用 `generateSpriteCode` 生成 sprite 字符串。
   - 读取图标目录下所有 `.svg` 文件（`readSvgFileNames`）。
   - 对每个图标执行优化或跳过（`optimizeSvgCode`）。
   - 使用 `svgstore` 合并为 sprite 字符串。
2. 调用 `buildClientModule` 将 sprite 字符串嵌入客户端执行代码。
3. 返回客户端模块源码，浏览器执行后将 sprite 注入页面。

### 4. 开发模式热更新（configureServer）

在开发服务器启动时，插件注册文件监听器：

- 监听 `add` 与 `change` 事件。
- `handleIconFileChange` 判断变更文件是否属于图标目录。
- 若相关，则重新生成 sprite，并通过 `notifySpriteChange`：
  - 向客户端发送 `svgsprites:change` 事件，携带新 sprite 代码。
  - 失效 Vite 模块图中的虚拟模块，触发重新加载。

### 5. 客户端运行时

客户端模块执行时：

1. 创建 `<div>` 容器并设置 `innerHTML` 为 sprite 代码。
2. 获取其中的 `<svg>` 并设置隐藏样式与 `aria-hidden`。
3. 将容器插入 `document.body`（若 body 不存在则等待 `DOMContentLoaded`）。
4. 若存在 `import.meta.hot`，监听 `svgsprites:change` 事件并更新 DOM。

## 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `id` | `string` | `undefined` | 虚拟模块唯一标识，用于区分多个插件实例。提供后虚拟模块 ID 变为 `virtual:svgsprites-{id}` |
| `inputFolder` | `string` | `'src/assets/icons'` | SVG 源文件所在目录 |
| `inline` | `boolean` | `false` | 生成的 sprite 是否内联 |
| `noOptimizeList` | `string[]` | `[]` | 跳过 SVGO 优化的图标名称列表（不含扩展名） |

## 使用示例

### 基础配置

```ts
import { svgsprites } from './src/plugins/svgsprites'

export default defineConfig({
  plugins: [
    svgsprites(),
  ],
})
```

### 自定义图标目录与内联

```ts
svgsprites({
  inputFolder: 'src/assets/svg-icons',
  inline: true,
})
```

### 跳过部分图标优化

```ts
svgsprites({
  noOptimizeList: ['chart', 'pig', 'mangosteen'],
})
```

### 项目当前配置中的免优化图标列表

本项目 `vite.config.ts` 通过 `noOptimizeIconList.ts` 传入 `noOptimizeList`，当前免优化图标包括：

- `chart`
- `export`
- `notify`
- `pig`
- `mangosteen`
- `tech_stack`
- `work-card`
- `moneybag`
- `tag-dollar`

这些图标在构建时将跳过 SVGO 优化，以保留其原始属性与结构。
### 多实例使用

```ts
svgsprites({ id: 'admin', inputFolder: 'src/assets/admin-icons' })
svgsprites({ id: 'user', inputFolder: 'src/assets/user-icons' })
```

对应导入：

```ts
import 'virtual:svgsprites-admin'
import 'virtual:svgsprites-user'
```
