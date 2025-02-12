/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { AppSerialPort } from "app-serialport/renderer"
import {
  SerialPortDeviceInfo,
  SerialPortDeviceType,
} from "app-serialport/models"
import {
  ApiDevice,
  ApiDeviceEndpoint,
  ApiDeviceEndpoints,
  ApiDeviceErrorType,
  ApiDeviceMethod,
  ApiDeviceRequest,
  ApiDeviceResponse,
} from "api-device/models"
import { ApiDeviceError } from "./api-device-error"

export class ApiDeviceSerialPort extends AppSerialPort {
  static isCompatible(device: SerialPortDeviceInfo): device is ApiDevice {
    if (device.deviceType !== SerialPortDeviceType.ApiDevice) {
      throw new Error(
        `Device ${device.serialNumber} of type ${device.deviceType} is not an ApiDevice.`
      )
    }
    return true
  }
  static async request<
    E extends ApiDeviceEndpoint,
    M extends ApiDeviceMethod<E>,
  >(device: ApiDevice, request: ApiDeviceRequest<E, M>) {
    ApiDeviceSerialPort.isCompatible(device)

    const endpointConfig =
      ApiDeviceEndpoints[request.endpoint as keyof typeof ApiDeviceEndpoints]
    const methodConfig =
      endpointConfig[request.method as keyof typeof endpointConfig]
    const requestValidator = methodConfig.request
    const responseValidator = methodConfig.response

    if (requestValidator && "body" in request) {
      const requestParseResult = requestValidator.safeParse(request.body)
      if (!requestParseResult.success) {
        throw new ApiDeviceError(
          ApiDeviceErrorType.RequestParsingFailed,
          requestParseResult.error
        )
      }
    }

    const response = (await AppSerialPort.request(
      device,
      request
    )) as ApiDeviceResponse<E, M>

    if (responseValidator && "body" in response) {
      const responseParseResult = responseValidator.safeParse(response.body)
      if (!responseParseResult.success) {
        throw new ApiDeviceError(
          ApiDeviceErrorType.ResponseParsingFailed,
          responseParseResult.error
        )
      }
    }

    if (response.status >= 400) {
      throw new ApiDeviceError(response.status)
    }

    return {
      endpoint: request.endpoint,
      status: response.status,
      body: "body" in response ? response.body : undefined,
    }
  }
}
