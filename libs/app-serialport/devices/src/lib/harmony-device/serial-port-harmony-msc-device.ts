/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  SerialPortDevice,
  SerialPortDeviceOptions,
} from "../serial-port-device"
import { SerialPortDeviceType, SerialPortRequest } from "app-serialport/models"

export class SerialPortHarmonyMscDevice extends SerialPortDevice {
  static readonly matchingVendorIds = ["3310"]
  static readonly matchingProductIds = ["0103"]
  static readonly deviceType = SerialPortDeviceType.HarmonyMsc
  readonly requestIdKey = "uuid"

  constructor({ baudRate = 9600, ...options }: SerialPortDeviceOptions) {
    super({ baudRate, ...options })
  }

  write(data: unknown) {
    //
    console.log("Writing data to Harmony MSC device:", data)
    return true
  }

  async request({ options, ...data }: SerialPortRequest) {
    //
    console.log("Requesting data from Harmony MSC device:", data)
    return {
      status: "ok",
      endpoint: "flash",
    }
  }
}
