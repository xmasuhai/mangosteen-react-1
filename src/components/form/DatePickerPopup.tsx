import { createDateTime } from '@/lib/helpers/DateTime'
import { cn } from 'cn'
import { TouchEventHandler, useState } from 'react'

interface Props {
  className?: string
  start?: Date
  end?: Date
  value?: Date
}

export const DatePickerPopup: React.FC<Props> = ({ className, start, end, value }) => {
  const t = createDateTime()
  console.log('DatePickerPopup_______________________')
  console.log('%c⧭ t', 'color: #1d3f73', t.add(-10, 'year').format('YYYY年MM月DD日'))
  console.log('_______________________DatePickerPopup')

  const [isTouching, setIsTouching] = useState(false)
  const [lastY, setLastY] = useState(-1)
  const [translateY, setTranslateY] = useState(0)

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setIsTouching(true)
    setLastY(e.touches[0].clientY)
  }

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (e) => {
    if (!isTouching) {
      return
    }
    const currentY = e.touches[0].clientY
    const deltaY = currentY - lastY
    setTranslateY(translateY + deltaY)
    setLastY(currentY)
  }

  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const remainder = translateY % 36
    let resultY = translateY - remainder
    if (Math.abs(remainder) > 18) {
      resultY += 36 * (remainder > 0 ? 1 : -1)
    }
    setTranslateY(resultY)
    setIsTouching(false)
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={cn('date-picker-wrapper h-[50vh] overflow-clip relative', className)}>
      <div
        className={cn(
          'highlight-select-box h-[36px] w-full',
          'absolute top-[calc(50%-18px)] left-0',
          'border b-solid b-red'
        )}></div>
      <div className="picker-positioner w-full absolute top-[calc(50%-18px-180px)]">
        <ol
          style={{ transform: `translateY(${translateY}px)` }}
          className="year-picker children:(h-[36px] leading-[36px]) text-center">
          <li>2021</li>
          <li>2022</li>
          <li>2023</li>
          <li>2024</li>
          <li>2025</li>
          <li>2026</li>
          <li>2027</li>
          <li>2028</li>
          <li>2029</li>
          <li>2030</li>
          <li>2031</li>
          <li>2021</li>
          <li>2022</li>
          <li>2023</li>
          <li>2024</li>
          <li>2025</li>
          <li>2026</li>
          <li>2027</li>
          <li>2028</li>
          <li>2029</li>
          <li>2030</li>
          <li>2031</li>
        </ol>
      </div>
    </div>
  )
}
