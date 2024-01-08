/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { SerialPortParser } from "Core/device/modules/mudita-os/parsers"
import { SerialPortDeviceAPIAdapter } from "device/adapters"
import {
  APIEndpointType,
  APIRequestData,
  APIRequestWithPayload,
} from "device/models"
import { BaseDevice } from "Core/device/modules/base-device"
import { DeviceId } from "Core/device/constants/device-id"
import { DeviceType } from "Core/device"
import { ResultObject } from "Core/core/builder"

export class APIDevice extends BaseDevice {
  private adapter: SerialPortDeviceAPIAdapter
  constructor(
    id: DeviceId,
    path: string,
    serialNumber: string | undefined,
    deviceType: DeviceType
  ) {
    super(id, path, serialNumber, deviceType)
    this.adapter = new SerialPortDeviceAPIAdapter(path, new SerialPortParser())
  }

  connect(): Promise<ResultObject<undefined>> {
    return this.adapter.connect()
  }

  public async request<R, T extends APIEndpointType>(
    config: APIRequestWithPayload<T>
  ) {
    const result = await this.adapter.request(config as APIRequestData)
    return result
  }

  // to be removed
  public async requestAny(config: unknown): Promise<unknown> {
    const result = await this.adapter.requestUntyped(config as APIRequestData)
    return result
  }
}
