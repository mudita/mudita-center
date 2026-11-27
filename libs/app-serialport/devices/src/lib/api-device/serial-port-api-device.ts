/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  DeviceNProductID,
  KompaktProductID,
  KompaktVendorID,
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
  SerialPortRequest,
} from "app-serialport/models"
import { CommonDeviceResponseParser } from "../common/common-device-response-parser"
import { commonDeviceRequestParser } from "../common/common-device-request-parser"
import {
  SerialPortHandler,
  SerialPortHandlerOptions,
} from "../serial-port-handler"

export const kompaktVendorIds: string[] = [
  KompaktVendorID.Hex,
  KompaktVendorID.Dec,
]
export const kompaktProductIds: string[] = [
  KompaktProductID.TransferHex, // "200a"
  KompaktProductID.TransferHex.toUpperCase(), // "200A"
  KompaktProductID.ChargeHex,
  KompaktProductID.NoDebugHex,
  KompaktProductID.ChargeDec,
  KompaktProductID.TransferDec,
  KompaktProductID.NoDebugDec,
]

export const deviceNVendorIds: string[] = [...kompaktVendorIds]
export const deviceNProductIds: string[] = [
  DeviceNProductID.Hex,
  DeviceNProductID.Hex.toUpperCase(),
  DeviceNProductID.Dec,
]

// TODO(CP-4075): Temporary - remove once Device N firmware reports its own Product ID.
// The Device N prototype reports Kompakt's "NoDebug" Product ID, so it cannot be
// told apart from Kompakt by USB IDs. Setting MC_DEVICE_N_PROTOTYPE=1 treats that
// Product ID as Device N (development only - a real Kompakt in NoDebug mode will
// then be recognized as Device N too).
const deviceNPrototypeProductIds: string[] = [
  KompaktProductID.NoDebugHex,
  KompaktProductID.NoDebugDec,
]
const isDeviceNPrototypeModeEnabled = () =>
  process.env.MC_DEVICE_N_PROTOTYPE === "1"

export class SerialPortApiDevice extends SerialPortHandler {
  static readonly matchingVendorIds = [...kompaktVendorIds]
  static readonly matchingProductIds = [
    ...kompaktProductIds,
    ...deviceNProductIds,
  ]
  static readonly deviceType = SerialPortDeviceType.ApiDevice
  readonly requestIdKey = "rid"

  constructor({ ...options }: Omit<SerialPortHandlerOptions, "baudRate">) {
    super({
      ...options,
      baudRate: 9600,
      parser: new CommonDeviceResponseParser({ matcher: /#\d{9}/ }),
    })
  }

  public static getSubtype(vendorId?: string, productId?: string) {
    if (!vendorId || !productId) {
      return undefined
    }
    if (
      isDeviceNPrototypeModeEnabled() &&
      deviceNVendorIds.includes(vendorId) &&
      deviceNPrototypeProductIds.includes(productId)
    ) {
      return SerialPortDeviceSubtype.DeviceN
    }
    if (
      deviceNVendorIds.includes(vendorId) &&
      deviceNProductIds.includes(productId)
    ) {
      return SerialPortDeviceSubtype.DeviceN
    }
    if (
      kompaktVendorIds.includes(vendorId) &&
      kompaktProductIds.includes(productId)
    ) {
      return SerialPortDeviceSubtype.Kompakt
    }
    return undefined
  }

  public static getProductsGroups() {
    return [
      {
        vendorIds: kompaktVendorIds,
        productIds: kompaktProductIds,
      },
      {
        vendorIds: deviceNVendorIds,
        productIds: deviceNProductIds,
      },
    ]
  }

  parseRequest(data: SerialPortRequest) {
    return commonDeviceRequestParser(data)
  }
}
