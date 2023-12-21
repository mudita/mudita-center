/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent } from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { DeviceInfo } from "Core/device-info/dto"
import { getActiveDeviceTypeSelector } from "Core/device-manager/selectors/get-active-device-type.selector"
import { DeviceState } from "Core/device"

export const loadDeviceData = createAsyncThunk<
  DeviceInfo & Pick<DeviceState, "deviceType">,
  void,
  { state: ReduxRootState }
>(DeviceEvent.Loading, async (_, { rejectWithValue, getState }) => {
  try {
    const deviceType = getActiveDeviceTypeSelector(getState())
    const { ok, data, error } = await getDeviceInfoRequest()

    if (ok) {
      return { ...data, deviceType: deviceType ?? null }
    } else {
      return rejectWithValue(error)
    }
  } catch (error) {
    return rejectWithValue(error)
  }
})
