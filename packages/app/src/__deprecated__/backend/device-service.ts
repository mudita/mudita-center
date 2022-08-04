/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Contact,
  DeviceEventName,
  DeviceInfo,
  Endpoint,
  DeviceType,
  GetFileSystemDirectoryRequestConfig,
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
  StartBackupRequestConfig,
  StartBackupResponseBody,
  GetBackupDeviceStatusResponseBody,
  GetBackupDeviceStatusRequestConfig,
  StartRestoreRequestConfig,
  GetRestoreDeviceStatusRequestConfig,
  GetRestoreDeviceStatusResponseBody,
  RemoveFileSystemRequestConfig,
  RemoveFileSystemResponse,
  GetEntriesResponseBody,
  DeleteEntriesRequestConfig,
  GetEntriesRequestConfig,
  GetMessageBody,
  Message,
  GetThreadBody,
  PutMessageBody,
  Thread,
  UpdateThreadReadStatus,
  GetTemplateBody,
  PostTemplateBody,
  PutTemplateBody,
  DeleteTemplateBody,
  GetTemplateResponseBody,
  PostTemplateResponseBody,
  UpdateTemplateOrder,
} from "@mudita/pure"
import { EventEmitter } from "events"
import { IpcEmitter } from "App/__deprecated__/common/emitters/ipc-emitter.enum"
import { MainProcessIpc } from "electron-better-ipc"
import {
  RequestResponse,
  RequestResponseStatus,
} from "App/core/types/request-response.interface"

export enum DeviceServiceEventName {
  DeviceConnected = "deviceConnected",
  DeviceDisconnected = "deviceDisconnected",
  DeviceUnlocked = "deviceUnlocked",
  DeviceLocked = "deviceLocked",
}

export class DeviceService {
  public devices: Record<string, MuditaDevice> = {}
  public currentDevice: MuditaDevice | undefined
  public currentDeviceUnlocked = false
  private lockedInterval: NodeJS.Timeout | undefined
  private eventEmitter = new EventEmitter()

  constructor(
    private deviceManager: MuditaDeviceManager,
    private ipcMain: MainProcessIpc
  ) {
    EventEmitter.defaultMaxListeners = 15
  }

  public init(): DeviceService {
    this.registerAttachDeviceListener()
    return this
  }

  //for production environment
  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Get
  }): Promise<RequestResponse>
  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Get
    body: GetPhoneLockStatusBody
  }): Promise<RequestResponse>
  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Get
    body: GetPhoneLockTimeBody
  }): Promise<RequestResponse<GetPhoneLockTimeResponseBody>>
  async request(config: {
    endpoint: Endpoint.Security
    method: Method.Put
    body: { phoneLockCode: string }
  }): Promise<RequestResponse>
  async request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<RequestResponse<DeviceInfo>>
  async request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
    body: GetFileListBody
  }): Promise<RequestResponse<GetFileListResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetMessagesBody
  }): Promise<RequestResponse<GetMessageResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetMessageBody
  }): Promise<RequestResponse<Message>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetThreadBody
  }): Promise<RequestResponse<Thread>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetThreadsBody
  }): Promise<RequestResponse<GetThreadResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Post
    body: PostMessagesBody
  }): Promise<RequestResponse<PostMessagesResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Put
    body: PutMessageBody
  }): Promise<RequestResponse>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Delete
    body: GetThreadBody
  }): Promise<RequestResponse>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Delete
    body: GetMessageBody
  }): Promise<RequestResponse<undefined>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Put
    body: UpdateThreadReadStatus
  }): Promise<RequestResponse>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Get
    body: GetTemplateBody
  }): Promise<RequestResponse<GetTemplateResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Post
    body: PostTemplateBody
  }): Promise<RequestResponse<PostTemplateResponseBody>>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Put
    body: PutTemplateBody
  }): Promise<RequestResponse>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Put
    body: UpdateTemplateOrder
  }): Promise<RequestResponse>
  public request(config: {
    endpoint: Endpoint.Messages
    method: Method.Delete
    body: DeleteTemplateBody
  }): Promise<RequestResponse>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
  }): Promise<RequestResponse<{ entries: Contact[]; totalCount: number }>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: { id: number }
  }): Promise<RequestResponse<Contact>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Post
    body: Contact
  }): Promise<RequestResponse<Contact>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Put
    body: Contact
  }): Promise<RequestResponse<Contact>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Delete
    body: {
      id: Contact["id"]
    }
  }): Promise<RequestResponse<string>>
  async request(config: {
    endpoint: Endpoint.Update
    method: Method.Post
    body: {
      update: boolean
      reboot: boolean
    }
  }): Promise<RequestResponse>
  public request(
    config: GetFileSystemDirectoryRequestConfig
  ): Promise<RequestResponse<Record<string, { path: string }[]>>>
  public request(config: GetFileSystemRequestConfig): Promise<
    RequestResponse<{
      rxID: string
      fileSize: number
      chunkSize: number
    }>
  >
  public request(config: DownloadFileSystemRequestConfig): Promise<
    RequestResponse<{
      rxID: string
      chunkNo: number
      data: string
      fileCrc32?: string
    }>
  >
  public request(config: SendFileSystemRequestConfig): Promise<
    RequestResponse<{
      txID: string
      chunkNo: number
    }>
  >
  public request(config: PutFileSystemRequestConfig): Promise<
    RequestResponse<{
      txID: string
      chunkSize: number
    }>
  >
  public request(
    config: StartBackupRequestConfig
  ): Promise<RequestResponse<StartBackupResponseBody>>
  public request(
    config: GetBackupDeviceStatusRequestConfig
  ): Promise<RequestResponse<GetBackupDeviceStatusResponseBody>>
  public request(config: StartRestoreRequestConfig): Promise<RequestResponse>
  public request(
    config: GetRestoreDeviceStatusRequestConfig
  ): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>>
  public request(
    config: RemoveFileSystemRequestConfig
  ): Promise<RequestResponse<RemoveFileSystemResponse>>
  public request(
    config: GetEntriesRequestConfig
  ): Promise<RequestResponse<GetEntriesResponseBody>>
  public request(config: DeleteEntriesRequestConfig): Promise<RequestResponse>
  async request(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: RequestConfig<any>
  ): Promise<RequestResponse<unknown> | RequestResponse<undefined>> {
    if (!this.currentDevice) {
      return {
        status: RequestResponseStatus.Error,
      }
    }

    const eventName = JSON.stringify(config)

    if (!this.eventEmitter.eventNames().includes(eventName)) {
      void this.currentDevice
        .request(config)
        .then((response) => DeviceService.mapToDeviceResponse(response))
        .then((response) => {
          this.eventEmitter.emit(eventName, response)
          this.checkDeviceIsUnlocked(config, response)
        })
    }

    return new Promise((resolve) => {
      const clearPendingRequestListener = (): void => {
        this.eventEmitter.off(eventName, listener)
        this.eventEmitter.off(
          DeviceServiceEventName.DeviceDisconnected,
          clearPendingRequestListener
        )
        resolve({
          status: RequestResponseStatus.InternalServerError,
        })
      }

      const listener = (response: RequestResponse<unknown>): void => {
        this.eventEmitter.off(eventName, listener)
        this.eventEmitter.off(
          DeviceServiceEventName.DeviceDisconnected,
          clearPendingRequestListener
        )
        resolve(response)
      }

      this.eventEmitter.on(eventName, listener)
      this.eventEmitter.on(
        DeviceServiceEventName.DeviceDisconnected,
        clearPendingRequestListener
      )
    })
  }

  public async connect(): Promise<RequestResponse<MuditaDevice>> {
    if (this.currentDevice) {
      return {
        data: this.currentDevice,
        status: RequestResponseStatus.Ok,
      }
    }

    const [device] = await this.deviceManager.getDevices()

    if (device) {
      return this.deviceConnect(device)
    } else {
      return {
        status: RequestResponseStatus.Error,
      }
    }
  }

  public async disconnect(): Promise<RequestResponse> {
    if (!this.currentDevice) {
      return {
        status: RequestResponseStatus.Ok,
      }
    }

    const [device] = await this.deviceManager.getDevices()

    if (device) {
      const { status } = await device.disconnect()
      if (status === ResponseStatus.Ok) {
        this.clearSubscriptions()
        return {
          status: RequestResponseStatus.Ok,
        }
      } else {
        return {
          status: RequestResponseStatus.Error,
        }
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
      }
    }
  }

  public on<Event = undefined>(
    eventName: DeviceServiceEventName,
    listener: (event: Event) => void
  ): void {
    this.eventEmitter.on(eventName, listener)
  }

  public off<Event = undefined>(
    eventName: DeviceServiceEventName,
    listener: (event: Event) => void
  ): void {
    this.eventEmitter.off(eventName, listener)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  public sendToRenderers(eventName: string, data: any): void {
    this.ipcMain.sendToRenderers(eventName, data)
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private getUnlockedStatusRequest(): Promise<RequestResponse<any>> {
    return this.request({
      endpoint: Endpoint.Security,
      method: Method.Get,
      body: { category: PhoneLockCategory.Status },
    })
  }

  private registerAttachDeviceListener(): void {
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.deviceManager.onAttachDevice(async (device) => {
      this.devices[device.path] = device

      if (!this.currentDevice) {
        const { status } = await this.deviceConnect(device)

        if (status === RequestResponseStatus.Ok) {
          this.eventEmitter.emit(DeviceServiceEventName.DeviceConnected)
          this.ipcMain.sendToRenderers(IpcEmitter.DeviceConnected, device)
        }
      }
    })
  }

  private async deviceConnect(
    device: MuditaDevice
  ): Promise<RequestResponse<MuditaDevice>> {
    const { status } = await device.connect()

    if (status === ResponseStatus.Ok) {
      this.currentDevice = device

      this.registerDeviceDisconnectedListener()

      if (this.currentDevice.deviceType === DeviceType.MuditaPure) {
        this.registerDeviceUnlockedListener()
      }

      return {
        data: this.currentDevice,
        status: RequestResponseStatus.Ok,
      }
    } else {
      return {
        status: RequestResponseStatus.Error,
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
    this.currentDeviceUnlocked = false
    this.lockedInterval && clearInterval(this.lockedInterval)
    this.eventEmitter.emit(DeviceServiceEventName.DeviceDisconnected)
    this.ipcMain.sendToRenderers(IpcEmitter.DeviceDisconnected)
  }

  private static mapToDeviceResponse(
    response: Response<unknown>
  ): RequestResponse<unknown> {
    const { status, body: data, error } = response
    if (
      status === ResponseStatus.Ok ||
      status === ResponseStatus.Accepted ||
      status === ResponseStatus.Redirect
    ) {
      return {
        data,
        status: RequestResponseStatus.Ok,
      }
    } else if (status === ResponseStatus.NoContent) {
      return {
        status: RequestResponseStatus.Ok,
      }
    } else if (status === ResponseStatus.PhoneLocked) {
      return {
        error,
        status: RequestResponseStatus.PhoneLocked,
      }
    } else if (status === ResponseStatus.InternalServerError) {
      return {
        error,
        status: RequestResponseStatus.InternalServerError,
      }
    } else if (status === ResponseStatus.Conflict) {
      return {
        data,
        error,
        status: RequestResponseStatus.Duplicated,
      }
    } else if (status === ResponseStatus.UnprocessableEntity) {
      return {
        error,
        status: RequestResponseStatus.UnprocessableEntity,
      }
    } else {
      return {
        error,
        status: RequestResponseStatus.Error,
      }
    }
  }

  private checkDeviceIsUnlocked(
    // AUTO DISABLED - fix me if you like :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    config: RequestConfig<any>,
    response: RequestResponse<unknown>
  ): void {
    if (!DeviceService.isEndpointSecure(config)) {
      return
    }

    if (response.status === RequestResponseStatus.Error) {
      return
    }

    this.currentDeviceUnlocked =
      response.status !== RequestResponseStatus.PhoneLocked

    this.emitDeviceUnlockedEvent(response)
  }

  private emitDeviceUnlockedEvent({ status }: RequestResponse<unknown>): void {
    if (status !== RequestResponseStatus.PhoneLocked) {
      this.eventEmitter.emit(
        DeviceServiceEventName.DeviceUnlocked,
        this.currentDevice
      )
      this.ipcMain.sendToRenderers(
        IpcEmitter.DeviceUnlocked,
        this.currentDevice
      )
    } else {
      this.eventEmitter.emit(
        DeviceServiceEventName.DeviceLocked,
        this.currentDevice
      )
      this.ipcMain.sendToRenderers(IpcEmitter.DeviceLocked, this.currentDevice)
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static isEndpointSecure(config: RequestConfig<any>): boolean {
    const isConfigEndpointSecurity = config.endpoint === Endpoint.Security
    const iSetPhoneLockOffEndpoint =
      isConfigEndpointSecurity && config.method === Method.Put
    const isPhoneLockTimeEndpoint =
      isConfigEndpointSecurity &&
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      config.body.category === PhoneLockCategory.Time
    if (!(iSetPhoneLockOffEndpoint || isPhoneLockTimeEndpoint)) {
      return true
    }
    return false
  }
}

export const createDeviceService = (
  deviceManager: MuditaDeviceManager,
  ipcMain: MainProcessIpc
): DeviceService => {
  return new DeviceService(deviceManager, ipcMain).init()
}

export default DeviceService
