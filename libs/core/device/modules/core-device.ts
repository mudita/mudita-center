/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ResultObject } from "Core/core/builder"
import { DeviceCommunicationError, DeviceType } from "Core/device/constants"
import { RequestConfig } from "Core/device/types/mudita-os"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"
import { DeviceId } from "Core/device/constants/device-id"
import { BaseDevice } from "Core/device/modules/base-device"

export class CoreDevice extends BaseDevice {
  constructor(
    id: DeviceId,
    path: string,
    serialNumber: string | undefined,
    deviceType: DeviceType,
    private strategy: DeviceStrategy
  ) {
    super(id, path, serialNumber, deviceType)
  }

  public connect(): Promise<ResultObject<undefined>> {
    return this.strategy.connect()
  }

  public async request<ResponseType = unknown>(
    config: RequestConfig<unknown>
  ): Promise<ResultObject<ResponseType, DeviceCommunicationError>> {
    return this.strategy.request(config)
  }
}
