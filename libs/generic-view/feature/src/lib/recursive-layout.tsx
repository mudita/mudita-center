/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import apiComponents from "generic-view/ui"
import { APIFC, View, withLayout } from "generic-view/utils"

interface Properties {
  viewKey: string
  componentKey: string
}

export const RecursiveLayout: FunctionComponent<Properties> = (
  recursiveComponentMetadata
) => {
  const { viewKey, componentKey } = recursiveComponentMetadata
  const { childrenKeys, component } = useSelector((state: ReduxRootState) => {
    const features =
      state.genericViews.devicesConfiguration[state.genericViews.activeDevice!]
        .features
    const config = features?.[viewKey as keyof typeof features]?.config as View
    return config?.[componentKey as keyof typeof config]
  })
  const ApiComponent = withLayout(apiComponents[component] as APIFC)

  return (
    <ApiComponent {...recursiveComponentMetadata}>
      {childrenKeys?.map((key) => {
        return (
          <RecursiveLayout key={key} viewKey={viewKey} componentKey={key} />
        )
      })}
    </ApiComponent>
  )
}

export default RecursiveLayout
