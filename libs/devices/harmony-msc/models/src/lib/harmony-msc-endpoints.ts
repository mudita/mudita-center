/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import {
  FlashRequestValidator,
  FlashResponseValidator,
} from "./endpoints/flash/flash"

export enum HarmonyMscEndpointNamed {
  Flash = "flash",
}

export enum HarmonyMscMethodNamed {
  Get = 1,
  Post = 2,
  Put = 3,
  Delete = 4,
}

type EndpointsDefinition = Record<
  string,
  Partial<
    Record<HarmonyMscMethodNamed, { request?: z.ZodType; response: z.ZodType }>
  >
>

export const HarmonyMscEndpoints = {
  [HarmonyMscEndpointNamed.Flash]: {
    [HarmonyMscMethodNamed.Post]: {
      request: FlashRequestValidator,
      response: FlashResponseValidator,
    },
  },
} satisfies EndpointsDefinition

export type HarmonyMscEndpoint = keyof typeof HarmonyMscEndpoints
