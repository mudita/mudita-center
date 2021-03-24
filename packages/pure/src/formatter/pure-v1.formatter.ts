/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  Endpoint,
  Method,
  RequestConfig,
  Response,
} from "../device/device.types"
import { Formatter } from "./formatter"
import {
  Contact,
  DeviceUpdateError,
  deviceUpdateErrorCodeMap,
} from "../endpoints"

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
    const { endpoint } = response
    switch (endpoint) {
      case Endpoint.Contacts:
        return this.handleContactEndpointResponse(method, response)
      case Endpoint.Update:
        return this.handleUpdateEndpointResponse(method, response)
      default:
        return response
    }
  }

  handleContactEndpointResponse(
    method: Method,
    response: Response<any>
  ): Response<any> {
    const { body } = response
    if (method === Method.Put || method === Method.Post) {
      return { ...response, body: { ...body, id: String(body.id) } }
    } else if (method === Method.Get) {
      return {
        ...response,
        body: {
          entries: body.entries.map((entry: Contact) => ({
            ...entry,
            id: String(entry.id),
          })),
        },
      }
    } else {
      return response
    }
  }

  handleUpdateEndpointResponse(
    method: Method,
    response: Response<any>
  ): Response<any> {
    const { error } = response
    if (error) {
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
