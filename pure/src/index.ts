import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import PhonePort, { createPhonePort, CreatePhonePort } from "./phone-port"
import { Contact, CountBodyResponse } from "./endpoints/contact.types"
import { DeviceInfo } from "./endpoints/device-info.types"
import {
  Endpoint,
  EventName,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "./types"

interface Phones {
  id: string
}

export const productId = "0100"
export const manufacturer = "Mudita"

enum PureNodeEvent {
  AttachedPhone = "AttachedPhone",
}

class PureNode {
  static async getPhones(): Promise<Phones[]> {
    const portList = await PureNode.getSerialPortList()

    return portList
      .filter(PureNode.isMuditaPurePhone)
      .map(({ serialNumber = "" }) => ({ id: String(serialNumber) }))
  }

  private static isMuditaPurePhone(portInfo: PortInfo): boolean {
    return (
      portInfo.manufacturer === manufacturer && portInfo.productId === productId
    )
  }

  private static async getSerialPortList(): Promise<PortInfo[]> {
    return await SerialPort.list()
  }

  private phonePortMap: Map<string, PhonePort> = new Map()
  private eventEmitter = new EventEmitter()

  constructor(
    private createPhonePort: CreatePhonePort,
    private usbDetector: UsbDetector
  ) {
    usbDetector.onAttachDevice(async (portInfo) => {
      if (portInfo.manufacturer === manufacturer) {
        this.eventEmitter.emit(
          PureNodeEvent.AttachedPhone,
          portInfo.serialNumber
        )
      }
    })
  }

  async connect(id: string): Promise<Response> {
    const portList = await PureNode.getSerialPortList()
    const port = portList.find(
      ({ serialNumber }) => String(serialNumber) === id
    )

    if (port && this.phonePortMap.has(id)) {
      return { status: ResponseStatus.Ok }
    } else if (port) {
      const phonePort = this.createPhonePort()
      const response = await phonePort.connect(port.path)

      if (response.status === ResponseStatus.Ok) {
        this.phonePortMap.set(id, phonePort)
        this.removePhonePortOnDisconnectionEvent(id)
      }

      return response
    } else {
      return { status: ResponseStatus.ConnectionIsClosed }
    }
  }

  async disconnect(id: string): Promise<Response> {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      this.phonePortMap.delete(id)

      return await phonePort.disconnect()
    } else {
      return { status: ResponseStatus.Ok }
    }
  }

  async request(
    id: string,
    config: {
      endpoint: Endpoint.DeviceInfo
      method: Method.Get
    }
  ): Promise<Response<DeviceInfo>>
  async request(
    id: string,
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Get
      body: true
    }
  ): Promise<Response<CountBodyResponse>>
  async request(
    id: string,
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Get
      body: number
    }
  ): Promise<Response<Contact[]>>
  async request(
    id: string,
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Post
      body: Contact
    }
  ): Promise<Response<Contact>>
  async request(
    id: string,
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Put
      body: Contact
    }
  ): Promise<Response<Contact>>
  async request(
    id: string,
    config: {
      endpoint: Endpoint.Contacts
      method: Method.Delete
      body: Pick<Contact, "id">
    }
  ): Promise<Response<string>>
  async request(
    id: string,
    config: {
      endpoint: Endpoint.PureUpdate
      method: Method.Post
      file: string
    }
  ): Promise<Response>
  async request(
    id: string,
    config: {
      endpoint: Endpoint.File
      method: Method.Post
      file: string
    }
  ): Promise<Response>
  async request(id: string, config: RequestConfig): Promise<Response<any>>
  async request(id: string, config: RequestConfig): Promise<Response<any>> {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      return phonePort.request(config)
    } else {
      return Promise.resolve({ status: ResponseStatus.ConnectionIsClosed })
    }
  }

  on(id: string, channelName: EventName, listener: () => void): void {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      phonePort.on(channelName, listener)
    }
  }

  off(id: string, channelName: EventName, listener: () => void): void {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      phonePort.off(channelName, listener)
    }
  }

  onAttachPhone(listener: (event: string) => void): void {
    this.eventEmitter.on(PureNodeEvent.AttachedPhone, listener)
  }

  offAttachPhone(listener: (event: string) => void): void {
    this.eventEmitter.off(PureNodeEvent.AttachedPhone, listener)
  }

  private removePhonePortOnDisconnectionEvent(id: string): void {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      const listener = () => {
        this.phonePortMap.delete(id)
        phonePort.off(EventName.Disconnected, listener)
      }
      phonePort.on(EventName.Disconnected, listener)
    }
  }
}

export default class extends PureNode {
  constructor() {
    super(createPhonePort, new UsbDetector())
  }
}
