/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Method, Response } from "../device/device.types"

export abstract class Formatter {
  abstract formatResponse(
    method: Method,
    response: Response<any>
  ): Response<any>
}
