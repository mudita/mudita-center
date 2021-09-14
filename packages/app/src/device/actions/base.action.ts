/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import {
  PureDeviceData,
  HarmonyDeviceData,
  OsVersionPayload,
} from "App/device/reducers"
import { DeviceEvent, UpdatingState } from "App/device/constants"

export const setDeviceData = createAction<
  Partial<PureDeviceData | HarmonyDeviceData>
>(DeviceEvent.SetData)
export const setLockTime = createAction<number>(DeviceEvent.SetLockTime)
export const setSimData = createAction<number>(DeviceEvent.SetSimData)
export const setOsVersionData = createAction<OsVersionPayload>(
  DeviceEvent.SetOsVersionData
)
export const setUpdateState = createAction<UpdatingState>(
  DeviceEvent.SetUpdateState
)
