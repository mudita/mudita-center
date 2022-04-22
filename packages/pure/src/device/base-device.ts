/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { McSerialPortDeviceClass } from "../mc-serial-port-device/mc-serial-port-device.class"
import { McUsbDeviceClass } from "../mc-usb-device/mc-usb-device.class"
import { McUsbFile } from "../mc-usb-device/mc-usb-file.interface"
import { RequestConfig, Response } from "../mc-serial-port-device/types"
import { ObjectResult } from "../mc-usb-device/usb-device.service"
import { MuditaDevice, DeviceEventName } from "./mudita-device"

export const timeoutMs = 30000

class BaseDevice implements MuditaDevice {
  constructor(
    private mcSerialPortDevice: McSerialPortDeviceClass,
    private mcUsbDevice: McUsbDeviceClass
  ) {}
  get path() {
    return this.mcSerialPortDevice.path
  }
  get deviceType() {
    return this.mcSerialPortDevice.deviceType
  }
  connect(): Promise<Response> {
    return this.mcSerialPortDevice.connect()
  }
  disconnect(): Promise<Response> {
    return this.mcSerialPortDevice.disconnect()
  }
  request(config: RequestConfig<any>): Promise<Response<any>> {
    return this.mcSerialPortDevice.request(config)
  }
  on(eventName: DeviceEventName, listener: () => void): void {
    return this.mcSerialPortDevice.on(eventName, listener)
  }
  off(eventName: DeviceEventName, listener: () => void): void {
    return this.mcSerialPortDevice.off(eventName, listener)
  }
  getFiles(): Promise<ObjectResult<McUsbFile[]>> {
    return this.mcUsbDevice.getFiles()
  }
}

export default BaseDevice
