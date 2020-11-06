import SerialPort = require("serialport")

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

  portInit(cb: (phones: any[]) => void): void {}
  on(chanelName: string, listener: (event: any) => void): void {}
  init(path: string): void {}
}

export default PureNode
