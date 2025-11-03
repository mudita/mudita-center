/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { response200Schema, response207Schema } from "../common"

export const DeleteEntitiesRequestValidator = z.object({
  entityType: z.string().min(1),
  ids: z.array(z.string()).nonempty(),
})

export type DeleteEntitiesRequest = z.infer<
  typeof DeleteEntitiesRequestValidator
>

export const DeleteEntitiesResponseValidator200 = response200Schema.extend({})

export const DeleteEntitiesResponseValidator207 = response207Schema.extend({
  failedIds: z.array(z.string()).nonempty(),
})

export type DeleteEntitiesResponse200 = z.infer<
  typeof DeleteEntitiesResponseValidator200
>

export type DeleteEntitiesResponse207 = z.infer<
  typeof DeleteEntitiesResponseValidator207
>

export const DeleteEntitiesResponseValidator = z.union([
  DeleteEntitiesResponseValidator200,
  DeleteEntitiesResponseValidator207,
])
