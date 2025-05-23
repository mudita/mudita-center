/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { SerialPortResponse } from "app-serialport/models"
import { HarmonyMscEndpoint, HarmonyMscEndpoints } from "./harmony-msc-endpoints"

export type HarmonyMscResponseBody<
  E extends HarmonyMscEndpoint,
  M extends keyof (typeof HarmonyMscEndpoints)[E],
> = (typeof HarmonyMscEndpoints)[E][M] extends {
  response: infer R extends z.ZodType
}
  ? z.infer<R>
  : never

export type HarmonyMscResponse<
  E extends keyof typeof HarmonyMscEndpoints,
  M extends keyof (typeof HarmonyMscEndpoints)[E],
> = SerialPortResponse<
  | {
      status: number
      endpoint: E
      body: HarmonyMscResponseBody<E, M>
    }
  | {
      status: number // TODO
      endpoint: E
      body?: unknown
    }
>
