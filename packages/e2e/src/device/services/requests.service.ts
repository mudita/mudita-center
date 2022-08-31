/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { DeviceServiceClass } from "./device-service.class"
import { Response } from "../../pure/types"
import { SerialPortAdapterClass } from "../adapters"

export class RequestsService {
  constructor(
    private serialPortAdapter: SerialPortAdapterClass,
    private deviceService: DeviceServiceClass
  ) {}

  async request<Body>(payload: any[]): Promise<Response<Body>> {
    const device = await this.deviceService.getDevice()

    return this.serialPortAdapter.request(device, payload)
  }

  async requests<Body>(payloads: any[]): Promise<Response<Body>[]> {
    const device = await this.deviceService.getDevice()

    return this.serialPortAdapter.requests(device, payloads)
  }
}
