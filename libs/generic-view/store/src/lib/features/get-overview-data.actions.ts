/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getOverviewDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { generateMcAboutData, generateMcOverviewData } from "generic-view/views"

export const getOverviewData = createAsyncThunk<
  {
    deviceId: DeviceId
    overviewData: Record<string, unknown>
    aboutData?: Record<string, unknown>
  },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(
  FeaturesActions.GetOverviewData,
  async ({ deviceId }, { rejectWithValue, getState }) => {
    const response = await getOverviewDataRequest(deviceId)
    if (response.ok) {
      const overviewConfig =
        getState().genericViews.devicesConfiguration[deviceId]?.features?.[
          "mc-overview"
        ]?.config
      const aboutConfig =
        getState().genericViews.devicesConfiguration[deviceId]?.features?.[
          "mc-about"
        ]?.config
      return {
        deviceId,
        overviewData: generateMcOverviewData(response.data, overviewConfig),
        aboutData: response.data.summary?.about
          ? generateMcAboutData(response.data.summary?.about, aboutConfig)
          : undefined,
      }
    }
    return rejectWithValue(response.error)
  }
)
