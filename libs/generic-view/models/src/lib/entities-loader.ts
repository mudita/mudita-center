/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  entitiesTypes: z.array(z.string()),
  text: z.string().optional(),
})

export type EntitiesLoaderConfig = z.infer<typeof configValidator>

export const entitiesLoader = {
  key: "entities-loader",
  dataValidator,
  configValidator,
} as const
