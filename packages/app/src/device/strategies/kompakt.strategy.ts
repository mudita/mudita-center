/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { RequestResponse } from "App/core/types"
import { DeviceStrategy } from "App/device/strategies/device-strategy.class"
import { DeviceServiceEvent, DeviceCommunicationEvent } from "../constants"
import { DeviceInfo, RequestConfig } from "../types/mudita-os"
import { BaseAdapter } from "App/device/modules/base.adapter"

export class KompaktStrategy implements DeviceStrategy {
  private eventEmitter = new EventEmitter()
  private lockedInterval: NodeJS.Timeout | undefined

  //   constructor(private adapter: BaseAdapter) {
  //     EventEmitter.defaultMaxListeners = 15
  //     this.mountDeviceUnlockedListener()
  //     this.mountDisconnectionListener()
  //     this.mountInitializationFailedListener()
  //   }

  connect(): Promise<RequestResponse<DeviceInfo, any>> {
    throw new Error("Method not implemented.")
  }
  disconnect(): Promise<boolean> {
    throw new Error("Method not implemented.")
  }
  request(config: RequestConfig<any>): Promise<RequestResponse<unknown, any>> {
    throw new Error("Method not implemented.")
  }
  on(
    eventName: DeviceServiceEvent,
    listener: (path: string, ...args: any[]) => void
  ): void {
    throw new Error("Method not implemented.")
  }
  off(
    eventName: DeviceServiceEvent,
    listener: (path: string, ...args: any[]) => void
  ): void {
    throw new Error("Method not implemented.")
  }
  onCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    throw new Error("Method not implemented.")
  }
  offCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    throw new Error("Method not implemented.")
  }
}
