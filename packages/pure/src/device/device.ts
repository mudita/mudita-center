/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  RequestConfig,
  Response,
  MuditaDevice,
  DeviceEventName,
} from "./device.types.js"
import { DeviceType } from "./constants/index.js"
import { HarmonyStrategy, PureStrategy } from "./strategies/index.js"

export class Device implements MuditaDevice {
  public path: string
  public deviceType: DeviceType

  constructor(private strategy: HarmonyStrategy | PureStrategy) {
    this.path = this.strategy.path
    this.deviceType = this.strategy.deviceType
  }

  public on(eventName: DeviceEventName, listener: () => void): void {
    return this.strategy.on(eventName, listener)
  }

  public off(eventName: DeviceEventName, listener: () => void): void {
    return this.strategy.off(eventName, listener)
  }

  public async connect(): Promise<Response> {
    return this.strategy.connect()
  }

  public disconnect(): Promise<Response> {
    return this.strategy.disconnect()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<Response<any>> {
    return this.strategy.request(config)
  }
}
