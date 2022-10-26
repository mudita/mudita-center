/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import { DeviceCommunicationEvent } from "App/device/constants"
import { RequestConfig } from "App/device/types/mudita-os"

export interface DeviceStrategy {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(): Promise<ResultObject<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disconnect(): Promise<ResultObject<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(config: RequestConfig<any>): Promise<ResultObject<any>>
  on(eventName: DeviceCommunicationEvent, listener: () => void): void
  off(eventName: DeviceCommunicationEvent, listener: () => void): void
}
