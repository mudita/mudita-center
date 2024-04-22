/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  value: z.string(),
}).optional()

export type FormSearchInputData = z.infer<typeof dataValidator>

const configValidator = z.object({
  name: z.string(),
  label: z.string(),
})

export type FormSearchInputConfig = z.infer<typeof configValidator>

export const formSearchInput = {
  key: "form.searchInput",
  dataValidator,
  configValidator,
} as const
