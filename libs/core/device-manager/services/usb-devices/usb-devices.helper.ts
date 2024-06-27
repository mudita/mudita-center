/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getUsbDevicesLinux } from "./usb-devices-linux.helper"
import { getUsbDevicesMacOS } from "./usb-devices-mac.helper"
import { getUsbDevicesWindows } from "./usb-devices-windows.helper"

export async function getUsbDevices() {
  if (process.platform === "darwin") {
    return await getUsbDevicesMacOS()
  } else if (process.platform === "linux") {
    return await getUsbDevicesLinux()
  } else if (process.platform === "win32") {
    return await getUsbDevicesWindows()
  } else {
    return []
  }
}
