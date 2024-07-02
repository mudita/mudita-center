/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { connectDeviceRequest } from "device-protocol/feature"
import { DeviceManagerEvent, DeviceState } from "device-manager/models"
import { setDeviceState } from "core-device/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"

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
