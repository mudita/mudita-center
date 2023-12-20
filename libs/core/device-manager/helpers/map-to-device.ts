/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Device,
  DeviceState,
  InitializationOptions,
} from "Core/device-manager/reducers/device-manager.interface"
import { DeviceType } from "Core/device"
import { DeviceBaseProperties } from "Core/device/constants/device-base-properties"

const getInitializationOptionsByDeviceType = (
  deviceType: DeviceType
): InitializationOptions => {
  return {
    eula: false,
    sync: false,
    passcode: false,
  }
}

export const mapToDevice = (properties: DeviceBaseProperties): Device => {
  return {
    ...properties,
    state: DeviceState.Connected,
    initializationOptions: getInitializationOptionsByDeviceType(
      properties.deviceType
    ),
  }
}
