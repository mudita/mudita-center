/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint } from "App/device/constants/endpoint.constant"
import { Method } from "App/device/constants/request-method.constant"
import { SerialPortDeviceAPIAdapter } from "App/device/modules/mudita-os/adapters/serial-port-api-device.adapters"
import SerialPort from "serialport"
import {
  APIEndpointType,
  APIRequestData,
  APIRequestWithPayload,
} from "./api-request.model"

export class APIDevice {
  private adapter: SerialPortDeviceAPIAdapter
  constructor({ path }: SerialPort.PortInfo) {
    this.adapter = new SerialPortDeviceAPIAdapter(path)
  }

  public async request<Config, T extends APIEndpointType>(
    config: APIRequestWithPayload<T>
  ): Promise<unknown> {
    const result = await this.adapter.request(config as APIRequestData)
    console.log(result)
    return result
  }

  public async requestAny(config: any): Promise<any> {
    console.log(config)
    const result = await this.adapter.requestUntyped(config as APIRequestData)
    console.log(result)
    return result
  }
}
