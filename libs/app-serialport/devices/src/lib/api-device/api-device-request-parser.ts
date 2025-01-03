/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"
import { SerialPortRequest } from "app-serialport/models"

export const apiDeviceRequestParser = (data: SerialPortRequest): string => {
  const encoder = new TextEncoder()
  const payload = JSON.stringify(data)
  const header = String(encoder.encode(payload).length).padStart(9, "0")
  return `#${header}${payload}`
}
