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
  borderRadius,
  textColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

/* Row */
export enum RowSize {
  Big,
  Medium,
  Small,
  Tiny,
}

const selectedRowStyles = css`
  background-color: ${backgroundColor("accent")};
`

const activeRowStyles = css`
  ${selectedRowStyles};

  &:after {
    content: "";
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    width: 0.3rem;
    height: 100%;
    background-color: ${backgroundColor("blue")};
    border-radius: ${borderRadius("small")};
  }
`

const clickableRowStyles = css`
  cursor: pointer;
`

export const Row = styled.div<TableRowProps>`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: var(--columnsTemplate);
  grid-column-gap: var(--columnsGap);
  align-items: center;
  position: relative;
  box-sizing: border-box;
  border-bottom: solid 0.1rem ${borderColor("listItem")};

  height: ${({ size }) => {
    switch (size) {
      case RowSize.Big:
        return 9
      case RowSize.Small:
        return 4.8
      case RowSize.Tiny:
        return 4
      default:
        return 6.4
    }
  }}rem;

  &:hover {
    background-color: ${backgroundColor("accent")};
  }

  ${({ active }) => active && activeRowStyles};
  ${({ selected }) => selected && selectedRowStyles};
  ${({ onClick }) => onClick && clickableRowStyles};
`

/* Column */
export const Col = styled.div`
  ${getTextStyles(TextDisplayStyle.MediumText)};
  display: flex;
  align-items: center;
  :first-of-type {
    padding-left: var(--columnsGap);
  }
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

const TableComponent = styled.div<
  Pick<TableProps, "hideColumns" | "hideableColumnsIndexes">
>`
  --nestSize: 4rem;
  --columnsTemplate: repeat(auto-fit, minmax(0, 1fr));
  --columnsGap: 2rem;
  position: relative;

  & > ${Labels} {
    ${columnLabelStyles};
  }

  ${({ hideColumns, hideableColumnsIndexes = [] }) =>
    hideColumns &&
    css`
      --columnsTemplate: var(--columnsTemplateWithOpenedSidebar) !important;

      ${Col} {
        ${hideableColumnsIndexes.map(
          column => `&:nth-of-type(${column + 1}) { display: none; }`
        )};
      }
    `};
`

/* Default empty state */
export const EmptyState = styled(Row)`
  ${Col} {
    ${getTextStyles(TextDisplayStyle.MediumFadedText)};
    font-style: italic;
  }
`

const Table: FunctionComponent<TableProps> = ({
  className,
  children,
  hideColumns,
  hideableColumnsIndexes,
}) => {
  return (
    <TableComponent
      className={className}
      hideColumns={hideColumns}
      hideableColumnsIndexes={hideableColumnsIndexes}
    >
      {children}
    </TableComponent>
  )
}

export default Table
