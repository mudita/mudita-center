/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const GetEntitiesConfigRequestValidator = z.object({
  entityType: z.string().min(1),
})

export type GetEntitiesConfigRequest = z.infer<
  typeof GetEntitiesConfigRequestValidator
>

export const GetEntitiesConfigResponseValidator = z.object({
  fields: z.record(
    z.string(),
    z.object({
      type: z.enum(["id", "object", "string", "array", "boolean", "number"]),
    })
  ),
})

export type GetEntitiesConfigResponse = z.infer<
  typeof GetEntitiesConfigResponseValidator
>

export const buildEntitiesConfigGetRequest = (req: GetEntitiesConfigRequest) => {
  return {
    endpoint: "ENTITIES_CONFIGURATION",
    method: "GET",
    body: req,
  } as const
}