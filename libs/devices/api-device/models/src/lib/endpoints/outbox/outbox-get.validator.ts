/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const OutboxRequestValidator = z.undefined().optional()

export type OutboxRequest = z.infer<typeof OutboxRequestValidator>

const detailedEntitySchema = z.object({
  entityType: z.string(),
  entityId: z.string(),
  action: z.enum(["deleted", "modified"]),
})

const simpleEntitySchema = z.object({
  entityType: z.string(),
})

const entitiesSchema = z.union([detailedEntitySchema, simpleEntitySchema])

export const OutboxResponseValidator = z.object({
  features: z.array(z.string()),
  data: z.array(z.string()),
  entities: z.array(entitiesSchema),
})

export type OutboxResponse = z.infer<typeof OutboxResponseValidator>
export type DetailedOutboxEntity = z.infer<typeof detailedEntitySchema>
export type SimpleOutboxEntity = z.infer<typeof simpleEntitySchema>

export const buildOutboxGetRequest = (req?: OutboxRequest) => {
  return {
    endpoint: "OUTBOX",
    method: "GET",
    body: req,
  } as const
}