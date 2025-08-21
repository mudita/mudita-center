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
  Harmony,
  HarmonyEndpoint,
  HarmonyEndpointNamed,
  HarmonyEndpoints,
  HarmonyErrorType,
  HarmonyMethod,
  HarmonyMethodNamed,
  HarmonyRequest,
  HarmonyResponse,
  HarmonyResponseBody,
} from "devices/harmony/models"
import { DeviceErrorType } from "devices/common/models"

export type OKResponse<
  E extends HarmonyEndpoint,
  M extends HarmonyMethod<E>,
> = {
  ok: true
  endpoint: E
  status: number
  body: HarmonyResponseBody<E, M>
}

export type ErrorResponse<E extends HarmonyEndpoint> = {
  ok: false
  endpoint: E
  status: DeviceErrorType | HarmonyErrorType
  body?: unknown
  error?: unknown
}

export type Response<E extends HarmonyEndpoint, M extends HarmonyMethod<E>> =
  | OKResponse<E, M>
  | ErrorResponse<E>

export class HarmonySerialPort {
  static isCompatible(
    device?: Pick<SerialPortDeviceInfo, "deviceType"> | null
  ): device is Harmony {
    if (!device) {
      return true
    }
    return device.deviceType === SerialPortDeviceType.Harmony
  }
  static async request<E extends HarmonyEndpoint, M extends HarmonyMethod<E>>(
    device: Harmony,
    request: HarmonyRequest<E, M>
  ): Promise<Response<E, M>> {
    HarmonySerialPort.isCompatible(device)

    const endpointConfig =
      HarmonyEndpoints[request.endpoint as keyof typeof HarmonyEndpoints]
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

    let response: HarmonyResponse<E, M>
    try {
      response = (await AppSerialPort.request(
        device,
        request
      )) as HarmonyResponse<E, M>
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
          `Response parsing failed for ${device.path} at ${HarmonyMethodNamed[request.method as keyof typeof HarmonyMethodNamed]} ${HarmonyEndpointNamed[request.endpoint]}`
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
        body: responseParseResult.data as HarmonyResponseBody<E, M>,
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
