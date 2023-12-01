/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import {
  Endpoint,
  Method,
  DeviceServiceEvent,
  DeviceCommunicationEvent,
} from "App/device/constants"
import {
  RequestConfig,
  GetDeviceInfoRequestConfig,
  GetDeviceInfoResponseBody,
} from "App/device/types/mudita-os"
import { BaseAdapter } from "App/device/modules/base.adapter"
import { DeviceStrategy } from "App/device/strategies/device-strategy.class"
import { ResponsePresenter } from "App/device/modules/mudita-os/presenters"
import { RequestResponse } from "App/core/types/request-response.interface"

export class HarmonyStrategy implements DeviceStrategy {
  private eventEmitter = new EventEmitter()

  constructor(private adapter: BaseAdapter) {
    EventEmitter.defaultMaxListeners = 15
    this.mountDisconnectionListener()
    this.mountInitializationFailedListener()
  }

  public async connect(): Promise<RequestResponse<GetDeviceInfoResponseBody>> {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const response = await this.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })

    this.eventEmitter.emit(DeviceServiceEvent.DeviceConnected)

    return response
  }

  public request(
    config: GetDeviceInfoRequestConfig
  ): Promise<RequestResponse<GetDeviceInfoResponseBody>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<RequestResponse> {
    const response = await this.adapter.request(config)

    this.emitUnlockEvent()

    return ResponsePresenter.toResponseObject(response)
  }

  public onCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    this.adapter.on(eventName, listener)
  }

  public offCommunicationEvent(
    eventName: DeviceCommunicationEvent,
    listener: () => void
  ): void {
    this.adapter.off(eventName, listener)
  }

  public on(
    eventName: DeviceServiceEvent,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (path: string, ...args: any[]) => void
  ): void {
    this.eventEmitter.on(eventName, listener)
  }

  public off(
    eventName: DeviceServiceEvent,
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    listener: (path: string, ...args: any[]) => void
  ): void {
    this.eventEmitter.off(eventName, listener)
  }

  private emitUnlockEvent(): void {
    this.eventEmitter.emit(DeviceServiceEvent.DeviceUnlocked)
    this.eventEmitter.emit(DeviceServiceEvent.DeviceOnboardingFinished)
  }

  private mountDisconnectionListener(): void {
    this.onCommunicationEvent(DeviceCommunicationEvent.Disconnected, () => {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected)
    })
  }

  private unmountDisconnectionListener(): void {
    this.offCommunicationEvent(DeviceCommunicationEvent.Disconnected, () => {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected)
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

  private unmountInitializationFailedListener(): void {
    this.offCommunicationEvent(
      DeviceCommunicationEvent.InitializationFailed,
      () => {
        this.eventEmitter.emit(DeviceServiceEvent.DeviceInitializationFailed)
      }
    )
  }
}
