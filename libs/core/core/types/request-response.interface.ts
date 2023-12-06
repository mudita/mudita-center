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
  OnboardingNotFinished = "onboarding-not-finished",
  BatteryCriticalLevel = "battery-critical-level",
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RequestResponseError<ErrorDataType = any> {
  code?: number
  message: string
  data?: ErrorDataType
}

// AUTO DISABLED - fix me if you like :)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RequestResponse<DataType = unknown, ErrorDataType = any> {
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
