/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { getUsbDevicesLinux } from "./usb-devices-linux.helper"
import { getUsbDevicesMacOS } from "./usb-devices-mac.helper"

export async function getUsbDevices() {
  if (process.platform === "darwin") {
    return await getUsbDevicesMacOS()
  } else if (process.platform === "linux") {
    return await getUsbDevicesLinux()
  } else {
    return []
  }
}
