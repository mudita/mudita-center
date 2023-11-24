import React from "react"
import styled, { css } from "styled-components"
import { Size } from "./generic.types"
import { APIFC } from "App/api-demo/models/api-fc"

interface Layout {
  rows: Size[]
  columns: Size[]
  gap?: Size[]
}

interface GridProperties {
  layout: Layout
  options?: {
    fillParentHeight?: boolean
  }
}

const mapSizes = (sizes: Size[]) => {
  return sizes
    .map((size) => {
      if (typeof size === "number") {
        return `${size}fr`
      }
      return size
    })
    .join(" ")
}

export const Grid: APIFC<GridProperties> = ({
  children,
  parameters,
  ...props
}) => {
  const { layout, options } = parameters

  return (
    <GridWrapper
      fillParentHeight={!!options?.fillParentHeight}
      {...layout}
      {...props}
    >
      {children}
    </GridWrapper>
  )
}

const GridWrapper = styled.div<Layout & { fillParentHeight: boolean }>`
  display: grid;
  ${({ rows, columns, gap, fillParentHeight }) => {
    return css`
      grid-template-rows: ${mapSizes(rows)};
      grid-template-columns: ${mapSizes(columns)};
      gap: ${gap ? mapSizes(gap) : "2rem"};
      height: ${fillParentHeight ? "100%" : "auto"};
    `
  }}
`
