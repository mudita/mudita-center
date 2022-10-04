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
} from "../device.types"
import { DeviceType } from "../constants"
import { DeviceInfo } from "../../endpoints"
import { Formatter } from "../../formatter/formatter"
import { FormatterFactory } from "../../formatter/formatter-factory"
import { SerialPortParser } from "../serial-port-parser/serial-port-parser"

export class HarmonyStrategy extends BaseDevice {
  #formatter: Formatter = FormatterFactory.create()

  constructor(public path: string, public deviceType: DeviceType, parser: SerialPortParser) {
    super(path, deviceType, parser)
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
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public request(config: RequestConfig<any>): Promise<Response<any>>
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async request(config: RequestConfig<any>): Promise<Response<any>> {
    const response = await super.request(config)
    return this.#formatter.formatResponse(config.method, response)
  }
}

export const createHarmonyStrategy: CreateDeviceStrategy = (
  path: string,
  deviceType: DeviceType,
  parser: SerialPortParser
) => new HarmonyStrategy(path, deviceType, parser)
