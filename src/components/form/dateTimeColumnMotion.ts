export const getDragTranslateY = (
  startTranslateY: number,
  startPointerY: number,
  currentPointerY: number
) => startTranslateY + currentPointerY - startPointerY

export const getResistedTranslateY = (
  translateY: number,
  listLength: number,
  itemHeight: number
) => {
  if (listLength <= 0 || itemHeight <= 0) {
    return 0
  }

  const minTranslateY = -(listLength - 1) * itemHeight
  if (translateY > 0) {
    return itemHeight * (1 - Math.exp(-translateY / itemHeight))
  }
  if (translateY < minTranslateY) {
    const overscroll = minTranslateY - translateY
    return minTranslateY - itemHeight * (1 - Math.exp(-overscroll / itemHeight))
  }
  return translateY
}

export const getNearestDateTimeIndex = (
  translateY: number,
  listLength: number,
  itemHeight: number
) => {
  if (listLength <= 0 || itemHeight <= 0) {
    return 0
  }

  const minTranslateY = -(listLength - 1) * itemHeight
  const boundedTranslateY = Math.max(minTranslateY, Math.min(0, translateY))
  return Math.max(0, Math.min(listLength - 1, Math.round(-boundedTranslateY / itemHeight)))
}
