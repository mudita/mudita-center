/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../serial-port-device"
import {
  SerialPortDeviceSubtype,
  SerialPortDeviceType,
  SerialPortRequest,
} from "app-serialport/models"
import { CommonDeviceResponseParser } from "../common/common-device-response-parser"
import { commonDeviceRequestParser } from "../common/common-device-request-parser"

export const kompaktVendorIds = ["3310", "13072"]
export const kompaktProductIds = [
  "200a",
  "200A",
  "2006",
  "2012",
  "8198",
  "8202",
  "8210",
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

  parseRequest(data: SerialPortRequest) {
    return commonDeviceRequestParser(data)
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
}
