/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  MuditaPureDescriptor,
  MuditaHarmonyDescriptor,
  MuditaKompaktDescriptor,
} from "../../device/descriptors"

export class PortInfoValidator {
  static eligibleDevices = [
    MuditaPureDescriptor,
    MuditaHarmonyDescriptor,
    MuditaKompaktDescriptor,
  ]

  static isVendorIdValid(portInfo: Partial<PortInfo>): boolean {
    const id = portInfo.vendorId?.toLowerCase() ?? ""

    console.log("PortInfoValidator isVendorIdValid id", id)

    const result = Boolean(
      PortInfoValidator.eligibleDevices.find((device) => {
        console.log("PortInfoValidator isVendorIdValid device", device)

        const vendorIds = device.vendorIds.map((item) =>
          item.toString().toLowerCase()
        )

        console.log("PortInfoValidator isVendorIdValid vendorIds", vendorIds)

        return vendorIds.includes(id)
      })
    )

    console.log("PortInfoValidator isVendorIdValid result", result)
    return result
  }

  static isProductIdValid(portInfo: Partial<PortInfo>): boolean {
    const id = portInfo.productId?.toLowerCase() ?? ""
    return Boolean(
      PortInfoValidator.eligibleDevices.find((device) =>
        device.productIds
          .map((item) => item.toString().toLowerCase())
          .includes(id)
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
