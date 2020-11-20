import { PureDevice, PureDeviceManager } from "pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import {
  Endpoint,
  DeviceEventName,
  Method,
  RequestConfig,
  ResponseStatus,
} from "pure/dist/device.types"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { MainProcessIpc } from "electron-better-ipc"
import { DeviceInfo } from "pure/dist/endpoints/device-info.types"
import { Contact, CountBodyResponse } from "pure/dist/endpoints/contact.types"

class DeviceService {
  device: PureDevice | undefined

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
    body: { count: true }
  }): Promise<DeviceResponse<CountBodyResponse>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: { count: number }
  }): Promise<DeviceResponse<Contact[]>>
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
    endpoint: Endpoint.PureUpdate
    method: Method.Post
    file: string
  }): Promise<DeviceResponse>
  async request(config: {
    endpoint: Endpoint.File
    method: Method.Post
    file: string
  }): Promise<DeviceResponse>
  async request(config: RequestConfig): Promise<DeviceResponse<any>>
  async request(config: RequestConfig) {
    if (!this.device) {
      return {
        status: DeviceResponseStatus.Error,
      }
    }

    const { status, body: data } = await this.device.request(config)

    if (status === ResponseStatus.Ok || status === ResponseStatus.Accepted) {
      return {
        data,
        status: DeviceResponseStatus.Ok,
      }
    } else {
      return {
        data,
        status: DeviceResponseStatus.Error,
      }
    }
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

  private registerAttachDeviceListener(): void {
    this.deviceManager.onAttachDevice(async (device) => {
      if (!this.device) {
        const { status } = await this.deviceConnect(device)

        if (status === DeviceResponseStatus.Ok) {
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
        this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
      })
    }
  }
}

export default DeviceService
