import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import { DateTimeColumn } from '@/components/form/DateTimeColumn'

const dateTimeList = ['1', '2', '3', '4', '5']

describe('DateTimeColumn', () => {
  it('initially aligns the selected item using the default item height', () => {
    const markup = renderToStaticMarkup(
      createElement(DateTimeColumn, {
        className: 'custom-column',
        dateTimeValue: '3',
        dateTimeList,
        onChange: vi.fn(),
      })
    )

    expect(markup).toContain('translate3d(0, -72px, 0)')
    expect(markup).toContain('--date-item-height:36px')
    expect(markup).toContain('--half-date-item-height:18px')
    expect(markup).toContain('custom-column')
    expect(markup.match(/<li\b/g)).toHaveLength(dateTimeList.length)
  })

  it('uses the custom item height for both layout and initial position', () => {
    const markup = renderToStaticMarkup(
      createElement(DateTimeColumn, {
        dateItemHeight: 40,
        dateTimeValue: '5',
        dateTimeList,
        onChange: vi.fn(),
      })
    )

    expect(markup).toContain('translate3d(0, -160px, 0)')
    expect(markup).toContain('--date-item-height:40px')
    expect(markup).toContain('--half-date-item-height:20px')
  })

  it('rejects a selected value that is missing from the list', () => {
    expect(() =>
      renderToStaticMarkup(
        createElement(DateTimeColumn, {
          dateTimeValue: '6',
          dateTimeList,
          onChange: vi.fn(),
        })
      )
    ).toThrow('dateTimeValue is not in dateTimeList')
  })
})
