/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { setActiveDeviceRequest } from "Core/device-manager/requests"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { setDataSyncInitState } from "Core/data-sync/actions"
import { setInitState } from "Core/device"

export const deactivateDevice = createAsyncThunk<
  void,
  void,
  { state: ReduxRootState }
>(DeviceManagerEvent.DeactivateDevice, async (_, {dispatch}) => {
  await setActiveDeviceRequest(undefined)
  dispatch(setDiscoveryStatus(DiscoveryStatus.Idle))
  dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Idle))
  dispatch(setDataSyncInitState())
  dispatch(setInitState())
})
