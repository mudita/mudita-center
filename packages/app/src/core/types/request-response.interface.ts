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
}

export interface RequestResponseError<ErrorDataType = any> {
  code?: number
  message: string
  data?: ErrorDataType
}

export interface RequestResponse<DataType = undefined, ErrorDataType = any> {
  status: RequestResponseStatus
  data?: DataType
  error?: RequestResponseError<ErrorDataType>
}

export interface SuccessRequestResponse<DataType = undefined>
  extends RequestResponse<DataType> {
  status: RequestResponseStatus.Ok
  data: DataType
}

export interface ErrorRequestResponse extends RequestResponse {
  status: RequestResponseStatus.Error
}
