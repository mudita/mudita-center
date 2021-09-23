/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Contact,
  DeviceEventName,
  DeviceInfo,
  Endpoint,
  DownloadFileSystemRequestConfig,
  GetFileSystemRequestConfig,
  PutFileSystemRequestConfig,
  SendFileSystemRequestConfig,
  GetMessageResponseBody,
  GetMessagesBody,
  GetPhoneLockStatusBody,
  GetPhoneLockTimeBody,
  GetPhoneLockTimeResponseBody,
  GetThreadResponseBody,
  GetThreadsBody,
  Method,
  MuditaDevice,
  MuditaDeviceManager,
  PhoneLockCategory,
  RequestConfig,
  Response,
  ResponseStatus,
  PostMessagesBody,
  PostMessagesResponseBody,
  GetFileListBody,
  GetFileListResponseBody,
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
  public devices: Record<string, MuditaDevice> = {}
  public currentDevice: MuditaDevice | undefined
  private lockedInterval: NodeJS.Timeout | undefined
  private eventEmitter = new EventEmitter()

  constructor(
    private deviceManager: MuditaDeviceManager,
    private ipcMain: MainProcessIpc
  ) {}

  public init(): DeviceService {
    this.registerAttachDeviceListener()
    return this
  }

  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Get
    body: GetPhoneLockStatusBody
  }): Promise<DeviceResponse>
  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Get
    body: GetPhoneLockTimeBody
  }): Promise<DeviceResponse<GetPhoneLockTimeResponseBody>>
  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Put
    body: { phoneLockCode: string }
  }): Promise<DeviceResponse>
  async request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<DeviceResponse<DeviceInfo>>
  async request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
    body: GetFileListBody
  }): Promise<DeviceResponse<GetFileListResponseBody>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
  }): Promise<DeviceResponse<{ entries: Contact[]; totalCount: number }>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetMessagesBody
  }): Promise<DeviceResponse<GetMessageResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetThreadsBody
  }): Promise<DeviceResponse<GetThreadResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Post
    body: PostMessagesBody
  }): Promise<DeviceResponse<PostMessagesResponseBody>>
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
    body: {
      id: Contact["id"]
    }
  }): Promise<DeviceResponse<string>>
  async request(config: {
    endpoint: Endpoint.Update
    method: Method.Post
    body: {
      update: boolean
      reboot: boolean
    }
  }): Promise<DeviceResponse>
  public request(config: GetFileSystemRequestConfig): Promise<
    DeviceResponse<{
      rxID: string
      fileCrc32: string
      fileSize: number
      chunkSize: number
    }>
  >
  public request(config: DownloadFileSystemRequestConfig): Promise<
    DeviceResponse<{
      rxID: string
      chunkNo: number
      data: string
    }>
  >
  public request(config: SendFileSystemRequestConfig): Promise<
    DeviceResponse<{
      txID: string
      chunkNo: number
    }>
  >
  public request(config: PutFileSystemRequestConfig): Promise<
    DeviceResponse<{
      txID: string
      chunkSize: number
    }>
  >
  async request(
    config: RequestConfig<any>
  ): Promise<DeviceResponse<unknown> | DeviceResponse<undefined>> {
    if (!this.currentDevice) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const eventName = JSON.stringify(config)

    const isEndpointSecure = (response: DeviceResponse<unknown>) => {
      this.eventEmitter.emit(eventName, response)

      const isConfigEndpointSecurity = config.endpoint === Endpoint.Security
      const iSetPhoneLockOffEndpoint =
        isConfigEndpointSecurity && config.method === Method.Put
      const isPhoneLockTimeEndpoint =
        isConfigEndpointSecurity &&
        config.body.category === PhoneLockCategory.Time
      if (!(iSetPhoneLockOffEndpoint || isPhoneLockTimeEndpoint)) {
        return true
      }
      return false
    }

    if (!this.eventEmitter.eventNames().includes(eventName)) {
      void this.currentDevice
        .request(config)
        .then((response) => DeviceService.mapToDeviceResponse(response))
        .then((response) => {
          if (isEndpointSecure(response)) {
            this.emitDeviceUnlockedEvent(response)
          }
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

  public async connect(): Promise<DeviceResponse<MuditaDevice>> {
    if (this.currentDevice) {
      return {
        data: this.currentDevice,
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
    if (!this.currentDevice) {
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

  private getUnlockedStatusRequest(): Promise<DeviceResponse<any>> {
    return this.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  }

  private registerAttachDeviceListener(): void {
    this.deviceManager.onAttachDevice(async (device) => {
      this.devices[device.path] = device

      if (!this.currentDevice) {
        const { status } = await this.deviceConnect(device)

        if (status === DeviceResponseStatus.Ok) {
          this.eventEmitter.emit(DeviceServiceEventName.DeviceConnected)
          this.ipcMain.sendToRenderers(IpcEmitter.DeviceConnected, device)
        }
      }
    })
  }

  private async deviceConnect(
    device: MuditaDevice
  ): Promise<DeviceResponse<MuditaDevice>> {
    const { status } = await device.connect()

    if (status === ResponseStatus.Ok) {
      this.currentDevice = device

      this.registerDeviceDisconnectedListener()
      this.registerDeviceUnlockedListener()

      return {
        data: this.currentDevice,
        status: DeviceResponseStatus.Ok,
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private registerDeviceUnlockedListener(): void {
    void this.getUnlockedStatusRequest()
    this.lockedInterval = setInterval(
      () => void this.getUnlockedStatusRequest(),
      10000
    )
  }

  private registerDeviceDisconnectedListener(): void {
    if (this.currentDevice) {
      this.currentDevice.on(DeviceEventName.Disconnected, () => {
        this.clearSubscriptions()
      })
    }
  }

  private clearSubscriptions(): void {
    this.currentDevice = undefined
    this.lockedInterval && clearInterval(this.lockedInterval)
    this.eventEmitter.emit(DeviceServiceEventName.DeviceDisconnected)
    this.ipcMain.sendToRenderers(IpcEmitter.DeviceDisconnected)
  }

  private emitDeviceUnlockedEvent({ status }: DeviceResponse<unknown>): void {
    if (status === DeviceResponseStatus.Error) {
      return
    }

    status !== DeviceResponseStatus.PhoneLocked
      ? this.ipcMain.sendToRenderers(IpcEmitter.DeviceUnlocked)
      : this.ipcMain.sendToRenderers(IpcEmitter.DeviceLocked)
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
    } else if (status === ResponseStatus.NoContent) {
      return {
        status: DeviceResponseStatus.Ok,
      }
    } else if (status === ResponseStatus.PhoneLocked) {
      return {
        error,
        status: DeviceResponseStatus.PhoneLocked,
      }
    } else if (status === ResponseStatus.InternalServerError) {
      return {
        error,
        status: DeviceResponseStatus.InternalServerError,
      }
    } else if (status === ResponseStatus.Conflict) {
      return {
        data,
        error,
        status: DeviceResponseStatus.Duplicated,
      }
    } else if (status === ResponseStatus.UnprocessableEntity) {
      return {
        error,
        status: DeviceResponseStatus.UnprocessableEntity,
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
  deviceManager: MuditaDeviceManager,
  ipcMain: MainProcessIpc
): DeviceService => {
  return new DeviceService(deviceManager, ipcMain).init()
}

export default DeviceService
