/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  DeviceEvent,
  ConnectionState,
  DeviceCommunicationError,
} from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import {
  setDeviceData,
  setExternalUsageDevice,
} from "Core/device/actions/base.action"
import { lockedDevice } from "Core/device/actions/locked-device.action"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { setValue, MetadataKey } from "Core/metadata"
import { trackOsVersion } from "Core/analytic-data-tracker/helpers"
import { externalUsageDevice } from "Core/device/requests/external-usage-device.request"
import { setExternalUsageDeviceRequest } from "Core/analytic-data-tracker/requests/set-external-usage-device.request"

export const loadDeviceData = createAsyncThunk<
  undefined,
  void,
  { state: ReduxRootState }
>(DeviceEvent.Loading, async (_, { getState, dispatch, rejectWithValue }) => {
  const state = getState()

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
})
