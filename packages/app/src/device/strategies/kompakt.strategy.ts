/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import { RequestResponse, RequestResponseStatus } from "App/core/types"
import { DeviceStrategy } from "App/device/strategies/device-strategy.class"
import { DeviceInfo, RequestConfig } from "../types/mudita-os"
import { BaseAdapter } from "App/device/modules/base.adapter"
import {
  GetDeviceInfoResponseBody,
  GetDeviceInfoRequestConfig,
} from "App/device/types/mudita-os"
import {
  BatteryState,
  SIM,
  SignalStrength,
  NetworkStatus,
  Tray,
  Method,
  Endpoint,
  DeviceCommunicationEvent,
  DeviceServiceEvent,
} from "App/device/constants"

export class KompaktStrategy implements DeviceStrategy {
  private eventEmitter = new EventEmitter()
  private lockedInterval: NodeJS.Timeout | undefined

  constructor(private adapter: BaseAdapter) {
    EventEmitter.defaultMaxListeners = 15
    //this.mountDeviceUnlockedListener()
    this.mountDisconnectionListener()
    this.mountInitializationFailedListener()
  }

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
  async disconnect(): Promise<boolean> {
    const response = await this.adapter.disconnect()

    //this.unmountDeviceUnlockedListener()
    this.unmountDisconnectionListener()
    this.unmountInitializationFailedListener()
    this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected)

    return Boolean(response.data)
  }
  public async request(
    config: GetDeviceInfoRequestConfig
  ): Promise<RequestResponse<GetDeviceInfoResponseBody>>
  async request(config: RequestConfig<any>): Promise<RequestResponse> {
    //throw new Error("Method not implemented.")
    //this.adapter.request(config)
    //serialize response and return it

    //right now we have mocked result from endpoint, should be changed when endpoint is ready
    return {
      data: {
        accessTechnology: "255",
        backupFilePath: "/user/temp/backup.tar",
        batteryLevel: "12",
        batteryState: BatteryState.Charging,
        caseColour: "black",
        currentRTCTime: "1686307333",
        deviceSpaceTotal: "14951",
        deviceToken: "RIQLcvFFgl8ibFcHwBO3Ev0YTa2vxfbI",
        gitBranch: "HEAD",
        gitRevision: "4cd97006",
        mtpPath: "/user/media/app/music_player",
        version: "1.6.0",
        selectedSim: SIM.None,
        signalStrength: SignalStrength.Five,
        networkOperatorName: "",
        networkStatus: NetworkStatus.NotRegistered,
        recoveryStatusFilePath: "/user/temp/recovery_status.json",
        serialNumber: "27131961421012",
        syncFilePath: "/user/temp/sync.tar",
        systemReservedSpace: "2048",
        trayState: Tray.Out,
        updateFilePath: "/user/temp/update.tar",
        usedUserSpace: "438",
      },
      status: RequestResponseStatus.Ok,
    }
  }
  on(
    eventName: DeviceServiceEvent,
    listener: (path: string, ...args: any[]) => void
  ): void {
    this.eventEmitter.on(eventName, listener)
  }
  off(
    eventName: DeviceServiceEvent,
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

  private mountDeviceUnlockedListener(): void {
    throw new Error("Method not implemented.")

    //here we need another endpoint on Kompakt
    // void this.getUnlockedStatusRequest()
    // this.lockedInterval = setInterval(() => {
    //   void this.getUnlockedStatusRequest()
    // }, 10000)
  }

  private unmountDeviceUnlockedListener(): void {
    clearInterval(this.lockedInterval)
  }

  private getUnlockedStatusRequest(): Promise<RequestResponse> {
    throw new Error("Method not implemented.")
    // return this.request({
    //   endpoint: Endpoint.Security,
    //   method: Method.Get,
    //   body: { category: PhoneLockCategory.Status },
    // })
  }

  private mountDisconnectionListener(): void {
    this.onCommunicationEvent(DeviceCommunicationEvent.Disconnected, () => {
      this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected)
      this.unmountDeviceUnlockedListener()
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
