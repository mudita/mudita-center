/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent, useMemo } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import apiComponents from "generic-view/ui"
import { APIFC } from "generic-view/utils"
import {
  selectComponentChildrenKeys,
  selectComponentName,
} from "generic-view/store"
import { withLayout } from "./with-layout"

interface Properties {
  viewKey: string
  componentKey: string
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
  })
  const childrenKeysDependency = JSON.stringify(childrenKeys)
  return useMemo(() => {
    if (!componentName) {
      // TODO: implement error handling
      return null
    }

    const ApiComponent = withLayout(apiComponents[componentName] as APIFC)

    return (
      <ApiComponent {...recursiveComponentMetadata}>
        {childrenKeys?.map((key) => {
          return (
            <RecursiveLayout key={key} viewKey={viewKey} componentKey={key} />
          )
        })}
      </ApiComponent>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    childrenKeysDependency,
    componentName,
    componentKey,
    recursiveComponentMetadata,
    viewKey,
  ])
}

export default RecursiveLayout
