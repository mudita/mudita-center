/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/LICENSE.md
 */

import {
  Endpoint,
  Method,
  RequestConfig,
  Response,
} from "../device/device.types"
import { Formatter } from "./formatter"
import { DeviceUpdateError, deviceUpdateErrorCodeMap } from "../endpoints"

export class PureV1Formatter extends Formatter {
  formatRequestConfig(config: RequestConfig): RequestConfig {
    const { endpoint, method, body } = config
    if (endpoint === Endpoint.Contacts && method === Method.Post) {
      return { ...config, body: { ...body, id: Number(body.id) } }
    }

    if (endpoint === Endpoint.Contacts && method === Method.Delete) {
      return { ...config, body: { ...body, id: Number(body.id) } }
    }

    return config
  }

  formatResponse(method: Method, response: Response<any>): Response<any> {
    const { endpoint, body, error } = response
    if (endpoint === Endpoint.Contacts && method === Method.Put) {
      return { ...response, body: { ...body, id: String(body.id) } }
    }
    if (endpoint === Endpoint.Update && error) {
      /*
       * `firstDeviceUpdateErrorCode` - factor to multiply pure device error codes
       * at the moment device error code is local by API
       */
      const firstDeviceUpdateErrorCode =
        deviceUpdateErrorCodeMap[DeviceUpdateError.NoError]
      return {
        ...response,
        error: {
          ...error,
          code: Number(error.code) + firstDeviceUpdateErrorCode,
        },
      }
    }
    return response
  }
}
