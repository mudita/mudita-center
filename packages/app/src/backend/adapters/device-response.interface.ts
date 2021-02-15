/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ResponseErrorCode as PureResponseErrorCode } from "@mudita/pure"
import { DeviceUpdateResponseErrorCode } from "Backend/adapters/pure-phone/pure-phone.adapter"

export type ResponseErrorCode =
  | PureResponseErrorCode
  | DeviceUpdateResponseErrorCode

export enum DeviceResponseStatus {
  Ok = "ok",
  Error = "error",
}

interface DeviceResponseError<DataType> {
  code?: ResponseErrorCode
  message: string
  data?: DataType
}

export default interface DeviceResponse<DataType = Record<string, string>> {
  status: DeviceResponseStatus
  data?: DataType
  error?: DeviceResponseError<DataType>
}
