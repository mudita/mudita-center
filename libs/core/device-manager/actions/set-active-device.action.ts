/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { setActiveDeviceRequest } from "Core/device-manager/requests"
import { DeviceId } from "Core/device/constants/device-id"
import { cleanBackupProcess, cleanRestoreProcess } from "generic-view/store"

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
