/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { Feature } from "generic-view/models"
import { getFeatureDataRequest } from "device/feature"
import { DeviceId } from "Core/device/constants/device-id"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { selectConfiguredDevice } from "../selectors/select-configured-devices"
import { FeaturesActions } from "./featues-action-keys"
import { transformDataComponents } from "./transform-data-components"

export const getGenericData = createAsyncThunk<
  {
    deviceId: DeviceId
    feature: string
    data: Feature["data"]
  },
  { deviceId: DeviceId; feature: string },
  { state: ReduxRootState }
>(
  FeaturesActions.GetGenericData,
  async ({ deviceId, feature }, { rejectWithValue, getState }) => {
    const { ok, data } = await getFeatureDataRequest(deviceId, feature)

    const features = selectConfiguredDevice(getState(), deviceId)?.features
    const featureConfig = features?.[feature]?.config

    if (featureConfig === undefined) {
      return rejectWithValue("no device")
    }

    if (ok) {
      return {
        deviceId,
        feature,
        data: transformDataComponents(feature, data, featureConfig),
      }
    }

    return rejectWithValue(undefined)
  }
)
