/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiRequestPayload,
  DeviceEventName,
  McSerialPortDevice,
  RequestConfig,
  RequestPayload,
  Response,
  ResponseStatus,
} from "./device.types"
import { DeviceType } from "./constants"

export const timeoutMs = 30000

class BaseDevice implements McSerialPortDevice {
  constructor(
    private baseMcSerialPortDevice: McSerialPortDevice,
    public path: string,
    public deviceType: DeviceType
  ) {}

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
}

export default BaseDevice
