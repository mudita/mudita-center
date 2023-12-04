/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import { APIFC } from "App/api-demo/models/api-fc.types"
import { apiComponents } from "../api-components"
import { ComponentPropsByName } from "../../models/api-views.types"
import { withLayout } from "./with-layout"
import { Layout } from "./layout.types"
import { withData } from "./with-data"

interface MetaData {
  viewKey: string
  dataKey: string
}

export const RecursiveLayout = ({
  viewKey,
  dataKey,
  component,
  config,
  layout,
  childrenKeys,
}: ComponentPropsByName & MetaData) => {
  const view = useSelector(
    (state: ReduxRootState) => state.generic.views[viewKey]
  )

  type EnhancedApiComponent = APIFC<
    typeof config,
    unknown,
    {
      viewKey: string
      dataKey: string
      layout?: Layout
    }
  >

  const ApiComponent = withLayout(
    withData(apiComponents[component] as APIFC<typeof config>)
  ) as EnhancedApiComponent

  return (
    <ApiComponent
      config={config}
      layout={layout}
      viewKey={viewKey}
      dataKey={dataKey}
    >
      {childrenKeys?.map((key) => {
        const properties = view.layout[key]
        const RecursiveComponentWithLayout = withLayout(
          RecursiveLayout
        ) as EnhancedApiComponent
        return (
          <RecursiveLayout
            key={key}
            dataKey={key}
            viewKey={viewKey}
            {...properties}
          />
        )
      })}
    </ApiComponent>
  )
}
