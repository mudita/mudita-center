/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { EventEmitter } from "events"
import {
  RequestConfig,
  GetDeviceInfoRequestConfig,
  GetDeviceInfoResponseBody,
} from "Core/device/types/mudita-os"
import { DeviceStrategy } from "Core/device/strategies/device-strategy.class"
import { ResponsePresenter } from "Core/device/modules/mudita-os/presenters"
import { RequestResponse } from "Core/core/types/request-response.interface"
import { ResultObject } from "Core/core/builder"
import { BaseAdapter } from "Core/device/modules/base.adapter"

export class HarmonyStrategy implements DeviceStrategy {
  constructor(private adapter: BaseAdapter) {
    EventEmitter.defaultMaxListeners = 15
  }

  public connect(): Promise<ResultObject<undefined>> {
    return this.adapter.connect()
  }

  public request(
    config: GetDeviceInfoRequestConfig
  ): Promise<RequestResponse<GetDeviceInfoResponseBody>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<RequestResponse> {
    const response = await this.adapter.request(config)

    return ResponsePresenter.toResponseObject(response)
  }
}
