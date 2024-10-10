/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export interface waitForFlashCompletionOption {
  intervalAttemptsLeft?: number
  intervalTime?: number
  signal?: AbortSignal
}

interface IDeviceFlash {
  findDeviceByDeviceName(deviceName?: string): Promise<string>

  execute(device: string, imagePath: string, scriptPath: string): Promise<void>

  waitForFlashCompletion(option?: waitForFlashCompletionOption): Promise<boolean>
}

export default IDeviceFlash
