/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export type FlashStatusType =
  | "FLASH_STATUS_COMPLETED"
  | "FLASH_STATUS_FAILED"
  | "FLASH_STATUS_IDLE"

interface IDeviceFlash {
  findDeviceByDeviceName(deviceName?: string): Promise<string>

  execute(
    device: string,
    imagePath: string,
    scriptPath: string,
    mscHarmonyAbsoluteDir?: string
  ): Promise<void>

  getFlashStatus?(mscHarmonyAbsoluteDir: string): Promise<FlashStatusType>
}

export default IDeviceFlash
