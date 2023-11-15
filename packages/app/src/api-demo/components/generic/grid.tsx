import React, { FunctionComponent, PropsWithChildren } from "react"
import styled, { CSSProp } from "styled-components"
import { Size } from "./generic.types"

interface GridProperties extends PropsWithChildren {
  layout: {
    rows: Size[]
    columns: Size[]
    gap?: Size[]
  }
  options?: {
    fillParentHeight?: boolean
  }
}

export const Grid: FunctionComponent<GridProperties> = ({ children, layout, options }) => {
  const { rows, columns, gap } = layout
  const { fillParentHeight } = options || {}

  const mapSizes = (sizes: Size[]) => {
    return sizes.map(size => {
      if (typeof size === "number") {
        return `${size}fr`
      }
      return size
    }).join(" ")
  }

  const gridStyles: CSSProp = {
    gridTemplateRows: mapSizes(rows),
    gridTemplateColumns: mapSizes(columns),
    gap: gap ? mapSizes(gap) : "2rem",
    height: fillParentHeight ? "100%" : "auto",
  }

  return <GridWrapper style={gridStyles}>
    {children}
  </GridWrapper>
}

const GridWrapper = styled.div`
  display: grid;
`

