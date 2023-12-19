/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestResponse } from "Core/core/types/request-response.interface"
import { RequestConfig } from "Core/device/types/mudita-os"
import { ResultObject } from "Core/core/builder"

export interface DeviceStrategy {
  connect(): Promise<ResultObject<undefined>>
  request(config: RequestConfig<unknown>): Promise<RequestResponse>
}
