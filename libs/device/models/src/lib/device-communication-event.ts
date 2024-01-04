/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export const ApiSerialPortEvents = {
  DataReceived: "api-serial-port-data-received",
} as const

export type ApiSerialPortEvent =
  (typeof ApiSerialPortEvents)[keyof typeof ApiSerialPortEvents]

export const ApiSerialPortToRendererEvents = {
  Connected: "api-serial-port-connected",
  Closed: "api-serial-port-closed",
  ConnectionFailed: "api-serial-port-connection-failed",
} as const

export type ApiSerialPortToRendererEvents =
  (typeof ApiSerialPortToRendererEvents)[keyof typeof ApiSerialPortToRendererEvents]
