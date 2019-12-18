import { MouseEvent } from "react"
import {
  LabelsLayout,
  RowSize,
} from "Renderer/components/core/table/table.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

/* Main wrapper */
export const TableWrapper = styled.section`
  display: grid;
  grid-template-areas:
    "Header Header"
    "Data Sidebar";
  grid-template-rows: auto auto;
  grid-template-columns: 1fr auto;
  max-height: 100vh;
`

/* Main parts */
export const TableHeader = styled.header`
  grid-area: Header;
  border-bottom: solid 0.1rem ${borderColor("light")};
`

export const TableData = styled.main`
  grid-area: Data;
  overflow: auto;
`

export const TableSidebar = styled.aside`
  grid-area: Sidebar;
  border-left: solid 0.1rem ${borderColor("light")};
`

/* Table data parts */
export const TableRow = styled.div<{
  size?: RowSize
  onClick?: (e: MouseEvent) => void
}>`
  height: ${({ size }) => (size ? `${size}rem` : `${RowSize.Medium}rem`)};
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("light")};
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${backgroundColor("accent")};
  }

  /* Adds pointer cursor if whole row is clickable */
  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `};
`

/* Table header parts */
export const TableLabels = styled.div<{ layout?: LabelsLayout }>`
  display: grid;

  ${({ layout }) => layout};
`
