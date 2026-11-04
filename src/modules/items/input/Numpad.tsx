import { cn } from "cn";

interface Props {
  className?: string
}

export const Numpad: React.FC<Props> = ({ /* className, */ }) => {

  return (
    <div
      className={cn(
        'grid grid-cols-[repeat(4,1fr)] grid-rows-[repeat(4,56px)]',
        'bg-[var(--pad-border-color)] gap-1px p-t-1px',
      )}>
      Numpad
    </div>
  )
}