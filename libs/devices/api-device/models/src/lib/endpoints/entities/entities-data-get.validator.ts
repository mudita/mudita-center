/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { response200Schema, response202Schema } from "../common"
import { entityDataSchema } from "./entity-data.validator"

export const GetEntitiesDataRequestValidator = z
  .object({
    entityType: z.string().min(1),
    responseType: z.enum(["file", "json"]).default("file"),
  })
  .or(
    z.object({
      entityType: z.string().min(1),
      entityId: z.string().min(1),
    })
  )

export type EntitiesFileDataRequest = z.infer<
  typeof GetEntitiesDataRequestValidator
>

const entitiesInProgressResponseSchema = response202Schema.extend({
  progress: z
    .int()
    .min(0)
    .transform((val) => Math.min(val, 100)),
})

const entitiesReadyResponseSchema = response200Schema.extend({
  progress: z.literal(100).optional(),
  filePath: z.string(),
})

const singleEntityDataResponseSchema = response200Schema.extend({
  data: entityDataSchema,
})

export const GetEntitiesDataResponseValidator = z.union([
  entitiesInProgressResponseSchema,
  entitiesReadyResponseSchema,
  singleEntityDataResponseSchema,
])

export type GetEntitiesDataResponse202 = z.output<
  typeof entitiesInProgressResponseSchema
>

export type GetEntitiesDataResponse200 = z.output<
  typeof entitiesReadyResponseSchema
>

export type GetSingleEntityDataResponse = z.output<
  typeof singleEntityDataResponseSchema
>
