/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceCommunicationError, DeviceEvent } from "Core/device/constants"
import { unlockDeviceStatusRequest } from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setLockTime, setUnlockedStatus } from "Core/device/actions/base.action"
import { getLeftTimeSelector } from "Core/device/selectors"
import { handleCommunicationError } from "Core/device/actions/handle-communication-error.action"
import { DeviceId } from "Core/device/constants/device-id"

export type UnlockStatus = "UNLOCKED" | "LOCKED" | "ABORTED"

export const getUnlockStatus = createAsyncThunk<
  UnlockStatus,
  DeviceId | undefined,
  { state: ReduxRootState }
>(DeviceEvent.GetUnlockedStatus, async (deviceId, { dispatch, getState }) => {
  const result = await unlockDeviceStatusRequest(deviceId)
  const { ok, error } = result
  const leftTime = getLeftTimeSelector(getState())

  if (ok && leftTime !== undefined) {
    dispatch(setLockTime(undefined))
  }

  if (error) {
    await dispatch(handleCommunicationError(error))
  }

  if (error?.type === DeviceCommunicationError.DeviceLocked) {
    dispatch(setUnlockedStatus(false))
    return "LOCKED"
  }

  if (ok) {
    dispatch(setUnlockedStatus(true))
    return "UNLOCKED"
  } else {
    return "ABORTED"
  }
})
