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
import { DeviceEvent } from "App/device/constants"
import { GetPhoneLockTimeResponseBody } from "App/device/types/mudita-os"

export const setDeviceData = createAction<
  Partial<PureDeviceData | HarmonyDeviceData>
>(DeviceEvent.SetData)

export const setLockTime = createAction<
  GetPhoneLockTimeResponseBody | undefined
>(DeviceEvent.SetLockTime)
export const setSimData = createAction<number>(DeviceEvent.SetSimData)
export const setOsVersionData = createAction<OsVersionPayload>(
  DeviceEvent.SetOsVersionData
)
export const setInitState = createAction(DeviceEvent.SetInitState)
export const setOnboardingStatus = createAction<boolean>(
  DeviceEvent.OnboardingStatus
)
export const unlockedDevice = createAction(DeviceEvent.Unlocked)
export const setCriticalBatteryLevel = createAction<boolean>(
  DeviceEvent.CriticalBatteryLevel
)

export const setExternalUsageDevice = createAction<boolean>(
  DeviceEvent.ExternalUsageDevice
)

export const setRestarting = createAction<boolean>(DeviceEvent.Restarting)
