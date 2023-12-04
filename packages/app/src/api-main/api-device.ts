/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint } from "App/device/constants/endpoint.constant"
import { Method } from "App/device/constants/request-method.constant"
import { SerialPortDeviceAdapter } from "App/device/modules/mudita-os/adapters"
import SerialPort from "serialport"

const APIEndpoints = {
  APIConfig: "API_CONFIGURATION",
  FeatureConfiguration: "FEATURE_CONFIGURATION",
  FeatureData: "FEATURE_DATA",
  DataSynchronization: "DATA_SYNC",
  MenuConfiguration: "MENU_CONFIGURATION",
} as const

type APIEndpointType = (typeof APIEndpoints)[keyof typeof APIEndpoints]

const APIMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const

const APIRequests = {
  MENU_CONFIGURATION: [APIMethods.GET],
  DATA_SYNC: [APIMethods.POST],
  FEATURE_DATA: [APIMethods.GET],
  FEATURE_CONFIGURATION: [APIMethods.GET],
  API_CONFIGURATION: [APIMethods.GET],
} as const

// type xbody = {
//   id: string
// }

// const APIRequestsBody = {
//   MENU_CONFIGURATION: { [APIMethods.GET]: xbody },
//   // DATA_SYNC: [APIMethods.POST],
//   // FEATURE_DATA: [APIMethods.GET],
//   // FEATURE_CONFIGURATION: [APIMethods.GET],
//   // API_CONFIGURATION: [APIMethods.GET],
// } as const

interface APIRequestConfig<
  E extends APIEndpointType,
  M = (typeof APIRequests)[E]
> {
  endpoint: E
  method: M[keyof M]
}

// const z: APIRequestConfig<"MENU_CONFIGURATION"> = {
//   endpoint: APIEndpoints.MenuConfiguration,
//   method: "GET",
// }

// const z2: APIRequestConfig<"DATA_SYNC"> = {
//   endpoint: "DATA_SYNC",
//   method: "POST",
// }

interface APIRequestWithPayload<
  T extends APIEndpointType,
  Body = Record<string, unknown>
> extends APIRequestConfig<T> {
  body?: Body
}

export class APIDevice {
  private adapter: SerialPortDeviceAdapter
  constructor({ path }: SerialPort.PortInfo) {
    this.adapter = new SerialPortDeviceAdapter(path)
  }

  public async request<Config, T extends APIEndpointType>(
    config: APIRequestWithPayload<T>
  ): Promise<unknown> {
    const result = await this.adapter.requestUntyped(config)
    console.log(result)
    return result
  }

  public async requestAny(config: any): Promise<any> {
    console.log(config)
    const result = await this.adapter.requestUntyped(config)
    console.log(result)
    return result
  }
}

// const x = new APIDevice()

// type c1 = { iddd: string }
// type r1 = { res: string }

// const y = x.request({
//   endpoint: "DATA_SYNC",
//   method: "POST",
//   body: { iddd: "asd" },
// })
