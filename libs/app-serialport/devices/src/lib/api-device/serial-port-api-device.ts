/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  KompaktProductID,
  KompaktVendorID,
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
  SerialPortRequest,
} from "app-serialport/models"
import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../serial-port-device"
import { CommonDeviceResponseParser } from "../common/common-device-response-parser"
import { commonDeviceRequestParser } from "../common/common-device-request-parser"

export const kompaktVendorIds: string[] = [KompaktVendorID.Hex, KompaktVendorID.Dec]
export const kompaktProductIds: string[] = [
  KompaktProductID.TransferHex, // "200a"
  KompaktProductID.TransferHex.toUpperCase(), // "200A"
  KompaktProductID.ChargeHex,
  KompaktProductID.NoDebugHex,
  KompaktProductID.ChargeDec,
  KompaktProductID.TransferDec,
  KompaktProductID.NoDebugDec,
]

export class SerialPortApiDevice extends SerialPortDevice {
  static readonly matchingVendorIds = [...kompaktVendorIds]
  static readonly matchingProductIds = [...kompaktProductIds]
  static readonly deviceType = SerialPortDeviceType.ApiDevice
  readonly requestIdKey = "rid"

  constructor({ baudRate = 9600, ...options }: SerialPortDeviceOptions) {
    super(
      { baudRate, ...options },
      new CommonDeviceResponseParser({ matcher: /#\d{9}/g })
    )
  }

  public static getSubtype(vendorId?: string, productId?: string) {
    if (!vendorId || !productId) {
      return undefined
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
    ]
  }

  parseRequest(data: SerialPortRequest) {
    return commonDeviceRequestParser(data)
  }
}
