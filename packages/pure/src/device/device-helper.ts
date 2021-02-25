/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { ApiRequestConfig, Endpoint, Method, RequestConfig } from "./device.types"

export const isApiRequestConfig = (config: RequestConfig) : config is ApiRequestConfig => {
  return config.endpoint === Endpoint.ApiVersion && config.method === Method.Get
}