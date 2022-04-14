/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { usb } from "webusb"
import {
  UsbResponse,
  UsbDeviceFacadeClass,
  WriteOption,
} from "./usb-device.facade.class"

export class UsbDeviceFacade implements UsbDeviceFacadeClass {
  constructor(private device: USBDevice) {
    console.log(device)
  }

  async write(option: WriteOption): Promise<any | undefined> {
    return undefined
  }

  async readData(): Promise<UsbResponse | undefined> {
    return undefined
  }

  static async getUsbDevice(
    filter: USBDeviceFilter
  ): Promise<USBDevice | undefined> {
    const devices = await usb.getDevices()

    let device = devices.find(
      ({ serialNumber }) => serialNumber === filter.serialNumber
    )

    if (device === undefined) {
      device = await usb.requestDevice({
        filters: [filter],
      })
    }
    return device
  }
}
