/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { APIFC } from "generic-view/utils"
import { TableCellConfig } from "generic-view/models"
import styled from "styled-components"

export const TableCell: APIFC<undefined, TableCellConfig> = ({
  children,
  config,
  data,
  ...props
}) => {
  return (
    <Cell
      {...props}
      width={config?.width}
      colSpan={config?.colSpan}
      rowSpan={config?.rowSpan}
    >
      {children}
    </Cell>
  )
}

export const Cell = styled.td``
