/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent, ConnectionState } from "App/device/constants"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import { setDeviceData } from "App/device/actions/base.action"
import { getDeviceInfoRequest } from "App/device-info/requests"
import { setValue, MetadataKey } from "App/metadata"
import { trackOsVersion } from "App/analytic-data-tracker/helpers"

export const loadDeviceData = createAsyncThunk(
  DeviceEvent.Loading,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.state === ConnectionState.Loaded) {
      return
    }

    try {
      const { ok, data } = await getDeviceInfoRequest()

      if (!ok || !data) {
        return
      }

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
