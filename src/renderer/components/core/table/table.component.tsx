import React from "react"
import {
  TableProps,
  TableRowProps,
} from "Renderer/components/core/table/table.interface"
import {
  getTextStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

/* Row */
export enum RowSize {
  Big = 9,
  Medium = 6.4,
  Small = 4.8,
  Tiny = 4,
}

const activeRowStyles = css`
  border-right: solid 0.4rem ${borderColor("intense")};
`

const selectedRowStyles = css`
  ${activeRowStyles};
  background-color: ${backgroundColor("accent")};
`

const clickableRowStyles = css`
  cursor: pointer;
`

export const Row = styled.div<TableRowProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--columnsTemplate);
  align-items: center;
  height: ${({ size }) => size || RowSize.Medium}rem;
  border-bottom: solid 0.1rem ${borderColor("listItem")};

  &:hover {
    background-color: ${backgroundColor("accent")};
  }

  ${({ active }) => active && activeRowStyles};
  ${({ selected }) => selected && selectedRowStyles};
  ${({ onClick }) => onClick && clickableRowStyles};
`

/* Column */
export const Col = styled.div<{ hideable?: boolean }>`
  ${getTextStyles(TextDisplayStyle.MediumText)};
  display: flex;
  align-items: center;
  ${({ hideable }) => hideable && `display: none;`};
`

/* Labels */
const rowLabelStyles = css`
  padding: 0;
  z-index: 1;
  ${Col} {
    ${getTextStyles(TextDisplayStyle.LargeBoldText)};
    line-height: 1.1;
  }
`

const columnLabelStyles = css`
  z-index: 2;
  ${Col} {
    ${getTextStyles(TextDisplayStyle.SmallFadedText)};
    color: ${textColor("placeholder")};
    text-transform: uppercase;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    line-height: 1.2;
  }
`

export const Labels = styled(Row)`
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${backgroundColor("grey5")} !important;
`

/* Group */
export const Group = styled.div`
  position: relative;

  ${Labels} {
    ${rowLabelStyles};
  }
`

export const NestedGroup = styled.div<{ level?: number }>`
  position: relative;
  ${Row} > ${Col} {
    &:nth-child(1) {
      border-left: solid transparent calc(${({ level }) =>
        level || 1} * var(--nestSize));
    }
  }
`

const TableComponent = styled.div<{ sidebarOpened?: boolean }>`
  --nestSize: 4rem;
  --columnsTemplate: repeat(auto-fit, minmax(0, 1fr));
  position: relative;

  & > ${Labels} {
    ${columnLabelStyles};
  }

  ${({ sidebarOpened }) =>
    sidebarOpened
      ? css`
          --columnsTemplate: var(--columnsTemplateWithOpenedSidebar) !important;
        `
      : css`
          ${Col} {
            display: flex;
          }
        `};
`

const Table: FunctionComponent<TableProps> = ({
  className,
  children,
  sidebarOpened,
}) => {
  return (
    <TableComponent className={className} sidebarOpened={sidebarOpened}>
      {children}
    </TableComponent>
  )
}

export default Table
