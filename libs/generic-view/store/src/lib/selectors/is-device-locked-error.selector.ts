/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { ApiError } from "device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectGenericViewState } from "./select-generic-view-state"

export const isDeviceLockedErrorSelector = createSelector(
  [
    selectGenericViewState,
    (state: ReduxRootState, deviceId: string) => deviceId,
  ],
  (genericState, deviceId): boolean => {
    return genericState.apiErrors[deviceId]?.[ApiError.DeviceLocked]
  }
)
