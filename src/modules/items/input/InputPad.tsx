import { AmountNumberOutput } from "@/modules/items/input/AmountNumberOutput";
import { DateInput } from "@/modules/items/input/DateInput";
import { Numpad } from "@/modules/items/input/Numpad";
import { cn } from "cn";

interface Props {
  className?: string
}

export const InputPad: React.FC<Props> = ({ /* className, */ }) => {

  return (
    <>
      {/* 日期输入、金额显示 */}
      <div className={cn(
        'flex justify-between items-center',
        'min-h-69px p-t-15px p-b-1em b-t-[var(--pad-border-color)] b-t-1',
      )}>
        <DateInput />
        <AmountNumberOutput className="mr-4" />
      </div>
      {/* 数字键盘 */}
      <Numpad />
    </>
  )
}
