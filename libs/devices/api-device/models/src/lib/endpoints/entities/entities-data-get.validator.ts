/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { entityDataSchema } from "./entity-data.validator"

export const GetEntitiesJsonDataRequestValidator = z.object({
  entityType: z.string().min(1),
  responseType: z.enum(["json"]),
})

export type EntitiesJsonDataRequest = z.infer<
  typeof GetEntitiesJsonDataRequestValidator
>

export const GetEntitiesJsonDataResponseValidator = z.object({
  data: z.array(entityDataSchema),
})

export type EntitiesJsonData = z.infer<
  typeof GetEntitiesJsonDataResponseValidator
>

export const GetEntitiesDataRequestValidator = z.union([
  GetEntitiesJsonDataRequestValidator,
])

export const GetEntitiesDataResponseValidator = z.union([
  GetEntitiesJsonDataResponseValidator,
])
