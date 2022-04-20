/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbFileType, McUsbDevice } from "./device.types"
import UsbDeviceService from "./services/usb-device.service"

class BaseMcUsbDevice implements McUsbDevice {
  constructor(private usbDeviceService: UsbDeviceService) {}
  async getFiles() {
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

export default BaseMcUsbDevice
