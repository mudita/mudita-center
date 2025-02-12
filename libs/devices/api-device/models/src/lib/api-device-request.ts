/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod"
import { SerialPortRequest, SerialPortResponse } from "app-serialport/models"
import { ApiDeviceEndpoints } from "./api-device-endpoints"
import { ApiDeviceErrorType } from "./api-device-error-type"

export type ApiDeviceEndpoint = keyof typeof ApiDeviceEndpoints
export type ApiDeviceMethod<E extends ApiDeviceEndpoint> =
  keyof (typeof ApiDeviceEndpoints)[E]

type RequestBody<
  E extends ApiDeviceEndpoint,
  M extends keyof (typeof ApiDeviceEndpoints)[E],
> = (typeof ApiDeviceEndpoints)[E][M] extends {
  request: infer R extends z.ZodObject<any>
}
  ? z.infer<R>
  : never

type ResponseBody<
  E extends ApiDeviceEndpoint,
  M extends keyof (typeof ApiDeviceEndpoints)[E],
> = (typeof ApiDeviceEndpoints)[E][M] extends {
  response: infer R extends z.ZodObject<any>
}
  ? z.infer<R>
  : never

export type ApiDeviceRequest<
  E extends ApiDeviceEndpoint,
  M extends ApiDeviceMethod<E>,
> = SerialPortRequest<
  RequestBody<E, M> extends undefined
    ? {
        endpoint: E
        method: M
      }
    : {
        endpoint: E
        method: M
        body: RequestBody<E, M>
      }
>

export type ApiDeviceResponse<
  E extends keyof typeof ApiDeviceEndpoints,
  M extends keyof (typeof ApiDeviceEndpoints)[E],
> = SerialPortResponse<
  | {
      status: number
      endpoint: E
      body: ResponseBody<E, M>
    }
  | {
      status: ApiDeviceErrorType
      endpoint: E
    }
>
