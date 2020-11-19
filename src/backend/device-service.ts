import { IPureNode } from "pure"
import Device from "pure/dist/device"
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
  device: Device | undefined

  constructor(private pureNode: IPureNode, private ipcMain: MainProcessIpc) {
    this.registerAttachDeviceListener()
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
      return Promise.resolve({
        status: DeviceResponseStatus.Error,
      })
    }

    return await this.device
      .request(config)
      .then(({ status, body: data }) => {
        if (status === ResponseStatus.Ok) {
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
      })
  }

  public async connect(): Promise<DeviceResponse> {
    if (this.device) {
      return Promise.resolve({
        status: DeviceResponseStatus.Ok,
      })
    }

    const [device] = await this.pureNode.getDevices()

    if (device) {
      return this.pureNodeConnect(device)
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private async registerAttachDeviceListener(): Promise<void> {
    this.pureNode.onAttachDevice(async (device) => {
      if (!this.device) {
        const { status } = await this.pureNodeConnect(device)

        if (status === DeviceResponseStatus.Ok) {
          this.ipcMain.sendToRenderers(IpcEmitter.ConnectedDevice)
        }
      }
    })
  }

  private async pureNodeConnect(device: Device): Promise<DeviceResponse> {
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
    if(this.device){
      this.device.on(DeviceEventName.Disconnected, () => {
        this.device = undefined
        this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
      })
    }
  }
}

export default DeviceService
