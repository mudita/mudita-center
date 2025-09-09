/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { FunctionComponent, PropsWithChildren, useMemo } from "react"
import styled from "styled-components"

export interface TableCellProps extends PropsWithChildren {
  colSpan?: number
  rowSpan?: number
  width?: number | string
  dataItemId?: string
  as?: string
}

export const TableCell: FunctionComponent<TableCellProps> = ({
  children,
  colSpan,
  rowSpan,
  width,
  ...props
}) => {
  const propsDependencies = JSON.stringify(props)
  const configDependencies = JSON.stringify({ colSpan, rowSpan, width })
  return useMemo(
    () => {
      return (
        <Cell {...props} colSpan={colSpan} rowSpan={rowSpan} $width={width}>
          {children}
        </Cell>
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, configDependencies, propsDependencies]
  )
}

export const Cell = styled.td<{
  $width?: number | string
}>`
  --cell-width: ${({ $width }) => {
    return $width !== undefined
      ? isNaN(Number($width))
        ? $width
        : `${$width}px`
      : "auto"
  }};

  width: var(--cell-width);
  max-width: var(--cell-width);
  min-width: var(--cell-width);
  overflow: hidden;

  > p,
  > p * {
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
`
