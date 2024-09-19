/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType, ReactElement, useMemo } from "react"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import styled, { css } from "styled-components"
import { useSelector } from "react-redux"
import {
  selectActiveApiDeviceId,
  selectComponentConfig,
  selectComponentData,
  selectComponentDataProvider,
  selectComponentLayout,
  selectEntitiesData,
  selectEntitiesIdFieldKey,
  selectEntityData,
} from "generic-view/store"
import {
  dataProviderFilter,
  dataProviderSort,
  mapLayoutSizes,
  RecursiveComponent,
} from "generic-view/utils"
import { EntityData, Layout } from "device/models"
import { set } from "lodash"
import { useFormContext } from "react-hook-form"

export const setupComponent = <P extends object>(
  Component: ComponentType<P>
): RecursiveComponent => {
  return ({ children, ...props }) => {
    const {
      viewKey,
      componentKey,
      style,
      className,
      componentName,
      ...dataProps
    } = props
    const deviceId = useSelector(selectActiveApiDeviceId)!
    const formContext = useFormContext()
    let dataItemId = props.dataItemId

    const layout = useSelector((state: ReduxRootState) => {
      return selectComponentLayout(state, { viewKey, componentKey })
    })
    const layoutDependency = JSON.stringify(layout)

    const config = useSelector((state: ReduxRootState) => {
      return selectComponentConfig(state, { viewKey, componentKey })
    })

    const dataProvider = useSelector((state: ReduxRootState) => {
      return selectComponentDataProvider(state, { viewKey, componentKey })
    })
    const dataProviderDependency = JSON.stringify(dataProvider)
    const editableProps = {
      ...dataProps,
      config: {
        ...config,
      },
      data: undefined as unknown,
    }

    if (!dataProvider) {
      editableProps.data = useSelector((state: ReduxRootState) => {
        return selectComponentData(state, { viewKey, componentKey })
      })
    } else if (dataProvider?.source === "entities-array") {
      const rawData =
        (useSelector((state: ReduxRootState) => {
          return selectEntitiesData(state, {
            entitiesType: dataProvider.entitiesType!,
            deviceId,
          })
        }) as EntityData[]) || []
      const idFieldKey = useSelector((state: ReduxRootState) => {
        return selectEntitiesIdFieldKey(state, {
          deviceId,
          entitiesType: dataProvider.entitiesType!,
        })
      })

      const filteredData = dataProviderFilter(
        [...rawData],
        dataProvider.filters
      )
      const sortedData = dataProviderSort([...filteredData], dataProvider.sort)

      editableProps.data = sortedData?.map((item) => {
        return item[idFieldKey!]
      })
    } else if (dataProvider?.source === "entities-field") {
      const item = useSelector((state: ReduxRootState) => {
        return selectEntityData(state, {
          entitiesType: dataProvider.entitiesType!,
          entityId: dataItemId!,
          deviceId,
        })
      }) as EntityData
      if (item) {
        for (const [key, field] of Object.entries(dataProvider.fields)) {
          const value = item[field]
          if (value === undefined) continue
          set(editableProps || {}, key, value)
        }
      }
    } else if (dataProvider?.source === "form-fields") {
      for (const [key, field] of Object.entries(dataProvider.fields)) {
        const value = formContext.getValues(field)
        if (value === undefined) continue
        if (key === "dataItemId") {
          dataItemId = value
          continue
        }
        set(editableProps, key, value)
      }
    }
    const editablePropsDependency = JSON.stringify(editableProps)

    return useMemo(() => {
      const ComponentWithProps = () => (
        <Component
          {...(editableProps as P)}
          viewKey={viewKey}
          componentKey={componentKey}
          style={style}
          className={className}
          dataItemId={dataItemId}
          componentName={componentName}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null
            return React.cloneElement(child as ReactElement, {
              dataItemId,
            })
          })}
        </Component>
      )

      if (layout) {
        return (
          <Wrapper $layout={layout}>
            <ComponentWithProps />
          </Wrapper>
        )
      }
      return <ComponentWithProps />
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      children,
      style,
      className,
      componentKey,
      viewKey,
      componentName,
      dataItemId,
      layoutDependency,
      editablePropsDependency,
      dataProviderDependency,
    ])
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
    justifyItems: $layout.gridLayout.justifyItems,
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
