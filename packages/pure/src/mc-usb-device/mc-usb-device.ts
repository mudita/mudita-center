/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbDeviceClass } from "./mc-usb-device.class"
import { McUsbFile, McUsbFileType } from "./mc-usb-file.interface"
import { McUsbDeviceService } from "./mc-usb-device.service"
import { ObjectResult } from "./usb-device.service"

export class McUsbDevice implements McUsbDeviceClass {
  constructor(private mcUsbDeviceService: McUsbDeviceService) {}
  async getFiles(): Promise<ObjectResult<McUsbFile[]>> {
    const openSessionResult = await this.mcUsbDeviceService.openSession()
    if (!openSessionResult.success) {
      return {
        success: false,
      }
    }

    const getObjectHandlesResult =
      await this.mcUsbDeviceService.getObjectHandles()

    if (!getObjectHandlesResult.success) {
      return {
        success: false,
      }
    }
    await this.mcUsbDeviceService.closeSession()
    return {
      success: true,
      data:
        getObjectHandlesResult.data?.map((handle) => ({
          id: handle,
          size: 1234,
          name: "example_file_name",
          type: McUsbFileType.mp3,
        })) ?? [],
    }
  }
}
