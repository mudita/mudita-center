import SerialPort = require("serialport")
import { ConnectResponse, ConnectResponseStatus } from "./types"
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

  phonePorts: { [key: string]: PhonePort } = {}

  constructor(private createPhonePort: CreatePhonePort) {}

  async connect(id: string): Promise<ConnectResponse>{
    const portList = await PureNode.getSerialPortList()
    const port = portList.find(({ serialNumber }) => serialNumber === id)

    if (port && this.phonePorts[id]) {
      return {status: ConnectResponseStatus.Ok}
    } else if (port) {
      const phonePort =  this.createPhonePort();
      const response = await phonePort.connect(port.path)

      if(response.status === ConnectResponseStatus.Ok){
        this.phonePorts[id] = phonePort
      }

      return response
    } else {
      return  {status: ConnectResponseStatus.Error}
    }
  }

  portInit(cb: (phones: any[]) => void): void {}
  on(chanelName: string, listener: (event: any) => void): void {}
  init(path: string): void {}
}



export default class extends PureNode {
  constructor() {
    super(createPhonePort);
  }
}
