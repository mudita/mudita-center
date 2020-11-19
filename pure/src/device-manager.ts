import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import { createDevice} from "./device"
import { CreateDevice, PureDevice } from "./device.types"

export const productId = "0100"
export const manufacturer = "Mudita"

enum DeviceManagerEventName {
  AttachedDevice = "AttachedDevice",
}

export interface PureDeviceManager {
  getDevices(): Promise<PureDevice[]>
  onAttachDevice(listener: (event: PureDevice) => void):void
  offAttachDevice(listener: (event: PureDevice) => void): void
}

class DeviceManager implements PureDeviceManager {
  #eventEmitter = new EventEmitter()

  constructor(
    private createDevice: CreateDevice,
    private usbDetector: UsbDetector
  ) {}

  public init(): DeviceManager {
    this.registerAttachDeviceEmitter()
    return this
  }

  public async getDevices(): Promise<PureDevice[]> {
    const portList = await DeviceManager.getSerialPortList()

    return portList
      .filter(
        (portInfo) =>
          portInfo.manufacturer === manufacturer &&
          portInfo.productId === productId
      )
      .map(({ path }) => createDevice(path))
  }

  public onAttachDevice(listener: (event: PureDevice) => void): void {
    this.#eventEmitter.on(DeviceManagerEventName.AttachedDevice, listener)
  }

  public offAttachDevice(listener: (event: PureDevice) => void): void {
    this.#eventEmitter.off(DeviceManagerEventName.AttachedDevice, listener)
  }

  private registerAttachDeviceEmitter(): void {
    this.usbDetector.onAttachDevice(async (portInfo) => {
      if (portInfo.manufacturer === manufacturer) {
        const portList = await DeviceManager.getSerialPortList()

        const port = portList.find(
          ({ serialNumber }) => String(serialNumber) === portInfo.serialNumber
        )
        if (port) {
          const device = createDevice(port.path)
          this.#eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
        }
      }
    })
  }

  private static async getSerialPortList(): Promise<PortInfo[]> {
    return await SerialPort.list()
  }
}

const createDeviceManager = (
  createDevice: CreateDevice,
  usbDetector: UsbDetector
) => {
  return new DeviceManager(createDevice, usbDetector).init()
}

export default createDeviceManager(createDevice, new UsbDetector().init())
