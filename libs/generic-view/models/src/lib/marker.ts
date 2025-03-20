/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  color: z.string(),
})
export type MarkerConfig = z.infer<typeof configValidator>

export const marker = {
  key: "marker",
  dataValidator,
  configValidator,
} as const
