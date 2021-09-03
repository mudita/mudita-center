/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Manufacture, VendorID, ProductID, DeviceType } from "../constants"
import { HarmonyStrategy } from "../strategies"

export class MuditaHarmonyDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaHarmony
  static productIds = [
    ProductID.MuditaHarmony,
    ProductID.MuditaHarmonyTemporary,
  ]
  static vendorIds = [VendorID.MuditaHarmony, VendorID.MuditaHarmonyTemporary]
  static strategy = HarmonyStrategy
}
