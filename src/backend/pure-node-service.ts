import PureNode from "pure"
import DeviceResponse, {
  DeviceResponseStatus,
} from "Backend/adapters/device-response.interface"
import {
  Endpoint,
  EventName,
  Method,
  RequestConfig,
  ResponseStatus,
} from "pure/dist/types"
import { IpcEmitter } from "Common/emitters/ipc-emitter.enum"
import { MainProcessIpc } from "electron-better-ipc"
import { DeviceInfo } from "pure/dist/endpoints/device-info.types"
import { Contact, CountBodyResponse } from "pure/dist/endpoints/contact.types"

class PureNodeService {
  purePhoneId: string | undefined

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
    body: true
  }): Promise<DeviceResponse<CountBodyResponse>>
  async request(config: {
    endpoint: Endpoint.Contacts
    method: Method.Get
    body: number
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
    if (this.purePhoneId === undefined) {
      return Promise.resolve({
        status: DeviceResponseStatus.Error,
      })
    }

    return await this.pureNode
      .request(this.purePhoneId, config)
      .then(({ status, ...reponse }) => {
        if (status === ResponseStatus.Ok) {
          return {
            status: DeviceResponseStatus.Ok,
            ...reponse,
          }
        } else {
          return {
            status: DeviceResponseStatus.Error,
            ...reponse,
          }
        }
      })
  }

  public async connect(): Promise<DeviceResponse> {
    if (this.purePhoneId !== undefined) {
      return Promise.resolve({
        status: DeviceResponseStatus.Ok,
      })
    }

    const list = await PureNode.getPhones()
    const [purePhone] = list
    const id = purePhone?.id

    if (id) {
      return this.pureNodeConnect(id)
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private async registerAttachPhoneListener(): Promise<void> {
    this.pureNode.onAttachPhone(async (id) => {
      if (!this.purePhoneId) {
        const { status } = await this.pureNodeConnect(id)

        if (status === DeviceResponseStatus.Ok) {
          this.ipcMain.sendToRenderers(IpcEmitter.ConnectedDevice)
        }
      }
    })
  }

  private async pureNodeConnect(id: string): Promise<DeviceResponse> {
    const { status } = await this.pureNode.connect(id)
    if (status === ResponseStatus.Ok) {
      this.purePhoneId = id

      this.registerDisconnectedDeviceListener(id)

      return {
        status: DeviceResponseStatus.Ok,
      }
    } else {
      return {
        status: DeviceResponseStatus.Error,
      }
    }
  }

  private registerDisconnectedDeviceListener(id: string) {
    this.pureNode.on(id, EventName.Disconnected, () => {
      this.purePhoneId = undefined
      this.ipcMain.sendToRenderers(IpcEmitter.DisconnectedDevice)
    })
  }
}

export default PureNodeService
