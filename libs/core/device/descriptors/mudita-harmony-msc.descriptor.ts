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
import { HarmonyStrategy } from "Core/device/strategies"
import { SerialPortDeviceAdapter } from "Core/device/modules/mudita-os/adapters"

export class MuditaHarmonyMscDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaHarmonyMsc
  static productIds = [ProductID.MuditaHarmonyMsc]
  static vendorIds = [VendorID.MuditaHarmony]
  static adapter = SerialPortDeviceAdapter
  static strategy = HarmonyStrategy
}
