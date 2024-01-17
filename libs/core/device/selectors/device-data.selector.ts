/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceStateSelector } from "Core/device/selectors/device-state.selector"
import {
  HarmonyDeviceData,
  KompaktDeviceData,
  PureDeviceData,
} from "Core/device/reducers"

export const deviceDataSelector = createSelector(
  deviceStateSelector,
  (
    deviceState
  ): Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData> | null => {
    return deviceState.data
  }
)
