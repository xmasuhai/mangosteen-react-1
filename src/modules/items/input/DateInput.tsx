import { SvgIcon } from "@/components/SvgIcon";
import { PopUp } from "@/components/ui/PopUp";
import { genDateStr } from "@/lib/helpers/genDateStr";
import { cn } from "cn";
import { useState } from "react";

interface Props {
  className?: string
}

export const DateInput: React.FC<Props> = ({ className, }) => {
  const [currentDate,] = useState<string>(genDateStr())
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false)
  const toggleDatePicker = () => {
    setDatePickerVisible(!datePickerVisible)
  }

  return (
    <>
      <span
        onClick={toggleDatePicker}
        className={cn(
          'flex justify-start items-center gap-x-[.5em]',
          className,
        )}>
        <SvgIcon name="salary-calendar" className="grow-0 shrink-0 size-[2.5em] mx-1 pl-.5em" />
        <span className="grow-1 shrink-1 animation-rainbow text-[14px] font-mono color-[var(--vp-c-brand-next)]">
          {currentDate}
        </span>
      </span>

      <PopUp
        visible={datePickerVisible}
        onClickMask={toggleDatePicker}/>
    </>
  )
}
