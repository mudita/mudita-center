/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"

const dataValidator = z
  .object({
    type: z.nativeEnum(IconType),
  })
  .optional()

export type IconData = z.infer<typeof dataValidator>

const configValidator = dataValidator

export type IconConfig = z.infer<typeof configValidator>

export const icon = {
  key: "icon",
  dataValidator,
  configValidator,
} as const
