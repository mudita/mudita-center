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

  const modalsToRender = Object.entries(views[currentViewKey].layout)
    .filter(([, { component }]) => component === "modal")
    .map(([key]) => key)
  return (
    <GenericThemeProvider>
      <RecursiveLayout viewKey={currentViewKey} componentKey={"main"} />
      {modalsToRender.map((modalKey) => {
        return (
          <RecursiveLayout
            key={modalKey}
            viewKey={currentViewKey}
            componentKey={modalKey}
          />
        )
      })}
    </GenericThemeProvider>
  )
}

export default GenericView
