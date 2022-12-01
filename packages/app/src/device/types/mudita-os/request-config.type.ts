/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"

export interface RequestConfig<Body = undefined> {
  endpoint: Endpoint
  method: Method
  body?: Body
  filePath?: string
}

export interface RequestPayload<T = undefined> extends RequestConfig<T> {
  uuid: number
}
