/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDeviceType, SerialPortRequest } from "app-serialport/models"
import { CommonDeviceResponseParser } from "../common/common-device-response-parser"
import { commonDeviceRequestParser } from "../common/common-device-request-parser"
import {
  SerialPortHandler,
  SerialPortHandlerOptions,
} from "../serial-port-handler"

export class SerialPortHarmonyDevice extends SerialPortHandler {
  static readonly matchingVendorIds = ["3310"]
  static readonly matchingProductIds = ["0300"]
  static readonly deviceType = SerialPortDeviceType.Harmony
  readonly requestIdKey = "uuid"

  constructor({ baudRate = 9600, ...options }: SerialPortHandlerOptions) {
    super({
      ...options,
      baudRate,
      parser: new CommonDeviceResponseParser({ matcher: /#\d{9}/ }),
    })
  }

  parseRequest(data: SerialPortRequest) {
    return commonDeviceRequestParser(data)
  }
}
