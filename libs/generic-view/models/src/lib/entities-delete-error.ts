/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  modalKey: z.string(),
  entitiesType: z.string(),
})

export type EntitiesDeleteErrorConfig = z.infer<typeof configValidator>

export const entitiesDeleteError = {
  key: "entities-delete-error",
  dataValidator,
  configValidator,
} as const
