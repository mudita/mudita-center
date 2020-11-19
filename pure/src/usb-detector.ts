const usb = require("usb")
import { EventEmitter } from "events"
import { PortInfo } from "serialport"

interface Device {
  deviceDescriptor: { [key: string]: any }
  open(): void
  close(): void
  getStringDescriptor(descriptorIndex: string, callback: (error: any, data: string) => void): void
}

type UsbDetectorPortInfo = Omit<PortInfo, "path">

enum UsbDetectorEventName {
  Attach = "Attach",
}

class UsbDetector {
  #eventEmitter = new EventEmitter()

  constructor() {
    usb.on("attach", async (device: Device) => {
      const portInfo = await this.getPortInfo(device)
      this.#eventEmitter.emit(UsbDetectorEventName.Attach, portInfo)
    })
  }

  public onAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.#eventEmitter.on(UsbDetectorEventName.Attach, listener)
  }

  public offAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.#eventEmitter.off(UsbDetectorEventName.Attach, listener)
  }

  private async getDescriptor(
    device: Device,
    deviceDescriptor: string
  ): Promise<any> {
    return new Promise((resolve) => {
      device.getStringDescriptor(
        device.deviceDescriptor[deviceDescriptor],
        (error: any, data: string) => {
          resolve(data)
        }
      )
    })
  }

  private async getPortInfo(device: Device): Promise<UsbDetectorPortInfo> {
    return new Promise(async (resolve) => {
      device.open()
      const manufacturer = await this.getDescriptor(device, "iManufacturer")
      const serialNumber = await this.getDescriptor(device, "iSerialNumber")
      device.close()
      resolve({
        manufacturer,
        serialNumber,
      })
    })
  }
}

export default UsbDetector
