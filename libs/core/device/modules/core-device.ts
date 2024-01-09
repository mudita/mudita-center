/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { ResultObject } from "Core/core/builder"
import { DeviceCommunicationError, DeviceType } from "Core/device/constants"
import { RequestConfig } from "Core/device/types/mudita-os"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"
import { BaseDevice } from "Core/device/modules/base-device"

export class CoreDevice extends BaseDevice {
  constructor(
    portInfo: PortInfo,
    deviceType: DeviceType,
    private strategy: DeviceStrategy
  ) {
    super(portInfo, deviceType)
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
