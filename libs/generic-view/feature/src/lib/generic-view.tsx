/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { isEmpty } from "lodash"
import { GenericThemeProvider } from "generic-view/theme"
import RecursiveLayout from "./recursive-layout"
import GenericModals from "./generic-modals"

export const GenericView: FunctionComponent = () => {
  const { viewKey, subviewKey } = useParams<{
    viewKey: string
    subviewKey?: string
  }>()
  const currentViewKey = subviewKey || viewKey
  const { views } = useSelector((state: ReduxRootState) => state.genericViews)

  if (isEmpty(views) || !views[currentViewKey].layout) {
    return <div>Loading...</div>
  }

  if (!views[currentViewKey]) {
    return <div>Not found</div>
  }

  return (
    <GenericThemeProvider>
      <RecursiveLayout viewKey={currentViewKey} componentKey={"main"} />
      <GenericModals viewKey={currentViewKey} />
    </GenericThemeProvider>
  )
}

export default GenericView
