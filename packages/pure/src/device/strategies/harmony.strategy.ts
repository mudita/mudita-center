/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BaseDevice from "../base-device"
import {
  CreateDeviceStrategy,
  Endpoint,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
  McSerialPortDevice,
} from "../device.types"
import { DeviceType } from "../constants"
import { DeviceInfo } from "../../endpoints"
import { Formatter } from "../../formatter/formatter"
import { FormatterFactory } from "../../formatter/formatter-factory"

export class HarmonyStrategy extends BaseDevice {
  #formatter: Formatter = FormatterFactory.create()

  constructor(
    baseMcSerialPortDevice: McSerialPortDevice,
    path: string,
    public deviceType: DeviceType
  ) {
    super(baseMcSerialPortDevice, path, deviceType)
  }

  public async connect(): Promise<Response> {
    const response = await super.connect()
    const { body } = await super.request({
      endpoint: Endpoint.ApiVersion,
      method: Method.Get,
    })

    if (body === undefined) {
      return { status: ResponseStatus.ConnectionError }
    }

    this.#formatter = FormatterFactory.create(body.version)

    return response
  }

  public request(config: {
    endpoint: Endpoint.DeviceInfo
    method: Method.Get
  }): Promise<Response<DeviceInfo>>
  public request(config: RequestConfig<any>): Promise<Response<any>>
  public async request(config: RequestConfig<any>): Promise<Response<any>> {
    const response = await super.request(config)
    return this.#formatter.formatResponse(config.method, response)
  }
}

export const createHarmonyStrategy: CreateDeviceStrategy = (
  baseMcSerialPortDevice: McSerialPortDevice,
  path: string,
  deviceType: DeviceType
) => new HarmonyStrategy(baseMcSerialPortDevice, path, deviceType)
