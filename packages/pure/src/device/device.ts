/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  RequestConfig,
  Response,
  MuditaDevice,
  DeviceEventName,
  McUsbFile,
} from "./device.types"
import { DeviceType } from "./constants"
import { HarmonyStrategy, PureStrategy } from "./strategies"

export class Device implements MuditaDevice {
  public path: string
  public deviceType: DeviceType

  constructor(private strategy: HarmonyStrategy | PureStrategy) {
    this.path = this.strategy.path
    this.deviceType = this.strategy.deviceType
  }
  public getFiles(): Promise<McUsbFile[]> {
    return this.strategy.getFiles()
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

  public async request(config: RequestConfig<any>): Promise<Response<any>> {
    return this.strategy.request(config)
  }
}
