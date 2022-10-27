/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceEventName } from "@mudita/pure"
import {
  GetPhoneLockTimeResponseBody,
  RequestConfig,
  Response,
  StartRestoreRequestConfig,
  RemoveFileSystemRequestConfig,
  GetSecurityRequestConfig,
  GetPhoneLockStatusRequestConfig,
  GetPhoneLockTimeRequestConfig,
  UnlockDeviceRequestConfig,
  GetDeviceInfoRequestConfig,
  GetDeviceInfoResponseBody,
  GetDeviceFilesRequestConfig,
  GetDeviceFilesResponseBody,
  GetMessagesRequestConfig,
  GetMessagesResponseBody,
  GetMessageRequestConfig,
  GetMessageResponseBody,
  GetThreadsRequestConfig,
  GetThreadsResponseBody,
  GetThreadRequestConfig,
  GetThreadResponseBody,
  CreateMessageRequestConfig,
  CreateMessageResponseBody,
  UpdateMessageRequestConfig,
  DeleteMessageRequestConfig,
  DeleteThreadRequestConfig,
  UpdateThreadReadUnreadStateRequestConfig,
  GetTemplateRequestConfig,
  GetTemplateResponseBody,
  GetTemplatesRequestConfig,
  GetTemplatesResponseBody,
  CreateTemplateRequestConfig,
  CreateTemplateResponseBody,
  UpdateTemplateRequestConfig,
  UpdateTemplateOrderRequestConfig,
  DeleteTemplateRequestConfig,
  GetContactsRequestConfig,
  GetContactsResponseBody,
  GetContactRequestConfig,
  GetContactResponseBody,
  CreateContactRequestConfig,
  CreateContactResponseBody,
  UpdateContactRequestConfig,
  UpdateContactResponseBody,
  DeleteContactRequestConfig,
  DeleteContactResponseBody,
  StartDeviceUpdateRequestBody,
  GetFileSystemDirectoryRequestConfig,
  GetFileSystemDirectoryResponseBody,
  GetFileSystemRequestConfig,
  GetFileSystemResponseBody,
  DownloadFileSystemRequestConfig,
  DownloadFileSystemResponseBody,
  SendFileSystemRequestConfig,
  SendFileSystemResponseBody,
  PutFileSystemRequestConfig,
  PutFileSystemResponseBody,
  StartBackupRequestConfig,
  StartBackupResponseBody,
  GetBackupDeviceStatusRequestConfig,
  GetBackupDeviceStatusResponseBody,
  GetRestoreDeviceStatusRequestConfig,
  GetRestoreDeviceStatusResponseBody,
  GetEntriesRequestConfig,
  GetEntriesResponseBody,
  DeleteEntriesRequestConfig,
} from "App/device/types/mudita-os"
import { SerialPortDevice } from "App/device/types/serial-port-device.type"
import { DeviceManager } from "App/device/types/device-manager.type"
import {
  Endpoint,
  DeviceType,
  Method,
  PhoneLockCategory,
  ResponseStatus,
} from "App/device/constants"
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
  DeviceAgreementNotAccepted = "deviceAgreementNotAccepted",
}

export class DeviceService {
  public devices: Record<string, SerialPortDevice> = {}
  public currentDevice: SerialPortDevice | undefined
  public currentDeviceUnlocked = false
  public eulaAccepted = true
  private lockedInterval: NodeJS.Timeout | undefined
  private eventEmitter = new EventEmitter()

  constructor(
    private deviceManager: DeviceManager,
    private ipcMain: MainProcessIpc
  ) {
    EventEmitter.defaultMaxListeners = 15
  }

  public init(): DeviceService {
    this.registerAttachDeviceListener()
    return this
  }

  //for production environment
  public async request(
    config: GetSecurityRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: GetPhoneLockStatusRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: GetPhoneLockTimeRequestConfig
  ): Promise<RequestResponse<GetPhoneLockTimeResponseBody>>
  public async request(
    config: UnlockDeviceRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: GetDeviceInfoRequestConfig
  ): Promise<RequestResponse<GetDeviceInfoResponseBody>>
  public async request(
    config: GetDeviceFilesRequestConfig
  ): Promise<RequestResponse<GetDeviceFilesResponseBody>>

  public async request(
    config: GetMessagesRequestConfig
  ): Promise<RequestResponse<GetMessagesResponseBody>>
  public async request(
    config: GetMessageRequestConfig
  ): Promise<RequestResponse<GetMessageResponseBody>>
  public async request(
    config: GetThreadsRequestConfig
  ): Promise<RequestResponse<GetThreadsResponseBody>>
  public async request(
    config: GetThreadRequestConfig
  ): Promise<RequestResponse<GetThreadResponseBody>>
  public async request(
    config: CreateMessageRequestConfig
  ): Promise<RequestResponse<CreateMessageResponseBody>>
  public async request(
    config: UpdateMessageRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: DeleteThreadRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: DeleteMessageRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: UpdateThreadReadUnreadStateRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: GetTemplatesRequestConfig
  ): Promise<RequestResponse<GetTemplatesResponseBody>>
  public async request(
    config: GetTemplateRequestConfig
  ): Promise<RequestResponse<GetTemplateResponseBody>>
  public async request(
    config: CreateTemplateRequestConfig
  ): Promise<RequestResponse<CreateTemplateResponseBody>>
  public async request(
    config: UpdateTemplateRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: UpdateTemplateOrderRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: DeleteTemplateRequestConfig
  ): Promise<RequestResponse>

  public async request(
    config: GetContactsRequestConfig
  ): Promise<RequestResponse<GetContactsResponseBody>>
  public async request(
    config: GetContactRequestConfig
  ): Promise<RequestResponse<GetContactResponseBody>>
  public async request(
    config: CreateContactRequestConfig
  ): Promise<RequestResponse<CreateContactResponseBody>>
  public async request(
    config: UpdateContactRequestConfig
  ): Promise<RequestResponse<UpdateContactResponseBody>>
  public async request(
    config: DeleteContactRequestConfig
  ): Promise<RequestResponse<DeleteContactResponseBody>>

  public async request(
    config: StartDeviceUpdateRequestBody
  ): Promise<RequestResponse>

  public async request(
    config: GetFileSystemDirectoryRequestConfig
  ): Promise<RequestResponse<GetFileSystemDirectoryResponseBody>>
  public async request(
    config: GetFileSystemRequestConfig
  ): Promise<RequestResponse<GetFileSystemResponseBody>>
  public async request(
    config: DownloadFileSystemRequestConfig
  ): Promise<RequestResponse<DownloadFileSystemResponseBody>>
  public async request(
    config: SendFileSystemRequestConfig
  ): Promise<RequestResponse<SendFileSystemResponseBody>>
  public async request(
    config: PutFileSystemRequestConfig
  ): Promise<RequestResponse<PutFileSystemResponseBody>>

  public async request(
    config: StartBackupRequestConfig
  ): Promise<RequestResponse<StartBackupResponseBody>>
  public async request(
    config: GetBackupDeviceStatusRequestConfig
  ): Promise<RequestResponse<GetBackupDeviceStatusResponseBody>>
  public async request(
    config: StartRestoreRequestConfig
  ): Promise<RequestResponse>
  public async request(
    config: GetRestoreDeviceStatusRequestConfig
  ): Promise<RequestResponse<GetRestoreDeviceStatusResponseBody>>
  public async request(
    config: RemoveFileSystemRequestConfig
  ): Promise<RequestResponse>
  public async request(
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

  public async connect(): Promise<RequestResponse<SerialPortDevice>> {
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
    device: SerialPortDevice
  ): Promise<RequestResponse<SerialPortDevice>> {
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
    this.eulaAccepted = true
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
    } else if (status === ResponseStatus.NotAccepted) {
      return {
        error,
        status: RequestResponseStatus.NotAcceptable,
      }
    } else if (status === ResponseStatus.InsufficientStorage) {
      return {
        error,
        status: RequestResponseStatus.InsufficientStorage,
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
    if (
      config.endpoint === Endpoint.Security &&
      // AUTO DISABLED - fix me if you like :)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      (config.body.category === PhoneLockCategory.Status ||
        // AUTO DISABLED - fix me if you like :)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        config.body.category === PhoneLockCategory.Time) &&
      response.status !== RequestResponseStatus.Ok
    ) {
      return
    }

    if (!DeviceService.isEndpointSecure(config)) {
      return
    }

    if (response.status === RequestResponseStatus.Error) {
      return
    }

    this.currentDeviceUnlocked =
      response.status !== RequestResponseStatus.PhoneLocked

    this.emitDeviceUnlockedEvent(response)
    this.emitEulaStatusEvent(response)

    if (
      config.endpoint === Endpoint.Security &&
      (config.body as GetPhoneLockStatusRequestConfig["body"])?.category ===
        PhoneLockCategory.Status
    ) {
      this.eulaAccepted =
        response.status !== RequestResponseStatus.NotAcceptable
    }
  }

  private emitDeviceUnlockedEvent({ status }: RequestResponse<unknown>): void {
    if (status === RequestResponseStatus.PhoneLocked) {
      this.eventEmitter.emit(
        DeviceServiceEventName.DeviceLocked,
        this.currentDevice
      )
      this.ipcMain.sendToRenderers(IpcEmitter.DeviceLocked, this.currentDevice)
    } else if (status === RequestResponseStatus.Ok) {
      this.eventEmitter.emit(
        DeviceServiceEventName.DeviceUnlocked,
        this.currentDevice
      )
      this.ipcMain.sendToRenderers(
        IpcEmitter.DeviceUnlocked,
        this.currentDevice
      )
    }
  }

  private emitEulaStatusEvent({ status }: RequestResponse<unknown>): void {
    if (this.eulaAccepted) {
      return
    }

    if (status === RequestResponseStatus.PhoneLocked) {
      this.ipcMain.sendToRenderers(IpcEmitter.DeviceAgreementStatus, true)
    } else if (status === RequestResponseStatus.NotAcceptable) {
      this.ipcMain.sendToRenderers(IpcEmitter.DeviceAgreementStatus, false)
    } else {
      this.ipcMain.sendToRenderers(IpcEmitter.DeviceAgreementStatus, true)
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
  deviceManager: DeviceManager,
  ipcMain: MainProcessIpc
): DeviceService => {
  return new DeviceService(deviceManager, ipcMain).init()
}

export default DeviceService
