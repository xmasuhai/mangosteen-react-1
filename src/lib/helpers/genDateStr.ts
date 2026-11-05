/**
 * @Description: 生成通用日期数组
 * @Author: xmasuhai <xmasuhai@163.com>
 * @Date: 2026-10-22 15:39:31
 * @LastEditors: xmasuhai <xmasuhai@163.com>
 * @LastEditTime: 2026-10-22 17:22:23
 * @FilePath: src/const/genDateStr.ts
 */
export const genDateStr = (defaultDateValue: Date = new Date()): string =>
  [
    `${defaultDateValue.getFullYear()}`,
    `${defaultDateValue.getMonth() + 1}`,
    `${defaultDateValue.getDate()}`,
  ].join('-')
