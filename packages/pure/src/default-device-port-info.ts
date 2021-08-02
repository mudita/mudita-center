/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"

export const productId = "0100"
export const vendorId = "3310"
export const manufacturer = "Mudita"

// TODO: Remove tmp values when pure will be released, https://appnroll.atlassian.net/browse/CP-457
const tmpProductId = "0622"
const tmpVendorId = "045e"

class DevicePortInfo {
  static isVendorId(portInfo: Partial<PortInfo>): boolean {
    // toLowerCase() is needed tu unify the codes as different platforms
    // shows them in different casing (eg. 045E vs 045e)
    const id = portInfo.vendorId?.toLowerCase()
    return id === vendorId.toLowerCase() || id === tmpVendorId.toLowerCase()
  }

  static isProductId(portInfo: Partial<PortInfo>): boolean {
    const id = portInfo.productId?.toLowerCase()
    return id === productId.toLowerCase() || id === tmpProductId.toLowerCase()
  }

  static isPortInfoMatch(portInfo: Partial<PortInfo>): boolean {
    return (
      DevicePortInfo.isVendorId(portInfo) &&
      DevicePortInfo.isProductId(portInfo)
    )
  }
}

export default DevicePortInfo
