/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { SerialPortRequest } from "app-serialport/models"
import {
  HarmonyMscEndpoint,
  HarmonyMscEndpoints,
} from "./harmony-msc-endpoints"

export type HarmonyMscMethod<E extends HarmonyMscEndpoint> =
  keyof (typeof HarmonyMscEndpoints)[E]

type RequestBody<
  E extends HarmonyMscEndpoint,
  M extends keyof (typeof HarmonyMscEndpoints)[E],
> = (typeof HarmonyMscEndpoints)[E][M] extends {
  request: infer R extends z.ZodType
}
  ? z.infer<R>
  : never

export type HarmonyMscRequest<
  E extends HarmonyMscEndpoint = HarmonyMscEndpoint,
  M extends HarmonyMscMethod<E> = HarmonyMscMethod<E>,
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
