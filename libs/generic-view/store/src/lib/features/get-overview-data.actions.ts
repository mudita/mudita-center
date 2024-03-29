/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { getDeviceOSVersion, getOverviewDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { generateMcAboutData, generateMcOverviewData } from "generic-view/views"
import { View } from "generic-view/utils"

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
    const apiConfig =
      getState().genericViews.devicesConfiguration[deviceId].apiConfig

    const serverResponse = await getDeviceOSVersion(
      apiConfig.productId,
      apiConfig.vendorId
    )
    const overviewConfig =
      getState().genericViews.devicesConfiguration[deviceId]?.features?.[
        "mc-overview"
      ]?.config
    const aboutConfig =
      getState().genericViews.devicesConfiguration[deviceId]?.features?.[
        "mc-about"
      ]?.config
    const response = await getOverviewDataRequest(
      deviceId,
      overviewConfig ?? ({} as View),
      aboutConfig ?? ({} as View)
    )

    if (response.ok) {
      return {
        deviceId,
        overviewData: generateMcOverviewData(
          response.data,
          overviewConfig,
          serverResponse.ok ? serverResponse.data : undefined
        ),
        aboutData: response.data.summary?.about
          ? generateMcAboutData(response.data.summary?.about, aboutConfig)
          : undefined,
      }
    }
    return rejectWithValue(response.error)
  }
)
