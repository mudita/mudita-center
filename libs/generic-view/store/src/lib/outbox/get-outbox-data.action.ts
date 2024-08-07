/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getOutboxDataRequest } from "device/feature"
import { Outbox } from "device/models"
import { DeviceId } from "Core/device/constants/device-id"
import { AppError } from "Core/core/errors"
import { ActionName } from "../action-names"
import { getSingleFeatures } from "../features/get-single-feature"
import { getSingleFeatureData } from "../features/get-single-feature-data"
import { selectActiveApiDeviceId } from "../selectors/select-active-api-device-id"
import { setLastRefresh } from "../views/actions"

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
  async ({ deviceId }, { rejectWithValue, dispatch, getState }) => {
    const response = await getOutboxDataRequest(deviceId)

    if (selectActiveApiDeviceId(getState()) === deviceId) {
      dispatch(setLastRefresh(new Date().getTime()))
    }

    if (!response.ok) {
      return rejectWithValue(new AppError(""))
    }

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

    if (selectActiveApiDeviceId(getState()) === deviceId) {
      dispatch(setLastRefresh(new Date().getTime()))
    }

    return {
      deviceId,
      data: response.data,
      timestamp: new Date().getTime(),
    }
  }
)
