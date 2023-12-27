/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import apiComponents from "generic-view/ui"
import { APIFC, withLayout } from "generic-view/utils"

interface MetaData {
  viewKey: string
  componentKey: string
}

export const RecursiveLayout: FunctionComponent<MetaData> = (
  recursiveComponentMetadata
) => {
  const { viewKey, componentKey } = recursiveComponentMetadata
  const { childrenKeys, component } = useSelector(
    (state: ReduxRootState) =>
      state.genericViews.views?.[viewKey]?.layout?.[componentKey]
  )
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
