/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

interface IDeviceFlash {
  findDeviceByDeviceName(deviceName?: string): Promise<string>

  execute(device: string, imagePath: string, scriptPath: string): Promise<void>

  waitForFlashCompletion(intervalAttemptsLeft?: number, intervalTime?: number): Promise<boolean>;
}

export default IDeviceFlash
