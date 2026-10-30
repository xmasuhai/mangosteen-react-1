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
  rules: [
    [
      'animate-rainbow',
      { animation: 'rainbow 8s linear infinite' },
    ],
    [/^scrollbar-hide$/, () => ({
      'scrollbar-width': 'none',
    })],
    [/^scrollbar-default$/, () => ({
      'scrollbar-width': 'auto',
    })],
  ],
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
  preflights: [
    {
      getCSS: () => `
        @property --sibling-idx {
          syntax: '<integer>'; /* 核心：限制为整数类型，迫使浏览器立即求值 */
          inherits: true;      /* 允许向下继承计算后的结果 */
          initial-value: 1;
        }
      `
    }
  ],
  shortcuts: {
    'primary-btn': 'w-100% h-48px bg-[var(--button-primary-color)] text-[var(--button-primary-text-color)] b-none rounded-8px',
    'disabled': 'bg-[var(--button-bg-default)] pointer-events-none cursor-not-allowed',
  },
})
