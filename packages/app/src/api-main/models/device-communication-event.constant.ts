/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ApiSerialPortEvent {
  Connected = "api-serial-port-connected",
  Disconnected = "api-serial-port-disconnected",
  DataReceived = "api-serial-port-data-received",
  InitializationFailed = "api-serial-port-initialization-failed",
}
