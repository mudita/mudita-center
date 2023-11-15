import React, { FunctionComponent, PropsWithChildren } from "react"
import styled, { CSSProp } from "styled-components"

interface GridItemProperties extends PropsWithChildren {
  placement: {
    row: number
    column: number
    width: number
    height: number
  }
}

export const GridItem: FunctionComponent<GridItemProperties> = ({ children, placement }) => {
  const { row, column, width, height } = placement
  const style: CSSProp = {
    gridRowStart: row,
    gridRowEnd: row + height,
    gridColumnStart: column,
    gridColumnEnd: column + width,
  }

  return <GridItemWrapper style={style}>
    {children}
  </GridItemWrapper>
}

const GridItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`
