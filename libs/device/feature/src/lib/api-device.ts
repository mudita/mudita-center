/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { PortInfo } from "serialport"
import { SerialPortParser } from "Core/device/modules/mudita-os/parsers"
import { SerialPortDeviceAPIAdapter } from "device/adapters"
import {
  APIEndpointType,
  APIRequestData,
  APIRequestWithPayload,
} from "device/models"
import { BaseDevice } from "Core/device/modules/base-device"
import { DeviceType } from "Core/device"
import { ResultObject } from "Core/core/builder"

export class APIDevice extends BaseDevice {
  private adapter: SerialPortDeviceAPIAdapter
  constructor(portInfo: PortInfo, deviceType: DeviceType) {
    super(portInfo, deviceType)
    this.adapter = new SerialPortDeviceAPIAdapter(
      portInfo.path,
      new SerialPortParser()
    )
  }
  connect(): Promise<ResultObject<undefined>> {
    return this.adapter.connect()
  }

  public request<R, T extends APIEndpointType>(
    config: APIRequestWithPayload<T>
  ) {
    return this.adapter.request(config as APIRequestData)
  }

  // to be removed
  public requestAny(config: unknown): Promise<unknown> {
    return this.adapter.requestUntyped(config as APIRequestData)
  }
}
