/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceUpdateError as PureDeviceUpdateError } from "@mudita/pure"
import { DeviceUpdateError } from "Backend/adapters/pure-phone/pure-phone.adapter"

export type ResponseError = PureDeviceUpdateError | DeviceUpdateError

export enum DeviceResponseStatus {
  Ok = "ok",
  PhoneLocked = "phone-locked",
  InternalServerError = "internal-server-error",
  Error = "error",
  Duplicated = "phone-number-duplicated",
}

interface DeviceResponseError {
  code?: number
  message: string
  data?: any
}

export default interface DeviceResponse<DataType = undefined> {
  status: DeviceResponseStatus
  data?: DataType
  error?: DeviceResponseError
}
