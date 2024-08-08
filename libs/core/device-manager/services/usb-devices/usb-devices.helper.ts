/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getUsbDevicesLinux } from "./usb-devices-linux.helper"
import { getUsbDevicesMacOS } from "./usb-devices-mac.helper"
import { getUsbDevicesWindows } from "./usb-devices-windows.helper"
import { PortInfo } from "serialport"

export async function getUsbDevices(): Promise<void | PortInfo> {
  try {
    if (process.platform === "darwin") {
      return await getUsbDevicesMacOS()
    } else if (process.platform === "linux") {
      return await getUsbDevicesLinux()
    } else if (process.platform === "win32") {
      return await getUsbDevicesWindows()
    }
  } catch (error) {
    console.error("During USB device detection, an error occured: ", error)
  }
}
