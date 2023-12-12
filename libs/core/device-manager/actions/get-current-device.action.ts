/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { connectDevice } from "Core/device/actions"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { readAllIndexes, setDataSyncInitialized } from "Core/data-sync/actions"
import { getCurrentDeviceRequest } from "Core/device-manager/requests"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"

export const getCurrentDevice = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(DeviceManagerEvent.GetCurrentDevice, async (_, { dispatch }) => {
  const { ok, data } = await getCurrentDeviceRequest()

  if (!ok || !data) {
    return
  }

  void dispatch(connectDevice(data.deviceType))
  void dispatch(readAllIndexes())
  dispatch(setDataSyncInitialized())
})
