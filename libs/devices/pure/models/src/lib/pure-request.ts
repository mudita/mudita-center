/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { SerialPortRequest } from "app-serialport/models"
import { PureEndpoint, PureEndpoints } from "./pure-endpoints"

export type PureMethod<E extends PureEndpoint> = keyof (typeof PureEndpoints)[E]

type RequestBody<
  E extends PureEndpoint,
  M extends keyof (typeof PureEndpoints)[E],
> = (typeof PureEndpoints)[E][M] extends {
  request: infer R extends z.ZodType
}
  ? z.infer<R>
  : never

export type PureRequest<
  E extends PureEndpoint,
  M extends PureMethod<E>,
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
