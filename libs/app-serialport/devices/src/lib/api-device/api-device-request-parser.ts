/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { TextEncoder } from "util"
import { APIRequestData } from "app-serialport/models"

export interface ApiDeviceRequest extends APIRequestData {
  rid?: number
}

export const apiDeviceRequestParser = (data: ApiDeviceRequest): string => {
  const encoder = new TextEncoder()
  const payload = JSON.stringify(data)
  const header = String(encoder.encode(payload).length).padStart(9, "0")
  return `#${header}${payload}`
}
