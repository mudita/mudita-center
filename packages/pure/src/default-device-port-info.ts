import { PortInfo } from "serialport"

export const productId = "0622"
export const vendorId = "045e"
export const manufacturer = "Mudita"

class DevicePortInfo {
  static isVendorId(portInfo: Partial<PortInfo>): boolean {
    // toLowerCase() is needed tu unify the codes as different platforms
    // shows them in different casing (eg. 045E vs 045e)
    return portInfo.vendorId?.toLowerCase() === vendorId.toLowerCase()
  }

  static isProductId(portInfo: Partial<PortInfo>): boolean {
    return portInfo.productId?.toLowerCase() === productId.toLowerCase()
  }

  static isPortInfoMatch(portInfo: Partial<PortInfo>): boolean {
    return (
      DevicePortInfo.isVendorId(portInfo) &&
      DevicePortInfo.isProductId(portInfo)
    )
  }
}

export default DevicePortInfo
