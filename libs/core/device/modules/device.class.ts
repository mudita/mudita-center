/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { ResultObject } from "Core/core/builder"
import { RequestConfig, Response } from "Core/device/types/mudita-os"
import { DeviceCommunicationEvent } from "Core/device/constants"

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
