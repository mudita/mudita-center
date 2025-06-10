/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum SerialPortIpcEvents {
  DevicesChanged = "serialport:devices-changed",
  GetCurrentDevices = "serialport:get-current-devices",
  Request = "serialport:request",
  ChangeBaudRate = "serialport:change-baud-rate",
}
