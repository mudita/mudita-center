/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Product } from "app-utils/models"

export enum SerialPortDeviceType {
  ApiDevice = "ApiDevice",
  Harmony = Product.Harmony,
  HarmonyMsc = Product.HarmonyMsc,
  Pure = Product.Pure,
}

export enum SerialPortDeviceSubtype {
  Kompakt = Product.Kompakt,
}

export enum KompaktProductID {
  ChargeHex = "2006", //0x2006
  TransferHex = "200a", //0x200a
  NoDebugHex = "2012", //0x2012
  ChargeDec = "8198", //0x2006
  TransferDec = "8202", //0x200a
  NoDebugDec = "8210", //0x2012
}

export enum KompaktVendorID {
  Hex = "3310",
  Dec = "13072",
}
