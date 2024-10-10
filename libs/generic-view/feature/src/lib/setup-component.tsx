/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  ComponentType,
  CSSProperties,
  ReactElement,
  useMemo,
} from "react"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import {
  selectActiveApiDeviceId,
  selectComponentConfig,
  selectComponentData,
  selectComponentDataProvider,
  selectComponentExtra,
  selectComponentLayout,
  selectEntitiesData,
  selectEntitiesIdFieldKey,
  selectEntityData,
  useFormField,
} from "generic-view/store"
import {
  dataProviderFilter,
  dataProviderSort,
  mapLayoutSizes,
  RecursiveComponent,
  useViewFormContext,
} from "generic-view/utils"
import {
  DataProviderField,
  EntityData,
  ExtraConfig,
  Layout,
} from "device/models"
import {
  cloneDeep,
  flatten,
  get,
  isArray,
  isNumber,
  isObject,
  isString,
  map,
  set,
} from "lodash"
import { Tooltip, Paragraph5 } from "generic-view/ui"

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
    const getFormContext = useViewFormContext()

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
    const extra = useSelector((state: ReduxRootState) => {
      return selectComponentExtra(state, { viewKey, componentKey })
    })
    const componentData = useSelector((state: ReduxRootState) => {
      if (dataProvider) return
      return selectComponentData(state, { viewKey, componentKey })
    })
    const formDataV2 = useFormField({
      formName:
        dataProvider?.source === "form-fields-v2"
          ? dataProvider.formName
          : undefined,
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

    const extraData: ExtraConfig = {}

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
        for (const fieldConfig of dataProvider.fields) {
          const { componentField, providerField, ...config } = fieldConfig
          const value = processFormFields(
            config,
            get(entityData, providerField)
          )
          if (isString(value) && componentField === "dataItemId") {
            dataItemId = value
            continue
          }
          if (componentField.startsWith("extra-data.")) {
            const extraPropsKey = componentField.replace(/^extra-data\./, "")
            set(extraData, extraPropsKey, value)
            continue
          }
          set(editableProps || {}, componentField, value)
        }
      }
    } else if (dataProvider?.source === "form-fields") {
      const formContext = getFormContext(dataProvider.formKey)
      const isFormElement = componentName!.startsWith("form.")

      for (const fieldConfig of dataProvider.fields) {
        const { componentField, providerField, ...config } = fieldConfig
        const fieldValue = isFormElement
          ? formContext.getValues(providerField)
          : formContext.watch(providerField)
        const value = processFormFields(config, fieldValue)

        if (isString(value) && componentField === "dataItemId") {
          dataItemId = value
          continue
        }
        set(editableProps || {}, componentField, value)
      }
    } else if (dataProvider?.source === "form-fields-v2") {
      for (const fieldConfig of dataProvider.fields) {
        const { componentField, providerField, ...config } = fieldConfig
        const value = processFormFields(
          config,
          formDataV2.getField(providerField)
        )
        if (isString(value) && componentField === "dataItemId") {
          dataItemId = value
          continue
        }
        set(editableProps || {}, componentField, value)
      }
    }
    const editablePropsDependency = JSON.stringify(editableProps)
    const layoutDependency = JSON.stringify(layout)
    const styleDependency = JSON.stringify(style)
    const dataProviderDependency = JSON.stringify(dataProvider)
    const formDataV2Dependency = JSON.stringify(formDataV2)

    const styles = useMemo(() => {
      return setupStyles(style, layout)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layoutDependency, styleDependency])

    return useMemo(() => {
      const componentElement = (
        <Component
          {...(editableProps as P)}
          viewKey={viewKey}
          componentKey={componentKey}
          style={styles}
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

      let innerContentComponent

      if (extra?.tooltip?.contentText) {
        innerContentComponent = (
          <Paragraph5>{extra?.tooltip.contentText}</Paragraph5>
        )
      }

      if (extraData.tooltip?.contentList) {
        innerContentComponent = (
          <>
            {extraData.tooltip?.contentList?.map((content) => (
              <Paragraph5 key={content}>{content}</Paragraph5>
            ))}
          </>
        )
      }

      return extra?.tooltip ? (
        <Tooltip
          placement={extra.tooltip.placement}
          offset={extra.tooltip.offset}
        >
          <Tooltip.Anchor>{componentElement}</Tooltip.Anchor>
          <Tooltip.Content $defaultStyles>
            {innerContentComponent}
          </Tooltip.Content>
        </Tooltip>
      ) : (
        componentElement
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      children,
      className,
      componentKey,
      viewKey,
      componentName,
      dataItemId,
      editablePropsDependency,
      dataProviderDependency,
      styles,
      formDataV2Dependency,
    ])
  }
}

function flattenListByKey<T>(list: T[], key: string): unknown {
  return flatten(map(list, (item) => get(item, key, [])))
}

const processFormFields = (
  field: Partial<DataProviderField>,
  value: unknown
) => {
  let newValue = value
  if ("slice" in field && field.slice !== undefined && value instanceof Array) {
    newValue =
      field.slice.length > 1
        ? value.slice(...field.slice)
        : value.slice(field.slice[0])
  }
  if ("flat" in field && field.flat !== undefined && value instanceof Array) {
    newValue = flattenListByKey(newValue as unknown[], field.flat)
  }

  if ("modifier" in field) {
    switch (field.modifier) {
      case "length":
        if (isString(newValue) || isArray(newValue)) {
          newValue = newValue.length
        } else if (isObject(value)) {
          newValue = Object.keys(value).length
        }
        break
      case "boolean":
        newValue = Boolean(value)
        break
    }
  }
  if ("condition" in field) {
    switch (field.condition) {
      case "eq":
        newValue = newValue === field.value
        break
      case "ne":
        newValue = newValue !== field.value
        break
      case "gt":
        if (isNumber(newValue) && isNumber(field.value)) {
          newValue = newValue > field.value
        }
        break
      case "lt":
        if (isNumber(newValue) && isNumber(field.value)) {
          newValue = newValue < field.value
        }
        break
    }
  }
  return newValue
}

const setupStyles = (style?: CSSProperties, layout?: Layout) => {
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
