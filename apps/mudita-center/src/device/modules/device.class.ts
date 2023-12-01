/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import { RequestConfig, Response } from "App/device/types/mudita-os"
import { DeviceCommunicationEvent, DeviceType } from "App/device/constants"

export interface DeviceFactoryClass {
  path: string
  deviceType: DeviceType
  connect(): Promise<void>
  disconnect(): Promise<void>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(config: RequestConfig<any>): Promise<ResultObject<Response<any>>>
  on(eventName: DeviceCommunicationEvent, listener: () => void): void
  off(eventName: DeviceCommunicationEvent, listener: () => void): void
}
