/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbDeviceClass } from "./mc-usb-device.class"
import { McUsbFile, McUsbFileType } from "./mc-usb-file.interface"
import { UsbDeviceService } from "./usb-device.service"

export class McUsbDevice implements McUsbDeviceClass {
  constructor(private usbDeviceService: UsbDeviceService) {}
  async getFiles(): Promise<McUsbFile[]> {
    const handles = await this.usbDeviceService.getObjectHandles()
    return [
      {
        id: handles[0],
        size: 1234,
        name: "example_file_name.mp3",
        type: McUsbFileType.mp3,
      },
      {
        id: handles[0],
        size: 10500,
        name: "example_file_name.mp4",
        type: McUsbFileType.undefined,
      },
    ]
  }
}

