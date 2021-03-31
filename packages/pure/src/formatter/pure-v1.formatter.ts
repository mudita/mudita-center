/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, Response } from "../device/device.types"
import { Formatter } from "./formatter"
import { DeviceUpdateError, deviceUpdateErrorCodeMap } from "../endpoints"

export class PureV1Formatter extends Formatter {
  formatResponse(method: Method, response: Response<any>): Response<any> {
    const { endpoint } = response
    switch (endpoint) {
      case Endpoint.Update:
        return this.handleUpdateEndpointResponse(response)
      default:
        return response
    }
  }

  private handleUpdateEndpointResponse(response: Response<any>): Response<any> {
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
