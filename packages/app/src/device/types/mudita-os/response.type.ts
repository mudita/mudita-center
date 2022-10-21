/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResponseStatus, Endpoint } from "App/device/constants"
import { ResponseError } from "App/device/types/mudita-os/response-error.type"

export interface Response<Body = undefined> {
  status: ResponseStatus
  body?: Body
  endpoint?: Endpoint
  uuid?: number
  error?: ResponseError
}
