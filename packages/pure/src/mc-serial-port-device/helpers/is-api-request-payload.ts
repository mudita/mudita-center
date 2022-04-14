/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiRequestPayload, Endpoint, Method, RequestPayload } from "../types"

export const isApiRequestPayload = (
  config: RequestPayload
): config is ApiRequestPayload => {
  return config.endpoint === Endpoint.ApiVersion && config.method === Method.Get
}
