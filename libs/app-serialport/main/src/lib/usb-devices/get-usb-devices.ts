/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "@serialport/bindings-interface"
import { MacosUSBPortDeviceParser } from "./macos-usb-port-device-parser"
import { LinuxUSBPortDeviceParser } from "./linux-usb-port-device-parser"
import { WindowsUSBPortDeviceParser } from "./windows-usb-port-device-parser"

export const getUsbDevices = async (): Promise<PortInfo[]> => {
  switch (process.platform) {
    case "darwin":
      return await MacosUSBPortDeviceParser.listUsbDevices()
    case "linux":
      return await LinuxUSBPortDeviceParser.listUsbDevices()
    case "win32":
      return await WindowsUSBPortDeviceParser.listUsbDevices()
    default:
      return []
  }
}
