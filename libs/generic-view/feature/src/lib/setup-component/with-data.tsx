/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, ReactElement, useMemo } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  selectActiveApiDeviceId,
  selectComponentData,
  selectComponentDataProvider,
  selectEntitiesData,
  selectEntitiesIdFieldKey,
  selectEntitiesMetadata,
  selectEntityData,
} from "generic-view/store"
import {
  EntitiesArrayConfig,
  EntitiesFieldConfig,
  EntitiesMetadataConfig,
  EntityData,
  FormFieldsConfig,
} from "device/models"
import { cloneDeep, get, isString, set } from "lodash"
import {
  ComponentPropsByName,
  dataFilter,
  dataSort,
  useViewFormContext,
} from "generic-view/utils"
import { processField } from "./process-field"

interface Props {
  config?: ComponentPropsByName["config"]
  viewKey: string
  componentKey: string
  componentName?: string
  dataItemId?: string
  children: (props: {
    data: unknown
    config?: ComponentPropsByName["config"]
    dataItemId?: string
    componentName?: string
  }) => ReactElement
}

export const ComponentWithData: FunctionComponent<Props> = ({
  children,
  viewKey,
  componentKey,
  componentName,
  dataItemId,
  config,
}) => {
  const dataProvider = useSelector((state: ReduxRootState) => {
    return selectComponentDataProvider(state, { viewKey, componentKey })
  })
  const dataProviderDependency = JSON.stringify(dataProvider)
  const configDependency = JSON.stringify(config)

  return useMemo(() => {
    switch (dataProvider?.source) {
      case "entities-metadata":
        return (
          <EntitiesMetadataDataProvider
            viewKey={viewKey}
            componentKey={componentKey}
            dataProvider={dataProvider}
            config={config}
          >
            {children}
          </EntitiesMetadataDataProvider>
        )
      case "entities-array":
        return (
          <EntitiesArrayDataProvider
            viewKey={viewKey}
            componentKey={componentKey}
            dataProvider={dataProvider}
            config={config}
          >
            {children}
          </EntitiesArrayDataProvider>
        )
      case "entities-field":
        return dataItemId ? (
          <EntitiesFieldDataProvider
            viewKey={viewKey}
            componentKey={componentKey}
            dataProvider={dataProvider}
            config={config}
            dataItemId={dataItemId}
          >
            {children}
          </EntitiesFieldDataProvider>
        ) : null
      case "form-fields":
        return (
          <FormFieldsDataProvider
            viewKey={viewKey}
            componentKey={componentKey}
            componentName={componentName}
            dataProvider={dataProvider}
            config={config}
            dataItemId={dataItemId}
          >
            {children}
          </FormFieldsDataProvider>
        )
      default:
        return (
          <DefaultDataProvider
            viewKey={viewKey}
            componentKey={componentKey}
            componentName={componentName}
            dataItemId={dataItemId}
            config={config}
          >
            {children}
          </DefaultDataProvider>
        )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    componentKey,
    componentName,
    dataItemId,
    viewKey,
    dataProviderDependency,
    configDependency,
  ])
}

const DefaultDataProvider: FunctionComponent<Props> = ({
  children,
  viewKey,
  componentKey,
  ...rest
}) => {
  const componentData = useSelector((state: ReduxRootState) => {
    return selectComponentData(state, { viewKey, componentKey })
  })
  return children({ data: componentData, ...rest })
}

const EntitiesMetadataDataProvider: FunctionComponent<
  Props & { dataProvider: EntitiesMetadataConfig }
> = ({ children, dataProvider, config, dataItemId, ...rest }) => {
  const deviceId = useSelector(selectActiveApiDeviceId)!
  const entitiesMetadata = useSelector((state: ReduxRootState) => {
    return selectEntitiesMetadata(state, {
      entitiesType: dataProvider.entitiesType,
      deviceId,
    })
  })
  const childrenProps = cloneDeep({
    data: {},
    config,
    dataItemId,
  })

  for (const fieldConfig of dataProvider.fields) {
    const { componentField, providerField, ...config } = fieldConfig
    const fieldValue = get(entitiesMetadata, providerField)
    const value = processField(config, fieldValue)

    set(childrenProps, componentField, value)
  }

  return children({ ...childrenProps, ...rest })
}

const EntitiesArrayDataProvider: FunctionComponent<
  Props & { dataProvider: EntitiesArrayConfig }
> = ({ children, dataProvider, ...rest }) => {
  const deviceId = useSelector(selectActiveApiDeviceId)!
  const idFieldKey = useSelector((state: ReduxRootState) => {
    return selectEntitiesIdFieldKey(state, {
      entitiesType: dataProvider.entitiesType,
      deviceId,
    })
  })
  const entitiesData = useSelector((state: ReduxRootState) => {
    return selectEntitiesData(state, {
      entitiesType: dataProvider.entitiesType,
      deviceId,
    })
  })

  const filteredData = dataFilter(
    [...(entitiesData || [])],
    dataProvider.filters
  )
  const sortedData = dataSort([...filteredData], dataProvider.sort)
  const data = sortedData?.map((item) => item[idFieldKey!])
  return children({ data, ...rest })
}

const EntitiesFieldDataProvider: FunctionComponent<
  Props & { dataProvider: EntitiesFieldConfig; dataItemId: string }
> = ({ children, dataProvider, config, dataItemId, ...rest }) => {
  const deviceId = useSelector(selectActiveApiDeviceId)!
  const entityData = useSelector((state: ReduxRootState) => {
    return selectEntityData(state, {
      entitiesType: dataProvider.entitiesType,
      entityId: dataItemId,
      deviceId,
    }) as EntityData
  })

  const childrenProps = cloneDeep({
    data: {},
    config,
    dataItemId,
  })

  for (const fieldConfig of dataProvider.fields) {
    const { componentField, providerField, ...config } = fieldConfig
    const value = processField(config, get(entityData, providerField))
    if (isString(value) && componentField === "dataItemId") {
      dataItemId = value
      continue
    }
    set(childrenProps, componentField, value)
  }

  return children({ ...childrenProps, ...rest })
}

const FormFieldsDataProvider: FunctionComponent<
  Props & { dataProvider: FormFieldsConfig }
> = ({
  children,
  dataProvider,
  componentName,
  config,
  dataItemId,
  ...rest
}) => {
  const getFormContext = useViewFormContext()

  const childrenProps = cloneDeep({
    data: {},
    config,
    dataItemId,
  })

  const formContext = getFormContext(dataProvider.formKey)
  const isFormElement = componentName!.startsWith("form.")

  for (const fieldConfig of dataProvider.fields) {
    const { componentField, providerField, ...config } = fieldConfig
    const fieldValue = isFormElement
      ? formContext.getValues(providerField)
      : formContext.watch(providerField)
    const value = processField(config, fieldValue)

    if (isString(value) && componentField === "dataItemId") {
      childrenProps.dataItemId = value
      continue
    }
    set(childrenProps, componentField, value)
  }
  return children({ ...childrenProps, ...rest })
}
