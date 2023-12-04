/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import styled from "styled-components"
import { Layout, PrimitiveValue } from "./layout.types"
import { APIFC } from "../../models/api-fc.types"

export const withLayout = <P extends object>(
  Component: ComponentType<P>
): APIFC<P, unknown, { layout?: Layout }> => {
  return ({ layout, ...props }) => {
    if (layout) {
      return (
        <Wrapper $layout={layout}>
          <Component {...(props as P)} />
        </Wrapper>
      )
    }
    return <Component {...(props as P)} />
  }
}

const Wrapper = styled.div<{ $layout: Layout }>(
  ({
    $layout: {
      gridLayout,
      gridPlacement,
      flexLayout,
      flexPlacement,
      margin,
      padding,
    },
  }) => ({
    ...(gridLayout && {
      display: "grid",
      gridTemplateRows: mapSizes(gridLayout.rows),
      gridTemplateColumns: mapSizes(gridLayout.columns),
      rowGap: gridLayout.rowGap || 0,
      columnGap: gridLayout.columnGap || 0,
    }),
    ...(gridPlacement && {
      gridRow: gridPlacement.row,
      gridColumn: gridPlacement.column,
      gridRowEnd: gridPlacement.row + gridPlacement.height,
      gridColumnEnd: gridPlacement.column + gridPlacement.width,
    }),
    ...(flexLayout && {
      display: "flex",
      flexDirection: flexLayout.direction,
      justifyContent: flexLayout.justifyContent,
      alignItems: flexLayout.alignItems,
      flexWrap: flexLayout.wrap,
      rowGap: flexLayout.rowGap || 0,
      columnGap: flexLayout.columnGap || 0,
    }),
    ...(flexPlacement && {
      flexGrow: flexPlacement.grow,
      flexBasis: flexPlacement.basis,
      flexShrink: flexPlacement.shrink,
      alignSelf: flexPlacement.alignSelf,
      order: flexPlacement.order,
    }),
    margin,
    padding,
  })
)

const mapSizes = (sizes: PrimitiveValue[]) => {
  return sizes
    .map((size) => {
      if (typeof size === "number") {
        return `${size}fr`
      }
      return size
    })
    .join(" ")
}
