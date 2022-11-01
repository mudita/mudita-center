/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Manufacture, VendorID, ProductID, DeviceType } from "../constants/index.js"
import { PureStrategy, HarmonyStrategy } from "../strategies/index.js"

export interface DeviceDescriptor {
  manufacturer: Manufacture
  deviceType: DeviceType
  productIds: ProductID[]
  vendorIds: VendorID[]
  strategy: PureStrategy | HarmonyStrategy
}
