/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceManagerEvent } from "device-manager/models"
import { setDeviceState } from "core-device/feature"
import { DeviceState } from "core-device/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { connectDeviceRequest } from "../requests"

export const connectDevice = createAsyncThunk<
  boolean,
  DeviceId,
  { state: ReduxRootState }
>(DeviceManagerEvent.ConnectDevice, async (id, { dispatch }) => {
  const result = await connectDeviceRequest(id)
  if (result.ok) {
    dispatch(setDeviceState({ id, state: DeviceState.Connected }))
  } else {
    dispatch(setDeviceState({ id, state: DeviceState.Failed }))
  }

  return result.ok
})
