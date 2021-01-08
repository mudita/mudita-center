import { EventEmitter } from "events"
import SerialPort, { PortInfo } from "serialport"
import UsbDetector from "./usb-detector"
import { createDevice } from "./device"
import { CreateDevice, PureDevice } from "./device.types"
import { Formatter, PureV1Formatter } from "./formatter"

export const productId = "0100"
export const manufacturer = "Mudita"

enum DeviceManagerEventName {
  AttachedDevice = "AttachedDevice",
}

export interface PureDeviceManager {
  getDevices(): Promise<PureDevice[]>
  onAttachDevice(listener: (event: PureDevice) => void): void
  offAttachDevice(listener: (event: PureDevice) => void): void
}

class DeviceManager implements PureDeviceManager {
  #eventEmitter = new EventEmitter()

  constructor(
    private formatter: Formatter,
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
        (portInfo) => portInfo.manufacturer === manufacturer
        // commented until the embedded  development with the productId will stabilize
        // && portInfo.productId === productId
      )
      .map(({ path }) => this.createDevice(this.formatter, path))
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
          const device = this.createDevice(this.formatter, port.path)
          this.#eventEmitter.emit(DeviceManagerEventName.AttachedDevice, device)
        }
      }
    })
  }

  private static getSerialPortList(): Promise<PortInfo[]> {
    return SerialPort.list()
  }
}

const createDeviceManager = (
  formatter: Formatter,
  createDevice: CreateDevice,
  usbDetector: UsbDetector
) => {
  return new DeviceManager(formatter, createDevice, usbDetector).init()
}

export default createDeviceManager(
  new PureV1Formatter(),
  createDevice,
  new UsbDetector().init()
)
