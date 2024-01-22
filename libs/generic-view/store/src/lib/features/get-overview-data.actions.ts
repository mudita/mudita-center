/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getOverviewDataRequest } from "device/feature"
import { OverviewData } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"

export const getOverviewData = createAsyncThunk<
  OverviewData,
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(
  FeaturesActions.GetOverviewData,
  async ({ deviceId }, { rejectWithValue }) => {
    const response = await getOverviewDataRequest(deviceId)
    if (response.ok) {
      return response.data
    }
    return rejectWithValue(response.error)
  }
)
