/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestResponse } from "App/core/types/request-response.interface"
import {
  DeviceServiceEvent,
  DeviceCommunicationEvent,
} from "App/device/constants"
import {
  RequestConfig,
  GetDeviceInfoResponseBody,
} from "App/device/types/mudita-os"

export interface DeviceStrategy {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  connect(): Promise<RequestResponse<GetDeviceInfoResponseBody>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  disconnect(): Promise<boolean>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request(config: RequestConfig<any>): Promise<RequestResponse>
  on(
    eventName: DeviceServiceEvent,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (path: string, ...args: any[]) => void
  ): void
  off(
    eventName: DeviceServiceEvent,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (path: string, ...args: any[]) => void
  ): void

  onCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void
  offCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void
}
