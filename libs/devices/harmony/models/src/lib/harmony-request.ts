/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { SerialPortRequest } from "app-serialport/models"
import { HarmonyEndpoint, HarmonyEndpoints } from "./harmony-endpoints"

export type HarmonyMethod<E extends HarmonyEndpoint> =
  keyof (typeof HarmonyEndpoints)[E]

type RequestBody<
  E extends HarmonyEndpoint,
  M extends keyof (typeof HarmonyEndpoints)[E],
> = (typeof HarmonyEndpoints)[E][M] extends {
  request: infer R extends z.ZodType
}
  ? z.input<R>
  : never

export type HarmonyRequest<
  E extends HarmonyEndpoint,
  M extends HarmonyMethod<E>,
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
