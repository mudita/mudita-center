/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAction } from "@reduxjs/toolkit"
import { DeviceEvent } from "Core/device/constants"
import { GetPhoneLockTimeResponseBody } from "Core/device/types/mudita-os"

export const setLockTime = createAction<
  GetPhoneLockTimeResponseBody | undefined
>(DeviceEvent.SetLockTime)

export const setOnboardingStatus = createAction<boolean>(
  DeviceEvent.SetOnboardingStatus
)
export const setUnlockedStatus = createAction<boolean>(
  DeviceEvent.SetUnlockedStatus
)
export const unlockedDevice = createAction(DeviceEvent.Unlocked)
export const setCriticalBatteryLevelStatus = createAction<boolean>(
  DeviceEvent.SetCriticalBatteryLevelStatus
)

export const setExternalUsageDevice = createAction<boolean>(
  DeviceEvent.SetExternalUsageDevice
)

export const setRestartingStatus = createAction<boolean>(
  DeviceEvent.SetRestartingStatus
)
