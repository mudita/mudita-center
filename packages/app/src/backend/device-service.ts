/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  PureDevice,
  PureDeviceManager,
  Response,
  Endpoint,
  DeviceEventName,
  Method,
  RequestConfig,
  ResponseStatus,
  Contact,
  DeviceInfo,
  GetThreadResponseBody,
  GetThreadsBody,
} from "@mudita/pure"
import { EventEmitter } from "events"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { MainProcessIpc } from "electron-better-ipc"

export enum DeviceServiceEventName {
  ConnectedDevice = "connectedDevice",
  DisconnectedDevice = "disconnectedDevice",
}

class DeviceService {
  device: PureDevice | undefined
  private eventEmitter = new EventEmitter()

  constructor(
    private deviceManager: PureDeviceManager,
    private ipcMain: MainProcessIpc
  ) {}

  public init() {
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
  async request(config: RequestConfig): Promise<DeviceResponse<any>>
  async request(config: RequestConfig) {
    return new Promise(async (resolve) => {
      if (!this.device) {
        return resolve({
          status: DeviceResponseStatus.Error,
        })
      }

      const eventName = JSON.stringify(config)

      const listener = (response: Response<any>) => {
        this.eventEmitter.off(eventName, listener)
        const { status, body: data, error } = response
        if (
          status === ResponseStatus.Ok ||
          status === ResponseStatus.Accepted
        ) {
          resolve({
            data,
            status: DeviceResponseStatus.Ok,
          })
        } else {
          resolve({
            error,
            status: DeviceResponseStatus.Error,
          })
        }
      }

      if (this.eventEmitter.eventNames().includes(eventName)) {
        this.eventEmitter.on(eventName, listener)
      } else {
        this.eventEmitter.on(eventName, listener)
        const response = await this.device.request(config)
        this.eventEmitter.emit(eventName, response)
      }
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

  public on(eventName: DeviceServiceEventName, listener: () => void): void {
    this.eventEmitter.on(eventName, listener)
  }

  public off(eventName: DeviceServiceEventName, listener: () => void): void {
    this.eventEmitter.off(eventName, listener)
  }

  public sendToRenderers(eventName: string, data: any): void {
    this.ipcMain.sendToRenderers(eventName, data)
  }

  private registerAttachDeviceListener(): void {
    this.deviceManager.onAttachDevice(async (device) => {
      if (!this.device) {
        const { status } = await this.deviceConnect(device)

        if (status === DeviceResponseStatus.Ok) {
          this.eventEmitter.emit(DeviceServiceEventName.ConnectedDevice)
          this.ipcMain.sendToRenderers(IpcEmitter.ConnectedDevice)
        }
      }
    })
  }

  private async deviceConnect(device: PureDevice): Promise<DeviceResponse> {
    const { status } = await device.connect()
    if (status === ResponseStatus.Ok) {
      this.device = device

      this.registerDisconnectedDeviceListener()

      return {
        status: DeviceResponseStatus.Ok,
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private registerDisconnectedDeviceListener() {
    if (this.device) {
      this.device.on(DeviceEventName.Disconnected, () => {
        this.device = undefined
        this.eventEmitter.emit(DeviceServiceEventName.DisconnectedDevice)
        this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
      })
    }
  }
}

export const createDeviceService = (
  deviceManager: PureDeviceManager,
  ipcMain: MainProcessIpc
) => {
  return new DeviceService(deviceManager, ipcMain).init()
}

export default DeviceService
