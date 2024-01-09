/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import {
  URL_DISCOVERY_DEVICE,
  URL_MAIN,
} from "Core/__deprecated__/renderer/constants/urls"
import { removeDevice } from "Core/device-manager/actions/base.action"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"
import { getDevicesSelector } from "Core/device-manager/selectors/get-devices.selector"
import { setDeviceInitializationStatus } from "Core/device-initialization/actions/base.action"
import { DeviceInitializationStatus } from "Core/device-initialization/reducers/device-initialization.interface"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { setDataSyncInitState } from "Core/data-sync/actions"
import { setInitState } from "Core/device/actions"

export const handleDeviceDetached = createAsyncThunk<
  void,
  { properties: DeviceBaseProperties; history: History },
  { state: ReduxRootState }
>(
  DeviceManagerEvent.HandleDeviceDetached,
  async (payload, { dispatch, getState }) => {
    const { history, properties } = payload

    const activeDevice = getActiveDevice(getState())

    dispatch(removeDevice(properties))

    if (activeDevice?.id !== properties.id) {
      return
    }

    const activeDeviceProcessing = isActiveDeviceProcessingSelector(getState())

    if (activeDeviceProcessing) {
      return
    }

    await dispatch(setActiveDevice(undefined))

    const devices = getDevicesSelector(getState())
    dispatch(setDiscoveryStatus(DiscoveryStatus.Idle))
    dispatch(setDeviceInitializationStatus(DeviceInitializationStatus.Idle))
    dispatch(setDataSyncInitState())
    dispatch(setInitState())

    if (devices.length > 0) {
      history.push(URL_DISCOVERY_DEVICE.root)
    } else {
      history.push(URL_MAIN.news)
    }
  }
)
