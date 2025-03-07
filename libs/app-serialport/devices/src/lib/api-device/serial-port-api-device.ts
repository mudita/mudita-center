/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../serial-port-device"
import { SerialPortDeviceType, SerialPortRequest } from "app-serialport/models"
import { CommonDeviceResponseParser } from "../common/common-device-response-parser"
import { commonDeviceRequestParser } from "../common/common-device-request-parser"

export class SerialPortApiDevice extends SerialPortDevice {
  static readonly matchingVendorIds = ["3310", "13072"]
  static readonly matchingProductIds = [
    "200a",
    "2006",
    "2012",
    "8198",
    "8202",
    "8210",
  ]
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
}
