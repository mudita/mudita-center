import SerialPort = require("serialport")
import {
  Endpoint,
  EventName,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "./types"
import { DeviceInfo } from "./device-info-endpoint.types"
import PhonePort, { createPhonePort, CreatePhonePort } from "./phone-port"

interface Phones {
  id: string
}

export const productId = "0622"
export const manufacturer = "Mudita"

class PureNode {
  static async getPhones(): Promise<Phones[]> {
    const portList = await PureNode.getSerialPortList()

    return portList
      .filter(
        (portInfo) =>
          portInfo.manufacturer === manufacturer &&
          portInfo.productId === productId
      )
      .map(({ serialNumber = "" }) => ({ id: String(serialNumber) }))
  }

  private static async getSerialPortList(): Promise<SerialPort.PortInfo[]> {
    return await SerialPort.list()
  }

  private phonePortMap: Map<string, PhonePort> = new Map()

  constructor(private createPhonePort: CreatePhonePort) {}

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

  async request(id:string, config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<Response<DeviceInfo>>
  async request(id:string, config: RequestConfig): Promise<Response<any>>
  async request(id: string, config: RequestConfig): Promise<Response<any>>{
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      return phonePort.request(config)
    } else {
      return Promise.resolve({ status: ResponseStatus.ConnectionIsClosed })
    }
  }

  on(id: string, channelName: EventName, listener: () => void) {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      phonePort.on(channelName, listener)
    }
  }

  off(id: string, channelName: EventName, listener: () => void) {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      phonePort.off(channelName, listener)
    }
  }

  private removePhonePortOnDisconnectionEvent(id: string): void {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      const listener = () => this.phonePortMap.delete(id)
      phonePort.on(EventName.Disconnected, listener)
      phonePort.off(EventName.Disconnected, listener)
    }
  }
}

export default class extends PureNode {
  constructor() {
    super(createPhonePort)
  }
}
