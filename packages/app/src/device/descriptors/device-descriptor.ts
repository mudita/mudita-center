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
import { PureStrategy, HarmonyStrategy } from "App/device/strategies"
import { SerialPortDeviceAdapter } from "App/device/modules/mudita-os/adapters/serial-port-device.adapters"

export interface DeviceDescriptor {
  manufacturer: Manufacture
  deviceType: DeviceType
  productIds: ProductID[]
  vendorIds: VendorID[]
  adapter: typeof SerialPortDeviceAdapter
  strategy: typeof PureStrategy | typeof HarmonyStrategy
}
