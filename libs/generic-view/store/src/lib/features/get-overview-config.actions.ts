/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getOverviewConfigRequest } from "device/feature"
import { FeaturesActions } from "./featues-action-keys"
import { View } from "generic-view/utils"
import {
  generateMcAboutLayout,
  generateMcOverviewLayout,
} from "generic-view/views"

export const getOverviewConfig = createAsyncThunk<
  {
    overviewConfig: View
    aboutConfig?: View
    deviceId: DeviceId
  },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(
  FeaturesActions.GetOverviewConfig,
  async ({ deviceId }, { rejectWithValue }) => {
    const response = await getOverviewConfigRequest(deviceId)
    if (response.ok) {
      return {
        overviewConfig: generateMcOverviewLayout(response.data),
        aboutConfig: response.data.summary.aboutFields
          ? generateMcAboutLayout(response.data)
          : undefined,
        deviceId,
      }
    }
    return rejectWithValue(response.error)
  }
)
