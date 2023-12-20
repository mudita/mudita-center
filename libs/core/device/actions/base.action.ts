/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { PureDeviceData, HarmonyDeviceData } from "Core/device/reducers"
import { DeviceEvent, DeviceType } from "Core/device/constants"
import { GetPhoneLockTimeResponseBody } from "Core/device/types/mudita-os"

export const setDeviceData = createAction<
  | (PureDeviceData & { deviceType: DeviceType })
  | (HarmonyDeviceData & { deviceType: DeviceType })
>(DeviceEvent.SetData)

export const setLockTime = createAction<
  GetPhoneLockTimeResponseBody | undefined
>(DeviceEvent.SetLockTime)

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
