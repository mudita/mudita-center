/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React from "react"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { useSelector } from "react-redux"
import { APIFC } from "App/api-demo/models/api-fc.types"
import { apiComponents } from "./api-components"
import { ComponentPropsByName } from "../models/api-views.types"
import { withLayout } from "./layout/with-layout"
import { Layout } from "App/api-demo/components/layout/layout.types"

export const RecursiveLayout = ({
  viewKey,
  component,
  parameters,
  layout,
  childrenKeys,
  data,
}: ComponentPropsByName & { viewKey: string }) => {
  const view = useSelector(
    (state: ReduxRootState) => state.generic.views[viewKey]
  )

  const ApiComponent = withLayout(
    apiComponents[component] as APIFC<typeof parameters>
  ) as APIFC<typeof parameters, typeof data, { layout?: Layout }>

  return (
    <ApiComponent parameters={parameters} layout={layout} data={data}>
      {childrenKeys?.map((key) => {
        const properties = view.layout[key]
        const data = view.data?.[key]
        return <RecursiveLayout key={key} viewKey={viewKey} {...properties} data={data} />
      })}
    </ApiComponent>
  )
}
