/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Method, RequestConfig, Response } from "../device/device.types"

export abstract class Formatter {
  abstract formatRequestConfig(config: RequestConfig): RequestConfig
  abstract formatResponse(
    method: Method,
    response: Response<any>
  ): Response<any>
  abstract handleContactEndpointResponse(
    method: Method,
    response: Response<any>
  ): Response<any>
  abstract handleUpdateEndpointResponse(
    method: Method,
    response: Response<any>
  ): Response<any>
}
