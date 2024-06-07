/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceType } from "device-protocol/models"
import { Manufacture, VendorID, ProductID } from "Core/device/constants"
import { HarmonyStrategy } from "Core/device/strategies"
import { SerialPortDeviceAdapter } from "Core/device/modules/mudita-os/adapters"

export class MuditaHarmonyDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaHarmony
  static productIds = [ProductID.MuditaHarmony]
  static vendorIds = [VendorID.MuditaHarmony]
  static adapter = SerialPortDeviceAdapter
  static strategy = HarmonyStrategy
}
