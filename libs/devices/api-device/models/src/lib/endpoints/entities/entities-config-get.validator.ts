/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const GetEntitiesConfigRequestValidator = z.object({
  entityType: z.string().min(1),
})

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
