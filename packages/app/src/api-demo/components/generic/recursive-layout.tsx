/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import { APIFC } from "../../models/api-fc.types"
import { apiComponents } from "../api-components"
import { withLayout } from "./with-layout"

interface MetaData {
  viewKey: string
  componentKey: string
}

export const RecursiveLayout = (recursiveComponentMetadata: MetaData) => {
  const { viewKey, componentKey } = recursiveComponentMetadata
  const view = useSelector(
    (state: ReduxRootState) => state.generic.views[viewKey]
  )
  const { component, childrenKeys } = view.layout[componentKey]

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
