/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { RequestConfig } from "Core/device/types/mudita-os"
import { ResultObject } from "Core/core/builder"
import { DeviceCommunicationError } from "Core/device"

export interface DeviceStrategy {
  connect(): Promise<ResultObject<undefined>>
  request<ResponseType = unknown>(
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>>
}
