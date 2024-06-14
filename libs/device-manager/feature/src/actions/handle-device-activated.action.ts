/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { activateDevice, cleanBackupProcess, cleanRestoreProcess } from "generic-view/store"
import { DeviceManagerEvent } from "device-manager/models"
import { setActiveDevice } from "active-device-registry/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceId } from "Core/device/constants/device-id"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"

export const handleDeviceActivated = createAsyncThunk<
  void,
  DeviceId,
  { state: ReduxRootState }
>(DeviceManagerEvent.HandleDeviceActivated, async (deviceId, { dispatch }) => {
  await dispatch(setActiveDevice(deviceId))
  dispatch(cleanBackupProcess())
  dispatch(cleanRestoreProcess())
  setDiscoveryStatus(DiscoveryStatus.Discovered)
  dispatch(activateDevice({ deviceId }))
})
