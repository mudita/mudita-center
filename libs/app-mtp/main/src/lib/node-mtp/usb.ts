/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceEvents, usb as nodeUSB, WebUSB, WebUSBDevice } from "usb"

type WebUSBInstance = InstanceType<typeof WebUSB>

type WebUSBWithWebUSBDevice = Omit<WebUSBInstance, "getDevices"> & {
  getDevices: (
    ...args: Parameters<WebUSBInstance["getDevices"]>
  ) => Promise<WebUSBDevice[]>
}

export const usb = new WebUSB({
  // Bypass checking for authorised devices
  allowAllDevices: true,
}) as unknown as WebUSBWithWebUSBDevice

export class UsbDetect {
  static set ondetach(fn: (arg: DeviceEvents["detach"]) => void) {
    nodeUSB.on("detach", fn)
  }
}
