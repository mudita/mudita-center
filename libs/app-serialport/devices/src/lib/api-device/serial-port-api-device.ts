/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceResponseParser } from "./api-device-response-parser"
import {
  ApiDeviceRequest,
  apiDeviceRequestParser,
} from "./api-device-request-parser"
import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../serial-port-device"

export class SerialPortApiDevice extends SerialPortDevice {
  static matchingVendorIds = ["0e8d", "3725"]
  static matchingProductIds = ["200a", "2006", "2012", "8198", "8202", "8210"]

  constructor({ baudRate = 9600, ...options }: SerialPortDeviceOptions) {
    super(
      { baudRate, ...options },
      new ApiDeviceResponseParser({ matcher: /#\d{9}/g })
    )
    this.idKey = "rid"
  }

  parseRequest(data: ApiDeviceRequest) {
    return apiDeviceRequestParser(data)
  }
}
