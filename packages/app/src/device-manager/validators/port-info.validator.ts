/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  MuditaPureDescriptor,
  MuditaHarmonyDescriptor,
} from "../../device/descriptors"

export class PortInfoValidator {
  static eligibleDevices = [MuditaPureDescriptor, MuditaHarmonyDescriptor]

  static isVendorIdValid(portInfo: Partial<PortInfo>): boolean {
    const id = portInfo.vendorId?.toLowerCase() ?? ""
    return Boolean(
      PortInfoValidator.eligibleDevices.find((device) =>
        device.vendorIds.map((item) => item.toLowerCase()).includes(id)
      )
    )
  }

  static isProductIdValid(portInfo: Partial<PortInfo>): boolean {
    const id = portInfo.productId?.toLowerCase() ?? ""
    return Boolean(
      PortInfoValidator.eligibleDevices.find((device) =>
        device.productIds.map((item) => item.toLowerCase()).includes(id)
      )
    )
  }

  static isPortInfoMatch(portInfo: Partial<PortInfo>): boolean {
    return (
      PortInfoValidator.isVendorIdValid(portInfo) &&
      PortInfoValidator.isProductIdValid(portInfo)
    )
  }
}
