/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { CSSProperties, FunctionComponent, ReactElement, useMemo } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectComponentLayout } from "generic-view/store"
import { Layout } from "device/models"
import { mapLayoutSizes } from "generic-view/utils"

interface Props {
  children: (props: { style: CSSProperties | undefined }) => ReactElement
  viewKey: string
  componentKey: string
}

export const ComponentWithLayout: FunctionComponent<Props> = ({
  children,
  viewKey,
  componentKey,
}) => {
  const layout = useSelector((state: ReduxRootState) => {
    return selectComponentLayout(state, { viewKey, componentKey })
  })
  const layoutDependency = JSON.stringify(layout)

  const style = useMemo(() => {
    return setupStyles(undefined, layout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutDependency])

  const styleDependency = JSON.stringify(style)

  return useMemo(() => {
    return children({ style })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [styleDependency, viewKey, componentKey])
}

const setupStyles = (style?: CSSProperties, layout?: Layout): CSSProperties => {
  return {
    ...style,
    ...(layout?.gridPlacement && {
      gridRow: layout.gridPlacement.row,
      gridColumn: layout.gridPlacement.column,
      gridRowEnd: layout.gridPlacement.row + layout.gridPlacement.height,
      gridColumnEnd: layout.gridPlacement.column + layout.gridPlacement.width,
    }),
    ...(layout?.flexPlacement && {
      flexGrow: layout.flexPlacement.grow,
      flexBasis: layout.flexPlacement.basis,
      flexShrink: layout.flexPlacement.shrink,
      alignSelf: layout.flexPlacement.alignSelf,
      order: layout.flexPlacement.order,
    }),
    ...(layout?.margin && {
      margin: layout.margin,
    }),
    ...(layout?.padding && {
      padding: layout.padding,
    }),
    ...(layout?.width && {
      width: layout.width,
    }),
    ...(layout?.height && {
      height: layout.height,
    }),
    ...(layout?.overflow && {
      overflow: layout.overflow,
    }),
    ...(layout?.shadow && {
      boxShadow: "0 0.2rem 3rem 0 rgba(0, 0, 0, 0.08)",
    }),
    ...(layout?.flexLayout && {
      display: "flex",
      flexDirection: layout.flexLayout.direction,
      justifyContent: layout.flexLayout.justifyContent,
      alignItems: layout.flexLayout.alignItems,
      flexWrap: layout.flexLayout.wrap,
      rowGap: layout.flexLayout.rowGap || 0,
      columnGap: layout.flexLayout.columnGap || 0,
    }),
    ...(layout?.gridLayout && {
      display: "grid",
      gridTemplateRows: mapLayoutSizes(layout.gridLayout.rows),
      gridTemplateColumns: mapLayoutSizes(layout.gridLayout.columns),
      rowGap: layout.gridLayout.rowGap || 0,
      columnGap: layout.gridLayout.columnGap || 0,
      justifyContent: layout.gridLayout.justifyContent,
      alignItems: layout.gridLayout.alignItems,
      justifyItems: layout.gridLayout.justifyItems,
    }),
  }
}
