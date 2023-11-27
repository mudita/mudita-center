/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import styled, { css } from "styled-components"
import { APIFC } from "App/api-demo/models/api-fc.types"

type Size = number | string

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
