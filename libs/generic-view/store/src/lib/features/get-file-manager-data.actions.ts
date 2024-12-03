/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { getFileManagerDataRequest } from "device/feature"
import { generateFileManagerData } from "generic-view/views"
import { selectConfiguredDevice } from "../selectors/select-configured-devices"
import { FeaturesActions } from "./featues-action-keys"

export const getFileManagerData = createAsyncThunk<
  {
    deviceId: DeviceId
    data: Record<string, unknown>
  },
  { deviceId: DeviceId },
  { state: ReduxRootState }
>(
  FeaturesActions.GetFileManagerData,
  async ({ deviceId }, { rejectWithValue, getState }) => {
    const apiConfig = selectConfiguredDevice(getState(), deviceId)?.apiConfig

    const features = selectConfiguredDevice(getState(), deviceId)?.features
    const fileManagerConfig = features?.["fileManager"]?.config

    if (apiConfig === undefined || fileManagerConfig === undefined) {
      return rejectWithValue("no device")
    }

    const response = await getFileManagerDataRequest(deviceId)

    if (response.ok) {
      return {
        deviceId,
        data: generateFileManagerData(response.data, fileManagerConfig),
      }
    }
    return rejectWithValue(response.error)
  }
)
