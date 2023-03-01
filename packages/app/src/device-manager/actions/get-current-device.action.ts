/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { connectDevice } from "App/device/actions"
import { DeviceManagerEvent } from "App/device-manager/constants"
import { readAllIndexes, setDataSyncInitialized } from "App/data-sync/actions"
import { getCurrentDeviceRequest } from "App/device-manager/requests"

export const getCurrentDevice = createAsyncThunk(
  DeviceManagerEvent.GetCurrentDevice,
  async (_, { dispatch }) => {
    const { ok, data } = await getCurrentDeviceRequest()

    if (!ok || !data) {
      return
    }

    void dispatch(connectDevice(data.deviceType))
    void dispatch(readAllIndexes())
    dispatch(setDataSyncInitialized())
  }
)
