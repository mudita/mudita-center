/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { APIFC } from "generic-view/utils"
import { TableCellConfig } from "generic-view/models"
import styled from "styled-components"
import { TableTestIds } from "e2e-test-ids"

export const TableCell: APIFC<undefined, TableCellConfig> = ({
  children,
  config = {},
  data,
  ...props
}) => {
  const propsDependencies = JSON.stringify(props)
  const configDependencies = JSON.stringify(config)
  return useMemo(
    () => {
      return (
        <Cell
          data-testid={TableTestIds.TableCell}
          {...props}
          colSpan={config.colSpan}
          rowSpan={config.rowSpan}
          $width={config.width}
        >
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
