import { DatePickerPopup } from '@/components/form/DatePickerPopup'
import { SvgIcon } from '@/components/SvgIcon'
import { usePopup } from '@/hooks/usePopup'
import { genDateStr } from '@/lib/helpers/genDateStr'
import { cn } from 'cn'
import { useState } from 'react'

interface Props {
  className?: string
}

export const DateInput: React.FC<Props> = ({ className }) => {
  const [currentDate] = useState<string>(genDateStr())

  const { portalPopup, togglePopup } = usePopup(<DatePickerPopup />, true)

  return (
    <>
      {portalPopup}
      <span
        onClick={togglePopup}
        className={cn('flex justify-start items-center gap-x-[.5em] pr-1em', className)}>
        <SvgIcon name="salary-calendar" className="grow-0 shrink-0 size-[2.5em] mx-1 pl-.5em" />
        <time
          dateTime={currentDate}
          className="grow-1 shrink-1 animation-rainbow text-[14px] font-mono color-[var(--vp-c-brand-next)]">
          {currentDate}
        </time>
      </span>
    </>
  )
}
