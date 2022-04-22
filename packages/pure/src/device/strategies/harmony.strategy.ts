/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import BaseDevice from "../base-device"
import {
  DeviceInfo,
  Endpoint,
  Method,
  RequestConfig,
  Response,
  ResponseStatus,
} from "../../mc-serial-port-device/types"
import { Formatter } from "../../formatter/formatter"
import { FormatterFactory } from "../../formatter/formatter-factory"
import { McSerialPortDeviceClass } from "../../mc-serial-port-device/mc-serial-port-device.class"
import { McUsbDeviceClass } from "../../mc-usb-device/mc-usb-device.class"
import { CreateDeviceStrategy } from "../mudita-device"

export class HarmonyStrategy extends BaseDevice {
  #formatter: Formatter = FormatterFactory.create()

  constructor(
    mcSerialPortDevice: McSerialPortDeviceClass,
    mcUsbDevice: McUsbDeviceClass
  ) {
    super(mcSerialPortDevice, mcUsbDevice)
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
  mcSerialPortDevice: McSerialPortDeviceClass,
  mcUsbDevice: McUsbDeviceClass
) => new HarmonyStrategy(mcSerialPortDevice, mcUsbDevice)
