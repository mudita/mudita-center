/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { APIRequestData } from "app-serialport/models"
import { TextEncoder } from "util"
import { ApiDeviceResponseParser } from "./api-device-response-parser"
import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../request-parser.interface"

interface Data extends APIRequestData {
  rid?: number
}

export class SerialPortApiDevice extends SerialPortDevice {
  static matchingVendorIds = ["0e8d"]
  static matchingProductIds = ["200a", "2006"]

  constructor(options: SerialPortDeviceOptions) {
    super(options, new ApiDeviceResponseParser({ matcher: /#\d{9}/g }))
    this.idKey = "rid"
  }

  parseRequest(data: Data) {
    const encoder = new TextEncoder()
    const payload = JSON.stringify(data)
    const header = String(encoder.encode(payload).length).padStart(9, "0")
    return `#${header}${payload}`
  }
}
