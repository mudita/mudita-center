import { RowSize } from "Renderer/components/core/table/table.component"

export interface TableRowProps {
  size?: RowSize
  active?: boolean
  selected?: boolean
}

export interface TableProps {
  sidebarOpened?: boolean
}
