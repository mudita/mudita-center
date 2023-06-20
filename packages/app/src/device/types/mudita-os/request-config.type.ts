/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method } from "App/device/constants"

export interface RequestConfigOptions {
  connectionTimeOut?: number
}

export type Header = {
  endpoint: Endpoint
  method: Method
  offset?: number
  limit?: number
}

export interface RequestConfig<Body = undefined> extends Header {
  body?: Body
  filePath?: string
  options?: RequestConfigOptions
}

export interface RequestPayload<T = undefined> extends RequestConfig<T> {
  uuid: number
}
