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
  CountBodyResponse,
  DeviceInfo,
} from "pure"
import { EventEmitter } from "events"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { MainProcessIpc } from "electron-better-ipc"
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
    endpoint: Endpoint.DeviceUpdate
    method: Method.Post
    file: string
  }): Promise<DeviceResponse>
  async request(config: {
    endpoint: Endpoint.FileUpload
    method: Method.Post
    file: string
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
        const { status, body: data } = response
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
            data,
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

export const createDeviceService = (
  deviceManager: PureDeviceManager,
  ipcMain: MainProcessIpc
) => {
  return new DeviceService(deviceManager, ipcMain).init()
}

export default DeviceService
