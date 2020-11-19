import usb, { Device, DeviceDescriptor } from "usb"
import { EventEmitter } from "events"
import { PortInfo } from "serialport"

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
    deviceDescriptor: keyof DeviceDescriptor
  ): Promise<string> {
    return new Promise((resolve) => {
      device.getStringDescriptor(
        device.deviceDescriptor[deviceDescriptor],
        (error, data = "") => {
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
