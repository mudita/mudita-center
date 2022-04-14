/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { UsbDeviceService } from "./usb-device.service"
import { UsbDeviceFacade } from "./usb-device.facade"
import { UsbDeviceFacadeClass, WriteOption } from "./usb-device.facade.class"

class UsbDeviceFacadeMock implements UsbDeviceFacadeClass {
  async readData(): Promise<undefined> {
    return undefined
  }

  async write(): Promise<undefined> {
    return undefined
  }

  async openSession(): Promise<undefined> {
    return undefined
  }

  async closeSession(): Promise<undefined> {
    return undefined
  }
}

export class UsbDeviceFactory {
  static async create(filter: USBDeviceFilter): Promise<UsbDeviceService> {
    const device = await UsbDeviceFacade.getUsbDevice(filter)
    console.log("device: ", device)
    console.log("device === undefined: ", device === undefined)

    const usbFacade =
      device === undefined
        ? new UsbDeviceFacadeMock()
        : new UsbDeviceFacade(device)
    return new UsbDeviceService(usbFacade)
  }
}
