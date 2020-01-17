import { ReactElement } from "react"

export interface SelectionManagerProps {
  selectedItemsNumber: number
  allItemsSelected: boolean
  collectionLabel: string
  collectionLabelPlural?: string
  buttons?: ReactElement[]
  expanded?: boolean
  onToggle?: () => void
}
