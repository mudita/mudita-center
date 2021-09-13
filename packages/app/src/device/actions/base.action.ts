/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { PureDeviceData, HarmonyDeviceData } from "App/device/reducers"
import { DeviceEvent } from "App/device/constants"

export const setDeviceData = createAction<
  Partial<PureDeviceData | HarmonyDeviceData>
>(DeviceEvent.SetData)
export const setLockTime = createAction<number>(DeviceEvent.SetLockTime)
