import { describe, expect, it } from 'vitest'
import {
  getDragTranslateY,
  getNearestDateTimeIndex,
  getResistedTranslateY,
} from '@/components/form/dateTimeColumnMotion.ts'

const itemHeight = 36
const listLength = 5
const minTranslateY = -(listLength - 1) * itemHeight

describe('dateTimeColumnMotion', () => {
  it('keeps in-range movement at a one-to-one distance', () => {
    expect(getResistedTranslateY(-itemHeight * 2.25, listLength, itemHeight)).toBe(-81)
    expect(getResistedTranslateY(0, listLength, itemHeight)).toBe(0)
    expect(getResistedTranslateY(minTranslateY, listLength, itemHeight)).toBe(minTranslateY)
  })

  it('resists top and bottom overscroll while allowing visible stretch', () => {
    const topStretch = getResistedTranslateY(itemHeight, listLength, itemHeight)
    const bottomStretch = getResistedTranslateY(minTranslateY - itemHeight, listLength, itemHeight)

    expect(topStretch).toBeGreaterThan(0)
    expect(topStretch).toBeLessThan(itemHeight)
    expect(bottomStretch).toBeLessThan(minTranslateY)
    expect(bottomStretch).toBeGreaterThan(minTranslateY - itemHeight)
    expect(Math.abs(topStretch - (minTranslateY - bottomStretch))).toBeLessThan(1e-10)
    expect(getResistedTranslateY(itemHeight * 100, listLength, itemHeight)).toBeLessThanOrEqual(
      itemHeight
    )
  })

  it('supports dragging back across an edge without losing the raw pointer delta', () => {
    expect(getDragTranslateY(12, 100, 90)).toBe(2)
    expect(getResistedTranslateY(getDragTranslateY(0, 100, 90), listLength, itemHeight)).toBe(-10)
  })

  it('starts a new drag at the visible position after an interrupted spring', () => {
    const visibleTranslateY = -itemHeight * 1.4

    expect(
      Math.abs(getDragTranslateY(visibleTranslateY, 250, 250) - visibleTranslateY)
    ).toBeLessThan(1e-10)
    expect(
      Math.abs(getDragTranslateY(visibleTranslateY, 250, 260) - (visibleTranslateY + 10))
    ).toBeLessThan(1e-10)
  })

  it('snaps to the nearest legal item and clamps overscroll to the list', () => {
    expect(getNearestDateTimeIndex(-itemHeight * 1.6, listLength, itemHeight)).toBe(2)
    expect(getNearestDateTimeIndex(itemHeight * 2, listLength, itemHeight)).toBe(0)
    expect(getNearestDateTimeIndex(minTranslateY - itemHeight * 2, listLength, itemHeight)).toBe(
      listLength - 1
    )
    expect(getNearestDateTimeIndex(0, 1, itemHeight)).toBe(0)
  })
})
