/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

export enum RequestResponseStatus {
  Ok = "ok",
  PhoneLocked = "phone-locked",
  InternalServerError = "internal-server-error",
  Error = "error",
  Duplicated = "phone-number-duplicated",
  UnprocessableEntity = "unprocessable-entity",
  InsufficientStorage = "not-enough-space-on-device",
  EulaNotAccepted = "eula-not-accepted",
  BatteryCriticalLevel = "battery-critical-level",
}

export interface RequestResponseError<ErrorDataType = unknown> {
  code?: number
  message: string
  data?: ErrorDataType
}

export interface RequestResponse<DataType = unknown, ErrorDataType = unknown> {
  status: RequestResponseStatus
  data?: DataType
  error?: RequestResponseError<ErrorDataType>
}

export interface SuccessRequestResponse<DataType = unknown>
  extends RequestResponse<DataType> {
  status: RequestResponseStatus.Ok
  data: DataType
}

export interface ErrorRequestResponse extends RequestResponse {
  status: RequestResponseStatus.Error
}
