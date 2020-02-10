import { ChangeEvent, ReactElement } from "react"
import { Size } from "Renderer/components/core/input-checkbox/input-checkbox.component"

export interface SelectionManagerProps {
  checkboxSize?: Size
  selectedItemsNumber: number
  allItemsSelected: boolean
  messageId: string
  buttons?: ReactElement[]
  enlarged?: boolean
  onToggle?: (e?: ChangeEvent) => void
}
