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
import { generateMcImportContactsButton } from "generic-view/views"

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
    await new Promise((resolve) => setTimeout(resolve, 1))

    const respone = await getFeatureConfigRequest(deviceId, feature)

    if (respone.ok) {
      const fixed = generateMcImportContactsButton(respone.data)
      return { deviceId, feature, view: fixed }
    }

    return rejectWithValue(undefined)
  }
)
