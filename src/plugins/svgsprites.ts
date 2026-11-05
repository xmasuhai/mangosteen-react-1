import path from 'node:path'
import fs from 'node:fs'
import store, { type SvgStoreOptions } from 'svgstore'
import { optimize } from 'svgo'
import type { Plugin, ViteDevServer } from 'vite'

/**
 * 插件可配置项。
 * 所有字段均为可选，未提供时使用内置默认值。
 */
export interface SvgSpritesOptions {
  /** 虚拟模块唯一标识，用于区分多个插件实例 */
  id?: string
  /** SVG 源文件所在目录，相对项目根目录或绝对路径 */
  inputFolder?: string
  /** 生成的 sprite 是否内联到 SVG 标签中 */
  inline?: boolean
  /** 跳过 SVGO 优化的图标名称列表 */
  noOptimizeList?: string[]
}

/**
 * 解析并补齐默认值后的配置。
 */
export interface ResolvedSvgSpritesOptions {
  /** 虚拟模块唯一标识 */
  id?: string
  /** 已解析为最终使用的图标目录 */
  inputFolder: string
  /** 是否内联 */
  inline: boolean
  /** 跳过优化的图标名称列表（保证为数组） */
  noOptimizeList: string[]
}

/**
 * 解析用户传入的配置，补齐默认值。
 *
 * @param options 用户传入的原始配置
 * @returns 补齐默认值后的配置对象
 */
export const resolveOptions = (options: SvgSpritesOptions = {}): ResolvedSvgSpritesOptions => {
  const { id, inputFolder = 'src/assets/icons', inline = false, noOptimizeList } = options
  // 保证 noOptimizeList 始终为数组，避免后续调用 includes 时出现 undefined
  const resolvedNoOptimizeList: string[] = noOptimizeList ?? []

  return {
    id,
    inputFolder,
    inline,
    noOptimizeList: resolvedNoOptimizeList,
  }
}

/**
 * 根据配置生成虚拟模块的公开 ID 与 Vite 内部解析 ID。
 *
 * @param id 可选的插件实例标识
 * @returns 包含公开 ID 与内部 ID 的对象
 */
export const createVirtualModuleIds = (
  id?: string,
): { virtualModuleId: string; resolvedVirtualModuleId: string } => {
  // 公开 ID 用于 import 语句匹配，内部 ID 前缀 \0 以避免 Vite 对其进行文件系统解析
  const virtualModuleId = `virtual:svgsprites${id ? `-${id}` : ''}`
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return { virtualModuleId, resolvedVirtualModuleId }
}

/**
 * 读取指定目录下所有 SVG 文件名。
 *
 * @param iconsDir 图标目录的绝对路径
 * @returns 以 .svg 结尾的文件名数组
 */
export const readSvgFileNames = (iconsDir: string): string[] => {
  // 仅保留 svg 扩展名的文件，忽略目录中的其它资源
  return fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'))
}

/**
 * 判断当前变更的文件是否属于图标目录，决定是否触发重新生成。
 *
 * @param file 变更文件路径
 * @param inputFolder 配置的图标目录
 * @returns 是否需要处理该文件变更
 */
export const isRelevantIconFile = (file: string, inputFolder: string): boolean => {
  // 使用 includes 而非严格相等，兼容不同路径分隔符与绝对/相对路径
  return file.includes(inputFolder)
}

/**
 * 对单个 SVG 源码执行优化或跳过优化。
 *
 * @param code 原始 SVG 源码
 * @param svgId 图标名称（不含扩展名）
 * @param noOptimizeList 跳过优化的图标名称列表
 * @returns 优化后的 SVG 源码
 */
export const optimizeSvgCode = (code: string, svgId: string, noOptimizeList: string[]): string => {
  // 命中跳过列表时直接返回原始源码，保留原始属性与结构
  if (noOptimizeList.includes(svgId)) {
    return code
  }

  // SVGO 优化：清理属性、移除文档类型/注释/标题/描述/空属性，并移除 data-name 与 fill 属性
  return optimize(code, {
    plugins: [
      'cleanupAttrs',
      'removeDoctype',
      'removeComments',
      'removeTitle',
      'removeDesc',
      'removeEmptyAttrs',
      { name: 'removeAttrs', params: { attrs: '(data-name|fill)' } },
    ],
  }).data
}

/**
 * 生成完整的 SVG sprite 字符串。
 *
 * @param options 已解析的配置
 * @returns sprite 的字符串形式
 * @example <svg><symbol id="icon-name"><path d="..."></path></symbol></svg>
 */
export const generateSpriteCode = (options: ResolvedSvgSpritesOptions): string => {
  // svgstore 负责将多个 <symbol> 合并为单个 <svg> sprite
  const sprites = store(options as unknown as SvgStoreOptions)
  const iconsDir = path.resolve(options.inputFolder)

  const svgFileNames = readSvgFileNames(iconsDir)

  for (const file of svgFileNames) {
    const filepath = path.join(iconsDir, file)
    const svgId = path.parse(file).name
    const code = fs.readFileSync(filepath, { encoding: 'utf-8' })
    const symbol = optimizeSvgCode(code, svgId, options.noOptimizeList)

    // 将单个图标作为 symbol 添加到 sprite 中
    sprites.add(svgId, symbol)
  }

  return sprites.toString({ inline: options.inline })
}

/**
 * 构建浏览器端执行的客户端模块代码。
 * 该模块在运行时创建隐藏的 svg 容器并注入到 document.body，
 * 同时注册 Vite HMR 监听以支持开发时热更新。
 *
 * @param code 生成的 sprite 字符串
 * @returns 可被 Vite load 钩子返回的模块源码
 */
export const buildClientModule = (code: string): string => {
  return `!function(){
    const div = document.createElement('div')
    div.innerHTML = \`${code}\`
    const svg = div.getElementsByTagName('svg')[0]
    const updateSvg = (svg) => {
      if (!svg) { return }
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      svg.setAttribute("aria-hidden", "true")
    }
    const insert = () => {
      if (document.body.firstChild) {
        document.body.insertBefore(div, document.body.firstChild)
      } else {
        document.body.appendChild(div)
      }
    }
    updateSvg(svg)
    if (document.body){
      insert()
    } else {
      document.addEventListener('DOMContentLoaded', insert)
    }
    if (import.meta.hot) {
      import.meta.hot.on('svgsprites:change', (data) => {
        const code = data.code
        div.innerHTML = code
        const svg = div.getElementsByTagName('svg')[0]
        updateSvg(svg)
      })
    }
  }()
  `
}

/**
 * 向 Vite 开发服务器广播 sprite 变更并失效对应模块，触发 HMR。
 *
 * @param server Vite 开发服务器实例
 * @param code 新生成的 sprite 字符串
 * @param resolvedVirtualModuleId 内部虚拟模块 ID
 */
export const notifySpriteChange = (
  server: ViteDevServer,
  code: string,
  resolvedVirtualModuleId: string,
): void => {
  // 广播自定义事件，客户端模块监听后更新 DOM
  server.ws.send('svgsprites:change', { code })

  // 失效模块图中的对应模块，使 Vite 重新加载虚拟模块
  const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
  if (!mod) {
    return
  }
  server.moduleGraph.invalidateModule(mod, undefined, Date.now())
}

/**
 * 处理图标文件新增或修改事件。
 *
 * @param file 变更文件路径
 * @param server Vite 开发服务器实例
 * @param inputFolder 配置的图标目录
 * @param resolvedVirtualModuleId 内部虚拟模块 ID
 * @param generateCode 生成 sprite 代码的函数
 */
export const handleIconFileChange = (
  file: string,
  server: ViteDevServer,
  inputFolder: string,
  resolvedVirtualModuleId: string,
  generateCode: () => string,
): void => {
  // 非图标目录文件变更直接忽略，避免无关文件触发重生成
  if (!isRelevantIconFile(file, inputFolder)) {
    return
  }

  const code = generateCode()
  notifySpriteChange(server, code, resolvedVirtualModuleId)
}

/**
 * Vite 插件入口：将 SVG 目录打包为 sprite，并在开发时支持热更新。
 *
 * @param options 插件配置
 * @returns Vite 插件对象
 */
export const svgsprites = (options: SvgSpritesOptions = {}): Plugin => {
  const resolved = resolveOptions(options)
  const { virtualModuleId, resolvedVirtualModuleId } = createVirtualModuleIds(resolved.id)

  // 闭包缓存生成函数，供 load 钩子与文件变更处理复用
  const generateCode = (): string => generateSpriteCode(resolved)

  return {
    name: 'svgsprites',
    // configureServer：注册文件监听器，实现开发时热更新
    configureServer(server) {
      server.watcher.on('add', (file) => {
        handleIconFileChange(file, server, resolved.inputFolder, resolvedVirtualModuleId, generateCode)
      })
      server.watcher.on('change', (file) => {
        handleIconFileChange(file, server, resolved.inputFolder, resolvedVirtualModuleId, generateCode)
      })
    },
    // resolveId：将虚拟模块 ID 映射到 Vite 内部 ID
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    // load：构建时/开发时加载虚拟模块，返回客户端执行代码
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        const code = generateCode()
        return buildClientModule(code)
      }
    },
  }
}
