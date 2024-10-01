/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({})

export type ItemFilterData = z.infer<typeof dataValidator>

const configValidator = z.object({}).optional()

export type ItemFilterConfig = z.infer<typeof configValidator>

export const itemFilter = {
  key: "item-filter",
  dataValidator,
  configValidator,
} as const
