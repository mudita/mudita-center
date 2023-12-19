/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress"
import { History } from "history"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { DeviceBaseProperty } from "Core/device-manager/services"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress"

export const handleDeviceConnected = createAsyncThunk<
  void,
  { property: DeviceBaseProperty; history: History },
  { state: ReduxRootState }
>(DeviceManagerEvent.HandleDeviceConnected, async (payload, { getState }) => {
  const { history } = payload
  // TODO: handle DeviceManager state

  // discovery / switch logic handle
  // TODO: handle active device

  // switch logic when device is active

  // redirect logic when active device isnt active

  // TODO: handle discovery in progress
  const discoveryDeviceInProgress = isDiscoveryDeviceInProgress(getState())

  if (discoveryDeviceInProgress) {
    return
  }

  // TODO: handle device initialization
  const initializationDeviceInProgress = isInitializationDeviceInProgress(
    getState()
  )

  if (initializationDeviceInProgress) {
    return
  }

  // TODO: handle app initialization
  const initializationAppInProgress = isInitializationAppInProgress(
    getState()
  )

  if (initializationAppInProgress) {
    return
  }

  history.push(URL_DISCOVERY_DEVICE.root)
})
