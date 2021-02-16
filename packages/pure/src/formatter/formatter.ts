/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import { Method, RequestConfig, Response } from "../device/device.types"

export abstract class Formatter {
  abstract formatRequestConfig(config: RequestConfig): RequestConfig
  abstract formatResponse(
    method: Method,
    response: Response<any>
  ): Response<any>
}
