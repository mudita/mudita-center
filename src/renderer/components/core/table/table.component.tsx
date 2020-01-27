import React from "react"
import { TableRowProps } from "Renderer/components/core/table/table.interface"
import {
  getTextStyles,
  TextDisplayStyle,
} from "Renderer/components/core/text/text.component"
import {
  backgroundColor,
  borderColor,
} from "Renderer/styles/theming/theme-getters"
import FunctionComponent from "Renderer/types/function-component.interface"
import styled, { css } from "styled-components"

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

export const TableCol = styled.div``

export enum RowSize {
  Big = 9,
  Medium = 6.4,
  Small = 4.8,
  Tiny = 4,
}

export const TableRow = styled.div<TableRowProps>`
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

export const NestedRows = styled.div<{ level?: number }>`
  position: relative;
  ${TableRow} > ${TableCol} {
    &:first-of-type {
      border-left: solid transparent calc(${({ level }) =>
        level || 1} * var(--nestSize));
    }
  }
`

export const TableLabels = styled(TableRow)`
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${backgroundColor("light")};

  ${TableCol} {
    ${getTextStyles(TextDisplayStyle.SmallText)};
    opacity: 0.35;
    text-transform: uppercase;
    padding: 1.5rem 0;
    line-height: 1.2;
  }
`

const TableWrapper = styled.div`
  --nestSize: 2rem;
  --columnsTemplate: repeat(auto-fit, minmax(0, 1fr));
  position: relative;
`

const Table: FunctionComponent = ({ className, children }) => {
  return <TableWrapper className={className}>{children}</TableWrapper>
}

export default Table
