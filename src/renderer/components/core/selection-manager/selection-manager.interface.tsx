import { ChangeEvent, ReactElement } from "react"

export interface SelectionManagerProps {
  selectedItemsNumber: number
  allItemsSelected: boolean
  messageId: string
  buttons?: ReactElement[]
  enlarged?: boolean
  onToggle?: (e?: ChangeEvent) => void
}
