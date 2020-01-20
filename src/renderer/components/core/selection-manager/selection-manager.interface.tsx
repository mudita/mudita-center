import { ReactElement } from "react"

export interface SelectionManagerProps {
  selectedItemsNumber: number
  allItemsSelected: boolean
  messageId: string
  buttons?: ReactElement[]
  expanded?: boolean
  onToggle?: () => void
}
