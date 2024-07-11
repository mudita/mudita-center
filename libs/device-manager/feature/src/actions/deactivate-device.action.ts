/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { DeviceBaseProperties } from "device-protocol/models"
import { DeviceManagerEvent } from "device-manager/models"
import { setActiveDevice } from "active-device-registry/feature"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { MetadataKey, setValue } from "Core/metadata"
import { getDevicesSelector } from "../selectors"
import { setSelectDeviceDrawerOpen } from "./set-select-device-drawer-open.action"

export const deactivateDevice = createAsyncThunk<
  DeviceBaseProperties[],
  void,
  { state: ReduxRootState }
>(DeviceManagerEvent.DeactivateDevice, async (_, { dispatch, getState }) => {
  dispatch(setActiveDevice(undefined))
  dispatch(setSelectDeviceDrawerOpen(false))
  dispatch(setDiscoveryStatus(DiscoveryStatus.Idle))
  dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Idle))

  void setValue({ key: MetadataKey.DeviceOsVersion, value: null })
  void setValue({ key: MetadataKey.DeviceType, value: null })

  return getDevicesSelector(getState())
})
