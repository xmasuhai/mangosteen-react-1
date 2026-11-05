import { SvgIcon } from "@/components/SvgIcon";
import { useNumpadButtons } from "@/modules/items/input/useNumpadButtons.tsx";
import { cn } from "cn";
import s from './Numpad.module.scss'

interface Props {
  className?: string
}

export const Numpad: React.FC<Props> = ({ /* className, */ }) => {
  const numberSizeClass = (text: string) =>
  (/[0-9|dot]/g.test(text)
    ? cn('text-18px')
    : '')
  const { numpadButtons } = useNumpadButtons()

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(4,1fr)] grid-rows-[repeat(4,56px)]',
        'where:(bg-[var(--pad-border-color)]) gap-1px p-t-1px',
      )}
      style={{
        'gridTemplateAreas': `
          'btn_1 btn_2 btn_3 btn_clear'
          'btn_4 btn_5 btn_6 btn_backspace'
          'btn_7 btn_8 btn_9 btn_submit'
          'btn_0 btn_0 btn_dot btn_submit'
          `,
      }}>
      {numpadButtons.map((buttonItem) => (
        <button
          type="button"
          key={buttonItem.text}
          data-btn-text={`btn_${buttonItem.id}`}
          onClick={buttonItem.onClick}
          style={{
            'gridArea': `btn_${buttonItem.id}`,
          }}
          className={cn(
            'flex justify-center items-center font-bold',
            'bg-[var(--pad-button-bg-color)] b-unset',
            buttonItem?.extraClass,
            numberSizeClass(buttonItem.text),
            s['button-item'],
          )}>
          {buttonItem.hasIcon ? <SvgIcon name={buttonItem.iconName} /> : buttonItem.text}
        </button>
      ))}
    </div>
  )
}
