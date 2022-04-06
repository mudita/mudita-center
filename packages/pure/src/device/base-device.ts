/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DeviceEventName,
  McSerialPortDevice,
  RequestConfig,
  Response,
  McUsbFile,
  McUsbDevice,
} from "./device.types"

export const timeoutMs = 30000

class BaseDevice implements McSerialPortDevice, McUsbDevice {
  constructor(
    private baseMcSerialPortDevice: McSerialPortDevice,
    private baseMcUsbDevice: McUsbDevice
  ) {}
  get path() {
    return this.baseMcSerialPortDevice.path
  }
  get deviceType() {
    return this.baseMcSerialPortDevice.deviceType
  }
  connect(): Promise<Response> {
    return this.baseMcSerialPortDevice.connect()
  }
  disconnect(): Promise<Response> {
    return this.baseMcSerialPortDevice.disconnect()
  }
  request(config: RequestConfig<any>): Promise<Response<any>> {
    return this.baseMcSerialPortDevice.request(config)
  }
  on(eventName: DeviceEventName, listener: () => void): void {
    return this.baseMcSerialPortDevice.on(eventName, listener)
  }
  off(eventName: DeviceEventName, listener: () => void): void {
    return this.baseMcSerialPortDevice.off(eventName, listener)
  }
  getFiles(): Promise<McUsbFile[]> {
    return this.baseMcUsbDevice.getFiles()
  }
}

export default BaseDevice
