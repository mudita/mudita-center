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

export interface DeviceDescriptorClass {
  manufacturer: Manufacture
  deviceType: MuditaDeviceType
  productIds: ProductID[]
  vendorIds: VendorID[]
}
