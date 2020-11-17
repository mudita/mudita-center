const usb = require("usb")
import { EventEmitter } from "events"
import { PortInfo } from "serialport"

type UsbDetectorPortInfo = Omit<PortInfo, "path">

enum UsbDetectorEvent {
  Attach = "Attach",
}

class UsbDetector {
  private eventEmitter = new EventEmitter()

  constructor() {
    usb.on("attach", async (device: any) => {
      const portInfo = await this.getPortInfo(device)
      this.eventEmitter.emit(UsbDetectorEvent.Attach, portInfo)
    })
  }

  public onAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.eventEmitter.on(UsbDetectorEvent.Attach, listener)
  }

  public offAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.eventEmitter.off(UsbDetectorEvent.Attach, listener)
  }

  private async getDescriptor(
    device: any,
    deviceDescriptor: string
  ): Promise<any> {
    return new Promise((resolve) => {
      device.getStringDescriptor(
        device.deviceDescriptor[deviceDescriptor],
        (err: any, data: any) => {
          resolve(data)
        }
      )
    })
  }

  private async getPortInfo(device: any): Promise<UsbDetectorPortInfo> {
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
