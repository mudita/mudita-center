/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getDeviceInitializationStatus } from "Core/device-initialization/selectors/get-device-initialization-status.selector"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

export const isInitializationDeviceInProgress = createSelector(
  getDeviceInitializationStatus,
  (deviceInitializationStatus): boolean => {
    return (
      deviceInitializationStatus === DeviceInitializationStatus.Initializing
    )
  }
)
