/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../serial-port-device"
import { SerialPortDeviceType, SerialPortRequest } from "app-serialport/models"
import { CommonDeviceResponseParser } from "../shared/common-device-response-parser"
import { commonDeviceRequestParser } from "../shared/common-device-request-parser"

export class SerialPortHarmonyMscDevice extends SerialPortDevice {
  static readonly matchingVendorIds = ["3310"]
  static readonly matchingProductIds = ["0103"]
  static readonly deviceType = SerialPortDeviceType.HarmonyMsc
  readonly requestIdKey = "uuid"

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
