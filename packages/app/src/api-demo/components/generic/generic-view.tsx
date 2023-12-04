/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { useParams } from "react-router"
import { RecursiveLayout } from "./recursive-layout"
import { isEmpty } from "lodash"
import { withLayout } from "App/api-demo/components/generic/with-layout"
import { APIFC } from "App/api-demo/models/api-fc.types"
import { Layout } from "App/api-demo/components/generic/layout.types"

export const GenericView: FunctionComponent = () => {
  const { viewKey } = useParams<{ viewKey: string }>()
  const { views } = useSelector((state: ReduxRootState) => state.generic)

  if (isEmpty(views) || !views[viewKey].layout) {
    return <div>Loading...</div>
  }

  if (!views[viewKey]) {
    return <div>Not found</div>
  }

  const { layout } = views[viewKey]

  const EnhancedRecursiveLayout = withLayout(RecursiveLayout) as APIFC<
    typeof layout.main.config,
    unknown,
    {
      viewKey: typeof viewKey
      dataKey: string
      layout?: typeof layout.main.layout
      component: typeof layout.main.component
      childrenKeys: typeof layout.main.childrenKeys
    }
  >
  return (
    <RecursiveLayout
      viewKey={viewKey}
      dataKey={"main"}
      component={layout.main.component}
      config={layout.main.config}
      childrenKeys={layout.main.childrenKeys}
      layout={layout.main.layout}
    />
  )
}
