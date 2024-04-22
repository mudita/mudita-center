/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.undefined()

const configValidator = z.object({
  text: z.string(),
})

export type HeaderConfig = z.infer<typeof configValidator>

export const h3Component = {
  key: "h3-component",
  dataValidator,
  configValidator,
} as const

// Add more headers here
