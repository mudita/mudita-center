/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectGenericViewState } from "./select-generic-view-state"

export const selectDevices = createSelector(
  [selectGenericViewState],
  ({ devices }) => devices
)

export const selectDeviceById = createSelector(
  selectDevices,
  (_state: ReduxRootState, deviceId: string) => deviceId,
  (devices, deviceId) => {
    return devices[deviceId]
  }
)
