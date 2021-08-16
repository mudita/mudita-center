/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"

class DevicePortInfo {
  static productId = "0100"
  static vendorId = "3310"
  static manufacturer = "Mudita"

  // TODO: Remove tmp values when pure will be released, https://appnroll.atlassian.net/browse/CP-457
  static tmpProductId = "0622"
  static tmpVendorId = "045e"

  static isVendorId(portInfo: Partial<PortInfo>): boolean {
    // toLowerCase() is needed tu unify the codes as different platforms
    // shows them in different casing (eg. 045E vs 045e)
    const id = portInfo.vendorId?.toLowerCase()
    return (
      id === DevicePortInfo.vendorId.toLowerCase() ||
      id === DevicePortInfo.tmpVendorId.toLowerCase()
    )
  }

  static isProductId(portInfo: Partial<PortInfo>): boolean {
    const id = portInfo.productId?.toLowerCase()
    return (
      id === DevicePortInfo.productId.toLowerCase() ||
      id === DevicePortInfo.tmpProductId.toLowerCase()
    )
  }

  static isPortInfoMatch(portInfo: Partial<PortInfo>): boolean {
    return (
      DevicePortInfo.isVendorId(portInfo) &&
      DevicePortInfo.isProductId(portInfo)
    )
  }
}

export default DevicePortInfo
