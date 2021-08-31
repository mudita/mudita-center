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

export class MuditaPureDevice {
  static manufacturer = Manufacture.Mudita
  static deviceType = MuditaDeviceType.MuditaPure
  static productIds = [ProductID.MuditaPure, ProductID.MuditaPureTemporary, ProductID.MuditaPureNotMtpTemporary]
  static vendorIds = [VendorID.MuditaPure, VendorID.MuditaPureTemporary]
}
