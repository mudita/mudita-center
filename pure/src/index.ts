import SerialPort = require("serialport")
import { EventName, Response, ResponseStatus, UnregisterListener } from "./types"
import PhonePort, { createPhonePort, CreatePhonePort } from "./phone-port"
import { noop } from "./utils"

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
      .map(({ serialNumber = "" }) => serialNumber)
      .map((serialNumber) => ({ id: serialNumber }))
  }

  private static async getSerialPortList(): Promise<SerialPort.PortInfo[]> {
    return await SerialPort.list()
  }

  private phonePortMap: Map<string, PhonePort> = new Map()

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
        phonePort.on(EventName.Disconnected, () => this.phonePortMap.delete(id))
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

  on(id: string, chanelName: EventName, listener: () => void): UnregisterListener {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      phonePort.on(chanelName, listener)

      return () => {
        phonePort.off(chanelName, listener)
      }
    } else{
      return noop
    }
  }

  off(id: string, chanelName: EventName, listener: () => void) {
    const phonePort = this.phonePortMap.get(id)
    if (phonePort) {
      phonePort.off(chanelName, listener)
    }
  }
}

export default class extends PureNode {
  constructor() {
    super(createPhonePort)
  }
}
