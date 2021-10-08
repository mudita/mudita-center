/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceResponseError, DeviceResponseStatus } from "Backend/adapters/device-response.interface"

export enum RequestResponseStatus {
  Ok = "ok",
  Error = "error",
}

export default interface RequestResponse<DataType = undefined> {
  status: DeviceResponseStatus | RequestResponseStatus
  data?: DataType
  error?: DeviceResponseError
}
