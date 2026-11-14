import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetWind4 } from '@unocss/preset-wind4'
import { cn } from 'cn'

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
    // 支持在 JSX 中使用属性化语法
    transformerAttributifyJsx(),
    // 支持 @apply、@screen、theme() 和 icon()
    transformerDirectives(),
  ],
  theme: {
    colors: {
      // 绑定你的 CSS 变量
      welcomeCardBg: 'var(--welcome-card-bg-color)',
      primaryColor: 'var(--primary-color)',
      btnPrimaryColor: 'var(--button-primary-color)',
    },
  },
  rules: [
    ['animate-rainbow', { animation: 'rainbow 8s linear infinite' }],
    [
      /^scrollbar-hide$/,
      () => ({
        'scrollbar-width': 'none',
      }),
    ],
    [
      /^scrollbar-default$/,
      () => ({
        'scrollbar-width': 'auto',
      }),
    ],
    [
      'h-screen',
      {
        height:
          'calc(var(--main-vh, 100vh) - var(--vh-offset, 0px) - env(safe-area-inset-bottom) - env(safe-area-inset-top))',
      },
    ],
  ],
  variants: [
    // where:xxx -> :where(.where\:xxx) { ... }，优先级 0,0,0
    (matcher) => {
      if (!matcher.startsWith('where:')) return matcher
      return {
        matcher: matcher.slice(6),
        selector: (s) => `:where(${s})`,
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
      `,
    },
  ],
  shortcuts: {
    // 将 UnoCSS 的原子类映射到你 SCSS 里定义好的 .animation-rainbow 类
    rainbow: 'animation-rainbow',
    'primary-btn': cn(
      'w-100% h-48px b-none rounded-8px text-center',
      'bg-[var(--button-primary-color)] color-[var(--button-primary-text-color)]'
    ),
    disabled: 'bg-[var(--button-bg-default)] pointer-events-none cursor-not-allowed',
    /* 表单相关 */
    'form-sc': 'mgst-form px-1em py-.5em flex flex-col gap-y-16px children:(flex flex-col)',
    'form-item-sc': 'mgst-form-item w-full gap-y-8px where:(flex flex-col)',
    'form-label-sc': 'mgst-form-label vertical-mid text-16px block',
    'form-item-content-sc': 'mgst-form-item-content flex w-full gap-x-[1em]',
    'form-item-error-sc': cn(
      'form-item-error',
      'block w-full min-h-18px',
      'vertical-mid text-12px color-[var(--error-color)]'
    ),
    'form-input-text-sc': cn(
      'mgst-form-input',
      'w-full h-[48px] px-1em leading-2em py-.5em',
      'b-1 b-[var(--main)] rounded-.5em text-18px',
      'focus:(shadow-[inset_0_0_3px_var(--main)] outline-none)'
    ),
    'form-btn-sc': cn(
      'mgst-form-btn',
      'h-[48px] w-full b-unset rounded-.5em',
      'where:(bg-[var(--main)] color-white text-18px)'
    ),
  },
})
