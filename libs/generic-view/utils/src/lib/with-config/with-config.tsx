/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import React, { ComponentType } from "react"
import { useSelector } from "react-redux"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { RecursiveComponent } from "../models/api-fc.types"
import { createSelector } from "reselect"

type Keys = { viewKey: string; componentKey: string }

const configSelector = createSelector(
  (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  (state: ReduxRootState) => state.genericViews.activeDevice,
  (state: ReduxRootState, keys: Keys) => keys,
  (devicesConfiguration, activeDevice, { viewKey, componentKey }) => {
    const features = devicesConfiguration[activeDevice!].features
    return features?.[viewKey as keyof typeof features]?.config?.[componentKey]
      ?.config
  }
)

export const withConfig = <P extends object>(
  Component: ComponentType<P & { viewKey?: string; componentKey: string }>
): RecursiveComponent => {
  return ({ viewKey, componentKey, ...props }) => {
    const config = useSelector((state: ReduxRootState) => {
      return configSelector(state, { viewKey, componentKey })
    })
    return (
      <Component
        {...(props as P)}
        config={config}
        componentKey={componentKey}
        viewKey={viewKey}
      />
    )
  }
}
