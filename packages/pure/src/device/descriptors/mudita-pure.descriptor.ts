/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Manufacture, VendorID, ProductID, DeviceType } from "../constants/index.js"
import { PureStrategy } from "../strategies/index.js"

export class MuditaPureDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaPure
  static productIds = [
    ProductID.MuditaPure,
    ProductID.MuditaPureTemporary,
    ProductID.MuditaPureNotMtpTemporary,
  ]
  static vendorIds = [VendorID.MuditaPure, VendorID.MuditaPureTemporary]
  static strategy = PureStrategy
}
