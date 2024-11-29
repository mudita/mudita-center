/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, {
  cloneElement,
  FunctionComponent,
  isValidElement,
  ReactElement,
  useCallback,
  useMemo,
} from "react"
import { useSelector, useStore } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import apiComponents from "generic-view/ui"
import { APIFC } from "generic-view/utils"
import {
  selectComponentChildrenKeys,
  selectComponentName,
} from "generic-view/store"
import logger from "Core/__deprecated__/main/utils/logger"
import {
  ComponentWithConfig,
  ComponentWithData,
  ComponentWithLayout,
} from "./setup-component"
import { merge } from "lodash"

interface Properties {
  viewKey: string
  componentKey: string
  dataItemId?: string
}

export const RecursiveLayout: FunctionComponent<Properties> = (
  recursiveComponentMetadata
) => {
  const { viewKey, componentKey } = recursiveComponentMetadata
  const store = useStore<ReduxRootState>()
  const componentName = useSelector((state: ReduxRootState) => {
    return selectComponentName(state, { viewKey, componentKey })
  })
  const childrenKeys = useSelector((state: ReduxRootState) => {
    return selectComponentChildrenKeys(state, { viewKey, componentKey })
  }) as string[] | undefined

  const children = useMemo(() => {
    return childrenKeys?.map((key) => {
      return <RecursiveLayout key={key} viewKey={viewKey} componentKey={key} />
    })
  }, [childrenKeys, viewKey])

  const ComponentToRender = useMemo(() => {
    if (!componentName) {
      return null
    }
    if (!(componentName in apiComponents)) {
      logger.error(
        `Tried to render unknown component "${componentName}" in view "${viewKey}"`
      )
      return null
    }
    return apiComponents[componentName as keyof typeof apiComponents] as APIFC<
      unknown,
      unknown
    >
  }, [componentName, viewKey])

  const renderChildren = useCallback(
    (dataItemId?: string) => {
      return React.Children.map(children, (child) => {
        if (child && isValidElement(child as ReactElement)) {
          const childComponentName = selectComponentName(store.getState(), {
            viewKey: child.props.viewKey,
            componentKey: child.props.componentKey,
          })
          return cloneElement(child, {
            dataItemId,
            componentName: childComponentName,
          })
        }
        return null
      })
    },
    [children, store]
  )

  return useMemo(() => {
    if (!ComponentToRender) {
      return null
    }
    return (
      <ComponentWithLayout viewKey={viewKey} componentKey={componentKey}>
        {({ style }) => {
          return (
            <ComponentWithConfig viewKey={viewKey} componentKey={componentKey}>
              {({ config }) => {
                return (
                  <ComponentWithData
                    config={config}
                    viewKey={viewKey}
                    componentKey={componentKey}
                    componentName={componentName}
                    dataItemId={recursiveComponentMetadata.dataItemId}
                    secondaryDataProvider
                  >
                    {(secondaryDataProps) => {
                      return (
                        <ComponentWithData
                          config={config}
                          viewKey={viewKey}
                          componentKey={componentKey}
                          componentName={componentName}
                          dataItemId={recursiveComponentMetadata.dataItemId}
                        >
                          {(dataProps) => {
                            const props = merge(
                              {},
                              dataProps,
                              secondaryDataProps
                            )
                            const dataItemId =
                              props.dataItemId ||
                              recursiveComponentMetadata.dataItemId

                            const key = `${viewKey}-${componentKey}-${dataItemId}`
                            return (
                              <ComponentToRender
                                key={key}
                                viewKey={viewKey}
                                componentKey={componentKey}
                                componentName={componentName}
                                style={style}
                                config={props.config}
                                data={props.data}
                                dataItemId={dataItemId}
                              >
                                {renderChildren(dataItemId)}
                              </ComponentToRender>
                            )
                          }}
                        </ComponentWithData>
                      )
                    }}
                  </ComponentWithData>
                )
              }}
            </ComponentWithConfig>
          )
        }}
      </ComponentWithLayout>
    )
  }, [
    ComponentToRender,
    componentKey,
    componentName,
    recursiveComponentMetadata,
    renderChildren,
    viewKey,
  ])
}
