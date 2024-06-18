/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { getDeviceOSVersion, getOverviewDataRequest } from "device/feature"
import { generateMcAboutData, generateMcOverviewData } from "generic-view/views"
import { View } from "generic-view/utils"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { selectConfiguredDevice } from "../selectors"
import { FeaturesActions } from "./featues-action-keys"

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
    const apiConfig = selectConfiguredDevice(getState(), deviceId)?.apiConfig

    if (apiConfig === undefined) {
      return rejectWithValue("no device")
    }

    const serverResponse = await getDeviceOSVersion(
      apiConfig.productId,
      apiConfig.vendorId
    )

    const features = selectConfiguredDevice(getState(), deviceId)?.features
    const overviewConfig = features?.["mc-overview"]?.config
    const aboutConfig = features?.["mc-about"]?.config
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
