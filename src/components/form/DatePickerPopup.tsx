import { cn } from 'cn'
import { TouchEventHandler, useState } from 'react'

interface Props {
  className?: string
}

export const DatePickerPopup: React.FC<Props> = ({/* className, */}) => {
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

    console.log('onTouchMove_______________________')
    console.log('%c⧭ deltaY', 'color: #0f2913', deltaY)
    console.log('_______________________onTouchMove')
    setLastY(currentY)
  }
  const onTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const remainder = translateY % 36
    if (Math.abs(remainder) < 18) {
      setTranslateY(translateY - remainder)
    } else {
      setTranslateY(translateY + 36 * (remainder > 0 ? 1 : -1) - remainder)
    }
    setIsTouching(false)
  }

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className="date-picker-wrapper h-[50vh] overflow-clip relative">
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
