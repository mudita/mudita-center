/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { getCoreDevicesSelector } from "core-device/feature"
import { DeviceBaseProperties } from "device-protocol/models"
import {
  DeviceState,
  HarmonyDeviceData,
  KompaktDeviceData,
  PureDeviceData,
} from "Core/device"
import { deviceStateSelector } from "Core/device/selectors"
import { deviceManagerState } from "./device-manager-state.selector"

export interface DeviceBaseData
  extends DeviceBaseProperties,
    Pick<DeviceState, "externalUsageDevice"> {
  data: Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData>
}

export const getActiveDeviceBaseDataSelector = createSelector(
  getCoreDevicesSelector,
  deviceManagerState,
  deviceStateSelector,
  (coreDevices, deviceManager, deviceState): DeviceBaseData | undefined => {
    const { activeDeviceId } = deviceManager
    const activeDevice = coreDevices.find(({ id }) => id === activeDeviceId)

    if (activeDevice === undefined) {
      return
    }

    const { data, externalUsageDevice } = deviceState

    if (data === null) {
      return
    }

    return {
      ...activeDevice,
      data,
      externalUsageDevice,
    }
  }
)
