/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Manufacture,
  VendorID,
  ProductID,
  DeviceType,
} from "Core/device/constants"
import { KompaktStrategy } from "Core/device/strategies"
import { SerialPortDeviceKompaktAdapter } from "Core/device/modules/mudita-os/adapters"

export class MuditaKompaktDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaKompakt
  static productIds = [
    ProductID.MuditaKompaktChargeDec,
    ProductID.MuditaKompaktTransferDec,
    ProductID.MuditaKompaktNoDebugDec,
    ProductID.MuditaKompaktChargeHex,
    ProductID.MuditaKompaktTransferHex,
    ProductID.MuditaKompaktNoDebugHex,
  ]
  static vendorIds = [VendorID.MuditaKompaktDec, VendorID.MuditaKompaktHex]
  static adapter = SerialPortDeviceKompaktAdapter
  static strategy = KompaktStrategy
}
