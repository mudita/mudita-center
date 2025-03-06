/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { SerialPortRequest } from "app-serialport/models"
import { ApiDeviceEndpoint, ApiDeviceEndpoints } from "./api-device-endpoints"

export type ApiDeviceMethod<E extends ApiDeviceEndpoint> =
  keyof (typeof ApiDeviceEndpoints)[E]

type RequestBody<
  E extends ApiDeviceEndpoint,
  M extends keyof (typeof ApiDeviceEndpoints)[E],
> = (typeof ApiDeviceEndpoints)[E][M] extends {
  request: infer R extends z.ZodType
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
