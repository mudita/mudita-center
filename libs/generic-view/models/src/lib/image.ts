/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z.object({
  src: z.string(),
  alt: z.string().optional(),
})

export type ImageData = z.infer<typeof dataValidator>

const configValidator = z.undefined()

export const image = {
  key: "image",
  dataValidator,
  configValidator,
} as const
