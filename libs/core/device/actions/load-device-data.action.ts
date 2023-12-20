/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceEvent, DeviceCommunicationError } from "Core/device/constants"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setExternalUsageDevice } from "Core/device/actions/base.action"
import { lockedDevice } from "Core/device/actions/locked-device.action"
import { getDeviceInfoRequest } from "Core/device-info/requests"
import { externalUsageDevice } from "Core/device/requests/external-usage-device.request"
import { setExternalUsageDeviceRequest } from "Core/analytic-data-tracker/requests/set-external-usage-device.request"
import { DeviceInfo } from "Core/device-info/dto"

export const loadDeviceData = createAsyncThunk<
  DeviceInfo | undefined,
  void,
  { state: ReduxRootState }
>(DeviceEvent.Loading, async (_, { getState, dispatch, rejectWithValue }) => {
  const state = getState()

  try {
    const { ok, data, error } = await getDeviceInfoRequest()

    if (!ok || !data) {
      if (error?.type === DeviceCommunicationError.DeviceLocked) {
        void dispatch(lockedDevice())
      }

      return
    }

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

    return data
  } catch (error) {
    return rejectWithValue(error)
  }

  return
})
