/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const OutboxEntitiesValidator = z
  .object({
    entityType: z.string(),
    entityId: z.string().optional(),
    action: z.enum(["deleted", "modified", "created"]).optional(),
  })
  .refine(
    (data) => {
      if (data.entityId && !data.action) {
        return false
      }
      return true
    },
    {
      message: "Field action is required if entityId is specified",
      path: ["action"],
    }
  )

export const OutboxValidator = z.object({
  features: z.array(z.string()).optional(),
  entities: z.array(OutboxEntitiesValidator).min(1),
  data: z.array(z.string()),
})

export type Outbox = z.infer<typeof OutboxValidator>
