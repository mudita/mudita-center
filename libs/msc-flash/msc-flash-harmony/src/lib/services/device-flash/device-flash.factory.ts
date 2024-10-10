/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import IDeviceFlash from "./device-flash.interface"
import LinuxDeviceFlashService from "./linux/linux-device-flash.service"
import MacDeviceFlashService from "./macos/macos-device-flash-service"

class DeviceFlashFactory {
  static createDeviceFlashService(temporaryDirectoryPath: string): IDeviceFlash {
    const platform = process.platform

    if (platform === "linux") {
      return new LinuxDeviceFlashService()
    } else if (platform === "darwin") {
      return new MacDeviceFlashService(temporaryDirectoryPath)
    } else {
      throw new Error(`Unsupported platform: ${platform}`)
    }
  }
}

export default DeviceFlashFactory
