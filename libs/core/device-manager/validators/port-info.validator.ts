/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import {
  MuditaHarmonyDescriptor,
  MuditaHarmonyMscDescriptor,
  MuditaKompaktDescriptor,
  MuditaPureDescriptor,
} from "../../device/descriptors"

export class PortInfoValidator {
  static eligibleDevices = [
    MuditaPureDescriptor,
    MuditaHarmonyDescriptor,
    MuditaHarmonyMscDescriptor,
    MuditaKompaktDescriptor,
  ]

  static isVendorIdValid(portInfo: Partial<PortInfo>): boolean {
    const id = portInfo.vendorId?.toLowerCase() ?? ""

    return Boolean(
      PortInfoValidator.eligibleDevices.find((device) => {
        const vendorIds = device.vendorIds.map((item) =>
          item.toString().toLowerCase()
        )

        return vendorIds.includes(id)
      })
    )
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
    const vendorId = portInfo.vendorId?.toLowerCase() ?? ""
    const productId = portInfo.productId?.toLowerCase() ?? ""

    return Boolean(
      PortInfoValidator.eligibleDevices.find(({ vendorIds, productIds }) => {
        return (
          vendorIds
            .map((item) => item.toString().toLowerCase())
            .includes(vendorId) &&
          productIds
            .map((item) => item.toString().toLowerCase())
            .includes(productId)
        )
      })
    )
  }
}
