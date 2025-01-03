/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceResponseParser } from "./api-device-response-parser"
import { apiDeviceRequestParser } from "./api-device-request-parser"
import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../serial-port-device"
import { SerialPortDeviceType, SerialPortRequest } from "app-serialport/models"

export class SerialPortApiDevice extends SerialPortDevice {
  static matchingVendorIds = ["0e8d", "3725"]
  static matchingProductIds = ["200a", "2006", "2012", "8198", "8202", "8210"]
  static deviceType = SerialPortDeviceType.ApiDevice

  constructor({ baudRate = 9600, ...options }: SerialPortDeviceOptions) {
    super(
      { baudRate, ...options },
      new ApiDeviceResponseParser({ matcher: /#\d{9}/g })
    )
    this.requestIdKey = "rid"
  }

  parseRequest(data: SerialPortRequest) {
    return apiDeviceRequestParser(data)
  }
}
