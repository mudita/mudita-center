/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"

const dataValidator = z.object({
  icon: z.nativeEnum(IconType),
  text: z.string(),
  subText: z.string().optional(),
  show: z.boolean().default(false),
})

export type IconTextData = z.infer<typeof dataValidator>

const configValidator = z.undefined()

export const iconText = {
  key: "icon-text",
  dataValidator,
  configValidator,
} as const
