/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { SerialPortResponse } from "app-serialport/models"
import { HarmonyEndpoint, HarmonyEndpoints } from "./harmony-endpoints"

export type HarmonyResponseBody<
  E extends HarmonyEndpoint,
  M extends keyof (typeof HarmonyEndpoints)[E],
> = (typeof HarmonyEndpoints)[E][M] extends {
  response: infer R extends z.ZodType
}
  ? z.output<R>
  : never

export type HarmonyResponse<
  E extends keyof typeof HarmonyEndpoints,
  M extends keyof (typeof HarmonyEndpoints)[E],
> = SerialPortResponse<
  | {
      status: number
      endpoint: E
      body: HarmonyResponseBody<E, M>
    }
  | {
      status: number
      endpoint: E
      body?: unknown
    }
>
