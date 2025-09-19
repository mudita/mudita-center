/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDeviceId } from "app-serialport/models"
import { DevicesQueryKeys } from "devices/common/models"

export const devicesQueryKeys = {
  all: [DevicesQueryKeys.All],
  _device: (id?: SerialPortDeviceId) => [...devicesQueryKeys.all, id],
  deviceConfig: (id?: SerialPortDeviceId) => [
    ...devicesQueryKeys._device(id),
    "config",
  ],
  deviceMetadata: (id?: SerialPortDeviceId) => [
    ...devicesQueryKeys._device(id),
    "metadata",
  ],
  deviceMenu: (id?: SerialPortDeviceId) => [
    ...devicesQueryKeys._device(id),
    "menu",
  ],
  deviceStatus: (id?: SerialPortDeviceId) => [
    ...devicesQueryKeys._device(id),
    "status",
  ],
  activeDevice: () => [...devicesQueryKeys.all, "active"],
}
