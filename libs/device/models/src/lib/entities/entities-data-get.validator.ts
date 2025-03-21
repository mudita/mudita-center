/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { entityDataSchema } from "./entity-data.validator"

export const entitiesFileDataValidator = z.object({
  filePath: z.string().min(1).optional(),
  progress: z.number().min(0).max(100).optional(),
})
export type EntitiesFileData = z.infer<typeof entitiesFileDataValidator>

export const entitiesJsonDataValidator = z.object({
  data: z.array(entityDataSchema),
})
export type EntitiesJsonData = z.infer<typeof entitiesJsonDataValidator>

export const cancelEntitiesDataValidator = z.object({})

export type CancelEntitiesData = z.infer<typeof cancelEntitiesDataValidator>
