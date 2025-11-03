/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { response200Schema, response202Schema } from "../common"

export const entityDataSchema = z.record(z.string(), z.unknown())
export type EntityData = z.infer<typeof entityDataSchema>

export const GetEntitiesDataRequestValidator = z.object({
  entityType: z.string().min(1),
  responseType: z.literal("file"),
})

export type EntitiesFileDataRequest = z.infer<
  typeof GetEntitiesDataRequestValidator
>

const entitiesInProgressResponseSchema = response202Schema.extend({
  progress: z.int().min(0).max(100),
})

const entitiesReadyResponseSchema = response200Schema.extend({
  progress: z.literal(100).optional(),
  filePath: z.string(),
})

export const GetEntitiesDataResponseValidator = z.union([
  entitiesInProgressResponseSchema,
  entitiesReadyResponseSchema,
])

export type GetEntitiesDataResponse202 = z.output<
  typeof entitiesInProgressResponseSchema
>

export type GetEntitiesDataResponse200 = z.output<
  typeof entitiesReadyResponseSchema
>
