/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum ApiDeviceErrorType {
  RequestParsingFailed = 400,
  ResponseParsingFailed = 501,
  DataNotFound = 404,
  DeviceLocked = 423,
  EulaNotAccepted = 451,
  DeviceInternalError = 500,
  UnknownError = 418,
}
