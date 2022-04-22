/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDeviceService } from "./usb-device.service"
import { UsbDeviceFacade } from "./usb-device.facade"
import { UsbDeviceMockFacade } from "./usb-device-mock.facade"

export class UsbDeviceFactory {
  static async create(filter: USBDeviceFilter): Promise<UsbDeviceService> {
    const device = await UsbDeviceFacade.getUsbDevice(filter)

    const usbFacade =
      device === undefined
        ? new UsbDeviceMockFacade()
        : new UsbDeviceFacade(device)
    return new UsbDeviceService(usbFacade)
  }
}
