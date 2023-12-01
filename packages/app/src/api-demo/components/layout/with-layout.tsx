/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType, CSSProperties } from "react"
import { Layout, PrimitiveValue } from "./layout.types"
import { APIFC } from "../../models/api-fc.types"

export const withLayout = <P extends object>(
  Component: ComponentType<P>
): APIFC<P, {}, { layout?: Layout }> => {
  return ({ layout, ...props }) => {
    let styles: CSSProperties = {}

    if (layout?.gridLayout) {
      const { rows, columns, rowGap = 0, columnGap = 0 } = layout.gridLayout
      styles = {
        display: "grid",
        gridTemplateRows: mapSizes(rows),
        gridTemplateColumns: mapSizes(columns),
        gap: mapSizes([rowGap, columnGap]),
        ...styles,
      }
    }

    if (layout?.flexLayout) {
      const { rowGap = 0, columnGap = 0, ...flexLayout } = layout.flexLayout
      styles = {
        display: "flex",
        flexDirection: flexLayout.direction,
        justifyContent: flexLayout.justifyContent,
        alignItems: flexLayout.alignItems,
        flexWrap: flexLayout.wrap,
        gap: mapSizes([rowGap, columnGap]),
        ...styles,
      }
    }

    if (layout?.flexPlacement) {
      const { alignSelf, grow, shrink, order, basis } = layout.flexPlacement
      styles = {
        flexGrow: grow,
        flexBasis: basis,
        flexShrink: shrink,
        alignSelf,
        order,
        ...styles,
      }
    }

    if (layout?.gridPlacement) {
      const { row, column, width, height } = layout.gridPlacement
      styles = {
        gridRow: row,
        gridColumn: column,
        gridRowEnd: row + height,
        gridColumnEnd: column + width,
        ...styles,
      }
    }

    if (layout?.margin) {
      styles = {
        margin: layout.margin,
        ...styles,
      }
    }

    if (layout?.padding) {
      styles = {
        padding: layout.padding,
        ...styles,
      }
    }

    return <Component {...(props as P)} style={styles} />
  }
}

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
