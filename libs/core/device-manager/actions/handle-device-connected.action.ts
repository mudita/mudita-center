/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import { History } from "history"
import { URL_DISCOVERY_DEVICE } from "Core/__deprecated__/renderer/constants/urls"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { addDevice } from "Core/device-manager/actions/base.action"
import { isActiveDeviceSet } from "Core/device-manager/selectors/is-active-device-set.selector"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"

export const handleDeviceConnected = createAsyncThunk<
  void,
  { properties: DeviceBaseProperties; history: History },
  { state: ReduxRootState }
>(
  DeviceManagerEvent.HandleDeviceConnected,
  async (payload, { dispatch, getState }) => {
    const { history, properties } = payload
    console.log("device connected: handle device connected Action!")
    dispatch(addDevice(properties))

    console.log("device added: ")

    const activeDeviceSet = isActiveDeviceSet(getState())

    if (activeDeviceSet) {
      console.log(
        "device connected: redirect to discovery skipped because active device is set"
      )
      // TODO: add switch logic when device is active
      // handle backup/update/restore process when is in progress
      return
    }

    // TODO: handle discovery in progress
    const discoveryDeviceInProgress = isDiscoveryDeviceInProgress(getState())

    if (discoveryDeviceInProgress) {
      console.log(
        "device connected: redirect to discovery skipped because discovery device is in progress: "
      )
      return
    }

    // TODO: handle device initialization
    const initializationDeviceInProgress = isInitializationDeviceInProgress(
      getState()
    )

    if (initializationDeviceInProgress) {
      console.log(
        "device connected: redirect to discovery skipped because initialization device is in progress: "
      )
      return
    }

    // TODO: handle app initialization
    const initializationAppInProgress = isInitializationAppInProgress(
      getState()
    )

    if (initializationAppInProgress) {
      console.log(
        "device connected: redirect to discovery skipped because initialization application is in progress: "
      )
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }
)
