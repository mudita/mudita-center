/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiRequestPayload,
  Endpoint,
  Method,
  RequestPayload,
  SerialNumberRequestPayload,
} from "./device.types"

export const isApiRequestPayload = (
  config: RequestPayload
): config is ApiRequestPayload => {
  return config.endpoint === Endpoint.ApiVersion && config.method === Method.Get
}

export const isSerialNumberRequestPayload = (
  config: RequestPayload
): config is SerialNumberRequestPayload => {
  return (
    config.endpoint === Endpoint.SerialNumber && config.method === Method.Get
  )
}
