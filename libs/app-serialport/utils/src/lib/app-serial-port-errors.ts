/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortErrorType } from "app-serialport/models"

export interface SerialPortErrorDetails {
  type: SerialPortErrorType
  requestId?: number | string
}

export class SerialPortError extends Error implements SerialPortErrorDetails {
  type: SerialPortErrorType = SerialPortErrorType.Unknown
  requestId?: number | string

  constructor(error: unknown)
  constructor(error: Error)
  constructor(type: SerialPortErrorType, requestId?: number | string)
  constructor(data: Error | SerialPortErrorType, requestId?: number | string) {
    super()
    this.name = "SerialPortError"
    if (data instanceof Error) {
      return this.parse(data.message)
    } else if (Object.values(SerialPortErrorType).includes(data)) {
      this.type = data
      this.requestId = requestId
      this.message = this.serialize()
    } else {
      this.type = SerialPortErrorType.Unknown
      this.message = this.serialize()
    }
  }

  private serialize() {
    return `SERIAL_PORT_ERROR:${JSON.stringify({ type: this.type, requestId: this.requestId })}`
  }

  private parse(message: string) {
    try {
      const [, details] = message.split("SERIAL_PORT_ERROR:")
      const { type, requestId } = details ? JSON.parse(details) : {}
      return new SerialPortError(type, requestId)
    } catch (error) {
      console.error(error)
      return new SerialPortError(SerialPortErrorType.Unknown)
    }
  }
}
