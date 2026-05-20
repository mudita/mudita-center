/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortDeviceType, SerialPortRequest } from "app-serialport/models"
import { commonDeviceRequestParser } from "../common/common-device-request-parser"
import {
  SerialPortHandler,
  SerialPortHandlerOptions,
} from "../serial-port-handler"

export class SerialPortPureDevice extends SerialPortHandler {
  static readonly matchingVendorIds = ["3310"]
  static readonly matchingProductIds = ["0102", "0100"]
  static readonly deviceType = SerialPortDeviceType.Pure
  readonly requestIdKey = "uuid"

  constructor({ baudRate = 9600, ...options }: SerialPortHandlerOptions) {
    super({ baudRate, ...options })
  }

  parseRequest(data: SerialPortRequest) {
    return commonDeviceRequestParser(data)
  }
}
