import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import Device, { createDevice, CreateDevice } from "./device"

export const productId = "0100"
export const manufacturer = "Mudita"

enum PureNodeEventName {
  AttachedDevice = "AttachedDevice",
}

export interface IPureNode {
  getDevices: () => Promise<Device[]>
  onAttachDevice: (listener: (event: Device) => void) => void
  offAttachDevice: (listener: (event: Device) => void) => void
}


class PureNode implements IPureNode{
  #eventEmitter = new EventEmitter()

  constructor(
    private createDevice: CreateDevice,
    private usbDetector: UsbDetector
  ) {}

  public init(): PureNode {
    this.registerAttachDeviceEmitter()
    return this
  }

  public async getDevices(): Promise<Device[]> {
    const portList = await PureNode.getSerialPortList()

    return portList
      .filter(
        (portInfo) =>
          portInfo.manufacturer === manufacturer &&
          portInfo.productId === productId
      )
      .map(({ path }) => createDevice(path))
  }

  public onAttachDevice(listener: (event: Device) => void): void {
    this.#eventEmitter.on(PureNodeEventName.AttachedDevice, listener)
  }

  public offAttachDevice(listener: (event: Device) => void): void {
    this.#eventEmitter.off(PureNodeEventName.AttachedDevice, listener)
  }

  private registerAttachDeviceEmitter(): void {
    this.usbDetector.onAttachDevice(async (portInfo) => {
      if (portInfo.manufacturer === manufacturer) {
        const portList = await PureNode.getSerialPortList()

        const port = portList.find(
          ({ serialNumber }) => String(serialNumber) === portInfo.serialNumber
        )
        if (port) {
          const device = createDevice(port.path)
          this.#eventEmitter.emit(PureNodeEventName.AttachedDevice, device)
        }
      }
    })
  }

  private static async getSerialPortList(): Promise<PortInfo[]> {
    return await SerialPort.list()
  }
}

const createPureNode = (
  createDevice: CreateDevice,
  usbDetector: UsbDetector
) => {
  return new PureNode(createDevice, usbDetector).init()
}

export default createPureNode(createDevice, new UsbDetector())
