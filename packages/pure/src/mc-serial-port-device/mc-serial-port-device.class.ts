/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceEventName, DeviceType } from "../device"
import { RequestConfig, Response } from "./types"

export interface McSerialPortDeviceClass {
  path: string
  deviceType: DeviceType
  connect(): Promise<Response>
  disconnect(): Promise<Response>
  request(config: RequestConfig<any>): Promise<Response<any>>
  on(eventName: DeviceEventName, listener: () => void): void
  off(eventName: DeviceEventName, listener: () => void): void
}
