/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { RequestResponse, RequestResponseStatus } from "Core/core/types"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"
import { DeviceInfo, RequestConfig } from "../types/mudita-os"
import { BaseAdapter } from "Core/device/modules/base.adapter"
import {
  GetDeviceInfoResponseBody,
  GetDeviceInfoRequestConfig,
} from "Core/device/types/mudita-os"
import {
  Method,
  Endpoint,
  DeviceCommunicationEvent,
  DeviceServiceEvent,
} from "Core/device/constants"
import { ResponseKompaktPresenter } from "Core/device/modules/mudita-os/presenters"

export class KompaktStrategy implements DeviceStrategy {
  private eventEmitter = new EventEmitter()
  private lockedInterval: NodeJS.Timeout | undefined

  constructor(private adapter: BaseAdapter) {
    EventEmitter.defaultMaxListeners = 15
    this.mountDisconnectionListener()
    this.mountInitializationFailedListener()
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async connect(): Promise<RequestResponse<DeviceInfo, any>> {
    const response = await this.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    if (
      response.status === RequestResponseStatus.Ok ||
      response.status === RequestResponseStatus.PhoneLocked
    ) {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceConnected)
    }

    return response
  }

  public async request(
    config: GetDeviceInfoRequestConfig
  ): Promise<RequestResponse<GetDeviceInfoResponseBody>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  async request(config: RequestConfig<any>): Promise<RequestResponse> {
    let result = {
      status: RequestResponseStatus.Ok,
      data: undefined,
      error: undefined,
    } as RequestResponse
    //CP-1668 - this condition until Kompakt has limited endpoint support, currently only device info endpoint (10.08.2023)
    if ([Endpoint.DeviceInfo].includes(config.endpoint)) {
      const response = await this.adapter.request(config)
      result = ResponseKompaktPresenter.toResponseObject(response)
    }

    this.emitUnlockEvent()
    return result
  }
  on(
    eventName: DeviceServiceEvent,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (path: string, ...args: any[]) => void
  ): void {
    this.eventEmitter.on(eventName, listener)
  }
  off(
    eventName: DeviceServiceEvent,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (path: string, ...args: any[]) => void
  ): void {
    this.eventEmitter.off(eventName, listener)
  }
  onCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    this.adapter.on(eventName, listener)
  }
  offCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    this.adapter.off(eventName, listener)
  }

  private unmountDeviceUnlockedListener(): void {
    clearInterval(this.lockedInterval)
  }

  private mountDisconnectionListener(): void {
    this.onCommunicationEvent(DeviceCommunicationEvent.Disconnected, () => {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected)
      this.unmountDeviceUnlockedListener()
    })
  }

  private mountInitializationFailedListener(): void {
    this.onCommunicationEvent(
      DeviceCommunicationEvent.InitializationFailed,
      () => {
        this.eventEmitter.emit(DeviceServiceEvent.DeviceInitializationFailed)
      }
    )
  }

  private emitUnlockEvent(): void {
    this.eventEmitter.emit(DeviceServiceEvent.DeviceUnlocked)
  }
}
