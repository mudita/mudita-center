import { PureNode } from "pure"
import PhonePort from "pure/dist/phone-port"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import {
  Endpoint,
  PortEventName,
  Method,
  RequestConfig,
  ResponseStatus,
} from "pure/dist/phone-port.types"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { MainProcessIpc } from "electron-better-ipc"
import { DeviceInfo } from "pure/dist/endpoints/device-info.types"
import { Contact, CountBodyResponse } from "pure/dist/endpoints/contact.types"

class PureNodeService {
  phonePort: PhonePort | undefined

  constructor(private pureNode: PureNode, private ipcMain: MainProcessIpc) {
    this.registerAttachPhoneListener()
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
    if (!this.phonePort) {
      return Promise.resolve({
        status: DeviceResponseStatus.Error,
      })
    }

    return await this.phonePort
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
    if (this.phonePort) {
      return Promise.resolve({
        status: DeviceResponseStatus.Ok,
      })
    }

    const [phonePort] = await this.pureNode.getPhonePorts()

    if (phonePort) {
      return this.pureNodeConnect(phonePort)
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private async registerAttachPhoneListener(): Promise<void> {
    this.pureNode.onAttachPhone(async (phonePort) => {
      if (!this.phonePort) {
        const { status } = await this.pureNodeConnect(phonePort)

        if (status === DeviceResponseStatus.Ok) {
          this.ipcMain.sendToRenderers(IpcEmitter.ConnectedDevice)
        }
      }
    })
  }

  private async pureNodeConnect(phonePort: PhonePort): Promise<DeviceResponse> {
    const { status } = await phonePort.connect()
    if (status === ResponseStatus.Ok) {
      this.phonePort = phonePort

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
    if(this.phonePort){
      this.phonePort.on(PortEventName.Disconnected, () => {
        this.phonePort = undefined
        this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
      })
    }
  }
}

export default PureNodeService
