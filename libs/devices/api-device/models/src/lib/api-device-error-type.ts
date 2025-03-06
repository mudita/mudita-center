/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ApiDeviceErrorType {
  DataNotFound = 404,
  DeviceLocked = 423,
  EulaNotAccepted = 451,
  DeviceInternalError = 500,
  RequestParsingFailed = 900,
  ResponseParsingFailed = 901,
  Critical = 999,
}
