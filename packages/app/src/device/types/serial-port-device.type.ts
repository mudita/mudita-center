/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceEventName } from "@mudita/pure"
import { DeviceType } from "App/device/constants"
import { RequestConfig, Response } from "App/device/types/mudita-os"

export interface SerialPortDevice {
  path: string
  deviceType: DeviceType
  connect(): Promise<Response>
  disconnect(): Promise<Response>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(config: RequestConfig<any>): Promise<Response<any>>
  on(eventName: DeviceEventName, listener: () => void): void
  off(eventName: DeviceEventName, listener: () => void): void
}
