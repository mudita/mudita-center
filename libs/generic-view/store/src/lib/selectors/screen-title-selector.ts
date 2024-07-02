/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectActiveApiDeviceId } from "./select-active-api-device-id"
import { selectConfiguredDevices } from "./select-configured-devices"

export const screenTitleSelector = createSelector(
  selectActiveApiDeviceId,
  selectConfiguredDevices,
  (state: ReduxRootState, viewKey: string) => viewKey,
  (activeDeviceId, devices, viewKey) => {
    const features = activeDeviceId
      ? devices[activeDeviceId]?.features
      : undefined
    return features?.[viewKey]?.config?.main.screenTitle
  }
)
