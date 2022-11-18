/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import {
  Endpoint,
  Method,
  DeviceCommunicationEvent,
} from "App/device/constants"
import {
  RequestConfig,
  Response,
  GetDeviceInfoRequestConfig,
  GetDeviceInfoResponseBody,
} from "App/device/types/mudita-os"
import { BaseAdapter } from "App/device/modules/base.adapter"
import { DeviceStrategy } from "App/device/strategies/device-strategy.class"

export class HarmonyStrategy implements DeviceStrategy {
  constructor(private adapter: BaseAdapter) {}

  public async connect(): Promise<ResultObject<Response>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.adapter.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
  }

  public async disconnect(): Promise<ResultObject<boolean>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.adapter.disconnect()
  }

  public request(
    config: GetDeviceInfoRequestConfig
  ): Promise<ResultObject<Response<GetDeviceInfoResponseBody>>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<ResultObject<any>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.adapter.request(config)
  }

  public on(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.adapter.on(eventName, listener)
  }

  public off(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.adapter.off(eventName, listener)
  }
}
