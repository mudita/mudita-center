import {
  LabelsProps,
  TableColumnProps,
  TableRowProps,
} from "Renderer/components/core/table/table.interface"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import styled, { css } from "styled-components"

/* Const helpers */
const labelHeight = 4.8

/* Table data parts */
export enum RowSize {
  Tiny = 4,
  Small = 4.8,
  Medium = 6.4,
  Big = 9,
}

export const rowSizes = [
  RowSize.Big,
  RowSize.Medium,
  RowSize.Small,
  RowSize.Tiny,
]

export const TableRow = styled.div<TableRowProps>`
  display: grid;
  height: ${({ size }) =>
    size ? `${size}rem` : `${rowSizes[RowSize.Medium]}rem`};
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

  ${({ columnsSizes }) => `grid-template-columns: ${columnsSizes.join(" ")}`};

  ${({ active }) =>
    active &&
    css`
      background-color: ${backgroundColor("accent")};
      border-right: solid 0.5rem ${borderColor("intense")};
    `};

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${backgroundColor("accent")};
    `};
`

export const TableRowLabel = styled.div`
  position: sticky;
  z-index: 2;
  top: 0;
  display: block;
  background-color: ${backgroundColor("grey5")};
  border-bottom: solid 0.1rem ${borderColor("light")};

  span {
    display: block;
    padding-top: 2em;
    padding-bottom: 1em;
  }
`

export const TableGroup = styled.div`
  position: relative;
`

/* Table header parts */
export const TableLabel = styled.div`
  text-transform: uppercase;
`

export const TableLabels = styled.div<LabelsProps>`
  grid-area: Labels;
  display: grid;
  grid-auto-columns: auto;
  grid-auto-flow: column;
  height: var(--label-height);
  align-items: center;
  margin-top: -0.1rem;
  border-bottom: solid 0.1rem ${borderColor("light")};
  background-color: ${backgroundColor("grey5")};

  ${({ columnsSizes }) => `grid-template-columns: ${columnsSizes.join(" ")}`};
`

export const TableColumn = styled.div<TableColumnProps>`
  ${({ indent }) =>
    indent &&
    css`
      border-left: solid ${indent} transparent;
    `};
`

/* Main parts */
export const TableData = styled.main`
  grid-area: Data;
  overflow-x: hidden;
  overflow-y: overlay;
`

export const TableSidebar = styled.aside<{
  colsLabelsAvailable: boolean
  rowsLabelsAvailable: boolean
}>`
  grid-area: Sidebar;
  width: var(--sidebar-width);
  position: relative;
  border-left: solid 0.1rem ${borderColor("light")};

  ${({ colsLabelsAvailable }) =>
    colsLabelsAvailable &&
    css`
      &:before {
        content: "";
        display: block;
        height: var(--label-height);
        width: calc(100% + 0.1rem);
        margin: -0.1rem 0 0 -0.1rem;
        border-bottom: solid 0.1rem ${borderColor("light")};
        background-color: ${backgroundColor("grey5")};
      }
    `};

  ${({ rowsLabelsAvailable }) =>
    rowsLabelsAvailable &&
    css`
      &:before {
        content: "";
        display: block;
        height: calc(var(--label-height) + 0.1rem);
        width: calc(100% + 0.3rem);
        margin: -0.1rem 0 0 -0.3rem;
        border-bottom: solid 0.1rem ${borderColor("light")};
        background-color: ${backgroundColor("grey5")};
      }
    `};
`

/* Main wrapper */
export const TableWrapper = styled.section<{
  sidebarOpened: boolean
  colsLabelsAvailable: boolean
  rowsLabelsAvailable: boolean
}>`
  display: grid;
  grid-template-areas:
    ${({ colsLabelsAvailable }) => colsLabelsAvailable && `"Labels Sidebar"`}
    "Data Sidebar";
  grid-template-rows: auto ${({ colsLabelsAvailable }) =>
      colsLabelsAvailable && "auto"} 1fr;
  grid-template-columns: 1fr auto;
  overflow: hidden;
  --sidebar-width: 62rem;
  --label-height: ${labelHeight}rem;
`
