/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint } from "core-device/models"
import { ResponseStatus } from "Core/device/constants"
import { ResponseError } from "Core/device/types/mudita-os/response-error.type"

export interface Response<Body = undefined> {
  status: ResponseStatus
  body?: Body
  endpoint?: Endpoint
  uuid?: number
  error?: ResponseError
}

export interface ApiResponse<Body = undefined> {
  status: ResponseStatus
  body?: Body
  endpoint?: Endpoint
  rid?: number
  error?: ResponseError
}
