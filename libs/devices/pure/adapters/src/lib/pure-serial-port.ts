/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPort } from "app-serialport/renderer"
import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import { SerialPortError } from "app-serialport/utils"
import {
  Pure,
  PureEndpoint,
  PureEndpointNamed,
  PureEndpoints,
  PureErrorType,
  PureMethod,
  PureMethodNamed,
  PureRequest,
  PureResponse,
  PureResponseBody,
} from "devices/pure/models"
import { DeviceErrorType } from "devices/common/models"

export type OKResponse<E extends PureEndpoint, M extends PureMethod<E>> = {
  ok: true
  endpoint: E
  status: number
  body: PureResponseBody<E, M>
}

export type ErrorResponse<E extends PureEndpoint> = {
  ok: false
  endpoint: E
  status: DeviceErrorType | PureErrorType
  body?: unknown
  error?: unknown
}

export type Response<E extends PureEndpoint, M extends PureMethod<E>> =
  | OKResponse<E, M>
  | ErrorResponse<E>

export class PureSerialPort {
  static isCompatible(
    device?: Pick<SerialPortDeviceInfo, "deviceType"> | null
  ): device is Pure {
    if (!device) {
      return true
    }
    return device.deviceType === SerialPortDeviceType.Pure
  }
  static async request<E extends PureEndpoint, M extends PureMethod<E>>(
    device: Pure,
    request: PureRequest<E, M>
  ): Promise<Response<E, M>> {
    PureSerialPort.isCompatible(device)

    const endpointConfig =
      PureEndpoints[request.endpoint as keyof typeof PureEndpoints]
    const methodConfig =
      endpointConfig[request.method as keyof typeof endpointConfig]
    const requestValidator = methodConfig?.request
    const responseValidator = methodConfig?.response

    if (requestValidator && "body" in request) {
      const requestParseResult = requestValidator.safeParse(request.body)
      if (!requestParseResult.success) {
        return {
          ok: false,
          endpoint: request.endpoint,
          status: DeviceErrorType.RequestParsingFailed,
          error: requestParseResult.error,
        }
      }
    }

    let response: PureResponse<E, M>
    try {
      response = (await AppSerialPort.request(device, request)) as PureResponse<
        E,
        M
      >
    } catch (error) {
      if (error instanceof SerialPortError) {
        const message = new SerialPortError(error).message
        return {
          ok: false,
          endpoint: request.endpoint,
          status: DeviceErrorType.Critical,
          error: message,
        }
      }
      return {
        ok: false,
        endpoint: request.endpoint,
        status: DeviceErrorType.Critical,
        error: error,
      }
    }

    if (responseValidator && response.status < 400) {
      const responseParseResult = responseValidator.safeParse(response.body)
      if (!responseParseResult.success) {
        console.error(
          `Response parsing failed for ${device.id} at ${PureMethodNamed[request.method as keyof typeof PureMethodNamed]} ${PureEndpointNamed[request.endpoint]}`
        )
        console.error(responseParseResult.error)
        return {
          ok: false,
          endpoint: request.endpoint,
          status: DeviceErrorType.ResponseParsingFailed,
          error: responseParseResult.error,
        }
      }
      return {
        ok: true,
        endpoint: request.endpoint,
        status: response.status,
        body: responseParseResult.data as PureResponseBody<E, M>,
      }
    }

    return {
      ok: false,
      endpoint: request.endpoint,
      status: response.status,
      body: response.body,
    }
  }
}
