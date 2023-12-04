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

  if (isEmpty(views) || !views[viewKey].layout) {
    return <div>Loading...</div>
  }

  if (!views[viewKey]) {
    return <div>Not found</div>
  }

  return <RecursiveLayout viewKey={viewKey} componentKey={"main"} />
}
