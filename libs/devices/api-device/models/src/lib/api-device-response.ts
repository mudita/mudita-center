/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { ApiDeviceEndpoint, ApiDeviceEndpoints } from "./api-device-endpoints"
import { SerialPortResponse } from "app-serialport/models"
import { z } from "zod"
import { ApiDeviceErrorType } from "./api-device-error-type"

export type ResponseBody<
  E extends ApiDeviceEndpoint,
  M extends keyof (typeof ApiDeviceEndpoints)[E],
> = (typeof ApiDeviceEndpoints)[E][M] extends {
  response: infer R extends z.ZodType
}
  ? z.infer<R>
  : never

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
      body?: unknown
    }
>
