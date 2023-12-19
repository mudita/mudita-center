/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"

export const handleDeviceConnected = createAsyncThunk<
  boolean,
  undefined,
  { state: ReduxRootState }
  >(DeviceManagerEvent.HandleDeviceConnected, async (payload) => {
  console.log("DeviceManagerEvent.HandleDeviceConnected")

  return true
})
