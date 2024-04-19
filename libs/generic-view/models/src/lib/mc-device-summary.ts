/**
 * Copyright (c) Mudita sp. z o.o. All rights reserved.
 * For licensing, see https://github.com/mudita/mudita-center/blob/master/LICENSE.md
 */

import { z } from "zod"
import { IconType } from "generic-view/utils"

const dataValidator = z.undefined()

export type McDeviceSummaryData = z.infer<typeof dataValidator>

const configValidator = z.object({
  showImg: z.boolean().optional(),
  imgVariant: z.string().optional(),
  showSerialNumber: z.boolean().optional(),
  serialNumberLabel: z.string().optional(),
  showAbout: z.boolean().optional(),
  aboutTitle: z.string().optional(),
  aboutSubtitle: z.string().optional(),
  aboutIcon: z.nativeEnum(IconType).optional(),
})

export type McDeviceSummaryConfig = z.infer<typeof configValidator>

export const mcDeviceSummary = {
  key: "mc-device-summary",
  dataValidator,
  configValidator,
} as const
