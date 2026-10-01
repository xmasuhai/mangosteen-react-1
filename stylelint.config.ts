import type { Config } from 'stylelint'

export default {
  // 继承官方推荐的 SCSS 标准配置
  extends: ['stylelint-config-standard-scss'],

  // 针对特定文件或语法进行微调（Stylelint 16+ 推荐）
  rules: {
    // 强制文件末尾必须以换行符（空行）结束
    'no-missing-end-of-source-newline': true,

    // 限制整个文件中（包括末尾）连续空行的最大数量为 1 行
    'max-empty-lines': 1,

    // 可选：如果你允许写空的 SCSS 文件，可以将其关闭以防报错
    'no-empty-source': null,
  },
} satisfies Config
