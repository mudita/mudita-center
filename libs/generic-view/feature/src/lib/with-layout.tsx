/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import styled, { css } from "styled-components"
import { useSelector } from "react-redux"
import { selectComponentLayout } from "generic-view/store"
import { Layout, mapLayoutSizes, RecursiveComponent } from "generic-view/utils"

export const withLayout = <P extends object>(
  Component: ComponentType<P>
): RecursiveComponent => {
  return (props) => {
    const { viewKey, componentKey } = props
    const layout = useSelector((state: ReduxRootState) => {
      return selectComponentLayout(state, { viewKey, componentKey })
    })
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

const wrapperStyles = css<{
  $layout: Pick<
    Layout,
    "flexPlacement" | "gridPlacement" | "margin" | "padding"
  >
}>(({ $layout }) => ({
  ...($layout.gridPlacement && {
    gridRow: $layout.gridPlacement.row,
    gridColumn: $layout.gridPlacement.column,
    gridRowEnd: $layout.gridPlacement.row + $layout.gridPlacement.height,
    gridColumnEnd: $layout.gridPlacement.column + $layout.gridPlacement.width,
  }),
  ...($layout.flexPlacement && {
    flexGrow: $layout.flexPlacement.grow,
    flexBasis: $layout.flexPlacement.basis,
    flexShrink: $layout.flexPlacement.shrink,
    alignSelf: $layout.flexPlacement.alignSelf,
    order: $layout.flexPlacement.order,
  }),
  ...($layout.margin && {
    margin: $layout.margin,
  }),
  ...($layout.padding && {
    padding: $layout.padding,
  }),
}))

const childStyles = css<{
  $layout: Pick<Layout, "flexLayout" | "gridLayout">
}>(({ $layout }) => ({
  ...($layout.gridLayout && {
    display: "grid",
    gridTemplateRows: mapLayoutSizes($layout.gridLayout.rows),
    gridTemplateColumns: mapLayoutSizes($layout.gridLayout.columns),
    rowGap: $layout.gridLayout.rowGap || 0,
    columnGap: $layout.gridLayout.columnGap || 0,
    justifyContent: $layout.gridLayout.justifyContent,
    alignItems: $layout.gridLayout.alignItems,
  }),
  ...($layout.flexLayout && {
    display: "flex",
    flexDirection: $layout.flexLayout.direction,
    justifyContent: $layout.flexLayout.justifyContent,
    alignItems: $layout.flexLayout.alignItems,
    flexWrap: $layout.flexLayout.wrap,
    rowGap: $layout.flexLayout.rowGap || 0,
    columnGap: $layout.flexLayout.columnGap || 0,
  }),
}))

const Wrapper = styled.div<{ $layout: Layout }>`
  ${wrapperStyles};

  > * {
    width: 100%;
    height: 100%;
    ${childStyles};
  }
`
