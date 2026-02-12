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

export class SerialPortApiDevice extends SerialPortHandler {
  static readonly matchingVendorIds = [...kompaktVendorIds]
  static readonly matchingProductIds = [...kompaktProductIds]
  static readonly deviceType = SerialPortDeviceType.ApiDevice
  readonly requestIdKey = "rid"

  constructor({ ...options }: Omit<SerialPortHandlerOptions, "baudRate">) {
    super({
      ...options,
      baudRate: 921_600,
      parser: new CommonDeviceResponseParser({ matcher: /#\d{9}/ }),
    })
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
