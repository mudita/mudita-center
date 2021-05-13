/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Contact,
  DeviceEventName,
  DeviceInfo,
  Endpoint,
  GetThreadResponseBody,
  GetThreadsBody,
  Method,
  PureDevice,
  PureDeviceManager,
  RequestConfig,
  Response,
  ResponseStatus,
} from "@mudita/pure"
import { EventEmitter } from "events"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { MainProcessIpc } from "electron-better-ipc"

export enum DeviceServiceEventName {
  DeviceConnected = "deviceConnected",
  DeviceDisconnected = "deviceDisconnected",
}

class DeviceService {
  device: PureDevice | undefined
  private blockedInterval: NodeJS.Timeout | undefined
  private eventEmitter = new EventEmitter()

  constructor(
    private deviceManager: PureDeviceManager,
    private ipcMain: MainProcessIpc
  ) {}

  public init(): DeviceService {
    this.registerAttachDeviceListener()
    return this
  }

  async request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<DeviceResponse<DeviceInfo>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: { count: number }
  }): Promise<DeviceResponse<{ entries: Contact[]; totalCount: number }>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetThreadsBody
  }): Promise<DeviceResponse<GetThreadResponseBody>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Post
    body: Contact
  }): Promise<DeviceResponse<Contact>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Put
    body: Contact
  }): Promise<DeviceResponse<Contact>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Delete
    body: Contact["id"]
  }): Promise<DeviceResponse<string>>
  async request(config: {
    endpoint: Endpoint.DeviceUpdate
    method: Method.Post
    filePath: string
  }): Promise<DeviceResponse>
  async request(config: {
    endpoint: Endpoint.FileUpload
    method: Method.Post
    filePath: string
  }): Promise<DeviceResponse>
  async request(config: RequestConfig): Promise<DeviceResponse<unknown>> {
    if (!this.device) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const eventName = JSON.stringify(config)

    if (!this.eventEmitter.eventNames().includes(eventName)) {
      void this.device
        .request(config)
        .then((response) => DeviceService.mapToDeviceResponse(response))
        .then((response) => {
          this.eventEmitter.emit(eventName, response)
          this.emitDeviceUnblockedEvent(response)
        })
    }

    return new Promise((resolve) => {
      const listener = (response: DeviceResponse<unknown>) => {
        this.eventEmitter.off(eventName, listener)
        resolve(response)
      }

      this.eventEmitter.on(eventName, listener)
    })
  }

  public async connect(): Promise<DeviceResponse> {
    if (this.device) {
      return {
        status: DeviceResponseStatus.Ok,
      }
    }

    const [device] = await this.deviceManager.getDevices()

    if (device) {
      return this.deviceConnect(device)
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  public async disconnect(): Promise<DeviceResponse> {
    if (!this.device) {
      return {
        status: DeviceResponseStatus.Ok,
      }
    }

    const [device] = await this.deviceManager.getDevices()

    if (device) {
      const { status } = await device.disconnect()
      if (status === ResponseStatus.Ok) {
        this.clearSubscriptions()
        return {
          status: DeviceResponseStatus.Ok,
        }
      } else {
        return {
          status: DeviceResponseStatus.Error,
        }
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  public on(eventName: DeviceServiceEventName, listener: () => void): void {
    this.eventEmitter.on(eventName, listener)
  }

  public off(eventName: DeviceServiceEventName, listener: () => void): void {
    this.eventEmitter.off(eventName, listener)
  }

  public sendToRenderers(eventName: string, data: any): void {
    this.ipcMain.sendToRenderers(eventName, data)
  }

  private getUnblockedStatusRequest(): Promise<DeviceResponse<any>> {
    return this.request({
      endpoint: Endpoint.DeviceInfo,
      method: Method.Get,
    })
  }

  private registerAttachDeviceListener(): void {
    this.deviceManager.onAttachDevice(async (device) => {
      if (!this.device) {
        const { status } = await this.deviceConnect(device)

        if (status === DeviceResponseStatus.Ok) {
          this.eventEmitter.emit(DeviceServiceEventName.DeviceConnected)
          this.ipcMain.sendToRenderers(IpcEmitter.DeviceConnected)
        }
      }
    })
  }

  private async deviceConnect(device: PureDevice): Promise<DeviceResponse> {
    const { status } = await device.connect()
    if (status === ResponseStatus.Ok) {
      this.device = device

      this.registerDeviceDisconnectedListener()
      this.registerDeviceBlockedListener()

      return {
        status: DeviceResponseStatus.Ok,
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private registerDeviceBlockedListener(): void {
    void this.getUnblockedStatusRequest()
    this.blockedInterval = setInterval(
      () => void this.getUnblockedStatusRequest(),
      10000
    )
  }

  private registerDeviceDisconnectedListener(): void {
    if (this.device) {
      this.device.on(DeviceEventName.Disconnected, () => {
        this.clearSubscriptions()
      })
    }
  }

  private clearSubscriptions(): void {
    this.device = undefined
    this.blockedInterval && clearInterval(this.blockedInterval)
    this.eventEmitter.emit(DeviceServiceEventName.DeviceDisconnected)
    this.ipcMain.sendToRenderers(IpcEmitter.DeviceDisconnected)
  }

  private emitDeviceUnblockedEvent({ status }: DeviceResponse<unknown>): void {
    if (status === DeviceResponseStatus.Error) {
      return
    }

    status !== DeviceResponseStatus.PhoneBlocked
      ? this.ipcMain.sendToRenderers(IpcEmitter.DeviceUnblocked)
      : this.ipcMain.sendToRenderers(IpcEmitter.DeviceBlocked)
  }

  private static mapToDeviceResponse(
    response: Response<unknown>
  ): DeviceResponse<unknown> {
    const { status, body: data, error } = response
    if (status === ResponseStatus.Ok || status === ResponseStatus.Accepted) {
      return {
        data,
        status: DeviceResponseStatus.Ok,
      }
    } else if (status === ResponseStatus.PhoneLocked) {
      return {
        error,
        status: DeviceResponseStatus.PhoneBlocked,
      }
    } else {
      return {
        error,
        status: DeviceResponseStatus.Error,
      }
    }
  }
}

export const createDeviceService = (
  deviceManager: PureDeviceManager,
  ipcMain: MainProcessIpc
): DeviceService => {
  return new DeviceService(deviceManager, ipcMain).init()
}

export default DeviceService
