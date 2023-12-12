/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "Core/device/constants"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "Core/core/errors"
import { loadDeviceData } from "Core/device/actions/load-device-data.action"
import { setConnectionStatus } from "Core/device/actions/set-connection-status.action"
import { lockedDevice } from "Core/device/actions/locked-device.action"
import { unlockedDevice } from "Core/device/actions/base.action"
import {
  DeviceError,
  DeviceCommunicationError,
  DeviceEvent,
} from "Core/device/constants"
import { connectDeviceRequest } from "Core/device/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const connectDevice = createAsyncThunk<
  DeviceType | undefined,
  DeviceType,
  { state: ReduxRootState }
>(DeviceEvent.Connected, async (payload, { dispatch, rejectWithValue }) => {
  const data = await connectDeviceRequest()

  if (!data.ok) {
    if (data.error?.type === DeviceCommunicationError.DeviceLocked) {
      void dispatch(lockedDevice())
      void dispatch(setConnectionStatus(true))
      void dispatch(loadDeviceData())

      return payload
    } else {
      return rejectWithValue(
        new AppError(DeviceError.Connection, "Cannot connected to device", data)
      )
    }
  }

  void dispatch(unlockedDevice())
  void dispatch(setConnectionStatus(true))
  void dispatch(loadDeviceData())

  return payload
})
