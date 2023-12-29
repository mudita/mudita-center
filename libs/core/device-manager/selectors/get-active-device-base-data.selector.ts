/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { createSelector } from "@reduxjs/toolkit"
import { deviceManagerState } from "Core/device-manager/selectors/device-manager-state.selector"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"
import { DeviceState, HarmonyDeviceData, KompaktDeviceData, PureDeviceData } from "Core/device"
import { deviceStateSelector } from "Core/device/selectors"

export interface DeviceBaseData
  extends DeviceBaseProperties,
    Pick<DeviceState, | "externalUsageDevice"> {
  data: Partial<PureDeviceData | HarmonyDeviceData | KompaktDeviceData>
}

export const getActiveDeviceBaseDataSelector = createSelector(
  deviceManagerState,
  deviceStateSelector,
  (deviceManager, deviceState): DeviceBaseData | undefined => {
    const { devices, activeDeviceId } = deviceManager
    const activeDevice = devices.find(({ id }) => id === activeDeviceId)

    if(activeDevice === undefined){
      return
    }

    const {data, externalUsageDevice} = deviceState

    if(data === null){
      return
    }

    return {
      ...activeDevice,
      data,
      externalUsageDevice
    }
  }
)
