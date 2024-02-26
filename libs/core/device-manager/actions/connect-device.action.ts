/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { DeviceId } from "Core/device/constants/device-id"
import { connectDeviceRequest } from "Core/device-manager/requests/connect-device.request"

export const connectDevice = createAsyncThunk<
  boolean,
  DeviceId,
  { state: ReduxRootState }
>(
  DeviceManagerEvent.ConnectDevice,
  async (id) => {
    const result = await connectDeviceRequest(id)
    return result.ok
  }
)
