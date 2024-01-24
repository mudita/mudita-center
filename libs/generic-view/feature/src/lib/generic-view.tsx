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
  const devicesConfiguration = useSelector(
    (state: ReduxRootState) => state.genericViews.devicesConfiguration
  )
  const activeDevice = useSelector(
    (state: ReduxRootState) => state.genericViews.activeDevice
  )

  if (!activeDevice) {
    return <div>No active device found</div>
  }
  const activeDeviceConfiguration = devicesConfiguration[activeDevice].features
  const view =
    activeDeviceConfiguration?.[
      currentViewKey as keyof typeof activeDeviceConfiguration
    ]

  if (isEmpty(activeDeviceConfiguration)) {
    return <div>Loading...</div>
  }

  if (!view) {
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
