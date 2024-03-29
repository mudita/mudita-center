/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveDevice } from "./active-device"

export const selectActiveDeviceConfiguration = createSelector(
  [
    selectActiveDevice,
    (state: ReduxRootState) => state.genericViews.devicesConfiguration,
  ],
  (activeDevice, devicesConfiguration) => {
    if (activeDevice) {
      return devicesConfiguration[activeDevice]
    }
    return undefined
  }
)
