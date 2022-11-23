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
export const setUpdateState = createAction<UpdatingState>(
  DeviceEvent.SetUpdateState
)
export const setInitState = createAction(DeviceEvent.SetInitState)
export const setAgreementStatus = createAction<boolean>(
  DeviceEvent.AgreementStatus
)
export const unlockedDevice = createAction(DeviceEvent.Unlocked)
