/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"
import { DeviceId } from "Core/device/constants/device-id"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { activateDevice } from "generic-view/store"

export const handleDeviceActivated = createAsyncThunk<
  void,
  DeviceId,
  { state: ReduxRootState }
>(DeviceManagerEvent.HandleDeviceActivated, async (deviceId, { dispatch }) => {
  await dispatch(setActiveDevice(deviceId))
  setDiscoveryStatus(DiscoveryStatus.Discovered)
  dispatch(activateDevice({ deviceId }))
})
