/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "App/device/constants"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AppError } from "App/core/errors"
import { loadDeviceData } from "App/device/actions/load-device-data.action"
import { setConnectionStatus } from "App/device/actions/set-connection-status.action"
import { lockedDevice } from "App/device/actions/locked-device.action"
import { unlockedDevice } from "App/device/actions/base.action"
import {
  DeviceError,
  DeviceCommunicationError,
  DeviceEvent,
} from "App/device/constants"
import { connectDeviceRequest } from "App/device/requests"

export const connectDevice = createAsyncThunk<
  DeviceType | undefined,
  DeviceType
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
