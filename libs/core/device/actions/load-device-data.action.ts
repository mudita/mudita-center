/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { DeviceInfo } from "Core/device-info/dto"
import { getActiveDeviceTypeSelector } from "device-manager/feature"
import { DeviceState } from "Core/device/reducers"
import { processDeviceDataOnLoad } from "Core/device/actions/process-device-data-on-load.action"
import { handleCommunicationError } from "Core/device/actions/handle-communication-error.action"

export const loadDeviceData = createAsyncThunk<
  DeviceInfo & Pick<DeviceState, "deviceType">,
  boolean | undefined,
  { state: ReduxRootState }
>(
  DeviceEvent.LoadDeviceData,
  async (
    forceProcessOnLoad = false,
    { dispatch, rejectWithValue, getState }
  ) => {
    try {
      const deviceType = getActiveDeviceTypeSelector(getState())
      const { ok, data, error } = await getDeviceInfoRequest()

      if (ok) {
        if (forceProcessOnLoad) {
          await dispatch(processDeviceDataOnLoad())
        }
        return { ...data, deviceType: deviceType ?? null }
      } else {
        await dispatch(handleCommunicationError(error))
        return rejectWithValue(error)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)
