/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { cleanBackupProcess, cleanRestoreProcess } from "generic-view/store"
import { DeviceManagerEvent } from "device-manager/models"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { setActiveDeviceRequest } from "../requests"

export const setActiveDevice = createAsyncThunk<
  DeviceId | undefined,
  DeviceId | undefined,
  { state: ReduxRootState }
>(DeviceManagerEvent.SetActiveDevice, async (payload, { dispatch }) => {
  await setActiveDeviceRequest(payload)
  dispatch(cleanBackupProcess())
  dispatch(cleanRestoreProcess())
  return payload
})
