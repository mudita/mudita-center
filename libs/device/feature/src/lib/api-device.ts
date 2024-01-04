/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import SerialPort from "serialport"
import { SerialPortParser } from "Core/device/modules/mudita-os/parsers"
import { SerialPortDeviceAPIAdapter } from "../../../adapters/src"
import {
  APIEndpointType,
  APIRequestData,
  APIRequestWithPayload,
} from "device/models"

export class APIDevice {
  private adapter: SerialPortDeviceAPIAdapter
  constructor({ path }: SerialPort.PortInfo) {
    this.adapter = new SerialPortDeviceAPIAdapter(path, new SerialPortParser())
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
