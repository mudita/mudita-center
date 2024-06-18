/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { setActiveDeviceRequest } from "../requests"
import { ActiveDeviceRegistryEvent } from "../constants"

export const setActiveDevice = createAsyncThunk<
  DeviceId | undefined,
  DeviceId | undefined,
  { state: ReduxRootState }
>(ActiveDeviceRegistryEvent.SetActiveDevice, async (payload, { dispatch }) => {
  await setActiveDeviceRequest(payload)
  return payload
})
