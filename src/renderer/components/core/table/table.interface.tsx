import { RowSize } from "Renderer/components/core/table/table.component"
import { ReactNode } from "react"

export interface TableRowProps {
  size?: RowSize
  active?: boolean
  selected?: boolean
}

export interface SidebarProps {
  show?: boolean
  onClose?: () => void
  headerLeft?: ReactNode
  headerRight?: ReactNode
  appColorSidebarHeader?: boolean
}

export interface TableProps {
  hideColumns?: boolean
  hideableColumnsIndexes?: number[]
  sidebar?: ReactNode
  scrollable?: boolean
}
