import React, { PropsWithChildren } from "react"
import styled, { css } from "styled-components"
import { FunctionComponent } from "App/__deprecated__/renderer/types/function-component.interface"
import { APIFC } from "App/api-demo/models/api-fc"

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
