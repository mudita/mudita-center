import { ChangeEvent, ReactElement } from "react"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"
import { Message } from "Renderer/interfaces/message.interface"

export interface SelectionManagerProps {
  checkboxSize?: Size
  selectedItemsNumber: number
  allItemsSelected?: boolean
  message: Message
  buttons?: Array<false | ReactElement>
  enlarged?: boolean
  onToggle?: (e?: ChangeEvent) => void
}
