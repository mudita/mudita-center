/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Manufacture,
  VendorID,
  ProductID,
  MuditaDeviceType,
} from "../constants"

export class MuditaHarmonyDevice {
  static manufacturer = Manufacture.Mudita
  static deviceType = MuditaDeviceType.MuditaHarmony
  static productIds = [
    ProductID.MuditaHarmony,
    ProductID.MuditaHarmonyTemporary,
  ]
  static vendorIds = [VendorID.MuditaHarmony, VendorID.MuditaHarmonyTemporary]
}
