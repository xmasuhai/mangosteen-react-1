import { describe, expect, it, vi } from 'vitest'
import {
  createDateTimeColumnMotionController,
  type DateTimeColumnMotionState,
} from '@/components/form/dateTimeColumnMotionController'

type ControllerOptions = Parameters<typeof createDateTimeColumnMotionController>[0]
type SelectionOptions = Pick<
  ControllerOptions,
  'currentDateIndex' | 'dateItemHeight' | 'dateTimeList' | 'onChange'
>

const createHarness = (initialTranslateY = -72) => {
  let translateY = initialTranslateY
  let selection: SelectionOptions = {
    currentDateIndex: 2,
    dateItemHeight: 36,
    dateTimeList: ['1', '2', '3', '4', '5'],
    onChange: vi.fn(),
  }
  const state: DateTimeColumnMotionState = {
    gesture: null,
    settlingTarget: null,
    observedIndex: null,
  }
  const animation = {
    get: vi.fn(() => translateY),
    stop: vi.fn(),
    set: vi.fn((y: number) => {
      translateY = y
    }),
    start: vi.fn<ControllerOptions['animation']['start']>(),
  }
  const render = (updates: Partial<SelectionOptions> = {}) => {
    selection = { ...selection, ...updates }
    return createDateTimeColumnMotionController({ ...selection, getState: () => state, animation })
  }

  return { motion: render(), render, state, animation, onChange: selection.onChange }
}

describe('dateTimeColumnMotionController', () => {
  it('aligns the external selection when idle without changing the selected value', () => {
    const { motion, animation, onChange } = createHarness()

    motion.syncSelection()

    expect(animation.start).toHaveBeenCalledExactlyOnceWith({ y: -72 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('ignores move, end and cancel calls without an active gesture', () => {
    const { motion, animation, onChange } = createHarness()

    motion.drag(120)
    motion.endDrag()
    motion.cancelDrag()

    expect(animation.get).not.toHaveBeenCalled()
    expect(animation.set).not.toHaveBeenCalled()
    expect(animation.start).not.toHaveBeenCalled()
    expect(onChange).not.toHaveBeenCalled()
  })

  it('only synchronizes when the selected index changes, not on ordinary renders or dimension changes', () => {
    const { motion, render, animation } = createHarness()
    motion.syncSelection()
    animation.start.mockClear()

    render().syncSelection()
    render({ dateItemHeight: 40 }).syncSelection()
    render({ dateTimeList: ['1', '2', '3', '4', '5', '6'] }).syncSelection()
    expect(animation.start).not.toHaveBeenCalled()

    render({ currentDateIndex: 1 }).syncSelection()
    expect(animation.start).toHaveBeenCalledExactlyOnceWith({ y: -40 })
  })

  it('does not replay a selection update that was skipped while dragging', () => {
    const { motion, render, animation } = createHarness()
    motion.syncSelection()
    motion.startDrag(100)
    const updatedMotion = render({ currentDateIndex: 1 })
    updatedMotion.syncSelection()
    updatedMotion.endDrag()
    animation.start.mockClear()

    render().syncSelection()

    expect(animation.start).not.toHaveBeenCalled()
  })

  it('stops the animation before recording its visible position as the gesture origin', () => {
    const { motion, state, animation } = createHarness(-61)
    state.settlingTarget = { index: 3, itemHeight: 36, listLength: 5 }

    motion.startDrag(100)
    motion.drag(120)
    motion.drag(90)

    expect(animation.stop).toHaveBeenCalledOnce()
    expect(animation.stop.mock.invocationCallOrder[0]).toBeLessThan(
      animation.get.mock.invocationCallOrder[0]!
    )
    expect(animation.set.mock.calls).toEqual([[-61], [-41], [-71]])
    expect(state.gesture).toEqual({ pointerY: 100, translateY: -61 })
    expect(state.settlingTarget).toBeNull()
  })

  it.each([
    { origin: 0, direction: 1 },
    { origin: -144, direction: -1 },
  ])(
    'resists overscroll and preserves the origin when dragging back from $origin',
    ({ origin, direction }) => {
      const { motion, animation } = createHarness(origin)
      motion.startDrag(100)

      motion.drag(100 + direction * 72)
      expect(animation.get()).toBeCloseTo(origin + direction * 36 * (1 - Math.exp(-2)), 10)

      motion.drag(100 + direction * 36)
      expect(animation.get()).toBeCloseTo(origin + direction * 36 * (1 - Math.exp(-1)), 10)

      motion.drag(100 - direction * 36)
      expect(animation.get()).toBe(origin - direction * 36)
    }
  )

  it.each([
    { translateY: 20, index: 0, value: '1' },
    { translateY: -54, index: 2, value: '3' },
    { translateY: -180, index: 4, value: '5' },
  ])(
    'settles from $translateY to index $index and immediately notifies the selection',
    ({ translateY, index, value }) => {
      const { motion, state, animation, onChange } = createHarness(translateY)
      motion.startDrag(100)

      motion.endDrag()
      motion.endDrag()

      expect(state.gesture).toBeNull()
      expect(state.settlingTarget).toEqual({ index, itemHeight: 36, listLength: 5 })
      expect(animation.start).toHaveBeenCalledExactlyOnceWith({
        y: index * -36,
        config: { tension: 300, friction: 18 },
        onRest: expect.any(Function),
      })
      expect(onChange).toHaveBeenCalledExactlyOnceWith(value)
    }
  )

  it('cancels the gesture by returning to the controlled value without emitting a change', () => {
    const { motion, state, animation, onChange } = createHarness()
    motion.startDrag(100)
    motion.drag(140)

    motion.cancelDrag()
    motion.endDrag()

    expect(state.gesture).toBeNull()
    expect(animation.start).toHaveBeenCalledExactlyOnceWith({ y: -72 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('keeps gesture state across renders while using the latest dimensions, list and callback', () => {
    const { motion, render, state, animation, onChange } = createHarness()
    motion.startDrag(100)
    const latestOnChange = vi.fn()
    const updatedMotion = render({
      currentDateIndex: 0,
      dateItemHeight: 40,
      dateTimeList: ['a', 'b', 'c'],
      onChange: latestOnChange,
    })

    updatedMotion.syncSelection()
    expect(animation.start).not.toHaveBeenCalled()
    updatedMotion.drag(120)
    updatedMotion.endDrag()

    expect(animation.get()).toBe(-52)
    expect(state.settlingTarget).toEqual({ index: 1, itemHeight: 40, listLength: 3 })
    expect(animation.start).toHaveBeenCalledWith(expect.objectContaining({ y: -40 }))
    expect(latestOnChange).toHaveBeenCalledExactlyOnceWith('b')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('cancels to the latest controlled selection after a render during dragging', () => {
    const { motion, render, animation } = createHarness()
    motion.startDrag(100)

    render({ currentDateIndex: 1, dateItemHeight: 40 }).cancelDrag()

    expect(animation.start).toHaveBeenCalledExactlyOnceWith({ y: -40 })
  })

  it('does not replace the settling animation when the parent confirms its target', () => {
    const { motion, render, state, animation } = createHarness(-104)
    motion.startDrag(100)
    motion.endDrag()
    const target = state.settlingTarget
    animation.start.mockClear()

    render({ currentDateIndex: 3 }).syncSelection()

    expect(animation.start).not.toHaveBeenCalled()
    expect(state.settlingTarget).toBe(target)
  })

  it.each([
    { updates: { currentDateIndex: 3 }, expectedY: -108 },
    { updates: { dateItemHeight: 40 }, expectedY: -80 },
    { updates: { dateTimeList: ['1', '2', '3', '4', '5', '6'] }, expectedY: -72 },
  ])('replaces a stale settling target when synchronizing $updates', ({ updates, expectedY }) => {
    const { motion, render, state, animation } = createHarness()
    motion.startDrag(100)
    motion.endDrag()
    animation.start.mockClear()

    render(updates).syncSelection()

    expect(state.settlingTarget).toBeNull()
    expect(animation.start).toHaveBeenCalledExactlyOnceWith({ y: expectedY })
  })

  it('prevents an interrupted animation callback from clearing a newer settling target', () => {
    const { motion, render, state, animation, onChange } = createHarness()
    motion.startDrag(100)
    motion.drag(60)
    motion.endDrag()
    const oldOnRest = animation.start.mock.calls[0]![0].onRest!

    const updatedMotion = render()
    updatedMotion.startDrag(100)
    updatedMotion.drag(140)
    updatedMotion.endDrag()
    const newTarget = state.settlingTarget
    const newOnRest = animation.start.mock.calls[1]![0].onRest!

    oldOnRest()
    expect(state.settlingTarget).toBe(newTarget)
    newOnRest()
    expect(state.settlingTarget).toBeNull()
    expect(onChange).toHaveBeenCalledTimes(2)
  })
})
