/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { Endpoint, Method, Response } from "../device/device.types.js"
import { Formatter } from "./formatter.js"
import { DeviceUpdateError, deviceUpdateErrorCodeMap } from "../endpoints/index.js"

export class PureV1Formatter extends Formatter {
  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatResponse(method: Method, response: Response<any>): Response<any> {
    const { endpoint } = response
    switch (endpoint) {
      case Endpoint.Update:
        return this.handleUpdateEndpointResponse(response)
      default:
        return response
    }
  }

  // AUTO DISABLED - fix me if you like :)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
