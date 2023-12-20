/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { URL_DEVICE_INITIALIZATION } from "Core/__deprecated__/renderer/constants/urls"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"
import { DeviceId } from "Core/device/constants/device-id"

export const handleDeviceActivated = createAsyncThunk<
  void,
  { deviceId: DeviceId; history: History },
  { state: ReduxRootState }
>(
  DeviceManagerEvent.HandleDeviceConnected,
  async (payload, { dispatch, getState }) => {
    const { history, deviceId } = payload
    await dispatch(setActiveDevice(deviceId))

    history.push(URL_DEVICE_INITIALIZATION.root)
  }
)
