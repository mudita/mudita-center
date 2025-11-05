/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const OutboxRequestValidator = z.undefined().optional()

const entitiesSchema = z.union([
  z.object({
    entityType: z.string(),
    entityId: z.string(),
    action: z.enum(["deleted", "modified"]),
  }),
  z.object({
    entityType: z.string(),
  }),
])

export const OutboxResponseValidator = z.object({
  features: z.array(z.string()),
  data: z.array(z.string()),
  entities: z.array(entitiesSchema),
})
