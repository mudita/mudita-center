/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortErrorType } from "app-serialport/models"

export enum DeviceErrorType {
  RequestParsingFailed = 900,
  ResponseParsingFailed = 901,
  /**
   * The link to the device failed - it timed out or the port closed - after
   * the transport had already spent its own retries. The device itself may
   * well be fine, so this is not a reason to send the user to troubleshooting.
   */
  TransportFailure = 902,
  /**
   * The request was cancelled on our side, typically because the device was
   * being torn down. Nothing went wrong with the device, and there is nothing
   * to report to the user.
   */
  RequestAborted = 903,
  Critical = 999,
}

/**
 * Maps a transport-level error onto the device error the UI reasons about.
 *
 * The map is exhaustive on purpose: a new `SerialPortErrorType` then fails to
 * compile here instead of quietly defaulting to `Critical`, which is what used
 * to send a device to the troubleshooting page over a single timed-out poll.
 */
const deviceErrorTypes: Record<SerialPortErrorType, DeviceErrorType> = {
  [SerialPortErrorType.ResponseTimeout]: DeviceErrorType.TransportFailure,
  [SerialPortErrorType.PortClosed]: DeviceErrorType.TransportFailure,
  [SerialPortErrorType.RequestAborted]: DeviceErrorType.RequestAborted,
  [SerialPortErrorType.InvalidRequest]: DeviceErrorType.RequestParsingFailed,
  [SerialPortErrorType.InvalidResponse]: DeviceErrorType.ResponseParsingFailed,
  [SerialPortErrorType.ResponseWithoutId]:
    DeviceErrorType.ResponseParsingFailed,
  [SerialPortErrorType.Unknown]: DeviceErrorType.Critical,
}

export const getDeviceErrorType = (
  type?: SerialPortErrorType
): DeviceErrorType => {
  return (type && deviceErrorTypes[type]) || DeviceErrorType.Critical
}
