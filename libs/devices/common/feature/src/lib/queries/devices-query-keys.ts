/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDeviceInfo } from "app-serialport/models"

type Path = SerialPortDeviceInfo["path"]

export const devicesQueryKeys = {
  all: ["devices"],
  _device: (path?: Path) => [...devicesQueryKeys.all, path],
  deviceConfig: (path?: Path) => [...devicesQueryKeys._device(path), "config"],
  deviceMetadata: (path?: Path) => [
    ...devicesQueryKeys._device(path),
    "metadata",
  ],
  deviceMenu: (path?: Path) => [...devicesQueryKeys._device(path), "menu"],
  deviceStatus: (path?: Path) => [...devicesQueryKeys._device(path), "status"],
  activeDevice: () => [...devicesQueryKeys.all, "active"],
}
