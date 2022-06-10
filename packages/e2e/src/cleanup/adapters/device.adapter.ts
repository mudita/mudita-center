import { getDeviceList, Device } from "usb"
import { PortInfo } from "serialport"
import * as SerialPort from "serialport"
import { DeviceIdentity } from "../types"
import { DeviceAdapterClass } from "./device-adapter.class"

export class DeviceAdapter implements DeviceAdapterClass {
  public async getDeviceByDescription(props: DeviceIdentity): Promise<Device> {
    const devices = await getDeviceList()
    const device = this.getMuditaDevice(devices, props)
    const port = await this.getSerialDevice(device)

    return port
  }

  private getMuditaDevice(devices: Device[], identity: DeviceIdentity): Device {
    return devices
      .map((device) => {
        const { idVendor, idProduct } = device.deviceDescriptor
        const formattedVendorId = idVendor.toString(16).padStart(4, "0")
        const formattedProductId = idProduct.toString(16).padStart(4, "0")

        return { vendorId: formattedVendorId, productId: formattedProductId }
      })
      .find((device) => {
        const { vendorId, productId } = device
        return (
          vendorId === identity.vendorId && productId === identity.productId
        )
      })
  }

  private async getSerialDevice(device: Device): Promise<PortInfo> {
    const ports = (await SerialPort.list()) as PortInfo[]
    return ports.find((port) => {
      return (
        port.vendorId === device?.vendorId &&
        port.productId === device?.productId
      )
    })
  }
}
