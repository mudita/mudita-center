/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"

export const iconTypeValidator = z.object({
  type: z.nativeEnum(IconType),
})

const dataValidator = iconTypeValidator.optional()

export type IconData = z.infer<typeof dataValidator>

const configValidator = dataValidator

export type IconConfig = z.infer<typeof configValidator>

export const icon = {
  key: "icon",
  dataValidator,
  configValidator,
} as const
