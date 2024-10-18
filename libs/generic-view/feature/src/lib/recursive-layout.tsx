/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { FunctionComponent } from "Core/core/types/function-component.interface"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import apiComponents from "generic-view/ui"
import { APIFC } from "generic-view/utils"
import {
  selectComponentChildrenKeys,
  selectComponentName,
} from "generic-view/store"
import { setupComponent } from "./setup-component"
import logger from "Core/__deprecated__/main/utils/logger"

interface Properties {
  viewKey: string
  componentKey: string
  dataItemId?: string
}

export const RecursiveLayout: FunctionComponent<Properties> = (
  recursiveComponentMetadata
) => {
  const { viewKey, componentKey } = recursiveComponentMetadata
  const componentName = useSelector((state: ReduxRootState) => {
    return selectComponentName(state, { viewKey, componentKey })
  })
  const childrenKeys = useSelector((state: ReduxRootState) => {
    return selectComponentChildrenKeys(state, { viewKey, componentKey })
  }) as string[] | undefined
  const childrenKeysDependency = JSON.stringify(childrenKeys)
  const recursiveComponentMetadataDependency = JSON.stringify(
    recursiveComponentMetadata
  )
  return useMemo(() => {
    if (!componentName) {
      return null
    }
    if (!(componentName in apiComponents)) {
      logger.error(
        `Tried to render unknown component "${componentName}" in view "${viewKey}"`
      )
      return null
    }
    const ApiComponent = setupComponent(
      apiComponents[componentName as keyof typeof apiComponents] as APIFC
    )
    return (
      <ApiComponent
        {...recursiveComponentMetadata}
        componentName={componentName}
      >
        {childrenKeys?.map((key) => {
          return (
            <RecursiveLayout
              key={key}
              {...recursiveComponentMetadata}
              componentKey={key}
            />
          )
        })}
      </ApiComponent>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    viewKey,
    componentName,
    childrenKeysDependency,
    recursiveComponentMetadataDependency,
  ])
}

export default RecursiveLayout
