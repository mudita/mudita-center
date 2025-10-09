/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const loaderConfigValidator = z.object({
  entityTypes: z.array(z.string()),
  text: z.string().optional(),
})

const configValidator = z.object({
  loaderConfig: loaderConfigValidator,
  emptyView: z.any().optional(),
})

export type McContactsDuplicatesConfig = z.infer<typeof configValidator>

export const mcContactsDuplicates = {
  key: "mc-contacts-duplicates",
  dataValidator,
  configValidator,
} as const
