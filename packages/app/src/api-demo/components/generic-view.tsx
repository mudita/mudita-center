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

export const GenericView: FunctionComponent = () => {
  const { viewKey } = useParams<{ viewKey: string }>()
  const { views } = useSelector((state: ReduxRootState) => state.generic)

  if (isEmpty(views)) {
    return <div>Loading...</div>
  }

  if (!views[viewKey].layout) {
    return <div>Loading layout...</div>
  }
  //
  // if (!views[viewKey].data) {
  //   return <div>Loading data...</div>
  // }

  if (!views[viewKey]) {
    return <div>Not found</div>
  }

  const { layout, data } = views[viewKey]

  return (
    <RecursiveLayout
      viewKey={viewKey}
      component={layout.main.component}
      parameters={layout.main.parameters}
      childrenKeys={layout.main.childrenKeys}
      layout={layout.main.layout}
      data={data?.main}
    />
  )
}
