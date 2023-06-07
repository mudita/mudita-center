/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Manufacture,
  VendorID,
  ProductID,
  DeviceType,
} from "App/device/constants"
import { KompaktStrategy } from "App/device/strategies"
import { SerialPortDeviceAdapter } from "App/device/modules/mudita-os/adapters"

export class MuditaKompaktDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaKompakt
  static productIds = [
    ProductID.MuditaKompaktCharge,
    ProductID.MuditaKompaktTransfer,
    ProductID.MuditaKompaktNoDebug,
  ]
  static vendorIds = [VendorID.MuditaKompakt]
  static adapter = SerialPortDeviceAdapter
  static strategy = KompaktStrategy
}
