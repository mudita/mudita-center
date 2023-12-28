/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createAsyncThunk } from "@reduxjs/toolkit"
import { History } from "history"
import { ReduxRootState } from "Core/__deprecated__/renderer/store"
import { DeviceManagerEvent } from "Core/device-manager/constants"
import { isDiscoveryDeviceInProgress } from "Core/discovery-device/selectors/is-discovery-device-in-progress.selector"
import {
  URL_DEVICE_INITIALIZATION,
  URL_DISCOVERY_DEVICE,
} from "Core/__deprecated__/renderer/constants/urls"
import { isInitializationDeviceInProgress } from "Core/device-initialization/selectors/is-initialization-device-in-progress.selector"
import { isInitializationAppInProgress } from "Core/app-initialization/selectors/is-initialization-app-in-progress.selector"
import { addDevice } from "Core/device-manager/actions/base.action"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { getActiveDevice } from "Core/device-manager/selectors/get-active-device.selector"
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"

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

    const activeDevice = getActiveDevice(getState())

    if (activeDevice) {
      console.log(
        "device connected: redirect to discovery skipped because active device is set"
      )
      // TODO: add switch logic when device is active
      // handle update process when is in progress

      // TODO: handle MuditaHarmony with undefined ID (or 0000000)
      if (activeDevice.id === properties.id) {
        await dispatch(setActiveDevice(properties.id))
        setDiscoveryStatus(DiscoveryStatus.Discovered)
        history.push(URL_DEVICE_INITIALIZATION.root)
      }
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
