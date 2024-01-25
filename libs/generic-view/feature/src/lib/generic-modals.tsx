/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import RecursiveLayout from "./recursive-layout"

interface Props {
  viewKey: string
}

export const GenericModals: FunctionComponent<Props> = ({ viewKey }) => {
  const devicesConfiguration = useSelector(
    (state: ReduxRootState) => state.genericViews.devicesConfiguration
  )
  const activeDevice = useSelector(
    (state: ReduxRootState) => state.genericViews.activeDevice
  )

  if (!activeDevice) {
    return null
  }
  const features = devicesConfiguration[activeDevice].features || {}

  const modalsToRender = Object.entries(
    features[viewKey as keyof typeof features]?.config || {}
  )
    .filter(([, { component }]) => component === "modal")
    .map(([key]) => key)
  return (
    <>
      {modalsToRender.map((modalKey) => {
        return (
          <RecursiveLayout
            key={modalKey}
            viewKey={viewKey}
            componentKey={modalKey}
          />
        )
      })}
    </>
  )
}

export default GenericModals
