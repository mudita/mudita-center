/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Manufacture,
  VendorID,
  ProductID,
  DeviceType,
} from "Core/device/constants"
import { PureStrategy } from "Core/device/strategies"
import { SerialPortDeviceAdapter } from "Core/device/modules/mudita-os/adapters"

export class MuditaPureDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaPure
  static productIds = [ProductID.MuditaPureDeprecated, ProductID.MuditaPure]
  static vendorIds = [VendorID.MuditaPure]
  static adapter = SerialPortDeviceAdapter
  static strategy = PureStrategy
}
