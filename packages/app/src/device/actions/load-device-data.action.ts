/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { DeviceEvent, ConnectionState } from "App/device/constants"
import { ReduxRootState } from "App/renderer/store"
import { setDeviceData } from "App/device/actions/base.action"
import { DeviceDataLoader } from "App/device/loaders/device-data.loader"
import { setValue, MetadataKey } from "App/metadata"

export const loadDeviceData = createAsyncThunk<any, DeviceType>(
  DeviceEvent.Loading,
  async (payload, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.state === ConnectionState.Loaded) {
      return
    }

    const loader = new DeviceDataLoader()

    try {
      const data = await loader.loadDeviceData(payload)
      setValue({
        key: MetadataKey.DeviceOsVersion,
        value: data.osVersion ?? null,
      })
      dispatch(setDeviceData(data))
    } catch (error) {
      return rejectWithValue(error)
    }

    return
  }
)
