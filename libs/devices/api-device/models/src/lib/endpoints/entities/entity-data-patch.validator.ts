/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { entityDataSchema } from "./entity-data.validator"

export const PatchEntityDataRequestValidator = z.object({
  entityType: z.string().min(1),
  entityId: z.string().min(1),
  data: entityDataSchema,
})

export type PatchEntityDataRequest = z.infer<
  typeof PatchEntityDataRequestValidator
>

export const PatchEntityDataResponseValidator = z.object({
  data: entityDataSchema,
})

export type PatchEntityDataResponse = z.infer<
  typeof PatchEntityDataResponseValidator
>

export const buildPatchEntityDataRequest = (req: PatchEntityDataRequest) => {
  return {
    endpoint: "ENTITIES_DATA",
    method: "PATCH",
    body: req,
  } as const
}
