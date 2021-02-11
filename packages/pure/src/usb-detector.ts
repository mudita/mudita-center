import usb, { Device, DeviceDescriptor } from "usb"
import { EventEmitter } from "events"
import { PortInfo } from "serialport"

type UsbDetectorPortInfo = Omit<PortInfo, "path">

enum UsbDetectorEventName {
  Attach = "Attach",
}

class UsbDetector {
  #eventEmitter = new EventEmitter()

  public init(): UsbDetector {
    this.registerAttachDeviceEmitter()
    return this
  }

  public onAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.#eventEmitter.on(UsbDetectorEventName.Attach, listener)
  }

  public offAttachDevice(listener: (event: UsbDetectorPortInfo) => void): void {
    this.#eventEmitter.off(UsbDetectorEventName.Attach, listener)
  }

  private getDescriptor(
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
    device.open()
    const { idVendor, idProduct } = device.deviceDescriptor
    const manufacturer = await this.getDescriptor(device, "iManufacturer")
    const serialNumber = await this.getDescriptor(device, "iSerialNumber")
    device.close()

    return {
      manufacturer,
      serialNumber,
      vendorId: idVendor.toString(16).padStart(4, "0"),
      productId: idProduct.toString(16).padStart(4, "0"),
    }
  }

  private registerAttachDeviceEmitter() {
    usb.on("attach", async (device: Device) => {
      const portInfo = await this.getPortInfo(device)
      this.#eventEmitter.emit(UsbDetectorEventName.Attach, portInfo)
    })
  }
}

export default UsbDetector
