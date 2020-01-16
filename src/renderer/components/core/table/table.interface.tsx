import { Dispatch, MouseEvent, SetStateAction } from "react"
import { RowSize } from "Renderer/components/core/table/table.elements"

export interface Column {
  size: string
  renderTemplate: ({ _index, ...row }: RowRendererProps<any>) => JSX.Element
  permanent?: boolean
  label?: string
}

export type UID = number | string

type GeneralRow = object

export interface Row extends GeneralRow {
  _uid: UID
  _group?: string | number
  _children?: Row[]
  _active?: boolean
  _selected?: boolean
  _indeterminate?: boolean
  _toggleSelection?: () => void
}

export interface GroupedRows {
  [index: string]: Row[]
}

export interface LabelsProps {
  columnsSizes: string[]
}

export interface TableColumnProps {
  indent?: string
}

export interface TableRowProps {
  size?: number
  columnsSizes: string[]
  onClick?: (e: MouseEvent) => void
  active: boolean
  selected: boolean
}

export type RowRendererProps<T extends {}> = T & {
  _parent: Row
  _active: boolean
  _selected: boolean
  _indeterminate: boolean
  _toggleSelection: () => void
  _selectMode: boolean
}

export type SidebarProps<T extends Row> = T & {
  close: () => void
}

interface TableWithSelecting {
  selectedRows?: UID[]
  onSelect?: Dispatch<SetStateAction<UID[]>>
  nativeAllSelector?: boolean
}

interface TableWithSidebar {
  activeRow?: UID
  onRowActivate?: (rowUID?: UID) => void
  sidebarRenderer?: (props: SidebarProps<any>) => JSX.Element
}

interface TableStyles {
  mainRowsSize?: RowSize
}

export interface TableComponentProps
  extends TableWithSelecting,
    TableWithSidebar,
    TableStyles {
  rows: Row[]
  columns: Column[]
}
