/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceInitializationState } from "Core/device-initialization/selectors/device-initialization-state.selector"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"

export const getDeviceInitializationStatus = createSelector(
  deviceInitializationState,
  ({ deviceInitializationStatus }): DeviceInitializationStatus => deviceInitializationStatus
)
