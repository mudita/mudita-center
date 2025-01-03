/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortError } from "app-serialport/models"

class ResponseTimeoutError extends Error {
  parse() {
    if (this.message.endsWith(SerialPortError.ResponseTimeout)) {
      return this
    }
    return null
  }
}

class InvalidRequestError extends Error {
  parse() {
    if (this.message.endsWith(SerialPortError.InvalidRequest)) {
      return this
    }
    return null
  }
}

export const AppSerialPortErrors = {
  ResponseTimeoutError,
  InvalidRequestError,
}
