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
    return handles.map((handle) => ({
      id: handle,
      size: 1234,
      name: "example_file_name",
      type: McUsbFileType.mp3,
    }))
  }
}

export default BaseMcUsbDevice
