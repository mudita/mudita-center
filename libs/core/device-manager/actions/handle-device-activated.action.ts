/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { URL_DEVICE_INITIALIZATION } from "Core/__deprecated__/renderer/constants/urls"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"
import { DeviceId } from "Core/device/constants/device-id"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"

export const handleDeviceActivated = createAsyncThunk<
  void,
  { deviceId: DeviceId; history: History },
  { state: ReduxRootState }
>(
  DeviceManagerEvent.HandleDeviceActivated,
  async (payload, { dispatch, getState }) => {
    const { history, deviceId } = payload
    await dispatch(setActiveDevice(deviceId))
    setDiscoveryStatus(DiscoveryStatus.Discovered)
    history.push(URL_DEVICE_INITIALIZATION.root)
  }
)
