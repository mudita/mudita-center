/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "@mudita/pure"
import { DeviceEvent, ConnectionState } from "App/device/constants"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { setDeviceData } from "App/device/actions/base.action"
import { DeviceDataLoader } from "App/device/loaders/device-data.loader"
import { setValue, MetadataKey } from "App/metadata"
import { trackOsVersion } from "App/analytic-data-tracker/helpers"

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      if (state.device.deviceType !== null) {
        void trackOsVersion({
          serialNumber: data.serialNumber,
          osVersion: data.osVersion,
          deviceType: state.device.deviceType,
        })
      }
      void setValue({
        key: MetadataKey.DeviceOsVersion,
        value: data.osVersion ?? null,
      })
      void setValue({
        key: MetadataKey.DeviceType,
        value: state.device.deviceType,
      })
      dispatch(setDeviceData(data))
    } catch (error) {
      return rejectWithValue(error)
    }

    return
  }
)
