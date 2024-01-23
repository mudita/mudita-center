/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getOutboxDataRequest } from "device/feature"
import { Outbox } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { ActionName } from "../action-names"

export const getOutboxData = createAsyncThunk<
  {
    deviceId: DeviceId
    data: Outbox
  },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(ActionName.GetOutboxData, async ({ deviceId }, { rejectWithValue }) => {
  const response = await getOutboxDataRequest(deviceId)
  console.log(response)
  if (response.ok) {
    return {
      deviceId,
      data: response.data,
    }
  }
  return rejectWithValue(response.error)
})
