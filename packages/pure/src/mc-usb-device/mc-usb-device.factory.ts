/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McUsbDeviceService } from "./mc-usb-device.service"
import { UsbDeviceFactory } from "./usb-device.factory"

export class McUsbDeviceFactory {
  static async create(filter: USBDeviceFilter): Promise<McUsbDeviceService> {
    const usbDeviceService = await UsbDeviceFactory.create(filter)

    return new McUsbDeviceService(usbDeviceService)
  }
}
