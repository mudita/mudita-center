/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { entityDataSchema } from "./entity-data.validator"

export const PostEntityDataRequestValidator = z.object({
  entityType: z.string().min(1),
  data: entityDataSchema,
})

export type PostEntityDataRequest = z.infer<
  typeof PostEntityDataRequestValidator
>

export const PostEntityDataResponseValidator = z.object({
  data: entityDataSchema,
})

export type PostEntityDataResponse = z.infer<
  typeof PostEntityDataResponseValidator
>

export const buildPostEntityDataRequest = (req: PostEntityDataRequest) => {
  return {
    endpoint: "ENTITIES_DATA",
    method: "POST",
    body: req,
  } as const
}
