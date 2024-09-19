/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { entityDataSchema } from "./entity-data.validator"

export const entityDataPatchValidator = z.object({
  data: entityDataSchema,
})
export type EntityDataPatch = z.infer<typeof entityDataPatchValidator>
