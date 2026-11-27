/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortErrorType } from "app-serialport/models"
import { DeviceErrorType, getDeviceErrorType } from "./device-error-type"

describe("getDeviceErrorType", () => {
  it("treats a timeout and a closed port as transport failures", () => {
    // Neither says the device is broken, and both are already retried by the
    // transport before they get this far.
    expect(getDeviceErrorType(SerialPortErrorType.ResponseTimeout)).toBe(
      DeviceErrorType.TransportFailure
    )
    expect(getDeviceErrorType(SerialPortErrorType.PortClosed)).toBe(
      DeviceErrorType.TransportFailure
    )
  })

  it("keeps a request we cancelled apart from a device fault", () => {
    expect(getDeviceErrorType(SerialPortErrorType.RequestAborted)).toBe(
      DeviceErrorType.RequestAborted
    )
  })

  it("reports unreadable traffic as a parsing failure", () => {
    expect(getDeviceErrorType(SerialPortErrorType.InvalidRequest)).toBe(
      DeviceErrorType.RequestParsingFailed
    )
    expect(getDeviceErrorType(SerialPortErrorType.InvalidResponse)).toBe(
      DeviceErrorType.ResponseParsingFailed
    )
    expect(getDeviceErrorType(SerialPortErrorType.ResponseWithoutId)).toBe(
      DeviceErrorType.ResponseParsingFailed
    )
  })

  it("falls back to critical for a failure nobody has classified", () => {
    expect(getDeviceErrorType(SerialPortErrorType.Unknown)).toBe(
      DeviceErrorType.Critical
    )
    expect(getDeviceErrorType(undefined)).toBe(DeviceErrorType.Critical)
    expect(getDeviceErrorType("Nonsense" as SerialPortErrorType)).toBe(
      DeviceErrorType.Critical
    )
  })

  it("maps every transport error type to something other than a crash", () => {
    // The lookup is exhaustive at the type level; this is the runtime half of
    // that guarantee, for types that reach us from an older main process.
    for (const type of Object.values(SerialPortErrorType)) {
      expect(Object.values(DeviceErrorType)).toContain(getDeviceErrorType(type))
    }
  })
})
