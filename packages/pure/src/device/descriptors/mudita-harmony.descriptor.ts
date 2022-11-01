/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Manufacture, VendorID, ProductID, DeviceType } from "../constants/index.js"
import { HarmonyStrategy } from "../strategies/index.js"

export class MuditaHarmonyDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaHarmony
  static productIds = [ProductID.MuditaHarmony]
  static vendorIds = [VendorID.MuditaHarmony]
  static strategy = HarmonyStrategy
}
