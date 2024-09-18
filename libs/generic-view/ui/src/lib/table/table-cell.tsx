/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { APIFC } from "generic-view/utils"
import { TableCellConfig } from "generic-view/models"
import styled from "styled-components"

export const TableCell: APIFC<undefined, TableCellConfig> = ({
  children,
  config,
  data,
  ...props
}) => {
  const propsDependencies = JSON.stringify(props)
  const configDependencies = JSON.stringify(config)
  return useMemo(
    () => {
      return (
        <Cell
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
  $width: number
}>`
  min-width: ${({ $width }) => $width}px;
  max-width: ${({ $width }) => $width}px;
  overflow: hidden;
`
