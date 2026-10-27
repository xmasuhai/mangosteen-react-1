import { cn } from "cn"
import add from '@/assets/icons/add.svg'

export const AddItemFloatButton: React.FC = () => {

  return (
    <button
      className={cn(
        'w-56px h-56px',
        'bg-[var(--button-primary-color)] rounded-full',
        'text-[var(--button-primary-text-color)] text-6xl',
        'p-4px text-center flex place-content-center place-items-center-safe',
        'fixed bottom-.5em right-.5em',
      )}>
      <span className="hidden">Add</span>

      <svg max-w="80%" max-h="80%" fill="white" translate-y="-2px">
        <use xlinkHref="#add" />
      </svg>

      {/* <img src={add} alt="add" max-w="80%" max-h="80%" translate-y="-3px" /> */}
    </button>
  )
}
