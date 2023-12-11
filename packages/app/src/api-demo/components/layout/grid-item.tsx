/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "App/api-demo/models/api-fc.types"

interface Placement {
  row: number
  column: number
  width: number
  height: number
}

interface GridItemProperties {
  placement: Placement
}

export const GridItem: APIFC<GridItemProperties> = ({
  children,
  parameters,
  ...props
}) => {
  const { placement } = parameters
  return (
    <GridItemWrapper {...placement} {...props}>
      {children}
    </GridItemWrapper>
  )
}

const GridItemWrapper = styled.div<Placement>`
  width: 100%;
  height: 100%;
  background-color: #efa7a7;
  ${({ row, column, width, height }) => {
    return css`
      grid-row-start: ${row};
      grid-row-end: ${row + height};
      grid-column-start: ${column};
      grid-column-end: ${column + width};
    `
  }}
`
