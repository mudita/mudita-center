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
import { DataProviderExtendedField, EntityData, Layout } from "device/models"
import { cloneDeep, set } from "lodash"
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
    const config = useSelector((state: ReduxRootState) => {
      return selectComponentConfig(state, { viewKey, componentKey })
    })
    const dataProvider = useSelector((state: ReduxRootState) => {
      return selectComponentDataProvider(state, { viewKey, componentKey })
    })
    const componentData = useSelector((state: ReduxRootState) => {
      if (dataProvider) return
      return selectComponentData(state, { viewKey, componentKey })
    })
    const entitiesData =
      useSelector((state: ReduxRootState) => {
        if (dataProvider?.source !== "entities-array") return
        return selectEntitiesData(state, {
          entitiesType: dataProvider.entitiesType,
          deviceId,
        }) as EntityData[]
      }) || []
    const idFieldKey = useSelector((state: ReduxRootState) => {
      if (dataProvider?.source !== "entities-array") return
      return selectEntitiesIdFieldKey(state, {
        deviceId,
        entitiesType: dataProvider.entitiesType!,
      })
    })
    const entityData = useSelector((state: ReduxRootState) => {
      if (dataProvider?.source !== "entities-field") return
      return selectEntityData(state, {
        entitiesType: dataProvider.entitiesType,
        entityId: dataItemId!,
        deviceId,
      }) as EntityData
    })

    const editableProps = cloneDeep({
      ...dataProps,
      config,
      data: componentData,
    })

    if (dataProvider?.source === "entities-array") {
      const filteredData = dataProviderFilter(
        [...entitiesData],
        dataProvider.filters
      )
      const sortedData = dataProviderSort([...filteredData], dataProvider.sort)
      editableProps.data = sortedData?.map((item) => item[idFieldKey!])
    } else if (dataProvider?.source === "entities-field") {
      if (entityData) {
        for (const [key, field] of Object.entries(dataProvider.fields)) {
          if (typeof field === "string") {
            const value = entityData[field]
            set(editableProps || {}, key, value)
          } else {
            const value = processFormFields(field, entityData[field.field])
            set(editableProps || {}, key, value)
          }
        }
      }
    } else if (dataProvider?.source === "form-fields") {
      for (const [key, field] of Object.entries(dataProvider.fields)) {
        if (typeof field === "string") {
          const value = formContext.watch(field)
          if (key === "dataItemId") {
            dataItemId = value
            continue
          }
          set(editableProps || {}, key, value)
        } else {
          const value = processFormFields(field, formContext.watch(field.field))
          set(editableProps || {}, key, value)
        }
      }
    }
    const editablePropsDependency = JSON.stringify(editableProps)
    const layoutDependency = JSON.stringify(layout)
    const dataProviderDependency = JSON.stringify(dataProvider)

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

const processFormFields = (
  field: DataProviderExtendedField,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
) => {
  let newValue = value
  switch (field.modifier) {
    case "length":
      newValue = value.length
      break
    case "boolean":
      newValue = Boolean(value)
      break
  }
  switch (field.condition) {
    case "eq":
      newValue = newValue === field.value
      break
    case "ne":
      newValue = newValue !== field.value
      break
    case "gt":
      newValue = newValue > field.value
      break
    case "lt":
      newValue = newValue < field.value
      break
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newValue
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
