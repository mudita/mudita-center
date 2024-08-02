/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"

const dataValidator = z.undefined().optional()

const configValidator = z.object({
  icon: z.nativeEnum(IconType),
  header: z.string(),
  text: z.string(),
})

export type IncomingFeatureInfoConfig = z.infer<typeof configValidator>

export const incomingFeatureInfo = {
  key: "incoming-feature-info",
  dataValidator,
  configValidator,
} as const
