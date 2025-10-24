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
import { DeviceErrorType } from "devices/common/models"
import { ZodNumber, ZodObject, ZodType } from "zod"

export type OKResponse<
  E extends ApiDeviceEndpoint,
  M extends ApiDeviceMethod<E>,
> = {
  ok: true
  endpoint: E
  status: number
  body: ApiDeviceResponseBody<E, M>
}

export type ErrorResponse<E extends ApiDeviceEndpoint> = {
  ok: false
  endpoint: E
  status: DeviceErrorType | ApiDeviceErrorType
  body?: unknown
  error?: unknown
}

export type Response<
  E extends ApiDeviceEndpoint,
  M extends ApiDeviceMethod<E>,
> = OKResponse<E, M> | ErrorResponse<E>

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
    const methodConfig = endpointConfig[
      request.method as keyof typeof endpointConfig
    ] as {
      request?: ZodType
      response?: ZodObject<{
        _status: ZodNumber
      }>
    }
    const requestValidator = methodConfig?.request
    const responseValidator = methodConfig?.response

    if (requestValidator && "body" in request) {
      const requestParseResult = requestValidator.safeParse(request.body)
      if (!requestParseResult.success) {
        console.error(
          `Request parsing failed for ${device.id} at ${request.method.toString()} ${request.endpoint.toString()}`,
          requestParseResult.error
        )
        return {
          ok: false,
          endpoint: request.endpoint,
          status: DeviceErrorType.RequestParsingFailed,
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
      const responseParseResult = await responseValidator.safeParseAsync({
        ...(response.body || {}),
        _status: response.status,
      })
      if (!responseParseResult.success) {
        console.error(
          `Response parsing failed for ${device.id} at ${request.method.toString()} ${request.endpoint.toString()}`,
          responseParseResult.error
        )
        return {
          ok: false,
          endpoint: request.endpoint,
          status: DeviceErrorType.ResponseParsingFailed,
          error: responseParseResult.error,
        }
      }
      const { _status, ...body } = responseParseResult.data
      return {
        ok: true,
        endpoint: request.endpoint,
        status: response.status,
        body,
      } as OKResponse<E, M>
    }

    return {
      ok: false,
      endpoint: request.endpoint,
      status: response.status,
      body: response.body,
    }
  }
}
