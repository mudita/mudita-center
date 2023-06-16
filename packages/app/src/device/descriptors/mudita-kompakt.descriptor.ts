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
import { KompaktStrategy } from "App/device/strategies"
import { SerialPortDeviceAdapter } from "App/device/modules/mudita-os/adapters"

export class MuditaKompaktDescriptor {
  static manufacturer = Manufacture.Mudita
  static deviceType = DeviceType.MuditaKompakt
  static productIds = [
    ProductID.MuditaKompaktChargeDec,
    ProductID.MuditaKompaktTransferDec,
    ProductID.MuditaKompaktNoDebugDec,
    ProductID.MuditaKompaktChargeHex,
    ProductID.MuditaKompaktTransferHex,
    ProductID.MuditaKompaktNoDebugHex,
  ]
  static vendorIds = [VendorID.MuditaKompaktDec, VendorID.MuditaKompaktHex]
  static adapter = SerialPortDeviceAdapter
  static strategy = KompaktStrategy
}

// {"busNumber":1,"deviceAddress":6,"deviceDescriptor":{"bLength":18,"bDescriptorType":1,"bcdUSB":512,"bDeviceClass":0,
// "bDeviceSubClass":0,"bDeviceProtocol":0,"bMaxPacketSize0":64,"idVendor":3725,"idProduct":8198,"bcdDevice":547,"iManufacturer":1,"iProduct":2,
// "iSerialNumber":3,"bNumConfigurations":1},"portNumbers":[3]} 