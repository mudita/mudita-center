/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import {
  ApiConfigValidator,
  MCLangValidator,
} from "./endpoints/api-config/api-config"
import { MenuConfigValidator } from "./endpoints/menu-config/menu-config"
import { z } from "zod"

type Method = "GET" | "POST" | "PUT" | "DELETE"

type EndpointsDefinition = Record<
  string,
  Partial<
    Record<Method, { request: z.ZodType | undefined; response: z.ZodType }>
  >
>

export const ApiDeviceEndpoints = {
  API_CONFIGURATION: {
    GET: {
      request: undefined,
      response: ApiConfigValidator,
    },
  },
  MENU_CONFIGURATION: {
    GET: {
      request: z.object({
        lang: MCLangValidator,
      }),
      response: MenuConfigValidator,
    },
  },
} satisfies EndpointsDefinition

export type ApiDeviceEndpoint = keyof typeof ApiDeviceEndpoints
