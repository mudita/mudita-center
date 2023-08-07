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
  Response,
} from "App/device/types/mudita-os"
import {
  SIM,
  Tray,
  Method,
  Endpoint,
  DeviceCommunicationEvent,
  DeviceServiceEvent,
} from "App/device/constants"
import { ResultObject } from "App/core/builder"
import { BodyKompakt } from "App/device/types/kompakt/body-kompakt.type"

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
  async disconnect(): Promise<boolean> {
    const response = await this.adapter.disconnect()

    this.unmountDisconnectionListener()
    this.unmountInitializationFailedListener()
    this.eventEmitter.emit(DeviceServiceEvent.DeviceDisconnected)

    return Boolean(response.data)
  }
  public async request(
    config: GetDeviceInfoRequestConfig
  ): Promise<RequestResponse<GetDeviceInfoResponseBody>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  async request(config: RequestConfig<any>): Promise<RequestResponse> {
    const response = await this.adapter.request(config)
    const data = response.data as Response<BodyKompakt>

    const simCard = data.body?.simCards[0]

    //CP-1668-TODO
    //Changes in model cause right now we will have more sim cards?
    return {
      data: {
        //from device
        serialNumber: data.body?.serialNumber,
        batteryLevel: data.body?.batteryCapacity,
        batteryState: data.body?.batteryState,
        version: data.body?.version,
        signalStrength: simCard?.signalStrength,
        networkOperatorName: simCard?.networkOperatorName,
        networkStatus: simCard?.networkStatus,

        //mocked
        accessTechnology: "255",
        backupFilePath: "/user/temp/backup.tar",
        caseColour: "black",
        currentRTCTime: "1686307333",
        deviceSpaceTotal: "14951",
        deviceToken: "RIQLcvFFgl8ibFcHwBO3Ev0YTa2vxfbI",
        gitBranch: "HEAD",
        gitRevision: "4cd97006",
        mtpPath: "/user/media/app/music_player",
        selectedSim: SIM.None,
        recoveryStatusFilePath: "/user/temp/recovery_status.json",
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

  private mountDeviceUnlockedListener(): void {
    throw new Error("Method not implemented.")
  }

  private unmountDeviceUnlockedListener(): void {
    clearInterval(this.lockedInterval)
  }

  private getUnlockedStatusRequest(): Promise<RequestResponse> {
    throw new Error("Method not implemented.")
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
