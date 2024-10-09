/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { FeaturesActions } from "./featues-action-keys"
import { View } from "generic-view/utils"
import { getFeatureConfigRequest } from "device/feature"
import { transformGenericComponents } from "./transform-generic-components"
import { devViews } from "../../../../feature/src/lib/use-dev-views/views"

export const getGenericConfig = createAsyncThunk<
  {
    view: View
    feature: string
    deviceId: DeviceId
  },
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetGenericConfig,
  async ({ deviceId, feature }, { rejectWithValue }) => {
    const response = await getFeatureConfigRequest(deviceId, feature)

    if (response.ok) {
      let fullView = transformGenericComponents(response.data)

      if (process.env.DEV_API_CONFIG === "1") {
        const devConfig =
          feature in devViews
            ? devViews[feature as keyof typeof devViews]
            : undefined
        fullView = {
          ...fullView,
          ...devConfig,
        }
      }

      return { deviceId, feature, view: fullView }
    }

    return rejectWithValue(undefined)
  }
)
