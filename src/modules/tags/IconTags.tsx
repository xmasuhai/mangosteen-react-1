import type { TabKind } from "@/global";
import { cn } from "cn";

interface Props {
  className?: string
  kind: TabKind
}

export const IconTags: React.FC<Props> = ({ className, kind }) => {
  console.log('IconTags %c⧭ kind', 'color: #007300', kind);
  const tags = Array.from({ length: 99 }, (_, i) => i + 1)
  return (
    <div className={cn(className) }>
      <ol className={cn(
        'grid place-items-center justify-center grid-cols-[repeat(auto-fit,3em)]',
        'py-1em px-.5em gap-x-[2em] gap-y-[1em]'
      )}>
        {tags.map(tag => (
          <li
            key={tag}
            className={cn(
            'size-3em flex items-center justify-center',
            ' b-1 b-solid b-red '
          )}>
            🤣
          </li>
        ))}

      </ol>
    </div>
  )
}