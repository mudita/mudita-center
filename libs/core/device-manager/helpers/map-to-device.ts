/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Device,
  DeviceBaseProperty,
  DeviceState,
  InitializationOptions,
} from "Core/device-manager/reducers/device-manager.interface"
import { DeviceType } from "Core/device"

const getInitializationOptionsByDeviceType = (
  type: DeviceType
): InitializationOptions => {
  return {
    eula: false,
    sync: false,
    passcode: false,
  }
}

export const mapToDevice = (property: DeviceBaseProperty): Device => {
  return {
    id: property.serialNumber,
    serialNumber: property.serialNumber,
    type: property.deviceType,
    state: DeviceState.Connected,
    initializationOptions: getInitializationOptionsByDeviceType(
      property.deviceType
    ),
  }
}
