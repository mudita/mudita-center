import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import PhonePort, { createPhonePort, CreatePhonePort } from "./phone-port"

export const productId = "0100"
export const manufacturer = "Mudita"

enum PureNodeEvent {
  AttachedPhone = "AttachedPhone",
}

export class PureNode {

  private eventEmitter = new EventEmitter()

  constructor(
    private createPhonePort: CreatePhonePort,
    private usbDetector: UsbDetector
  ) {
    this.registerAttachDeviceListener()
  }

  public async getPhonePorts(): Promise<PhonePort[]> {
    const portList = await PureNode.getSerialPortList()

    return portList
      .filter(PureNode.isMuditaPurePhone)
      .map(({ path }) => createPhonePort(path))
  }

  public onAttachPhone(listener: (event: PhonePort) => void): void {
    this.eventEmitter.on(PureNodeEvent.AttachedPhone, listener)
  }

  public offAttachPhone(listener: (event: PhonePort) => void): void {
    this.eventEmitter.off(PureNodeEvent.AttachedPhone, listener)
  }

  private registerAttachDeviceListener(): void {
    this.usbDetector.onAttachDevice(async (portInfo) => {
      if (portInfo.manufacturer === manufacturer) {
        const portList = await PureNode.getSerialPortList()

        const port = portList.find(
          ({ serialNumber }) => String(serialNumber) === portInfo.serialNumber
        )
        if(port) {
          const phonePort = createPhonePort(port.path)
          this.eventEmitter.emit(PureNodeEvent.AttachedPhone, phonePort)
        }
      }
    })
  }

  private static isMuditaPurePhone(portInfo: PortInfo): boolean {
    return (
      portInfo.manufacturer === manufacturer && portInfo.productId === productId
    )
  }

  private static async getSerialPortList(): Promise<PortInfo[]> {
    return await SerialPort.list()
  }
}

export default new PureNode(createPhonePort, new UsbDetector())
