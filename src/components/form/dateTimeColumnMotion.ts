/**
 * 根据手势起点和指针移动量计算拖动位移。需要不断更新
 * 根据手指从按下到当前位置的移动距离，计算列表拖动时的原始垂直位移
 * 按下时会先停止动画并记录当前可见位移；移动时调用此函数
 * startTranslateY 应使用手势开始时实际可见的位移（包括中断弹簧动画后的当前位置）；
 * 每次都从手势起点计算，避免累计已经经过越界阻尼的位移。手指回拖时不会丢失原始移动距离
 */
export const getDragTranslateY = (
  // 手势开始时列表的可见位移
  startTranslateY: number,
  // 手指按下时的 clientY
  startPointerY: number,
  // 手指当前的 clientY
  currentPointerY: number
) => startTranslateY + currentPointerY - startPointerY

/**
 * 为列表滚动位移添加越界阻尼：合法范围内保持原位移，越界时平滑拉伸。
 * 在日期列表拖动越过首项或末项时，压缩越界位移，产生越拉越费力的效果
 * 位移为负时向后移动；列表首项对应 0，末项对应 -(listLength - 1) * itemHeight。
 * 指数阻尼使额外拉伸量逐渐趋近一行高度，而不会线性增长或立即截断。
 * 返回值：经过越界阻尼处理后，实际用于显示列表的垂直位移
 * 首项和末项使用相同的阻尼曲线，只是方向相反
 * 两侧越界都使用同一个拉伸量公式：拉伸量 = 行高 × (1 - e^(-越界距离 / 行高))
 * 刚越界时，拉伸量接近原始越界距离，边界处过渡平滑
 * 越界距离越大，拉伸量增加得越慢，形成阻力感
 * 拉伸量逐渐趋近一行高度，而不是无限增长；实际浮点计算中可能因精度舍入恰好等于该上限
 * 拖动流程是：
 * 先通过 getDragTranslateY 根据手势起点计算原始位移
 * 再调用 getResistedTranslateY，将结果设置到列表的动画位移中
 * 函数本身只计算位移，不负责回弹或选中项吸附
 * 手指松开后，组件通过 getNearestDateTimeIndex 选择最近的合法项，再启动弹簧动画移动到该项
 */
export const getResistedTranslateY = (
  // 列表的原始垂直位移，通常由 getDragTranslateY 根据手势起点和手指移动距离计算
  translateY: number,
  listLength: number,
  itemHeight: number
) => {
  if (listLength <= 0 || itemHeight <= 0) {
    return 0
  }
  // 列表末项位移-负值
  const minTranslateY = -(listLength - 1) * itemHeight
  // 合法移动范围为：minTranslateY ≤ translateY ≤ 0，即 [minTranslateY, 0]
  // 首项边界越界-列表相对首项位置向下偏移，越过了首项边界-将原始越界距离压缩为较小的可见拉伸距离
  // 原始位移越大-虽然处理位移越大，但拉伸距离增长越小-表现为：越拉越难再移动
  if (translateY > 0) {
    return itemHeight * (1 - Math.exp(-translateY / itemHeight))
  }
  // 末项边界越界-负值-列表相对首项位置向上偏移，越过了末项边界-列表相对末项位置继续向上偏移
  if (translateY < minTranslateY) {
    // 超出末项边界的距离，始终为正数
    const overscroll = minTranslateY - translateY
    return minTranslateY - itemHeight * (1 - Math.exp(-overscroll / itemHeight))
  }
  // 当位移处于合法范围内，包括恰好位于 0 或 minTranslateY 时，不施加阻尼。正常拖动时，列表位移与原始拖动位移保持一致
  return translateY
}

/**
 * 将列表位移吸附到最近的合法项，并返回该项的索引。
 * 根据列表当前的垂直位移，计算距离当前位置最近的合法选项索引
 * 只返回索引，不直接移动列表，也不启动动画
 * 先把位移限制在列表范围内，再按行高四舍五入；
 * 空列表或非正行高时返回 0 作为兜底，此时并不表示列表中存在可选项。
 * 返回值：从 0 开始的选项索引
 * 列表首项对应位移 0；每向后移动一项，列表向上移动一行
 * 超过首项边界，截断为 0；
 * 超过末项边界，截断为 listLength - 1
 * 中间项换算并四舍五入 Math.round(-boundedTranslateY / itemHeight)
 */
export const getNearestDateTimeIndex = (
  // 列表当前的垂直位移
  translateY: number,
  listLength: number,
  itemHeight: number
) => {
  if (listLength <= 0 || itemHeight <= 0) {
    return 0
  }
  // 将位移限制在合法范围 [minTranslateY, 0]
  const minTranslateY = -(listLength - 1) * itemHeight
  // 先用 Math.min 将位移限制为不大于 0，再用 Math.max 将其限制为不小于末项位移
  const boundedTranslateY = Math.max(minTranslateY, Math.min(0, translateY))
  // 将索引限制在 [0, listLength - 1]
  return Math.max(0, Math.min(listLength - 1, Math.round(-boundedTranslateY / itemHeight)))
}
