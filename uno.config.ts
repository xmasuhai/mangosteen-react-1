import { defineConfig, presetAttributify, presetIcons, presetTypography, transformerAttributifyJsx, transformerVariantGroup } from 'unocss'
import { presetWind4 } from '@unocss/preset-wind4'

export default defineConfig({
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    // 支持 where:(a b c) 这种分组写法
    transformerVariantGroup(),
    transformerAttributifyJsx(),
  ],
  theme: {
    colors: {
      // 绑定你的 CSS 变量
      welcomeCardBg: 'var(--welcome-card-bg-color)',
      primaryColor: 'var(--primary-color)',
      btnPrimaryColor: 'var(--button-primary-color)',
    }
  },
  variants: [
    // where:xxx -> :where(.where\:xxx) { ... }，优先级 0,0,0
    (matcher) => {
      if (!matcher.startsWith('where:'))
        return matcher
      return {
        matcher: matcher.slice(6),
        selector: s => `:where(${s})`,
      }
    },
  ],
})
