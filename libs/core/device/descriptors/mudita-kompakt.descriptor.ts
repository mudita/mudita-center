/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  VendorID,
  ProductID,
} from "Core/device/constants"

export class MuditaKompaktDescriptor {
  static productIds = [
    ProductID.MuditaKompaktChargeDec,
    ProductID.MuditaKompaktTransferDec,
    ProductID.MuditaKompaktNoDebugDec,
    ProductID.MuditaKompaktChargeHex,
    ProductID.MuditaKompaktTransferHex,
    ProductID.MuditaKompaktNoDebugHex,
  ]
  static vendorIds = [VendorID.MuditaKompaktDec, VendorID.MuditaKompaktHex]
}
