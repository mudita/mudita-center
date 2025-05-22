/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { SerialPortResponse } from "app-serialport/models"
import { PureEndpoint, PureEndpoints } from "./pure-endpoints"

export type PureResponseBody<
  E extends PureEndpoint,
  M extends keyof (typeof PureEndpoints)[E],
> = (typeof PureEndpoints)[E][M] extends {
  response: infer R extends z.ZodType
}
  ? z.infer<R>
  : never

export type PureResponse<
  E extends keyof typeof PureEndpoints,
  M extends keyof (typeof PureEndpoints)[E],
> = SerialPortResponse<
  | {
      status: number
      endpoint: E
      body: PureResponseBody<E, M>
    }
  | {
      status: number // TODO
      endpoint: E
      body?: unknown
    }
>
