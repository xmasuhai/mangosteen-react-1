/// <reference types="vite/client" />

// vite-env.d.ts
declare const __IS_DEV__: boolean

declare module 'svgstore' {
  export interface SvgStoreOptions {
    cleanDefs?: boolean | string[]
    cleanSymbols?: boolean | string[]
    inline?: boolean
    svgAttrs?: boolean | Record<string, string | number | boolean>
    symbolAttrs?: boolean | Record<string, string | number | boolean>
    copyAttrs?: boolean | string[]
    renameDefs?: boolean
    [key: string]: unknown
  }

  export interface SvgStoreInstance {
    element: unknown
    add(id: string, file: string, options?: SvgStoreOptions): SvgStoreInstance
    toString(options?: { inline?: boolean;[key: string]: unknown }): string
  }

  function svgstore(options?: SvgStoreOptions): SvgStoreInstance

  export default svgstore
}

declare module 'virtual:svgsprites' {
  export * from '@svgoStore'
  const defaultExport: readonly ["add", "back-arrow", "backspace", "chart", "clock", "cloud", "date", "decimal_point", "export", "mangosteen", "menu", "notes", "notify", "pig", "radix_point", "tech_stack"]
  export default defaultExport
}
