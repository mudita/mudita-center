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
import { getSingleFeatures } from "../features/get-single-feature"
import { getSingleFeatureData } from "../features/get-single-feature-data"

export const getOutboxData = createAsyncThunk<
  {
    deviceId: DeviceId
    data: Outbox
    timestamp: number
  },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(
  ActionName.GetOutboxData,
  async ({ deviceId }, { rejectWithValue, dispatch }) => {
    const response = await getOutboxDataRequest(deviceId)
    if (response.ok) {
      const featuresToFullReload = response.data.features
      const dataToReload = response.data.data.filter((feature) => {
        return !featuresToFullReload.includes(feature)
      })

      featuresToFullReload.forEach(async (feature) => {
        await dispatch(getSingleFeatures({ deviceId, feature }))
      })
      dataToReload.forEach(async (feature) => {
        await dispatch(getSingleFeatureData({ deviceId, feature }))
      })

      return {
        deviceId,
        data: response.data,
        timestamp: new Date().getTime(),
      }
    }
    return rejectWithValue({
      deviceId,
      data: response.error,
      timestamp: new Date().getTime(),
    })
  }
)
