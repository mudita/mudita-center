/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, ReactElement } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  selectActiveApiDeviceId,
  selectComponentData,
  selectComponentDataProvider,
  selectComponentSecondaryDataProvider,
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
import { cloneDeep, get, set } from "lodash"
import {
  ComponentPropsByName,
  dataFilter,
  dataSearch,
  dataSort,
  useViewFormContext,
} from "generic-view/utils"
import { processField } from "./process-field"
import logger from "Core/__deprecated__/main/utils/logger"

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
  secondaryDataProvider?: boolean
}

export const ComponentWithData: FunctionComponent<Props> = ({
  children,
  viewKey,
  componentKey,
  componentName,
  dataItemId,
  config,
  secondaryDataProvider,
}) => {
  const dataProvider = useSelector((state: ReduxRootState) => {
    return secondaryDataProvider
      ? selectComponentSecondaryDataProvider(state, { viewKey, componentKey })
      : selectComponentDataProvider(state, { viewKey, componentKey })
  })

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
> = ({ children, dataProvider, config, ...rest }) => {
  const formContext = useViewFormContext()
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
  if (!idFieldKey) {
    logger.error(
      `Missing 'idFieldKey' for entities type ${dataProvider.entitiesType}.`
    )
    return undefined
  }

  const filteredData = dataFilter(
    [...(entitiesData || [])],
    dataProvider.filters
  )
  const sortedData = dataSort([...filteredData], dataProvider.sort)
  const searchedData = dataProvider.search
    ? dataSearch(formContext)([...sortedData], dataProvider.search)
    : sortedData
  const data = searchedData
    ? searchedData
        .slice(0, dataProvider.limit || searchedData.length)
        ?.map((item) => item[idFieldKey])
    : undefined

  if (dataProvider.fields) {
    const childrenProps = cloneDeep({
      data,
      config,
    })
    for (const fieldConfig of dataProvider.fields) {
      const { componentField, ...config } = fieldConfig
      const value = processField(config, data)
      set(childrenProps, componentField, value)
    }
    return children({ ...childrenProps, ...rest })
  }
  return children({ data, config, ...rest })
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
    set(childrenProps, componentField, value)
  }

  return children({ ...childrenProps, ...rest })
}
