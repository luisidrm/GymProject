import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { EllipsisVertical, IterationCw } from "lucide-react"

export function ContextMenuDemo({resetMonth}) {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="ml-5">
        <EllipsisVertical/>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 ">
        <ContextMenuItem inset onClick={resetMonth}>
          <IterationCw className="mr-2"/>
          Restablecer Mes
        </ContextMenuItem>
        </ContextMenuContent>
    </ContextMenu>
  )
}
