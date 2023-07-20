/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  DeviceEvent,
  ConnectionState,
  DeviceCommunicationError,
} from "App/device/constants"
import { ReduxRootState } from "App/__deprecated__/renderer/store"
import {
  setDeviceData,
  setExternalUsageDevice,
} from "App/device/actions/base.action"
import { lockedDevice } from "App/device/actions/locked-device.action"
import { getDeviceInfoRequest } from "App/device-info/requests"
import { setValue, MetadataKey } from "App/metadata"
import { trackOsVersion } from "App/analytic-data-tracker/helpers"
import { externalUsageDevice } from "App/device/requests/external-usage-device.request"
import { setExternalUsageDeviceRequest } from "App/analytic-data-tracker/requests/set-external-usage-device.request"

export const loadDeviceData = createAsyncThunk(
  DeviceEvent.Loading,
  async (_, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as ReduxRootState

    if (state.device.state === ConnectionState.Loaded) {
      return
    }

    try {
      const { ok, data, error } = await getDeviceInfoRequest()

      if (!ok || !data) {
        if (error?.type === DeviceCommunicationError.DeviceLocked) {
          void dispatch(lockedDevice())
        }

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

      if (
        data.serialNumber !== state.device.data?.serialNumber ||
        state.device.externalUsageDevice === null
      ) {
        const resultExternalUsageDevice = state.settings.privacyPolicyAccepted
          ? await externalUsageDevice(data.serialNumber)
          : false

        await setExternalUsageDeviceRequest(resultExternalUsageDevice)
        if (state.settings.privacyPolicyAccepted !== undefined) {
          dispatch(setExternalUsageDevice(resultExternalUsageDevice))
        }
      }
      dispatch(setDeviceData(data))
    } catch (error) {
      return rejectWithValue(error)
    }

    return
  }
)
