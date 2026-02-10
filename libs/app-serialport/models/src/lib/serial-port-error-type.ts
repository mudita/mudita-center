/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum SerialPortErrorType {
  ResponseTimeout = "ResponseTimeout",
  InvalidRequest = "InvalidRequest",
  InvalidResponse = "InvalidResponse",
  ResponseWithoutId = "ResponseWithoutId",
  PortOpenError = "PortOpenError",
  PortNotOpen = "PortNotOpen",
  PortClosed = "PortClosed",
  ParserError = "ParserError",
  Unknown = "Unknown",
}
