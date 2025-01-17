/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { selectActiveDeviceConfiguration } from "./active-device-configuration"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const selectActiveDeviceFeatures = createSelector(
  selectActiveDeviceConfiguration,
  (activeDeviceConfiguration) => {
    return activeDeviceConfiguration?.features
  }
)

export const selectActiveDeviceFeatureByKey = createSelector(
  selectActiveDeviceConfiguration,
  (state: ReduxRootState, featureKey: string) => featureKey,
  (activeDeviceConfiguration, featureKey) => {
    return (
      activeDeviceConfiguration?.features &&
      activeDeviceConfiguration?.features[featureKey].data
    )
  }
)
