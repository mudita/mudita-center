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

  private registerAttachDeviceEmitter() {
    usb.on("attach", async (device: Device) => {
      const { idVendor, idProduct } = device.deviceDescriptor

      const portInfo = {
        vendorId: idVendor.toString(16).padStart(4, "0"),
        productId: idProduct.toString(16).padStart(4, "0"),
      }

      this.#eventEmitter.emit(UsbDetectorEventName.Attach, portInfo)
    })
  }
}

export default UsbDetector
