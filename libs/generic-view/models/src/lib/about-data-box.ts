/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"

const dataValidator = z
  .object({
    text: z.string().optional(),
  })
  .optional()

export type AboutDataBoxData = z.infer<typeof dataValidator>

const configValidator = z.object({
  title: z.string(),
})

export type AboutDataBoxConfig = z.infer<typeof configValidator>

export const aboutDataBox = {
  key: "about-data-box",
  dataValidator,
  configValidator,
} as const
