/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

export const entityDataSchema = z.record(
  z.union([z.string(), z.number()]),
  z.unknown()
)
export type EntityData = z.infer<typeof entityDataSchema>

export const entityJsonDataValidator = z.object({
  data: entityDataSchema,
})
export type EntityJsonData = z.infer<typeof entityJsonDataValidator>
