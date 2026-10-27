import { SvgIcon } from "@/components/SvgIcon"
import { cn } from "cn"

export const AddItemFloatButton: React.FC = () => {
  return (
    <button
      className={cn(
        'w-56px h-56px p-4px',
        'bg-[var(--button-primary-color)] rounded-full b-1 b-solid b-[contrast-color(var(--button-primary-color))] ',
        'text-[var(--button-primary-text-color)]',
        'text-center flex place-content-center place-items-center-safe',
        'fixed bottom-.5em right-.5em',
      )}>
      <span className="hidden">Add</span>

      <SvgIcon name="add" className="size-[2em]" />

    </button>
  )
}
