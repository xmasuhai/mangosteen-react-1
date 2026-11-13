// eslint.config.js
import antfu from '@antfu/eslint-config'
import reactHooks from 'eslint-plugin-react-hooks'

export default antfu(
  {
    // 启用 React 支持（对应原 plugin:react-hooks 和 react-refresh）
    react: true,
    // 启用 TypeScript 支持（对应原 @typescript-eslint）
    typescript: true,

    stylistic: {
      indent: 2,
      quotes: 'single',
      // braceStyle: 'stroustrup',
      semi: false,
      'comma-dangle': 'only-multiline',
    },
    // 显式声明全局忽略的文件/文件夹（对应原 ignorePatterns）
    ignores: [
      'dist',
      '*.md',
      '*.json',
      '*.config.*',
      'src/lib/const/safeEmojiList.ts',
      'src/lib/const/emojiTopicList.ts',
    ],
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'perfectionist/sort-named-imports': 'off',
      'perfectionist/sort-imports': 'off',
      'style/jsx-closing-bracket-location': ['error', { location: 'after-props' }],

      '@typescript-eslint/consistent-type-definitions': 'off',

      // 强制文件末尾保留且仅保留一行空行
      '@stylistic/eol-last': ['error', 'always'],
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      '@stylistic/max-statements-per-line': ['error', { max: 2 }],
      '@stylistic/keyword-spacing': 'off',
    },
  },
  reactHooks.configs.flat.recommended
)
