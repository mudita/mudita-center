/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Platform } from "app-utils/models"
import { platform } from "app-utils/common"
import IDeviceFlash from "./device-flash.interface"
import LinuxDeviceFlashService from "./linux/linux-device-flash.service"
import MacDeviceFlashService from "./macos/macos-device-flash-service"
import WindowsDeviceFlashService from "./windows/windows-device-flash.service"

class DeviceFlashFactory {
  static createDeviceFlashService(): IDeviceFlash {
    if (platform === Platform.linux) {
      return new LinuxDeviceFlashService()
    } else if (platform === Platform.macos) {
      return new MacDeviceFlashService()
    } else if (platform === Platform.windows) {
      return new WindowsDeviceFlashService()
    } else {
      throw new Error(`Unsupported platform: ${platform}`)
    }
  }
}

export default DeviceFlashFactory
