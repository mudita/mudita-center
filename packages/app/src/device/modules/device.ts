/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "App/core/builder"
import { DeviceType, DeviceCommunicationEvent } from "App/device/constants"
import { RequestConfig } from "App/device/types/mudita-os"
import { DeviceStrategy } from "App/device/strategies/device-strategy.class"

export class Device {
  constructor(
    public path: string,
    public deviceType: DeviceType,
    private strategy: DeviceStrategy
  ) {}

  public async connect(): Promise<ResultObject<boolean>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.strategy.connect()
  }

  public async disconnect(): Promise<ResultObject<boolean>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.strategy.disconnect()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<ResultObject<any>> {
    return this.strategy.request(config)
  }

  public on(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.strategy.on(eventName, listener)
  }

  public off(eventName: DeviceCommunicationEvent, listener: () => void): void {
    this.strategy.on(eventName, listener)
  }
}
