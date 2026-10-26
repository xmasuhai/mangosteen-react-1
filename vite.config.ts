import { fileURLToPath, URL } from 'node:url'
import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'
import jsxScoped from '@10coding/vite-plugin-jsx-scoped'
import { viteMockServe } from 'vite-plugin-mock'
import { consoleBanner } from "vite-plugin-console-banner"

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => ({
  // base: '/mangosteen-react-1-preview/',
  define: {
    __IS_DEV__: command === 'serve',
  },
  plugins: [
    UnoCSS(),
    jsxScoped({ scopedIdAttributeName: 'scopedid' }),
    react(),
    viteMockServe({
      mockPath: './src/mock',
      enable: command === 'serve',
    }),
    consoleBanner({
      text: "xmasuhai.xyz",
      font: "big", // 大小写不敏感，也可用 "Big"、"ANSI Shadow"
      color: "#476EE3",
      badges: [
        { label: "徐帅的博客", url: "https://xmasuhai.xyz" },
        { label: "徐帅${year}简历", url: "https://xmasuhai.xyz/my-latest-resume/" },
      ],
    }),
  ],
  server: {
    host: true
  },
  resolve: {
    // 开启 Vite 8 的原生 tsconfig 路径解析支持
    tsconfigPaths: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})) satisfies UserConfigExport
