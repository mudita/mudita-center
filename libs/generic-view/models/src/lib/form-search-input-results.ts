/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.array(z.string()).optional()

export type FormSearchInputResultsData = z.infer<typeof dataValidator>

const configValidator = z
  .object({
    maxHeight: z.string().optional(),
  })
  .optional()

export type FormSearchInputResultsConfig = z.infer<typeof configValidator>

export const formSearchInputResults = {
  key: "form.searchInputResults",
  dataValidator,
  configValidator,
} as const
