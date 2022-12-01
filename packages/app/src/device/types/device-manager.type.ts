/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDevice } from "App/device/types/serial-port-device.type"

export interface DeviceManager {
  getDevices(): Promise<SerialPortDevice[]>
  onAttachDevice(listener: (event: SerialPortDevice) => void): void
  offAttachDevice(listener: (event: SerialPortDevice) => void): void
}
