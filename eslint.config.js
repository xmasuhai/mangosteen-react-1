// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    // 启用 React 支持（对应原 plugin:react-hooks 和 react-refresh）
    react: true,
    // 启用 TypeScript 支持（对应原 @typescript-eslint）
    typescript: true,

    stylistic: {
      indent: 2,
      quotes: 'single',
      braceStyle: 'stroustrup',
      semi: false,
      'comma-dangle': 'only-multiline',
    },
    // 显式声明全局忽略的文件/文件夹（对应原 ignorePatterns）
    ignores: [
      'dist',
      '*.md',
      '*.json',
      '*.config.*',
    ],
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-imports': 'off',
    },
  }
)
