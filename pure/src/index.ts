import SerialPort = require("serialport")
import { EventName, Response, ResponseStatus } from "./types"
import PhonePort, { createPhonePort, CreatePhonePort } from "./phone-port"

interface Phones {
  id: string
}

export const productId = "0100"
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
      .map(({ serialNumber = "" }) => serialNumber)
      .map((serialNumber) => ({ id: serialNumber }))
  }

  private static async getSerialPortList(): Promise<SerialPort.PortInfo[]> {
    return await SerialPort.list()
  }

  phonePortMap: Map<string, PhonePort> = new Map()

  constructor(private createPhonePort: CreatePhonePort) {}

  async connect(id: string): Promise<Response> {
    const portList = await PureNode.getSerialPortList()
    const port = portList.find(({ serialNumber }) => serialNumber === id)

    if (port && this.phonePortMap.has(id)) {
      return { status: ResponseStatus.Ok }
    } else if (port) {
      const phonePort = this.createPhonePort()
      const response = await phonePort.connect(port.path)

      if (response.status === ResponseStatus.Ok) {
        this.phonePortMap.set(id, phonePort)
      }

      return response
    } else {
      return { status: ResponseStatus.Error }
    }
  }

  async disconnect(id: string): Promise<Response> {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      const response = await phonePort.disconnect()
      this.phonePortMap.delete(id)

      return response
    } else {
      return { status: ResponseStatus.Ok }
    }
  }

  on(id: string, chanelName: EventName, listener: () => void): void {}

  portInit(cb: (phones: any[]) => void): void {}

  init(path: string): void {}
}

export default class extends PureNode {
  constructor() {
    super(createPhonePort)
  }
}
