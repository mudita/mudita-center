/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceType } from "device-protocol/models"
import { connectDeviceRequest } from "device-protocol/feature"
import { DeviceManagerEvent, DeviceState } from "device-manager/models"
import { setDeviceState as setCoreDeviceState } from "core-device/feature"
import { setDeviceState as setApiDeviceState } from "generic-view/store"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { getActiveDevice } from "../selectors/get-active-device.selector"

export const connectDevice = createAsyncThunk<
  boolean,
  DeviceId,
  { state: ReduxRootState }
>(DeviceManagerEvent.ConnectDevice, async (id, { dispatch, getState }) => {
  const result = await connectDeviceRequest(id)
  const activeDevice = getActiveDevice(getState())
  const setDeviceState =
    activeDevice?.deviceType !== DeviceType.APIDevice
      ? setCoreDeviceState
      : setApiDeviceState

  if (result.ok) {
    dispatch(setDeviceState({ id, state: DeviceState.Connected }))
  } else {
    dispatch(setDeviceState({ id, state: DeviceState.Failed }))
  }

  return result.ok
})
