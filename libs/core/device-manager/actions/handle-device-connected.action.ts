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
import { setDiscoveryStatus } from "Core/discovery-device/actions/base.action"
import { DiscoveryStatus } from "Core/discovery-device/reducers/discovery-device.interface"
import { setActiveDevice } from "Core/device-manager/actions/set-active-device.action"
import { isActiveDeviceProcessingSelector } from "Core/device-manager/selectors/is-active-device-processing.selector"
import { activeDeviceIdSelector } from "Core/device-manager/selectors/active-device-id.selector"

export const handleDeviceConnected = createAsyncThunk<
  void,
  { properties: DeviceBaseProperties; history: History },
  { state: ReduxRootState }
>(
  DeviceManagerEvent.HandleDeviceConnected,
  async (payload, { dispatch, getState }) => {
    const { history, properties } = payload
    const activeDeviceProcessing = isActiveDeviceProcessingSelector(getState())
    const activeDeviceId = activeDeviceIdSelector(getState())

    dispatch(addDevice(properties))

    if (activeDeviceId) {
      // TODO: add switch logic when device is active

      if (activeDeviceId === properties.id) {
        await dispatch(setActiveDevice(properties.id))
        dispatch(setDiscoveryStatus(DiscoveryStatus.Discovered))
        history.push(URL_DEVICE_INITIALIZATION.root)
      }

      // Workaround: Add device and set it as active if serialNumber is "00000000000000" during active processing.
      if (
        activeDeviceProcessing &&
        properties.serialNumber === "00000000000000"
      ) {
        await dispatch(setActiveDevice(properties.id))
        dispatch(setDiscoveryStatus(DiscoveryStatus.Discovered))
        history.push(URL_DEVICE_INITIALIZATION.root)

        return
      }

      return
    }

    if (isDiscoveryDeviceInProgress(getState())) {
      return
    }

    if (isInitializationDeviceInProgress(getState())) {
      return
    }

    if (isInitializationAppInProgress(getState())) {
      return
    }

    history.push(URL_DISCOVERY_DEVICE.root)
  }
)
