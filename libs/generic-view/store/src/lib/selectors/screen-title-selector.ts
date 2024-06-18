/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveDevice } from "./active-device"
import { selectConfiguredDevices } from "./select-configured-devices"

export const screenTitleSelector = createSelector(
  selectActiveDevice,
  selectConfiguredDevices,
  (state: ReduxRootState, viewKey: string) => viewKey,
  (activeDevice, devices, viewKey) => {
    const features = devices[activeDevice as keyof typeof devices]?.features
    return features?.[viewKey as keyof typeof features]?.config?.main
      .screenTitle
  }
)
