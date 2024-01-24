/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getOverviewDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { generateMcOverviewData } from "generic-view/views"
import { Feature } from "generic-view/utils"

export const getOverviewData = createAsyncThunk<
  {
    deviceId: DeviceId
    data: Feature
  },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(
  FeaturesActions.GetOverviewData,
  async ({ deviceId }, { rejectWithValue }) => {
    const response = await getOverviewDataRequest(deviceId)
    if (response.ok) {
      return {
        deviceId,
        data: generateMcOverviewData(response.data),
      }
    }
    return rejectWithValue(response.error)
  }
)
