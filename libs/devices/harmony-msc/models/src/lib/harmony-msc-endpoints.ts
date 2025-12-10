/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import {
  FlashPostRequestValidator,
  FlashPostResponseValidator,
} from "./endpoints/flash-post.validator"
import {
  FlashGetRequestValidator,
  FlashGetResponseValidator,
} from "./endpoints/flash-get.validator"

export enum HarmonyMscEndpointNamed {
  Flash = 1,
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
      request: FlashPostRequestValidator,
      response: FlashPostResponseValidator,
    },
    [HarmonyMscMethodNamed.Get]: {
      request: FlashGetRequestValidator,
      response: FlashGetResponseValidator,
    },
  },
} satisfies EndpointsDefinition

export type HarmonyMscEndpoint = keyof typeof HarmonyMscEndpoints
