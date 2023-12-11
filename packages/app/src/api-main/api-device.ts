/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint } from "App/device/constants/endpoint.constant"
import { Method } from "App/device/constants/request-method.constant"
import { SerialPortDeviceAPIAdapter } from "App/api-main/serial-port-api-device.adapters"
import SerialPort from "serialport"
import {
  APIEndpointType,
  APIRequestData,
  APIRequestWithPayload,
} from "./api-request.model"
import { SerialPortParser } from "App/device/modules/mudita-os/parsers"

export class APIDevice {
  private adapter: SerialPortDeviceAPIAdapter
  constructor({ path }: SerialPort.PortInfo) {
    console.log(path)
    this.adapter = new SerialPortDeviceAPIAdapter(path, new SerialPortParser())
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
