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

export interface RequestResponseError {
  code?: number
  message: string
  data?: any
}

export interface RequestResponse<DataType = undefined> {
  status: RequestResponseStatus
  data?: DataType
  error?: RequestResponseError
}

export interface SuccessRequestResponse<DataType = undefined>
  extends RequestResponse<DataType> {
  status: RequestResponseStatus.Ok
  data: DataType
}
