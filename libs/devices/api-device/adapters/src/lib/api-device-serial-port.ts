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
  ApiDevice,
  ApiDeviceEndpoint,
  ApiDeviceEndpoints,
  ApiDeviceErrorType,
  ApiDeviceMethod,
  ApiDeviceRequest,
  ApiDeviceResponse,
  ApiDeviceResponseBody,
} from "devices/api-device/models"

export type Response<
  E extends ApiDeviceEndpoint,
  M extends ApiDeviceMethod<E>,
> =
  | {
      ok: true
      endpoint: E
      status: number
      body: ApiDeviceResponseBody<E, M>
    }
  | {
      ok: false
      endpoint: E
      status: ApiDeviceErrorType
      body?: unknown
      error?: unknown
    }

export class ApiDeviceSerialPort {
  static isCompatible(
    device?: Pick<SerialPortDeviceInfo, "deviceType"> | null
  ): device is ApiDevice {
    if (!device) {
      return true
    }
    return device.deviceType === SerialPortDeviceType.ApiDevice
  }
  static async request<
    E extends ApiDeviceEndpoint,
    M extends ApiDeviceMethod<E>,
  >(
    device: ApiDevice,
    request: ApiDeviceRequest<E, M>
  ): Promise<Response<E, M>> {
    ApiDeviceSerialPort.isCompatible(device)

    const endpointConfig =
      ApiDeviceEndpoints[request.endpoint as keyof typeof ApiDeviceEndpoints]
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
          status: ApiDeviceErrorType.RequestParsingFailed,
          error: requestParseResult.error,
        }
      }
    }

    let response: ApiDeviceResponse<E, M>
    try {
      response = (await AppSerialPort.request(
        device,
        request
      )) as ApiDeviceResponse<E, M>
    } catch (error) {
      if (error instanceof SerialPortError) {
        const message = new SerialPortError(error).message
        return {
          ok: false,
          endpoint: request.endpoint,
          status: ApiDeviceErrorType.Critical,
          error: message,
        }
      }
      return {
        ok: false,
        endpoint: request.endpoint,
        status: ApiDeviceErrorType.Critical,
        error: error,
      }
    }

    if (responseValidator && "body" in response && response.status < 400) {
      const responseParseResult = responseValidator.safeParse(response.body)
      if (!responseParseResult.success) {
        console.error(
          `Response parsing failed for ${device.path} at ${request.method.toString()} ${request.endpoint.toString()}`
        )
        console.error(responseParseResult.error.errors)
        return {
          ok: false,
          endpoint: request.endpoint,
          status: ApiDeviceErrorType.ResponseParsingFailed,
          error: responseParseResult.error,
        }
      }
      return {
        ok: true,
        endpoint: request.endpoint,
        status: response.status,
        body: responseParseResult.data as ApiDeviceResponseBody<E, M>,
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
