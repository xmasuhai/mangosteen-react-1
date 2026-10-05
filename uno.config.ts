import { defineConfig, presetAttributify, presetIcons, presetTypography, transformerAttributifyJsx } from 'unocss'
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
    transformerAttributifyJsx(),
  ],
  theme: {
    colors: {
      // 绑定你的 CSS 变量
      welcomeCardBg: 'var(--welcome-card-bg-color)',
      primaryColor: 'var(--primary-color)',
      btnPrimaryColor: 'var(--button-primary-color)',
    }
  }
})
