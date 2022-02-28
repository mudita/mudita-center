/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import RequestResponse from "App/main/functions/request-response.interface"

export enum DeviceResponseStatus {
  Ok = "ok",
  PhoneLocked = "phone-locked",
  InternalServerError = "internal-server-error",
  Error = "error",
  Duplicated = "phone-number-duplicated",
  UnprocessableEntity = "unprocessable-entity",
}

export interface DeviceResponseError {
  code?: number
  message: string
  data?: any
}

export default interface DeviceResponse<DataType = undefined>
  extends RequestResponse<DataType> {
  status: DeviceResponseStatus
  data?: DataType
  error?: DeviceResponseError
}
