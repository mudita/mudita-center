/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  text: z.string(),
})

export type TextPlainData = z.infer<typeof dataValidator>

const configValidator = z.undefined()

export const textPlain = {
  key: "text-plain",
  dataValidator,
  configValidator,
} as const
