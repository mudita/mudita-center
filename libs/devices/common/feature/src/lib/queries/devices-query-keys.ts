/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDevicePath } from "app-serialport/models"
import { DevicesQueryKeys } from "devices/common/models"

export const devicesQueryKeys = {
  all: [DevicesQueryKeys.All],
  _device: (path?: SerialPortDevicePath) => [...devicesQueryKeys.all, path],
  deviceConfig: (path?: SerialPortDevicePath) => [
    ...devicesQueryKeys._device(path),
    "config",
  ],
  deviceMetadata: (path?: SerialPortDevicePath) => [
    ...devicesQueryKeys._device(path),
    "metadata",
  ],
  deviceMenu: (path?: SerialPortDevicePath) => [
    ...devicesQueryKeys._device(path),
    "menu",
  ],
  deviceStatus: (path?: SerialPortDevicePath) => [
    ...devicesQueryKeys._device(path),
    "status",
  ],
  activeDevice: () => [...devicesQueryKeys.all, "active"],
}
